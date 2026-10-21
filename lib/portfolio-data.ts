import type { IconType } from "react-icons";
import {
  FaPython,
  FaReact,
  FaGitAlt,
  FaDocker,
  FaDatabase,
  FaBrain,
  FaShieldAlt,
  FaHandHoldingMedical,
  FaTshirt,
  FaUserShield,
  FaHotel,
  FaExchangeAlt,
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

export const links = {
  github: "https://github.com/AqlanNaqib",
  linkedin: "https://www.linkedin.com/in/aqlan-naqib/",
  email: "mailto:aqlannaqib2@gmail.com",
  emailLabel: "aqlannaqib2@gmail.com",
  phoneUk: { href: "tel:+447887005253", label: "+44 7887005253" },
  phoneMy: { href: "tel:+60167707185", label: "+60 167707185" },
};

export const skillIcons = [
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

export type RowId = "awards" | "ai" | "fullstack";

export type Project = {
  title: string;
  stack: string;
  description: string;
  highlight: string;
  repo: string;
  image?: string;
  time: string;
  metrics?: { replies: string; reposts: string; likes: string; views: string };
  /** Short label shown on the card, e.g. an award. */
  badge?: string;
  /** Artwork used when the project has no screenshot. */
  poster: { icon: IconType; accent: string };
  rows: RowId[];
};

export const projects: Project[] = [
  {
    title: "Nexora – AI Enterprise Intelligence Platform",
    stack: "Next.js, TypeScript, Python, Supabase, Docker",
    description:
      "Building an AI-powered platform that helps organisations securely analyse, organise, and search large collections of documents.",
    highlight: "In active development",
    repo: "https://github.com/AqlanNaqib/Nexora",
    time: "1h",
    badge: "In development",
    poster: { icon: FaBrain, accent: "#8b5cf6" },
    rows: ["ai"],
  },
  {
    title: "Sentry – AI Security Review for Pull Requests",
    stack: "TypeScript, Node.js, GitHub Actions, OpenAI API",
    description:
      "Built a GitHub Action and CLI that reviews pull request diffs for exploitable vulnerabilities like SQL injection, SSRF, and hardcoded secrets, then explains the fix right in the PR.",
    highlight: "Catches issues pattern-based linters miss and can gate CI on critical findings",
    repo: "https://github.com/AqlanNaqib/Sentry",
    time: "3h",
    poster: { icon: FaShieldAlt, accent: "#e5243b" },
    rows: ["ai"],
  },
  {
    title: "Lilly CodeForAll – Carer Medication Alert System",
    stack: "React Native, Expo, FastAPI, Python",
    description:
      "Built a carer alert app for an accessibility hackathon so a carer never misses the moment a loved one with vision, mobility, and cognitive needs needs help with medication. Alerts land through flash, sound, vibration, and a spoken message at once.",
    highlight: "Top 3 Finalist: Lilly CodeForAll Hackathon (Innovate for Accessibility)",
    repo: "https://github.com/AqlanNaqib",
    time: "5h",
    badge: "Top 3 Finalist",
    poster: { icon: FaHandHoldingMedical, accent: "#f59e0b" },
    rows: ["awards"],
  },
  {
    title: "Retail Odyssey – AI Fashion Assistant",
    stack: "Python, FastAPI, React, TypeScript, Docker, Gemini API",
    description:
      "Built a multi-agent recommendation app with real-time search and personalised fashion suggestions.",
    highlight: "Winner: Best Use of AI Agents on Arm (HackSheffield10)",
    repo: "https://github.com/AqlanNaqib/Retail-Odyssey",
    image: "/RetailOdyssey.jpg",
    time: "1w",
    metrics: { replies: "18", reposts: "42", likes: "310", views: "12.4K" },
    badge: "Winner",
    poster: { icon: FaTshirt, accent: "#ec4899" },
    rows: ["awards", "ai"],
  },
  {
    title: "UKHSA Data Governance Portal",
    stack: "PostgreSQL, Web Development, Role-Based Access Control",
    description:
      "Built a governance portal prototype for access requests, approvals, expiry controls, and clear audit visibility.",
    highlight: "Presented at UKHSA Townhall + 1st place showcase",
    repo: "https://github.com/AqlanNaqib",
    image: "/UKHSA.jpeg",
    time: "2w",
    metrics: { replies: "9", reposts: "21", likes: "168", views: "7.9K" },
    badge: "1st Place",
    poster: { icon: FaUserShield, accent: "#14b8a6" },
    rows: ["awards", "fullstack"],
  },
  {
    title: "Hotel Booking Management System",
    stack: "JavaScript, PHP, SQLite, Chart.js",
    description:
      "Developed a full-stack booking platform with CRUD flows and a dashboard for operational insights.",
    highlight: "Reliable relational data model with visual reporting",
    repo: "https://github.com/AqlanNaqib/S-M-Hotel-Management-System",
    image: "/S-M-Hotel-Management-System.png",
    time: "1mo",
    metrics: { replies: "7", reposts: "13", likes: "92", views: "4.6K" },
    poster: { icon: FaHotel, accent: "#3b82f6" },
    rows: ["fullstack"],
  },
  {
    title: "Currency Transfer Application",
    stack: "ASP.NET, C#, MySQL, HTML/CSS, JavaScript",
    description:
      "Created a multi-currency transfer system with rate updates, account controls, and anti-fraud checks.",
    highlight: "Security-focused transaction design",
    repo: "https://github.com/AqlanNaqib/Currency-Transfer-Application",
    time: "2mo",
    metrics: { replies: "5", reposts: "11", likes: "76", views: "3.8K" },
    poster: { icon: FaExchangeAlt, accent: "#0ea5e9" },
    rows: ["fullstack"],
  },
];

export const projectRows: { id: RowId | "all"; title: string }[] = [
  { id: "all", title: "Featured Projects" },
  { id: "awards", title: "Award Winners" },
  { id: "ai", title: "AI & Security" },
  { id: "fullstack", title: "Full-Stack Systems" },
];

export function projectsForRow(id: RowId | "all") {
  return id === "all" ? projects : projects.filter((p) => p.rows.includes(id));
}

/** "Nexora – AI Enterprise Intelligence Platform" -> ["Nexora", "AI Enterprise Intelligence Platform"] */
export function splitTitle(title: string): [string, string | undefined] {
  const [name, ...rest] = title.split(" – ");
  return [name, rest.length ? rest.join(" – ") : undefined];
}

export const achievements = [
  "Lilly CodeForAll Hackathon — Top 3 Finalist",
  "HackSheffield10 Winner — Best Use of AI Agents on Arm",
  "Computer Science & Software Engineering Showcase 2026 — First Place",
  "FRSIS 2022 — Gold Medal (International Symposium)",
  "Selected UKHSA Townhall Presenter",
];

export const snapshot = [
  "Building full-stack applications with modern frameworks",
  "Developing projects with focus on real-world usability",
  "Improving collaboration and communication through team work",
];
