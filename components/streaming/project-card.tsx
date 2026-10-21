"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { FaGithub, FaChevronDown } from "react-icons/fa";
import { splitTitle, type Project } from "@/lib/portfolio-data";

type ProjectArtProps = { project: Project; sizes: string; priority?: boolean };

/** Screenshot if the project has one, otherwise generated poster art. */
export function ProjectArt({ project, sizes, priority }: ProjectArtProps) {
  const Icon = project.poster.icon;
  return (
    <div className="project-art" style={{ "--accent": project.poster.accent } as CSSProperties}>
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes={sizes}
          className="project-art-img"
          priority={priority}
        />
      ) : (
        <div className="project-art-poster" aria-hidden>
          <Icon className="project-art-icon" />
        </div>
      )}
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  priority?: boolean;
};

export function ProjectCard({ project, onOpen, priority }: ProjectCardProps) {
  const [name, subtitle] = splitTitle(project.title);
  const stack = project.stack.split(", ");

  return (
    <article className="title-card">
      <div className="title-card-frame">
        <ProjectArt
          project={project}
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 360px"
          priority={priority}
        />
        <div className="title-card-shade" aria-hidden />
        {project.badge && <span className="title-card-badge">{project.badge}</span>}
        <div className="title-card-name" aria-hidden>
          <span className="title-card-name-main">{name}</span>
        </div>

        {/* Whole-card button; sits under the repo link so both stay clickable. */}
        <button
          type="button"
          className="title-card-hit"
          onClick={() => onOpen(project)}
          aria-label={`${project.title}. Open project details`}
        />

        {/* Hover / focus preview (desktop). Touch users tap the card to open details. */}
        <div className="title-card-preview">
          <p className="title-card-desc">{project.description}</p>
          <ul className="title-card-stack" aria-label="Tech stack">
            {stack.slice(0, 4).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="title-card-actions">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="round-btn"
              aria-label={`View ${name} repository on GitHub`}
              title="View Repository"
            >
              <FaGithub aria-hidden />
            </a>
            <span className="round-btn round-btn--ghost" aria-hidden title="More info">
              <FaChevronDown />
            </span>
          </div>
        </div>

      </div>
      <div className="title-card-meta">
        <h3 className="title-card-title">{name}</h3>
        {subtitle && <p className="title-card-sub">{subtitle}</p>}
      </div>
    </article>
  );
}
