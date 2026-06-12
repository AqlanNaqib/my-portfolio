"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SmoothCursor() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    setMounted(true);
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(media.matches);

    const onMediaChange = (event: MediaQueryListEvent) =>
      setEnabled(event.matches);
    media.addEventListener("change", onMediaChange);

    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      setPosition({ x: currentX, y: currentY });

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      if (dx !== 0 || dy !== 0) {
        setAngle(Math.atan2(dy, dx) * (180 / Math.PI));
      }

      lastX = currentX;
      lastY = currentY;
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      media.removeEventListener("change", onMediaChange);
    };
  }, []);

  if (!mounted || !enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="smooth-cursor"
      animate={{
        x: position.x,
        y: position.y,
        rotate: angle,
      }}
      transition={{
        type: "tween",
        duration: 0.02,
      }}
    >
      <span className="smooth-cursor-dot" />
      <span className="smooth-cursor-ring" />
    </motion.div>
  );
}
