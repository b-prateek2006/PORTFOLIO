"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// A soft circle that follows the mouse and grows into a label ("Play", "View")
// over anything with a data-cursor="..." attribute. Desktop mice only; the
// normal cursor stays visible, so nothing breaks if this fails.
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? null);
    };
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed top-0 left-0 z-[70]">
      <motion.div
        animate={{ width: label ? 84 : 12, height: label ? 84 : 12, opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-[11px] font-semibold tracking-widest text-black uppercase"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
