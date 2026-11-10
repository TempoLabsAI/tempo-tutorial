/**
 * Asks the Tempo app to open its real "Import designs" dialog.
 *
 * In Play mode a storyboard runs in an iframe inside the Tempo window, so the
 * button posts one message to that window. Tempo only acts on it when it
 * comes from one of its own canvas Play frames; anywhere else (this canvas
 * opened outside Tempo, or not in Play) the click does nothing.
 */
export function requestImportDesigns(): void {
  if (typeof window === "undefined" || window.parent === window) return;
  window.parent.postMessage(
    { source: "tempo-tutorial", type: "open-import-designs" },
    "*",
  );
}
