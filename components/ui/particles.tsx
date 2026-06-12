"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  r: number;
};

type ParticlesProps = {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
};

export function Particles({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, hasMoved: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const host = canvas.parentElement ?? canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (refresh || particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: quantity }, () => {
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          return {
            x,
            y,
            ox: x,
            oy: y,
            vx: (Math.random() - 0.5) * 0.2 + vx,
            vy: (Math.random() - 0.5) * 0.2 + vy,
            r: size + Math.random() * size * 1.5,
          };
        });
      }
    };

    const handleMove = (event: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        hasMoved: true,
      };
    };

    const animate = () => {
      const rect = host.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const influenceRadius = Math.max(80, staticity * 2);
      const easeFactor = Math.max(8, ease) / 1000;

      for (const p of particlesRef.current) {
        p.ox += p.vx;
        p.oy += p.vy;

        if (p.ox < 0 || p.ox > width) p.vx *= -1;
        if (p.oy < 0 || p.oy > height) p.vy *= -1;

        if (pointerRef.current.hasMoved) {
          const dx = pointerRef.current.x - p.x;
          const dy = pointerRef.current.y - p.y;
          const dist = Math.hypot(dx, dy) || 1;

          if (dist < influenceRadius) {
            const force = (influenceRadius - dist) / influenceRadius;
            p.x -= (dx / dist) * force * 0.8;
            p.y -= (dy / dist) * force * 0.8;
          }
        }

        p.x += (p.ox - p.x) * easeFactor;
        p.y += (p.oy - p.y) * easeFactor;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.28;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [quantity, staticity, ease, size, refresh, color, vx, vy]);

  return <canvas ref={canvasRef} className={className} />;
}
