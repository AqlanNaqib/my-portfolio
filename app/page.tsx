"use client";

import Image from "next/image";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { motion, MotionConfig } from "framer-motion";
import { HyperText } from "@/components/ui/hyper-text";
import DotGrid from "@/components/ui/dot-grid";
import { CinematicIntro, INTRO_SEEN_KEY } from "@/components/intro/cinematic-intro";
import { SiteNav } from "@/components/streaming/site-nav";
import { ProjectRow } from "@/components/streaming/project-row";
import { ProjectModal } from "@/components/streaming/project-modal";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaPlay,
  FaRedoAlt,
} from "react-icons/fa";
import {
  achievements,
  links,
  projectRows,
  projectsForRow,
  skillIcons,
  snapshot,
  type Project,
} from "@/lib/portfolio-data";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

// Whether the intro was already watched this browser session (read once, client only).
const noopSubscribe = () => () => {};
function readIntroSeen() {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

type IntroState = { open: boolean; mode: "gate" | "playing"; run: number };

export default function Home() {
  const seenAtLoad = useSyncExternalStore(noopSubscribe, readIntroSeen, () => false);
  const [intro, setIntro] = useState<IntroState | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  // First visit: show the gate. Returning in the same session: go straight to the page.
  const current: IntroState = intro ?? { open: !seenAtLoad, mode: "gate", run: 0 };
  const isRevealed = revealed || (!intro && seenAtLoad);

  const handleReveal = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setRevealed(true);
  }, []);

  const handleClose = useCallback(() => {
    setIntro((prev) => ({ ...(prev ?? { mode: "gate", run: 0 }), open: false }));
    setRevealed(true);
    // Hand keyboard focus to the page so it doesn't get lost on <body>.
    requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  }, []);

  const replayIntro = useCallback(() => {
    setRevealed(false);
    setIntro((prev) => ({ open: true, mode: "playing", run: (prev?.run ?? 0) + 1 }));
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {current.open && (
        <CinematicIntro
          key={current.run}
          initialPhase={current.mode}
          isInitial={current.run === 0}
          onReveal={handleReveal}
          onClose={handleClose}
        />
      )}

      <div className="contents" inert={current.open && !revealed}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteNav onReplayIntro={replayIntro} />
      </div>

      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="portfolio-bg"
        data-revealed={isRevealed ? "" : undefined}
        inert={current.open && !revealed}
      >
        {/* ---------- Billboard hero ---------- */}
        <section id="top" className="billboard" aria-label="Introduction">
          <div className="billboard-media" aria-hidden>
            <Image
              src="/aqlan.jpeg"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="billboard-img"
            />
          </div>
          <div className="billboard-shade" aria-hidden />
          <DotGrid
            className="dot-grid-home"
            dotSize={3}
            gap={22}
            baseColor="#3a3a3a"
            activeColor="#e5243b"
            proximity={160}
            shockRadius={260}
            shockStrength={6}
            resistance={620}
            returnDuration={1.2}
          />

          <div className="billboard-content">
            <p className="billboard-kicker reveal" style={{ "--d": 0 } as React.CSSProperties}>
              <span className="kicker-bar" aria-hidden />
              Software Engineer · Portfolio
            </p>

            <HyperText as="h1" className="hero-title reveal" duration={900}>
              Aqlan Naqib
            </HyperText>

            <div className="billboard-meta reveal" style={{ "--d": 2 } as React.CSSProperties}>
              <span className="badge badge-live">
                <span className="live-dot" aria-hidden />
                Looking for Placement 2027
              </span>
              <span className="badge">Available for Summer Intern 2027</span>
            </div>

            <p className="hero-subtitle reveal" style={{ "--d": 3 } as React.CSSProperties}>
              I enjoy building software that is clean, useful, and focused on solving real problems with good user
              experience.
            </p>

            <div className="billboard-actions reveal" style={{ "--d": 4 } as React.CSSProperties}>
              <a className="btn-play" href="#projects">
                <FaPlay aria-hidden />
                Explore Projects
              </a>
              <a className="btn-more" href={links.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin aria-hidden />
                LinkedIn
              </a>
              <a className="btn-more" href={links.github} target="_blank" rel="noreferrer">
                <FaGithub aria-hidden />
                GitHub
              </a>
            </div>

            <div className="billboard-contacts reveal" style={{ "--d": 5 } as React.CSSProperties}>
              <a href={links.email} className="contact-chip">
                {links.emailLabel}
              </a>
              <a href={links.phoneUk.href} className="contact-chip">
                {links.phoneUk.label}
              </a>
              <a href={links.phoneMy.href} className="contact-chip">
                {links.phoneMy.label}
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Project rows ---------- */}
        <section id="projects" className="rows" aria-labelledby="projects-title">
          <h2 id="projects-title" className="sr-only">
            Projects
          </h2>
          {projectRows.map((row, i) => (
            <ProjectRow
              key={row.id}
              title={row.title}
              projects={projectsForRow(row.id)}
              onOpen={setActiveProject}
              priority={i === 0}
            />
          ))}
        </section>

        {/* ---------- About ---------- */}
        <motion.section {...fadeUp} id="about" className="section-wrap">
          <div className="about-grid">
            <div className="panel">
              <h2 className="section-title">About Me</h2>
              <p className="section-copy mt-4">
                I enjoy building software projects that solve real problems while exploring
                areas like AI, cybersecurity, and cloud computing. I focus on learning
                how systems work end-to-end and improving through hands-on development.
              </p>
            </div>
            <div className="panel">
              <p className="panel-kicker">Snapshot</p>
              <ul className="snapshot-list">
                {snapshot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={links.github} target="_blank" rel="noreferrer" className="project-link icon-inline">
                <FaGithub aria-hidden />
                GitHub Profile
              </a>
            </div>
          </div>
        </motion.section>

        {/* ---------- Skills ---------- */}
        <motion.section {...fadeUp} id="skills" className="section-wrap">
          <h2 className="section-title">Tech Stack</h2>
          <ul className="skills-grid">
            {skillIcons.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.li
                  key={skill.name}
                  className="skill-card"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03, duration: 0.35 }}
                >
                  <Icon className="skill-svg" aria-hidden />
                  <span className="skill-name">{skill.name}</span>
                </motion.li>
              );
            })}
          </ul>
        </motion.section>

        {/* ---------- Achievements (Top 5 style) ---------- */}
        <motion.section {...fadeUp} id="achievements" className="section-wrap">
          <h2 className="section-title">Achievements</h2>
          <ol className="top-list">
            {achievements.map((item, idx) => (
              <motion.li
                key={item}
                className="top-item"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                <span className="top-rank" aria-hidden>
                  {idx + 1}
                </span>
                <p className="top-text">{item}</p>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        {/* ---------- Contact ---------- */}
        <motion.section {...fadeUp} id="contact" className="section-wrap pb-20">
          <div className="contact-spotlight">
            <span className="badge badge-live">
              <span className="live-dot" aria-hidden />
              Looking for Placement 2027
            </span>
            <h2 className="section-title mt-4">Contact Me</h2>
            <p className="section-copy mt-3">
              Open to placement and internship opportunities in software engineering.
            </p>
            <div className="contact-grid">
              <a href={links.email} className="contact-tile">
                <FaEnvelope aria-hidden />
                <span>Email</span>
              </a>
              <a href={links.phoneUk.href} className="contact-tile">
                <FaPhoneAlt aria-hidden />
                <span>{links.phoneUk.label}</span>
              </a>
              <a href={links.phoneMy.href} className="contact-tile">
                <FaPhoneAlt aria-hidden />
                <span>{links.phoneMy.label}</span>
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="contact-tile">
                <FaLinkedin aria-hidden />
                <span>LinkedIn</span>
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" className="contact-tile">
                <FaGithub aria-hidden />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </motion.section>

        <footer className="site-footer">
          <p>Designed and built by Aqlan Naqib with Next.js. Intro sound is synthesised live in your browser.</p>
          <button type="button" className="footer-replay" onClick={replayIntro}>
            <FaRedoAlt aria-hidden /> Replay intro
          </button>
        </footer>
      </main>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </MotionConfig>
  );
}
