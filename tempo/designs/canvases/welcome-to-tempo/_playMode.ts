import { useContext, useEffect, useState } from "react";
import { isTempoInteractFrameName } from "tempo-sdk/canvas";
import { TutorialPlayContext } from "./_introSpace";

/** How long the motion carries on after the cursor was last over the frame. */
const LINGER_MS = 20_000;

/**
 * Whether the board should be moving. The canvas keeps a board's Play frame
 * loaded (hidden, mirrored onto the canvas) after Play is switched off, and
 * does not tell the page which state it is in. The only sign of Play the
 * page gets is the cursor: a hidden frame receives no pointer input. So the
 * board moves while the cursor is over it and for LINGER_MS afterwards, and
 * comes to rest once Play has been off (or the cursor away) for that long.
 * useInPlay in _introSpace stops the moment the cursor leaves.
 */
export function usePlayMode() {
  const previewPlaying = useContext(TutorialPlayContext);
  const [inPlayFrame] = useState(
    () =>
      typeof window !== "undefined" &&
      window.parent !== window &&
      isTempoInteractFrameName(window.name),
  );
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!inPlayFrame) return;
    let timer = 0;
    const seen = () => {
      setActive(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setActive(false), LINGER_MS);
    };
    const root = document.documentElement;
    root.addEventListener("pointermove", seen);
    root.addEventListener("pointerdown", seen);
    root.addEventListener("mouseenter", seen);
    return () => {
      window.clearTimeout(timer);
      root.removeEventListener("pointermove", seen);
      root.removeEventListener("pointerdown", seen);
      root.removeEventListener("mouseenter", seen);
    };
  }, [inPlayFrame]);
  return previewPlaying ?? (inPlayFrame && active);
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Whether the OS asks for less motion. Follows the setting live. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(REDUCED_MOTION).matches,
  );
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION);
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Whether to animate: in Play, unless the OS asks for reduced motion. */
export function usePlayMotion() {
  const inPlay = usePlayMode();
  const reduced = useReducedMotion();
  return inPlay && !reduced;
}
