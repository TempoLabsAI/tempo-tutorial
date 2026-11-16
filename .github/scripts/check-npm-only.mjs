// Fails when this project stops being installable with npm alone.
//
// Tempo opens this project for every new user and ships its own npm, but not
// pnpm, yarn or bun. A lockfile, `packageManager` field or install script for
// another package manager makes Tempo look for a tool most new users do not
// have, and their first canvas fails to load.
import { existsSync, readFileSync } from "node:fs";

const roots = [".", "tempo"];
const otherLockfiles = [
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "yarn.lock",
  "bun.lock",
  "bun.lockb",
];
const problems = [];

for (const root of roots) {
  if (!existsSync(`${root}/package-lock.json`)) {
    problems.push(`${root}/package-lock.json is missing`);
  }
  for (const file of otherLockfiles) {
    if (existsSync(`${root}/${file}`)) {
      problems.push(`${root}/${file} must not exist: this project uses npm`);
    }
  }
  const manifest = JSON.parse(readFileSync(`${root}/package.json`, "utf8"));
  if (manifest.packageManager !== undefined) {
    problems.push(
      `${root}/package.json sets "packageManager" (${manifest.packageManager}): remove it`,
    );
  }
}

const config = JSON.parse(readFileSync("tempo/tempo.config.json", "utf8"));
const commands = [
  ...Object.entries(config.scripts ?? {}).map(([name, value]) => [
    `scripts.${name}`,
    value,
  ]),
  ...(config.apps ?? []).flatMap((app, index) =>
    ["start", "appStart", "stop"].map((name) => [
      `apps[${index}].${name}`,
      app[name],
    ]),
  ),
];
for (const [name, command] of commands) {
  if (typeof command === "string" && /\b(pnpm|yarn|bun|bunx)\b/.test(command)) {
    problems.push(
      `tempo/tempo.config.json ${name} uses another package manager: ${command}`,
    );
  }
}

if (problems.length > 0) {
  console.error("This project must install with npm alone:\n");
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error("\nSee \"This project uses npm, on purpose\" in README.md.");
  process.exit(1);
}
console.log("npm only: ok");
