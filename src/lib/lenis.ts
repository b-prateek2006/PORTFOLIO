import type Lenis from "lenis";

// Holds the one smooth-scroll instance so other components (lightbox, mobile
// menu) can pause scrolling while they are open.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Pause or resume page scrolling (works with and without smooth scroll). */
export function lockScroll(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
