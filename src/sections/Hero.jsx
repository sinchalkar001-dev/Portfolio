import { useCallback, useEffect, useRef, useState } from "react";
import { LuArrowDown, LuPlus } from "react-icons/lu";
import CoEditStatement from "../components/CoEditStatement";
import CountUp from "../components/CountUp";
import { Button } from "../components/ui";
import { hero } from "../data/portfolio";
import { usePrefersReducedMotion } from "../lib/hooks";
import { useIntroDone } from "../lib/intro";
import { gsap, useGSAP } from "../lib/motion";
import { useScroll } from "../lib/scroll";
import { useFitText } from "../lib/useFitText";

// Matches the photo's CSS width in index.css: a fixed share of wide screens, most of a narrow one.
const PHOTO_SIZES = "(min-width: 64rem) clamp(16rem, 26vw, 24.5rem), min(66vw, 19rem)";

// The entrance plays once per page load. Coming back from a case study shows the hero as it ended.
let entrancePlayed = false;

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const introDone = useIntroDone();
  const scroll = useScroll();
  const scope = useRef(null);
  const boxRef = useRef(null);
  const wordRef = useRef(null);
  const timeline = useRef(null);
  const [seenBefore] = useState(entrancePlayed);
  const still = reduced || seenBefore;
  const [settled, setSettled] = useState(still);

  // The giant word is fitted to the page width, and the row below hangs off its size:
  // the photo is lifted by the height of the letters and centred on one of them.
  const onFit = useCallback((size, word) => {
    const box = boxRef.current;
    const letter = word.children[hero.headOverLetter - 1];
    box.style.setProperty("--word-size", `${size}px`);
    if (letter) {
      const { left, width } = letter.getBoundingClientRect();
      box.style.setProperty("--head-x", `${left + width / 2 - box.getBoundingClientRect().left}px`);
    }
  }, []);
  useFitText(wordRef, { bleedStart: 0.044, bleedEnd: -0.003, onFit });

  // One orchestrated entrance: the word rises letter by letter, the photo rises out of its card, the text follows.
  useGSAP(
    () => {
      if (still) return;
      timeline.current = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            entrancePlayed = true;
            setSettled(true);
          },
        })
        .from("[data-hero-letter]", { yPercent: 108, duration: 0.95, ease: "expo.out", stagger: 0.04 })
        .from("[data-hero-card]", { autoAlpha: 0, y: 36, duration: 0.8, ease: "power3.out" }, 0.18)
        .from("[data-hero-photo]", { yPercent: 101, duration: 1.2, ease: "expo.out" }, 0.24)
        .from("[data-hero-text]", { autoAlpha: 0, y: 24, duration: 0.7, ease: "power3.out", stagger: 0.06 }, 0.4);
      return () => (timeline.current = null);
    },
    { scope, dependencies: [still] },
  );

  useEffect(() => {
    if (introDone) timeline.current?.play();
  }, [introDone]);

  const { photo, statement, cta } = hero;

  return (
    <section
      id="top"
      ref={scope}
      className="overflow-x-clip pt-[calc(var(--header-h)+1.25rem)] lg:pt-[calc(var(--header-h)+2rem)]"
    >
      <div className="container-page">
        <div ref={boxRef} className="@container">
          {/* Clipped vertically only: it is the mask the letters rise out of. */}
          <div className="overflow-y-clip">
            <p ref={wordRef} aria-hidden="true" className="hero-word display uppercase">
              {[...hero.roleWord].map((letter, i) => (
                <span
                  key={i}
                  data-hero-letter
                  data-behind-photo={i === hero.headOverLetter - 1 || undefined}
                  className="hero-letter"
                >
                  {letter}
                </span>
              ))}
            </p>
          </div>

          <div className="hero-row">
            <div className="lg:pt-9">
              <h1 data-hero-text className="max-w-[34ch] text-lg leading-snug text-muted lg:text-xl">
                {hero.intro}
              </h1>
              <div data-hero-text className="mt-6 lg:mt-7">
                <CoEditStatement
                  statement={statement}
                  start={settled}
                  instant={still}
                  className="display text-[clamp(2rem,3.5vw,3.25rem)] leading-none"
                />
              </div>
              <div data-hero-text className="mt-8 lg:mt-9">
                <Button
                  href={`#${cta.section}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scroll.scrollTo(`#${cta.section}`);
                  }}
                >
                  {cta.label}
                  <LuArrowDown className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div className="hero-photo relative z-10">
              <div
                data-hero-card
                className="absolute inset-x-0 top-[62%] bottom-0 rounded-card border border-line bg-raised"
              />
              <div className="hero-photo-clip relative">
                <img
                  data-hero-photo
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes={PHOTO_SIZES}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  fetchPriority="high"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
            </div>

            <ul aria-label={hero.focusLabel} className="space-y-3.5 lg:pt-10">
              {hero.focusAreas.map((area) => (
                <li key={area} data-hero-text className="flex gap-3 leading-snug">
                  <LuPlus className="mt-[0.2em] size-[1.05em] shrink-0 text-accent" aria-hidden="true" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-12 grid border-t border-line sm:grid-cols-3 lg:mt-14">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              data-hero-text
              className="flex flex-col-reverse gap-2 border-b border-line py-7 sm:border-b-0 sm:border-l sm:px-7 sm:first:border-l-0 sm:first:pl-0 lg:py-9"
            >
              <dt className="max-w-[26ch] text-small leading-normal text-muted">{stat.label}</dt>
              <dd className="display text-d2">
                <CountUp value={stat.value} suffix={stat.suffix} ready={settled} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
