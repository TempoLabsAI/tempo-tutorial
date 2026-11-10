/** Dependency-free className join. The DS version layers tailwind-merge on
 *  top, but this vendored canvas is static display copy whose class lists
 *  never conflict — and the default `tempo/` host does not ship clsx or
 *  tailwind-merge, so the template must not import them. */
type ClassValue = string | number | null | undefined | false | ClassValue[];

function flatten(value: ClassValue, out: string[]): void {
  if (!value && value !== 0) return;
  if (Array.isArray(value)) {
    for (const entry of value) flatten(entry, out);
    return;
  }
  out.push(String(value));
}

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) flatten(input, out);
  return out.join(" ");
}
