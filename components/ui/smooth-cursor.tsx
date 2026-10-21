"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function SmoothCursor() {
  // false on the server and on touch devices
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  // Motion values update the DOM directly, so moving the mouse doesn't re-render React.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rotate = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return undefined;

    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      x.set(e.clientX);
      y.set(e.clientY);
      if (dx !== 0 || dy !== 0) {
        rotate.set(Math.atan2(dy, dx) * (180 / Math.PI));
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y, rotate]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden="true" className="smooth-cursor" style={{ x, y, rotate }}>
      <span className="smooth-cursor-dot" />
      <span className="smooth-cursor-ring" />
    </motion.div>
  );
}
