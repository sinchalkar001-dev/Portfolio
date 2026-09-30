import { profile } from "../data";
import { cx } from "../lib";
import { Container, NameFlag, SectionHeader } from "./ui";

const facts = [
  { label: "Based in", value: profile.location },
  { label: "Education", value: "B.Tech CSE, KIIT (2022–2026)" },
  { label: "Currently", value: "Web Development Intern, Axlero" },
  { label: "Strongest in", value: "REST APIs, database indexing, concurrency testing" },
];

// Transformer handles around the photo, as on a SyncSpace whiteboard
const HANDLES = [
  "-top-1.5 -left-1.5",
  "-top-1.5 left-1/2 -translate-x-1/2",
  "-top-1.5 -right-1.5",
  "top-1/2 -right-1.5 -translate-y-1/2",
  "-right-1.5 -bottom-1.5",
  "-bottom-1.5 left-1/2 -translate-x-1/2",
  "-bottom-1.5 -left-1.5",
  "top-1/2 -left-1.5 -translate-y-1/2",
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <SectionHeader title="About" />
        <div className="mt-12 grid gap-12 md:grid-cols-12 lg:gap-16">
          <PhotoObject />

          <div className="md:col-span-8">
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-fg/85">
              <p>
                I'm Sinchal, a full-stack developer and a 2026 Computer Science graduate from KIIT, Bhubaneswar. I write
                Java, JavaScript, Python and SQL, and build most things with React, Node.js, Express and MongoDB.
              </p>
              <p>
                The problems I enjoy are the ones where many things happen at once: two people editing the same line,
                a thousand requests racing for one appointment slot, a dashboard that has to stay fast with 200 users
                on it. I like proving a fix with numbers: query times measured before and after an index, p95
                latencies from a load test, end-to-end tests that drive two browsers at the same time.
              </p>
              <p>
                Right now I'm a Web Development Intern at Axlero Innovative Solutions, where I took SyncSpace from a
                specification to a live deployment.
              </p>
            </div>

            <dl className="mt-10 grid max-w-2xl gap-x-8 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-line py-4">
                  <dt className="text-[14px] text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

// The photo sits on the page like an object on the whiteboard: selected by Sinchal,
// and handed to you (violet) when you hover it.
function PhotoObject() {
  const edge = "border-accent transition-colors duration-300 group-hover/photo:border-peer";
  return (
    <figure className="group/photo max-w-[320px] md:col-span-4 md:max-w-none">
      <div className="px-4 pt-12 pb-8">
        <div className="relative transition-transform duration-500 ease-out-quart group-hover/photo:-rotate-2">
          <img
            src={profile.photo}
            alt="Portrait of Sinchal Kar"
            width="390"
            height="508"
            loading="lazy"
            decoding="async"
            className="block aspect-390/508 w-full object-cover"
          />
          <div aria-hidden="true" className={cx("pointer-events-none absolute -inset-1.5 border-[1.5px]", edge)}>
            {HANDLES.map((position) => (
              <span key={position} className={cx("absolute size-2.5 border-[1.5px] bg-bg", edge, position)} />
            ))}
            {/* rotation handle */}
            <span className="absolute -top-7 left-1/2 h-5.5 w-[1.5px] -translate-x-1/2 bg-accent transition-colors duration-300 group-hover/photo:bg-peer" />
            <span className={cx("absolute -top-9 left-1/2 size-3 -translate-x-1/2 rounded-full border-[1.5px] bg-bg", edge)} />
            {/* who has it selected */}
            <span className="absolute bottom-full left-[-1.5px] mb-1.5 grid">
              <NameFlag
                who="me"
                className="col-start-1 row-start-1 justify-self-start rounded-bl-none transition-opacity duration-300 group-hover/photo:opacity-0"
              />
              <NameFlag
                who="you"
                className="col-start-1 row-start-1 justify-self-start rounded-bl-none opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100"
              />
            </span>
            {/* Sinchal's cursor, resting on the corner handle */}
            <CursorArrow className="absolute top-[calc(100%+2px)] left-[calc(100%+2px)] text-accent transition-opacity duration-300 group-hover/photo:opacity-0" />
          </div>
        </div>
      </div>
      <figcaption className="px-1 font-mono text-[12px] text-faint">sinchal-kar.jpg, 390 × 508</figcaption>
    </figure>
  );
}

function CursorArrow({ className }) {
  return (
    <svg viewBox="0 0 16 20" className={cx("h-5 w-4", className)} aria-hidden="true">
      <path
        d="M1 1v15.5l4.2-3.9 2.8 6.4 2.6-1.1-2.7-6.3h5.6z"
        fill="currentColor"
        stroke="var(--color-bg)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
