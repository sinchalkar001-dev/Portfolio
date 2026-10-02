import { useState } from "react";
import { Link, useParams } from "react-router";
import { FaGithub } from "react-icons/fa6";
import { LuArrowDown, LuArrowLeft, LuArrowRight, LuArrowUpRight, LuCheck, LuPlus } from "react-icons/lu";
import Lightbox from "../components/Lightbox";
import Proof from "../components/proofs";
import RiseWords from "../components/RiseWords";
import { Button, SectionLink } from "../components/ui";
import { caseStudy, labels, projectBySlug, projects, site } from "../data/portfolio";
import { cx, usePageMeta } from "../lib/hooks";
import { reveal } from "../lib/reveal";
import NotFound from "./NotFound";

// How long a block waits before it comes in, so the blocks of the page header arrive as a short sequence.
const delay = (ms) => ({ "--reveal-delay": `${ms}ms` });

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  return project ? <CaseStudyPage key={project.slug} project={project} /> : <NotFound />;
}

function CaseStudyPage({ project }) {
  const { title, tagline, tags, status, result, links = {}, cover, proof, architecture, screenshots = [] } = project;
  const [openImage, setOpenImage] = useState(null);
  usePageMeta(`${title}: ${tagline} | ${site.name}`);

  // Every picture of the project, cover first, each one once. The first is shown large under the header.
  const images = [cover, ...screenshots].filter(
    (image, i, all) => image && all.findIndex((other) => other?.src === image.src) === i,
  );

  const index = projects.items.indexOf(project);
  const next = projects.items[(index + 1) % projects.items.length];

  return (
    <article className="pt-[calc(var(--header-h)+1.5rem)] lg:pt-[calc(var(--header-h)+3rem)]">
      <div className="container-page">
        <BackLink />

        <header className="mt-8 lg:mt-12">
          <div ref={reveal} className="reveal flex flex-wrap items-center gap-2">
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

          <RiseWords
            as="h1"
            text={title}
            className="display mt-7 text-[clamp(3rem,10.5vw,9.5rem)] leading-[0.88]"
            style={delay(80)}
          />
          <p ref={reveal} className="reveal mt-5 text-xl text-muted lg:text-2xl" style={delay(220)}>
            {tagline}
          </p>

          <p ref={reveal} className="reveal mt-8 flex max-w-[60ch] gap-3 text-lg font-semibold" style={delay(300)}>
            <LuCheck className="mt-[0.2em] size-[1.15em] shrink-0 text-accent" aria-hidden="true" />
            {result}
          </p>

          {(links.live || links.github) && (
            <div ref={reveal} className="reveal mt-8 flex flex-wrap gap-3" style={delay(380)}>
              {links.live && (
                <Button href={links.live} external>
                  {labels.liveDemo}
                  <LuArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
              )}
              {links.github && (
                <Button variant="ghost" href={links.github} external>
                  <FaGithub className="size-4" aria-hidden="true" />
                  {labels.github}
                </Button>
              )}
            </div>
          )}
        </header>

        {images.length > 0 && (
          <Screenshot
            image={images[0]}
            eager
            onOpen={() => setOpenImage(0)}
            className="mt-12 lg:mt-16"
            frameClassName="rounded-card"
            style={delay(260)}
          />
        )}

        <div className="mt-14 border-t border-line lg:mt-20">
          <Block title={caseStudy.overview}>
            <p className="max-w-[68ch] text-lg">{project.overview}</p>
          </Block>

          <Block title={caseStudy.built}>
            <p className="max-w-[68ch] text-lg">{project.built}</p>
          </Block>

          {proof && (
            <Block title={caseStudy.result}>
              <div className="max-w-3xl rounded-card bg-raised p-6 sm:p-9">
                <Proof proof={proof} />
              </div>
            </Block>
          )}

          <Block title={caseStudy.features}>
            <ul className="max-w-[72ch] space-y-5">
              {project.features.map((feature) => (
                <li key={feature} ref={reveal} className="reveal flex gap-4 text-lg">
                  <LuPlus className="mt-[0.25em] size-[1.1em] shrink-0 text-accent" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </Block>

          <Block title={caseStudy.architecture} wide>
            <ol
              className="grid gap-y-0 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-x-10"
              style={{ "--steps": architecture.steps.length }}
            >
              {architecture.steps.map((step, i) => (
                // Side by side on wide screens, where the steps come in one after another.
                <li
                  key={step.title}
                  ref={reveal}
                  className="reveal relative lg:[--reveal-delay:calc(var(--i)*110ms)]"
                  style={{ "--i": i }}
                >
                  <div className="rounded-2xl bg-raised p-5 lg:h-full lg:p-6">
                    <p className="display text-d4 text-muted tabular-nums" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 text-lg leading-snug font-semibold">{step.title}</h3>
                    {step.detail && <p className="mt-2 text-small leading-normal text-muted">{step.detail}</p>}
                  </div>
                  {i < architecture.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="grid place-items-center py-2 text-accent lg:absolute lg:top-1/2 lg:left-full lg:w-10 lg:-translate-y-1/2 lg:py-0"
                    >
                      <LuArrowDown className="size-5 lg:hidden" />
                      <LuArrowRight className="hidden size-5 lg:block" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
            {architecture.note && (
              <p ref={reveal} className="reveal mt-6 text-muted">
                {architecture.note}
              </p>
            )}
          </Block>

          <Block title={caseStudy.decisions}>
            <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {project.decisions.map((decision, i) => (
                <div
                  key={decision.title}
                  ref={reveal}
                  className="reveal border-t border-line pt-6 sm:[--reveal-delay:calc(var(--i)*110ms)]"
                  style={{ "--i": i % 2 }}
                >
                  <dt className="display text-d4">{decision.title}</dt>
                  <dd className="mt-3 max-w-[48ch] text-muted">{decision.detail}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title={caseStudy.stack}>
            <ul className="flex flex-wrap gap-2.5">
              {project.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-line-strong px-4 py-2.5 text-small leading-none font-medium"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Block>

          {images.length > 1 && (
            <Block title={caseStudy.screenshots} wide>
              {/* Two to a row at most: these are pictures of dense screens, and smaller than this they stop being readable. */}
              <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
                {images.slice(1).map((image, i) => (
                  // The second picture of a row comes in just after the first.
                  <li key={image.src} className={i % 2 ? "sm:[--reveal-delay:120ms]" : undefined}>
                    <Screenshot image={image} onOpen={() => setOpenImage(i + 1)} frameClassName="rounded-2xl" />
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </div>

        <nav
          ref={reveal}
          aria-label={projects.heading}
          className="reveal flex flex-wrap items-center justify-between gap-6 py-14 lg:py-20"
        >
          <BackLink />
          <Link to={`/projects/${next.slug}`} className="group text-right">
            <span className="block text-small text-muted">{labels.nextProject}</span>
            <span className="display mt-1 inline-flex items-center gap-3 text-d3 transition-colors duration-200 group-hover:text-accent">
              {next.title}
              <LuArrowRight className="size-[0.7em] text-accent" aria-hidden="true" />
            </span>
          </Link>
        </nav>
      </div>

      {images.length > 0 && (
        <Lightbox images={images} index={openImage} onIndex={setOpenImage} onClose={() => setOpenImage(null)} />
      )}
    </article>
  );
}

// A screenshot that opens in the full-screen viewer, with its title and description underneath when it has them.
function Screenshot({ image, eager = false, onOpen, className, frameClassName, style }) {
  return (
    <figure ref={reveal} className={cx("reveal", className)} style={style}>
      <button
        type="button"
        onClick={onOpen}
        className={cx(
          "block w-full cursor-zoom-in overflow-hidden border border-line transition-colors duration-200 hover:border-accent",
          frameClassName,
        )}
      >
        <span className="sr-only">{caseStudy.openImage}: </span>
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          data-reveal-zoom
          className="h-auto w-full"
        />
      </button>
      {(image.title || image.caption) && (
        <figcaption className="mt-4 max-w-[62ch]">
          {image.title && <span className="block text-lg leading-snug font-semibold">{image.title}</span>}
          {image.caption && <span className="mt-1.5 block text-small leading-normal text-muted">{image.caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

function BackLink() {
  return (
    <SectionLink
      id="projects"
      className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-small font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      <LuArrowLeft className="size-4" aria-hidden="true" />
      {labels.allProjects}
    </SectionLink>
  );
}

// A titled band of the case study. By default the title sits beside the content on wide screens;
// `wide` stacks them so the content can use the full width. The content of a normal band comes in
// as one piece; a wide band's items each come in on their own.
function Block({ title, wide = false, children }) {
  return (
    <section
      className={cx(
        "grid gap-x-10 gap-y-6 border-b border-line py-12 lg:py-16",
        wide ? "lg:gap-y-9" : "lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]",
      )}
    >
      <RiseWords text={title} className="display text-d3" />
      {wide ? (
        <div>{children}</div>
      ) : (
        <div ref={reveal} className="reveal" style={delay(120)}>
          {children}
        </div>
      )}
    </section>
  );
}
