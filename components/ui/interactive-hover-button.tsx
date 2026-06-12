"use client";

import * as React from "react";

type InteractiveHoverButtonProps = {
  text?: string;
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function InteractiveHoverButton({
  text = "Button",
  className = "",
  children,
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      type="button"
      className={`interactive-hover-btn group ${className}`.trim()}
      {...props}
    >
      <span className="interactive-hover-btn__bg" aria-hidden />
      <span className="interactive-hover-btn__shine" aria-hidden />
      <span className="interactive-hover-btn__label">{children ?? text}</span>
    </button>
  );
}
