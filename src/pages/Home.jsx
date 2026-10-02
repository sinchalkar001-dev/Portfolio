import { startTransition, useEffect, useState } from "react";
import { site } from "../data/portfolio";
import { usePageMeta } from "../lib/hooks";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Experience from "../sections/Experience";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import TechStack from "../sections/TechStack";

// On the first load the hero is rendered on its own, and everything below the fold follows in a
// low-priority pass right after. That keeps the first render short, so the page responds sooner.
// Later visits to this page (coming back from a case study) render everything at once.
let renderedBefore = false;

export default function Home() {
  usePageMeta(site.title);
  const [complete, setComplete] = useState(renderedBefore);

  useEffect(() => {
    renderedBefore = true;
    if (!complete) startTransition(() => setComplete(true));
  }, [complete]);

  return (
    <>
      <Hero />
      {complete ? (
        <>
          <About />
          <Experience />
          <Skills />
          <Projects />
          <TechStack />
          <Contact />
        </>
      ) : (
        // Holds the page open so the footer does not sit under the hero for a frame.
        <div aria-hidden="true" className="min-h-[300vh]" />
      )}
    </>
  );
}
