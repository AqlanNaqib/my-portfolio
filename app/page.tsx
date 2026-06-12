"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Safari } from "@/components/ui/safari";
import { HyperText } from "@/components/ui/hyper-text";
import DotGrid from "@/components/ui/dot-grid";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import {
  FaPython,
  FaReact,
  FaGitAlt,
  FaDocker,
  FaDatabase,
  FaGithub,
  FaLinkedin,
  FaTrophy,
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
  FaRegComment,
  FaRetweet,
  FaHeart,
  FaChartBar,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiDotnet,
  SiFastapi,
} from "react-icons/si";

const skillIcons = [
  { name: "C++", icon: SiCplusplus },
  { name: "Python", icon: FaPython },
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "PHP", icon: SiPhp },
  { name: "ASP.NET", icon: SiDotnet },
  { name: "FastAPI", icon: SiFastapi },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
  { name: "SQL", icon: FaDatabase },
  { name: "Docker", icon: FaDocker },
  { name: "Git", icon: FaGitAlt },
];

const projects = [
  {
    title: "Retail Odyssey – AI Fashion Assistant",
    stack: "Python, FastAPI, React, TypeScript, Docker, Gemini API",
    description:
      "Built a multi-agent recommendation app with real-time search and personalised fashion suggestions.",
    highlight: "Winner: Best Use of AI Agents on Arm (HackSheffield10)",
    repo: "https://github.com/AqlanNaqib",
    image: "/RetailOdyssey.jpg",
    time: "2h",
    metrics: { replies: "18", reposts: "42", likes: "310", views: "12.4K" },
  },
  {
    title: "UKHSA Data Governance Portal",
    stack: "PostgreSQL, Web Development, Role-Based Access Control",
    description:
      "Built a governance portal prototype for access requests, approvals, expiry controls, and clear audit visibility.",
    highlight: "Presented at UKHSA Townhall + 1st place showcase",
    repo: "https://github.com/AqlanNaqib",
    image: "/UKHSA.jpeg",
    time: "5h",
    metrics: { replies: "9", reposts: "21", likes: "168", views: "7.9K" },
  },
  {
    title: "Hotel Booking Management System",
    stack: "JavaScript, PHP, SQLite, Chart.js",
    description:
      "Developed a full-stack booking platform with CRUD flows and a dashboard for operational insights.",
    highlight: "Reliable relational data model with visual reporting",
    repo: "https://github.com/AqlanNaqib",
    image: "/S-M-Hotel-Management-System.png",
    time: "1d",
    metrics: { replies: "7", reposts: "13", likes: "92", views: "4.6K" },
  },
  {
    title: "Currency Transfer Application",
    stack: "ASP.NET, C#, MySQL, HTML/CSS, JavaScript",
    description:
      "Created a multi-currency transfer system with rate updates, account controls, and anti-fraud checks.",
    highlight: "Security-focused transaction design",
    repo: "https://github.com/AqlanNaqib",
    time: "2d",
    metrics: { replies: "5", reposts: "11", likes: "76", views: "3.8K" },
  },
];

const achievements = [
  "HackSheffield10 Winner — Best Use of AI Agents on Arm",
  "Computer Science & Software Engineering Showcase 2026 — First Place",
  "FRSIS 2022 — Gold Medal (International Symposium)",
  "Selected UKHSA Townhall Presenter",
];

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function Home() {
  return (
    <main id="top" className="portfolio-bg">
      <AnimatedGridPattern
        numSquares={36}
        maxOpacity={0.12}
        duration={5}
        repeatDelay={1.4}
        className="grid-pattern-layer"
      />
      <section className="relative z-10 w-full px-0 pb-8 pt-4 md:pt-6">
        <motion.div {...fadeUp} className="mb-6 px-2 sm:px-4">
          <Safari url="aqlannaqib.dev" className="hero-safari">
            <div className="safari-nav-links">
              <a href="#top" className="nav-chip">
                Home
              </a>
              <a href="#about" className="nav-chip">
                About
              </a>
              <a href="#skills" className="nav-chip">
                Skills
              </a>
              <a href="#projects" className="nav-chip">
                Projects
              </a>
              <a href="#contact" className="nav-chip nav-chip-cta">
                Contact
              </a>
            </div>
          </Safari>
        </motion.div>

        <div className="hero-home-wrap mx-auto w-full max-w-6xl px-4 sm:px-6">
          <DotGrid
            className="dot-grid-home"
            dotSize={8}
            gap={14}
            baseColor="#94a3b8"
            activeColor="#ffffff"
            proximity={280}
            shockRadius={420}
            shockStrength={12}
            resistance={520}
            returnDuration={1.15}
          />
          <div className="grid items-center gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <motion.div {...fadeUp} className="space-y-5">
              <div className="flex flex-col gap-2">
                <p className="badge">Available for Summer Intern 2027</p>
                <p className="badge">Available for Summer Internship 2026</p>
              </div>
              <HyperText as="h1" className="hero-title" duration={900}>
                Aqlan Naqib
              </HyperText>
              <p className="hero-subtitle">
                I enjoy building software that is clean, useful, and focused on solving real problems with good user
                experience.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a href="/cv.pdf" download>
                  <InteractiveHoverButton className="cv-hover-btn">
                    Download CV
                  </InteractiveHoverButton>
                </a>
                <a className="btn-secondary" href="#projects">
                  Explore Projects
                </a>
                <a
                  className="btn-secondary icon-inline"
                  href="https://www.linkedin.com/in/aqlan-naqib/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 text-sm text-white/75">
                <a href="mailto:aqlannaqib2@gmail.com" className="contact-chip">
                  aqlannaqib2@gmail.com
                </a>
                <a href="tel:+447887005253" className="contact-chip">
                  +44 7887005253
                </a>
                <a href="tel:+60167707185" className="contact-chip">
                  +60 167707185
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="glass-card floating-card p-5 sm:p-6"
            >
              <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/aqlan.jpeg"
                  alt="Aqlan Naqib"
                  width={520}
                  height={620}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <p className="mt-4 text-sm uppercase tracking-widest text-cyan-200/80">
                Snapshot
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>• Building full-stack applications with modern frameworks</li>
                <li>• Developing projects with focus on real-world usability</li>
                <li>• Improving collaboration and communication through team work</li>
              </ul>
              <a
                href="https://github.com/AqlanNaqib"
                target="_blank"
                rel="noreferrer"
                className="project-link mt-5 icon-inline"
              >
                <FaGithub />
                GitHub Profile
              </a>
            </motion.aside>
          </div>
        </div>
      </section>

      <motion.section
        {...fadeUp}
        id="about"
        className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6"
      >
        <div className="glass-card about-top-card p-6 md:p-8">
          <h2 className="section-title">About Me</h2>
          <p className="section-copy mt-4">
            I enjoy building software projects that solve real problems while exploring
            areas like AI, cybersecurity, and cloud computing. I focus on learning
            how systems work end-to-end and improving through hands-on development.
          </p>
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        id="skills"
        className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6"
      >
        <h2 className="section-title">Tech Stack</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skillIcons.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                className="skill-card interactive-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.35 }}
                whileHover={{ scale: 1.06, y: -6, rotate: 1.5 }}
              >
                <Icon className="skill-svg" />
                <span className="skill-name">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        id="projects"
        className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6"
      >
        <h2 className="section-title">Projects</h2>
        <div className="tweet-feed mt-5">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              className="tweet-project-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.45 }}
              whileHover={{ y: -3 }}
            >
              <div className="tweet-avatar">AN</div>
              <div className="tweet-main">
                <div className="tweet-head">
                  <h3 className="tweet-name">
                    {project.title}
                    <span className="tweet-verified">✔</span>
                  </h3>
                  <span className="tweet-handle">@aqlannaqib</span>
                  <span className="tweet-dot">·</span>
                  <span className="tweet-time">{project.time}</span>
                </div>

                <p className="tweet-body">{project.description}</p>

                {project.image && (
                  <div className="tweet-media">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      width={960}
                      height={540}
                      className="tweet-media-img"
                    />
                  </div>
                )}

                <div className="tweet-tags">
                  {project.stack.split(", ").map((tag) => (
                    <span key={`${project.title}-${tag}`} className="tweet-tag">
                      #{tag.replace(".", "").replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>

                <p className="tweet-highlight">{project.highlight}</p>

                <div className="tweet-actions">
                  <span className="tweet-action">
                    <FaRegComment />
                    <span>{project.metrics.replies}</span>
                  </span>
                  <span className="tweet-action">
                    <FaRetweet />
                    <span>{project.metrics.reposts}</span>
                  </span>
                  <span className="tweet-action">
                    <FaHeart />
                    <span>{project.metrics.likes}</span>
                  </span>
                  <span className="tweet-action">
                    <FaChartBar />
                    <span>{project.metrics.views}</span>
                  </span>
                </div>

                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link icon-inline"
                >
                  <FaGithub />
                  View Repository
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6"
      >
        <h2 className="section-title">Achievements</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {achievements.map((item, idx) => (
            <motion.div
              key={item}
              className="achievement-card"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              whileHover={{ y: -6 }}
            >
              <div className="achievement-icon">
                <FaTrophy />
              </div>
              <p className="achievement-text">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        id="contact"
        className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6"
      >
        <div className="contact-spotlight">
          <div className="contact-spotlight-inner">
            <h2 className="section-title">Contact Me</h2>
            <p className="section-copy mt-3">
              Open to internship opportunities and software roles.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <a href="mailto:aqlannaqib2@gmail.com" className="contact-tile">
                <FaEnvelope />
                <span>Email</span>
              </a>
              <a href="tel:+447887005253" className="contact-tile">
                <FaPhoneAlt />
                <span>+44 7887005253</span>
              </a>
              <a href="tel:+60167707185" className="contact-tile">
                <FaPhoneAlt />
                <span>+60 167707185</span>
              </a>
              <a
                href="https://www.linkedin.com/in/aqlan-naqib/"
                target="_blank"
                rel="noreferrer"
                className="contact-tile"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/AqlanNaqib"
                target="_blank"
                rel="noreferrer"
                className="contact-tile"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a href="/cv.pdf" download className="contact-tile cv-contact-tile">
                <InteractiveHoverButton className="cv-hover-btn cv-hover-btn--small">
                  <span className="icon-inline">
                    <FaPaperPlane />
                    Download CV
                  </span>
                </InteractiveHoverButton>
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
