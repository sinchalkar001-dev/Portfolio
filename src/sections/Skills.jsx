import { useRef, useState } from "react";
import { Link } from "react-router";
import { LuArrowUpRight, LuPlus } from "react-icons/lu";
import Marquee from "../components/Marquee";
import { labels, projectBySlug, skills } from "../data/portfolio";
import { cx, useMediaQuery, usePrefersReducedMotion } from "../lib/hooks";
import { gsap, useGSAP } from "../lib/motion";
import { reveal } from "../lib/reveal";

const ROW =
  "group grid items-center gap-x-8 gap-y-5 py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] lg:py-11";

export default function Skills() {
  const listRef = useRef(null);
  const thumbRef = useRef(null);
  const [active, setActive] = useState(null);
  const [armed, setArmed] = useState(false); // thumbnails are only fetched once a row has been hovered
  const [broken, setBroken] = useState(() => new Set());
  const reduced = usePrefersReducedMotion();
  const desktopPointer = useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 64rem)");
  const follow = desktopPointer && !reduced;

  // The thumbnail trails the cursor: quickTo keeps one tween per axis and retargets it on every move.
  useGSAP(
    () => {
      if (!follow) return;
      const list = listRef.current;
      const thumb = thumbRef.current;
      gsap.set(thumb, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(thumb, "x", { duration: 0.55, ease: "power3.out" });
      const yTo = gsap.quickTo(thumb, "y", { duration: 0.55, ease: "power3.out" });
      let placed = false;
      const onMove = (event) => {
        const x = event.clientX + 150;
        const y = event.clientY + 24;
        if (!placed) {
          gsap.set(thumb, { x, y });
          placed = true;
        }
        xTo(x);
        yTo(y);
      };
      const onLeave = () => (placed = false);
      // `pointerover` as well: when the page is scrolled under a resting pointer, a row is entered
      // without the pointer ever moving, and the thumbnail still has to be put beside it.
      list.addEventListener("pointerover", onMove);
      list.addEventListener("pointermove", onMove);
      list.addEventListener("pointerleave", onLeave);
      return () => {
        list.removeEventListener("pointerover", onMove);
        list.removeEventListener("pointermove", onMove);
        list.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [follow] },
  );

  const showing = active !== null && !broken.has(active);

  return (
    // Clipped sideways: the rows slide in from beyond the edges of the page.
    <section id="skills" tabIndex={-1} className="overflow-x-clip py-24 focus:outline-none lg:py-28">
      <h2 className="sr-only">{skills.heading}</h2>

      <Marquee repeat={4} duration={48} className="border-y border-line py-5 lg:py-7">
        <span aria-hidden="true" className="flex items-center">
          <span className="display text-[clamp(4.5rem,15vw,13rem)] leading-[0.8] uppercase">
            {skills.marqueeWord}
          </span>
          <LuPlus className="mx-[2vw] size-[clamp(1.75rem,5vw,4.5rem)] text-accent" />
          <span className="display text-outline text-[clamp(4.5rem,15vw,13rem)] leading-[0.8] uppercase">
            {skills.marqueeWord}
          </span>
          <LuPlus className="mx-[2vw] size-[clamp(1.75rem,5vw,4.5rem)] text-accent" />
        </span>
      </Marquee>

      <div className="container-page">
        <ul ref={listRef} className="mt-6 lg:mt-10">
          {skills.groups.map((group, i) => {
            const project = projectBySlug(group.project);
            const body = (
              <>
                <div className="flex items-start justify-between gap-4 lg:contents">
                  <h3 className="display text-d2">{group.title}</h3>
                  {project && (
                    <LuArrowUpRight
                      className="size-9 shrink-0 text-accent transition-transform duration-300 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 lg:order-3 lg:size-12"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="lg:order-2">
                  <ul className="flex flex-wrap gap-2.5">
                    {group.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-line-strong px-4 py-2 text-small leading-none font-medium"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                  {project && (
                    <p className="mt-4 text-small text-muted">
                      {labels.seeItIn} {project.title}
                    </p>
                  )}
                </div>
              </>
            );
            return (
              <li
                key={group.title}
                ref={reveal}
                data-reveal={i % 2 ? "right" : "left"}
                className="reveal border-b border-line"
                onPointerEnter={() => {
                  setArmed(true);
                  setActive(i);
                }}
                onPointerLeave={() => setActive((current) => (current === i ? null : current))}
              >
                {project ? (
                  <Link to={`/projects/${project.slug}`} className={ROW}>
                    {body}
                  </Link>
                ) : (
                  <div className={ROW}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {follow && (
        <div ref={thumbRef} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-40">
          <div
            className={cx(
              "relative aspect-4/3 w-80 overflow-hidden rounded-2xl border border-line-strong bg-raised transition-[opacity,scale] duration-300 ease-out",
              showing ? "scale-100 opacity-100" : "scale-90 opacity-0",
            )}
          >
            {armed &&
              skills.groups.map((group, i) => (
                <img
                  key={group.title}
                  src={group.thumb}
                  alt=""
                  decoding="async"
                  onError={() => setBroken((prev) => new Set(prev).add(i))}
                  className={cx(
                    "absolute inset-0 size-full object-cover transition-opacity duration-300",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
