import { ArrowUpRight } from "lucide-react";
import { featured, projects } from "../data";
import { AccuracyEvidence, QueryEvidence, RaceEvidence } from "./Evidence";
import { GitHubIcon } from "./icons";
import SyncSpaceDiagram from "./SyncSpaceDiagram";
import { ButtonLink, Container, SectionHeader } from "./ui";

const EVIDENCE = { query: QueryEvidence, race: RaceEvidence, accuracy: AccuracyEvidence };

export default function Work() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <Container>
        <SectionHeader title="Selected work">Four projects, each shown with the result that proves it works.</SectionHeader>
        <Featured />
        <div className="mt-8">
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Featured() {
  return (
    <article
      id={featured.id}
      aria-labelledby={`${featured.id}-title`}
      className="mt-12 grid grid-cols-1 gap-10 rounded-[20px] border border-line bg-surface p-5 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12"
    >
      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[12px] text-accent">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            live
          </span>
          <span className="text-[14px] text-muted">{featured.context}</span>
        </div>

        <h3 id={`${featured.id}-title`} className="mt-6 text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-semibold tracking-[-0.03em]">
          {featured.name}
        </h3>
        <p className="mt-3 text-lg text-muted">{featured.tagline}</p>
        <p className="mt-6 leading-relaxed">{featured.summary}</p>

        <Points items={featured.points} />
        <p className="mt-8 text-[14px] leading-relaxed text-faint">{featured.stack.join(", ")}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={featured.live} target="_blank" rel="noopener">
            Open live app
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink variant="secondary" href={featured.repo} target="_blank" rel="noopener">
            <GitHubIcon className="size-4" />
            Source code
          </ButtonLink>
        </div>
      </div>

      <SyncSpaceDiagram />
    </article>
  );
}

function Points({ items }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((point) => (
        <li key={point} className="relative pl-6 leading-relaxed text-muted">
          <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-3 bg-faint" />
          {point}
        </li>
      ))}
    </ul>
  );
}

function Project({ project }) {
  const Evidence = EVIDENCE[project.evidence];
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="grid grid-cols-1 gap-10 border-t border-line py-14 first:border-t-0 lg:grid-cols-2 lg:gap-16 lg:py-20"
    >
      <div>
        <h3 id={`${project.id}-title`} className="text-[clamp(1.75rem,3vw,2.4rem)] leading-tight font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-2 text-lg text-muted">{project.tagline}</p>
        <Points items={project.points} />
        <p className="mt-6 text-[14px] leading-relaxed text-faint">{project.stack.join(", ")}</p>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener"
            className="group mt-4 inline-flex h-11 items-center gap-2 text-[15px] text-fg"
          >
            <GitHubIcon className="size-4" />
            <span className="underline decoration-line-strong underline-offset-4 transition-colors duration-200 group-hover:text-peer group-hover:decoration-peer">
              Source code
            </span>
          </a>
        )}
      </div>
      <div className="lg:pt-1">
        <Evidence />
      </div>
    </article>
  );
}
