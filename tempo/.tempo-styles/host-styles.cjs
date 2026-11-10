// @tempo-owned: stylesheet-runtime-v1
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const postcss = require("postcss");
const runtimes = new Map();
function runtime(base = path.resolve(__dirname, "..")) {
  if (!runtimes.has(base)) runtimes.set(base, createRuntime(base));
  return runtimes.get(base);
}
function createRuntime(host) {
// These are checked-in scaffold inputs. Only the changing source policy
// belongs in the ignored runtime cache, which may be absent on a CI clone.
const generated = path.join(host, ".tempo-styles");
const planFile = path.join(generated, "styles-plan.json");
const policyFile = path.join(host, ".tempo", "styles-sources.css");
const watched = new Map();
let timer;
let sourcePlan;
let rebindSources = false;
let watchVersion = 0;
let membership;
let membershipChanged = false;
let sourceRevision = 0;
const absolute = (file) => path.resolve(host, file);
const normalize = (file) => {
  try { return fs.realpathSync(file); } catch { return path.resolve(file); }
};
const relative = (from, file) => {
  const value = path.relative(path.dirname(from), file).split(path.sep).join("/");
  return /^(?:\.\.?\/)/.test(value) ? value : "./" + value;
};
const quoted = (value) => JSON.stringify(value).replace(/</g, "\\3c ");
function readPlan() { return JSON.parse(fs.readFileSync(planFile, "utf8")); }
const sourceFile = (file) => /\.(?:[cm]?[jt]sx?|svelte|vue|astro|html|mdx?)$/i.test(file);
const ignored = (name) => name.startsWith(".") || ["node_modules", "dist", "build", "coverage"].includes(name);
function sourceMembership(directories) {
  const files = new Set();
  function visit(directory) {
    let entries;
    try { entries = fs.readdirSync(directory, { withFileTypes: true }); }
    catch (error) { if (error.code === "ENOENT") return; throw error; }
    for (const entry of entries) {
      if (ignored(entry.name) || entry.isSymbolicLink()) continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile() && sourceFile(file)) files.add(relative(policyFile, file));
    }
  }
  directories.forEach(visit);
  return crypto.createHash("sha256").update([...files].sort().join("\n")).digest("hex");
}
function refreshSources(scan = true) {
  const plan = readPlan();
  const directories = [...new Set(plan.sources.map(absolute))];
  if (scan || membership === undefined) membership = sourceMembership(directories);
  const text = "/* @tempo-owned: stylesheet sources; membership " + membership + "; revision " + sourceRevision + " */\n" +
    directories.map((dir) => "@source " + quoted(relative(policyFile, dir)) + ";").join("\n") + "\n";
  if (!fs.existsSync(policyFile) || fs.readFileSync(policyFile, "utf8") !== text) {
    fs.mkdirSync(path.dirname(policyFile), { recursive: true });
    const temporary = policyFile + "." + process.pid + ".tmp";
    fs.writeFileSync(temporary, text);
    fs.renameSync(temporary, policyFile);
  }
  return directories;
}
function startSources() {
  const current = fs.readFileSync(planFile, "utf8");
  if (sourcePlan === current) return;
  stopSources();
  sourcePlan = current;
  const directories = [...new Set(readPlan().sources.map(absolute))];
  if (process.env.NODE_ENV !== "production") watchSources(directories);
  refreshSources();
}
function closeWatchers() {
  for (const watcher of watched.values()) watcher.close();
  watched.clear();
}
function watchSources(directories) {
  // Watching only the directory's inode misses its deletion/recreation.
  // Nonrecursive parent watches cover that transition without recursively
  // watching the whole repository (and all of its node_modules).
  const version = ++watchVersion;
  closeWatchers();
  const parents = new Map();
  const changed = (rebind, scan) => {
    if (version !== watchVersion) return;
    rebindSources ||= rebind;
    membershipChanged ||= scan;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (version !== watchVersion) return;
      const scan = membershipChanged;
      membershipChanged = false;
      if (rebindSources) watchSources(directories);
      rebindSources = false;
      // Newly discovered sources are not necessarily watched by the CSS
      // compiler yet. Their subsequent edits need this dependency too.
      // Invalidate on change without rewalking the source tree.
      sourceRevision++;
      refreshSources(scan);
    }, 40);
    timer.unref();
  };
  function add(directory, recursive, children) {
    const key = (recursive ? "source:" : "parent:") + directory;
    if (watched.has(key)) return;
    let watcher;
    try {
      watcher = fs.watch(directory, { recursive, persistent: false }, (event, name) => {
        if (version !== watchVersion) return;
        if (event !== "rename" && (!recursive || event !== "change")) return;
        if (name) {
          const parts = String(name).split(/[\\/]/);
          if (children ? !children.has(parts[0]) : parts.some(ignored)) return;
          if (event === "change" && !sourceFile(String(name))) return;
        }
        changed(!recursive, event === "rename" || !name);
      });
    } catch (error) {
      if (error.code === "ENOENT") return;
      throw error;
    }
    watcher.on("error", (error) => {
      if (version !== watchVersion) return;
      watcher.close();
      if (watched.get(key) === watcher) watched.delete(key);
      console.error("Tempo stylesheet source watcher failed for " + directory + ": " + error.message + ". Restart the canvas dev server after fixing the cause.");
    });
    watched.set(key, watcher);
  }
  for (const directory of directories) {
    if (fs.existsSync(directory)) add(directory, true);
    let parent = path.dirname(directory);
    while (!fs.existsSync(parent) && parent !== path.dirname(parent)) parent = path.dirname(parent);
    const child = path.relative(parent, directory).split(path.sep)[0];
    if (!parents.has(parent)) parents.set(parent, new Set());
    parents.get(parent).add(child);
  }
  for (const [parent, children] of parents) add(parent, false, children);
}
function stopSources() {
  ++watchVersion;
  clearTimeout(timer);
  rebindSources = false;
  membershipChanged = false;
  membership = undefined;
  sourceRevision = 0;
  closeWatchers();
  sourcePlan = undefined;
}
function appendImport(ast, params) {
  // Any engine import must follow the author's existing imports. Putting
  // Tailwind first would expand rules in front of remote font imports again.
  const node = postcss.atRule({ source: ast.source, name: "import", params });
  const last = [...ast.nodes].reverse().find((n) => n.type === "atrule" && ["charset", "import"].includes(n.name));
  if (last) last.after(node); else ast.prepend(node);
}
function augment(ast, from) {
  const plan = readPlan();
  const file = normalize(from);
  const root = plan.roots.find((root) => normalize(absolute(root.file)) === file);
  const isGlobals = normalize(absolute(plan.globals)) === file;
  if (!root && !isGlobals) return false;
  const isOwner = normalize(absolute(plan.owner)) === file;
  const hasUserNodes = ast.nodes.some((node) => node.type !== "comment");
  if (!isOwner && !root?.engine && !root?.tailwind && (!isGlobals || !hasUserNodes)) return false;
  if (plan.major === 3) {
    const directives = new Set();
    const layers = new Set();
    ast.walkAtRules("tailwind", (node) => directives.add(node.params.trim()));
    ast.walkAtRules("layer", (node) => { if (["base", "components", "utilities"].includes(node.params)) layers.add(node.params); });
    if (isOwner && !root?.engine) ["base", "components", "utilities"].forEach((name) => layers.add(name));
    for (const name of layers) if (!directives.has(name)) ast.append(postcss.atRule({ source: ast.source, name: "tailwind", params: name }));
    // Partial sheets need their @layer context, but must not emit a second
    // reset. The app's theme/plugins/content are inherited by this config.
    let hasConfig = false;
    // Tailwind v3 mutates its plugin's remembered config when it sees
    // @config. Bind every entry explicitly so a partial sheet cannot disable
    // preflight (or change content scanning) in a subsequently compiled root.
    const configName = !isOwner && !root?.engine && layers.size ? "tailwind-partial.cjs" : "tailwind-full.cjs";
    ast.walkAtRules("config", (node) => {
      hasConfig = true;
      const value = node.params.match(/^["']([^"']+)["']$/)?.[1];
      const origin = node.source?.input.file ?? from;
      // An authored @config for the app's config must retain the canvas
      // content extension too. Other custom configs keep their own semantics.
      if (value && plan.config && normalize(path.resolve(path.dirname(origin), value)) === normalize(absolute(plan.config))) {
        node.params = quoted(relative(origin, path.join(generated, configName)));
      }
    });
    if (!hasConfig) ast.prepend(postcss.atRule({ source: ast.source, name: "config", params: quoted(relative(from, path.join(generated, configName))) }));
    return true;
  }
  startSources();
  if (isOwner && !root?.engine && !isGlobals) appendImport(ast, '"tailwindcss"');
  if (!isOwner && !root?.engine) {
    let hostDefinitions = false;
    ast.walkAtRules((node) => {
      if (["theme", "utility", "custom-variant", "plugin", "config", "import"].includes(node.name)) hostDefinitions = true;
    });
    ast.prepend(postcss.atRule({ source: ast.source, name: "reference", params: quoted(relative(from, absolute(plan.owner))) }));
    // @reference reads the original file, before this adapter's transform.
    // A theme-only owner therefore also needs the default theme reference.
    const owner = plan.roots.find((entry) => entry.file === plan.owner);
    if (owner && !owner.engine) ast.prepend(postcss.atRule({ source: ast.source, name: "reference", params: '"tailwindcss"' }));
    if (isGlobals && hostDefinitions) ast.append(postcss.atRule({ source: ast.source, name: "tailwind", params: "utilities" }));
  }
  // Host-local @apply/custom utilities may use variables a separate app
  // compiler would prune. Emit theme values in their owning sheet, never in
  // the reference sheet. This also keeps direct CSS var() consumers valid.
  ast.walkAtRules("theme", (node) => { if (!/\bstatic\b/.test(node.params)) node.params += " static"; });
  ast.walkAtRules("import", (node) => {
    // A theme may live behind several CSS imports. Propagate the policy at
    // the import boundary so Tailwind applies it throughout that graph.
    // Remote/url() imports remain ordinary CSS with their original syntax.
    if (/^["'](?![a-z]+:|\/\/)/i.test(node.params)) {
      if (!/\btheme\(/.test(node.params)) node.params += " theme(static)";
      else node.params = node.params.replace(/\btheme\(([^)]*)\)/, (match, options) => /\b(?:static|reference)\b/.test(options) ? match : "theme(" + options + " static)");
    }
  });
  let hasConfig = Boolean(root?.config);
  ast.walkAtRules("config", () => { hasConfig = true; });
  const inheritedConfig = !isOwner && !root?.engine && plan.roots.find((entry) => entry.file === plan.owner)?.config;
  if (plan.config && !hasConfig && !inheritedConfig) ast.append(postcss.atRule({ source: ast.source, name: "config", params: quoted(relative(from, absolute(plan.config))) }));
  ast.append(postcss.atRule({ source: ast.source, name: "import", params: quoted(relative(from, policyFile)) }));
  return true;
}
function plugin() {
  return {
    postcssPlugin: "tempo-host-styles",
    Once(ast, { result }) {
      if (!result.opts.from) return;
      if (augment(ast, result.opts.from)) {
        result.messages.push({ type: "dependency", plugin: "tempo-host-styles", file: planFile, parent: result.opts.from });
      }
    },
  };
}
function vite() {
  let postcssConfigFile;
  return {
    name: "tempo-host-styles",
    enforce: "pre",
    async config(config) {
      if (readPlan().major !== 3) return;
      config.css ??= {};
      const existing = config.css.postcss;
      if (existing && typeof existing === "object") {
        config.css.postcss = { ...existing, plugins: [plugin(), ...(existing.plugins ?? [])] };
        return;
      }
      // Custom Vite hosts can keep their PostCSS config outside vite.config.
      // Load it using the same loader as Vite, preserving its actual plugins.
      let loaded;
      try { loaded = await require("postcss-load-config")({}, path.resolve(config.root ?? host, existing ?? ".")); }
      catch (error) {
        if (!String(error.message).startsWith("No PostCSS Config found")) throw error;
        loaded = { options: {}, plugins: [] };
      }
      postcssConfigFile = loaded.file;
      config.css.postcss = { ...loaded.options, plugins: [plugin(), ...loaded.plugins] };
    },
    configResolved(config) {
      if (postcssConfigFile) config.configFileDependencies.push(postcssConfigFile);
    },
    buildStart() { if (readPlan().major === 4) startSources(); },
    transform(code, id) {
      const file = id.split("?", 1)[0];
      if (!file.endsWith(".css") || readPlan().major !== 4) return;
      // Vite loads raw/url assets as JavaScript before transform hooks run.
      // Keep those imports intact; inline/direct requests still contain CSS.
      if (/(?:\?|&)(?:raw|url)(?:&|$)/.test(id)) return;
      const ast = postcss.parse(code, { from: file });
      if (!augment(ast, file)) return;
      this.addWatchFile(planFile);
      this.addWatchFile(policyFile);
      return { code: ast.toString(), map: ast.toResult({ map: { inline: false, annotation: false } }).map?.toJSON() ?? null };
    },
    closeBundle: stopSources,
  };
}
function nextConfig(config) {
  if (config?.then) return config.then(nextConfig);
  if (typeof config === "function") return (...args) => nextConfig(config(...args));
  const entries = Array.isArray(config.plugins)
    ? config.plugins.map((entry) => typeof entry === "string" ? [entry, {}] : entry)
    : Object.entries(config.plugins ?? {});
  const values = new Map(entries);
  const value = (name, fallback = {}) => values.has(name) ? values.get(name) : fallback;
  const managed = new Set(["postcss-import", "postcss-url", "tailwindcss", "@tailwindcss/postcss"]);
  const major = readPlan().major;
  const adapter = path.join(generated, "host-styles.cjs");
  const plugins = [
    ...(major === 3 ? [["postcss-import", value("postcss-import")], ["postcss-url", value("postcss-url", { url: "rebase" })]] : []),
    [adapter, { base: host }],
    major === 3 ? ["tailwindcss", value("tailwindcss")] : ["@tailwindcss/postcss", value("@tailwindcss/postcss")],
    ...(major === 3 && !values.has("autoprefixer") ? [["autoprefixer", {}]] : []),
  ];
  const first = Math.max(entries.findIndex(([name]) => managed.has(name)), 0);
  const custom = (list) => list.filter(([name]) => !managed.has(name) && name !== adapter);
  return { ...config, plugins: Object.fromEntries([...custom(entries.slice(0, first)), ...plugins, ...custom(entries.slice(first))]) };
}
function viteConfig(config) {
  if (config?.then) return config.then(viteConfig);
  if (typeof config === "function") return (...args) => viteConfig(config(...args));
  return { ...config, plugins: [vite(), ...(config.plugins ?? [])] };
}
return { plugin, vite, nextConfig, viteConfig, refreshSources, stopSources };
}
function hostStyles(options = {}) { return runtime(options.base).plugin(); }
hostStyles.postcss = true;
hostStyles.vite = (options = {}) => runtime(options.base).vite();
hostStyles.nextConfig = (config, options = {}) => runtime(options.base).nextConfig(config);
hostStyles.viteConfig = (config, options = {}) => runtime(options.base).viteConfig(config);
hostStyles.refreshSources = () => runtime().refreshSources();
hostStyles.stopSources = () => { for (const value of runtimes.values()) value.stopSources(); };
module.exports = hostStyles;
