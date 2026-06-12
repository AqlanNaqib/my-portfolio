"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SupportedTag =
  | "article"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "li"
  | "p"
  | "section"
  | "span";

type HyperTextProps = {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: SupportedTag;
  startOnView?: boolean;
  animateOnHover?: boolean;
  characterSet?: string[];
};

const DEFAULT_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const hasPlayedOnViewRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const baseChars = useMemo(() => children.split(""), [children]);

  const stopAnimation = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setIsAnimating(false);
  }, []);

  const startAnimation = useCallback(() => {
    if (isAnimating) return;

    const totalChars = baseChars.length;
    if (totalChars === 0) return;

    setIsAnimating(true);

    const startAt = performance.now() + delay;
    const totalDuration = Math.max(100, duration);

    const tick = (now: number) => {
      if (now < startAt) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startAt;
      const progress = Math.min(1, elapsed / totalDuration);
      const revealCount = Math.floor(progress * totalChars);

      const next = baseChars.map((char, index) => {
        if (char === " ") return " ";
        if (index < revealCount) return char;
        return characterSet[Math.floor(Math.random() * characterSet.length)] ?? char;
      });

      setDisplayText(next.join(""));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(children);
        stopAnimation();
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [isAnimating, baseChars, delay, duration, characterSet, children, stopAnimation]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDisplayText(children);
    });
    return () => cancelAnimationFrame(id);
  }, [children]);

  useEffect(() => {
    if (!startOnView || !rootRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasPlayedOnViewRef.current) return;
        hasPlayedOnViewRef.current = true;
        startAnimation();
      },
      { threshold: 0.3 },
    );

    observer.observe(rootRef.current);

    return () => observer.disconnect();
  }, [startOnView, startAnimation]);

  useEffect(() => {
    return () => stopAnimation();
  }, [stopAnimation]);

  const Component = as as React.ElementType;

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        rootRef.current = node;
      }}
      className={className}
      onMouseEnter={animateOnHover ? startAnimation : undefined}
    >
      {displayText}
    </Component>
  );
}
