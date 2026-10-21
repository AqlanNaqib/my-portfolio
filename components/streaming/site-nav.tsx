"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaRedoAlt } from "react-icons/fa";
import { links } from "@/lib/portfolio-data";

const navItems = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
];

export function SiteNav({ onReplayIntro }: { onReplayIntro: () => void }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-nav" data-solid={solid ? "" : undefined}>
      <div className="site-nav-inner">
        <a href="#top" className="site-brand" aria-label="Aqlan Naqib, back to top">
          AQLAN<span>NAQIB</span>
        </a>
        <nav aria-label="Sections" className="site-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="site-link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="site-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onReplayIntro}
            aria-label="Replay intro"
            title="Replay intro"
          >
            <FaRedoAlt aria-hidden />
          </button>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <FaGithub aria-hidden />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <FaLinkedin aria-hidden />
          </a>
          <a href="#contact" className="nav-cta">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
