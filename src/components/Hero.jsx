import { useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { profile } from "../data";
import { useFinePointer, usePrefersReducedMotion } from "../lib";
import CoEditHeadline from "./CoEditHeadline";
import { ButtonLink, Container, NameFlag } from "./ui";

export default function Hero() {
  const heroRef = useRef(null);
  const flagRef = useRef(null);
  const coordsRef = useRef(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const tracking = fine && !reduced;

  // Inside the hero your pointer joins the session: it gets a "you" flag,
  // canvas coordinates, and lights up the whiteboard dots around it.
  useEffect(() => {
    const hero = heroRef.current;
    if (!tracking) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      hero.style.setProperty("--px", `${x}px`);
      hero.style.setProperty("--py", `${y}px`);
      flagRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      coordsRef.current.textContent = `${Math.round(x)}, ${Math.round(y)}`;
    };
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      hero.dataset.pointer = "in";
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      hero.dataset.pointer = "out";
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      delete hero.dataset.pointer;
    };
  }, [tracking]);

  return (
    <section id="top" ref={heroRef} className="group/hero relative overflow-hidden">
      {/* Whiteboard canvas dots, fading out toward the bottom */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_90%_75%_at_30%_20%,black_25%,transparent_75%)]"
      />
      {/* The same dots, in your color, around your pointer */}
      <div
        aria-hidden="true"
        className="dot-grid-peer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 mask-[radial-gradient(150px_circle_at_var(--px)_var(--py),black,transparent)] group-data-[pointer=in]/hero:opacity-60"
      />

      <Container className="relative pt-28 pb-20 sm:pt-36 sm:pb-24">
        <CoEditHeadline>
          <p className="mt-8 max-w-152 text-lg leading-relaxed text-muted sm:text-xl">
            I'm {profile.name}, a full-stack developer working in React, Node.js, Express and MongoDB. Web Development
            Intern at Axlero Innovative Solutions and a 2026 B.Tech CSE graduate from KIIT.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#work">See the work</ButtonLink>
            <ButtonLink variant="secondary" href={profile.resume} download>
              <Download className="size-4" aria-hidden="true" />
              Download résumé
            </ButtonLink>
          </div>
        </CoEditHeadline>
      </Container>

      {tracking && (
        <div
          ref={flagRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-20 opacity-0 transition-opacity duration-300 group-data-[pointer=in]/hero:opacity-100"
        >
          <div className="mt-5 ml-4 flex items-center gap-2">
            <NameFlag who="you" />
            <span ref={coordsRef} className="font-mono text-[11px] text-peer/80 tabular-nums" />
          </div>
        </div>
      )}
    </section>
  );
}
