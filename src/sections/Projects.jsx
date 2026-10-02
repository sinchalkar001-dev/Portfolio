import { FaGithub } from "react-icons/fa6";
import { LuArrowUpRight, LuCheck } from "react-icons/lu";
import Proof from "../components/proofs";
import RiseWords from "../components/RiseWords";
import { Button } from "../components/ui";
import { labels, projects } from "../data/portfolio";
import { cx } from "../lib/hooks";
import { reveal } from "../lib/reveal";

export default function Projects() {
  return (
    <section id="projects" tabIndex={-1} className="py-24 focus:outline-none lg:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <RiseWords text={projects.heading} className="display text-d2" />
          <p ref={reveal} className="reveal max-w-[30ch] text-lg text-muted" style={{ "--reveal-delay": "150ms" }}>
            {projects.intro}
          </p>
        </div>

        <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
          {projects.items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const { slug, title, tagline, tags, featured, status, result, summary, links = {}, cover, proof } = project;
  const titleId = `project-${slug}`;

  return (
    <article
      ref={reveal}
      aria-labelledby={titleId}
      className={cx(
        "reveal grid overflow-hidden rounded-card bg-raised lg:grid-cols-2",
        featured && "lg:grid-cols-[minmax(0,7fr)_minmax(0,6fr)]",
      )}
    >
      {/* The picture keeps its own shape and sits centred in a dark panel, so no part of a screenshot is cropped. */}
      <div className="p-3 sm:p-4">
        <div className={cx("flex h-full items-center overflow-hidden rounded-panel bg-ink", !cover && "p-5 sm:p-8")}>
          {cover ? (
            <img
              src={cover.src}
              width={cover.width}
              height={cover.height}
              alt={cover.alt}
              loading="lazy"
              decoding="async"
              data-reveal-zoom
              className="h-auto w-full"
            />
          ) : (
            <div className="w-full">
              <Proof proof={proof} />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-9 lg:p-12">
        <div className="flex flex-wrap items-center gap-2">
          {status && (
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-tiny leading-none font-bold text-ink">
              <span className="size-1.5 rounded-full bg-ink" aria-hidden="true" />
              {status}
            </span>
          )}
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line-strong px-3 py-1.5 text-tiny leading-none font-medium text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <RiseWords as="h3" id={titleId} text={title} className={cx("display mt-7", featured ? "text-d1" : "text-d3")} />
        <p className="mt-3 text-lg text-muted">{tagline}</p>
        <p className="mt-5 max-w-[60ch]">{summary}</p>

        <p className="mt-6 flex gap-3 border-t border-line pt-6 font-semibold">
          <LuCheck className="mt-[0.2em] size-[1.15em] shrink-0 text-accent" aria-hidden="true" />
          {result}
        </p>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <Button to={`/projects/${slug}`}>
            {labels.caseStudy}
            <span className="sr-only">: {title}</span>
          </Button>
          {links.live && (
            <Button variant="ghost" href={links.live} external>
              {labels.liveDemo}
              <LuArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">: {title}</span>
            </Button>
          )}
          {links.github && (
            <Button variant="ghost" href={links.github} external>
              <FaGithub className="size-4" aria-hidden="true" />
              {labels.github}
              <span className="sr-only">: {title}</span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
