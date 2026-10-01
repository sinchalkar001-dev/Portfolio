import { site } from "../data/portfolio";
import { useDocumentTitle } from "../lib/hooks";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Experience from "../sections/Experience";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import TechStack from "../sections/TechStack";

export default function Home() {
  useDocumentTitle(site.title);
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <TechStack />
      <Contact />
    </>
  );
}
