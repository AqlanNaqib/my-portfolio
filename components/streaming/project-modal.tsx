"use client";

import { useEffect, useRef } from "react";
import { FaGithub, FaTimes } from "react-icons/fa";
import { splitTitle, type Project } from "@/lib/portfolio-data";
import { ProjectArt } from "./project-card";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

/** Native <dialog>: gives focus trapping, Escape-to-close and focus return for free. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const [name, subtitle] = project ? splitTitle(project.title) : ["", undefined];

  return (
    <dialog
      ref={ref}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="project-modal-body">
          <div className="project-modal-hero">
            <ProjectArt project={project} sizes="(max-width: 860px) 100vw, 860px" />
            <div className="project-modal-hero-shade" aria-hidden />
            <div className="project-modal-hero-text">
              {project.badge && <span className="title-card-badge static">{project.badge}</span>}
              <h2 id="project-modal-title" className="project-modal-title">
                {name}
              </h2>
              {subtitle && <p className="project-modal-sub">{subtitle}</p>}
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="btn-play mt-4"
              >
                <FaGithub aria-hidden />
                View Repository
              </a>
            </div>
            <button
              type="button"
              className="project-modal-close"
              onClick={onClose}
              aria-label="Close project details"
              autoFocus
            >
              <FaTimes aria-hidden />
            </button>
          </div>

          <div className="project-modal-content">
            <div>
              <p className="project-modal-highlight">{project.highlight}</p>
              <p className="project-modal-desc">{project.description}</p>
            </div>
            <dl className="project-modal-facts">
              <dt>Tech stack</dt>
              <dd>
                <ul className="chip-list">
                  {project.stack.split(", ").map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </div>
        </div>
      )}
    </dialog>
  );
}
