"use client";

import * as React from "react";

type AnimatedGridPatternProps = {
  className?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function AnimatedGridPattern({
  className = "",
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 200,
  maxOpacity = 0.35,
  duration = 3,
  repeatDelay = 1,
}: AnimatedGridPatternProps) {
  const squares = React.useMemo(() => {
    return Array.from({ length: numSquares }).map((_, i) => {
      const col = Math.floor(seededRandom(i + 1) * 30);
      const row = Math.floor(seededRandom(i + 101) * 24);
      const delay = seededRandom(i + 999) * repeatDelay;
      const life = duration + seededRandom(i + 500) * duration;
      const opacity = 0.08 + seededRandom(i + 777) * maxOpacity;
      return { col, row, delay, life, opacity, id: i };
    });
  }, [numSquares, duration, repeatDelay, maxOpacity]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <svg className="h-full w-full">
        <defs>
          <pattern
            id={`grid-pattern-${width}-${height}-${x}-${y}-${strokeDasharray}`}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              stroke="rgba(148,163,184,0.22)"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-pattern-${width}-${height}-${x}-${y}-${strokeDasharray})`}
        />

        {squares.map((sq) => (
          <rect
            key={sq.id}
            x={sq.col * width}
            y={sq.row * height}
            width={width}
            height={height}
            fill="rgba(56,189,248,0.9)"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values={`0;${sq.opacity.toFixed(4)};0`}
              dur={`${sq.life.toFixed(4)}s`}
              begin={`${sq.delay.toFixed(4)}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </svg>
    </div>
  );
}
