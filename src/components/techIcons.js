import { FaAws, FaJava } from "react-icons/fa6";
import { LuCircleDot, LuDrama, LuGitMerge } from "react-icons/lu";
import {
  SiDocker,
  SiExpress,
  SiFlask,
  SiGithubactions,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiPython,
  SiReact,
  SiRender,
  SiScikitlearn,
  SiSocketdotio,
  SiVercel,
  SiVite,
  SiVitest,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

// Icons for the names listed under `techStack.tools` in portfolio.js.
// Yjs and Playwright have no brand icon in react-icons, so they borrow a fitting generic one.
const ICONS = {
  Java: FaJava,
  JavaScript: SiJavascript,
  Python: SiPython,
  SQL: TbSql,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Vite: SiVite,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "Socket.io": SiSocketdotio,
  Yjs: LuGitMerge,
  MongoDB: SiMongodb,
  Flask: SiFlask,
  Vitest: SiVitest,
  Playwright: LuDrama,
  Postman: SiPostman,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  Vercel: SiVercel,
  Render: SiRender,
  AWS: FaAws,
  "scikit-learn": SiScikitlearn,
};

export const techIcon = (name) => ICONS[name] ?? LuCircleDot;
