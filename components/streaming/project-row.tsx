"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Project } from "@/lib/portfolio-data";
import { ProjectCard } from "./project-card";

type ProjectRowProps = {
  title: string;
  projects: Project[];
  onOpen: (project: Project) => void;
  priority?: boolean;
};

export function ProjectRow({ title, projects, onOpen, priority }: ProjectRowProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const headingId = useId();
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const frame = requestAnimationFrame(measure);
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="content-row" aria-labelledby={headingId}>
      <h3 id={headingId} className="row-title">
        {title}
        <span className="row-count">{projects.length}</span>
      </h3>
      <div className="row-viewport">
        <button
          type="button"
          className="row-arrow row-arrow--prev"
          onClick={() => page(-1)}
          disabled={edges.start}
          aria-label={`Scroll ${title} left`}
          tabIndex={-1}
        >
          <FaChevronLeft aria-hidden />
        </button>
        <ul ref={trackRef} className="row-track">
          {projects.map((project, i) => (
            <li key={project.title} className="row-item">
              <ProjectCard project={project} onOpen={onOpen} priority={priority && i < 3} />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="row-arrow row-arrow--next"
          onClick={() => page(1)}
          disabled={edges.end}
          aria-label={`Scroll ${title} right`}
          tabIndex={-1}
        >
          <FaChevronRight aria-hidden />
        </button>
      </div>
    </section>
  );
}
