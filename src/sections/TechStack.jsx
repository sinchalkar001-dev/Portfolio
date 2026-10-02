import { useState } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import Marquee from "../components/Marquee";
import RiseWords from "../components/RiseWords";
import { techIcon } from "../components/techIcons";
import { labels, techStack } from "../data/portfolio";
import { usePrefersReducedMotion } from "../lib/hooks";
import { reveal } from "../lib/reveal";

export default function TechStack() {
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const half = Math.ceil(techStack.tools.length / 2);
  const rows = [techStack.tools.slice(0, half), techStack.tools.slice(half)];

  return (
    <section id="stack" tabIndex={-1} className="py-24 focus:outline-none lg:py-28">
      <div className="container-page flex items-end justify-between gap-6">
        <RiseWords text={techStack.heading} className="display text-d2" />
        {!reduced && (
          <div ref={reveal} className="reveal shrink-0" style={{ "--reveal-delay": "150ms" }}>
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
              className="grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              {paused ? <LuPlay className="size-4" aria-hidden="true" /> : <LuPause className="size-4" aria-hidden="true" />}
              <span className="sr-only">{paused ? labels.playMarquee : labels.pauseMarquee}</span>
            </button>
          </div>
        )}
      </div>

      <div ref={reveal} className="reveal mt-10 border-y border-line lg:mt-14">
        {rows.map((tools, row) => (
          <Marquee
            key={row}
            repeat={2}
            duration={64}
            reverse={row === 1}
            paused={paused}
            pauseOnHover
            wrapWhenStill
            className={row === 1 ? "border-t border-line py-6 lg:py-8" : "py-6 lg:py-8"}
          >
            <ul className="flex items-center">
              {tools.map((tool) => {
                const Icon = techIcon(tool);
                return (
                  <li key={tool} className="flex items-center gap-3.5 px-6 lg:px-9">
                    <Icon className="size-7 shrink-0 text-accent lg:size-8" aria-hidden="true" />
                    <span className="display text-d4 whitespace-nowrap">{tool}</span>
                  </li>
                );
              })}
            </ul>
          </Marquee>
        ))}
      </div>
    </section>
  );
}
