"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

// Wraps the whole site:
// - Lenis gives the smooth, "weighted" scroll feel (skipped if the visitor
//   turned on "reduce motion" in their OS).
// - MotionConfig reducedMotion="user" makes every Motion animation respect
//   that same setting automatically.
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 } });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
