import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LuRotateCcw } from "react-icons/lu";
import { labels } from "../../data/portfolio";
import { usePrefersReducedMotion } from "../../lib/hooks";
import { ScrollTrigger, useGSAP } from "../../lib/motion";

// E-Medico: a thousand requests race for one appointment slot, and the first atomic update wins.
// It is drawn on a canvas because a thousand DOM nodes would cost more than the point is worth.
const COLUMNS = 50;
const ARRIVAL_WINDOW_MS = 800;
const IN_FLIGHT_MS = 170;
const RACE_MS = 1200;

// Small seeded generator so each run is different but a given run always draws the same race.
function seeded(seed) {
  let a = seed + 0x9e3779b9;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const count = (n) => n.toLocaleString("en-US");

export default function RaceProof({ proof }) {
  const root = useRef(null);
  const canvasRef = useRef(null);
  const bookedRef = useRef(null);
  const rejectedRef = useRef(null);
  const finishedRun = useRef(-1);
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const [run, setRun] = useState(0);
  const [width, setWidth] = useState(0);

  const total = proof.requests;
  const rows = Math.ceil(total / COLUMNS);

  useGSAP(
    () => {
      ScrollTrigger.create({ trigger: root.current, start: "top 78%", once: true, onEnter: () => setInView(true) });
    },
    { scope: root },
  );

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(canvasRef.current.parentElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!width) return;
    const cell = width / COLUMNS;
    const height = cell * rows;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const css = getComputedStyle(document.documentElement);
    const color = (name) => css.getPropertyValue(name).trim();
    const tone = {
      waiting: color("--color-line"),
      inFlight: color("--color-fg"),
      rejected: color("--color-line-strong"),
      booked: color("--color-accent"),
    };

    const random = seeded(run);
    const arrival = Array.from({ length: total }, () => random() * ARRIVAL_WINDOW_MS);
    const winner = arrival.indexOf(Math.min(...arrival));

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      let rejected = 0;
      for (let i = 0; i < total; i++) {
        const age = t - arrival[i];
        let fill = tone.waiting;
        let radius = cell * 0.26;
        ctx.globalAlpha = 1;
        if (i === winner && age >= 0) {
          fill = tone.booked;
          radius = cell * Math.min(0.48, 0.26 + age / 600);
        } else if (age >= 0 && age < IN_FLIGHT_MS) {
          fill = tone.inFlight;
          radius = cell * 0.3;
        } else if (age >= IN_FLIGHT_MS) {
          fill = tone.rejected;
          ctx.globalAlpha = 0.55;
          rejected++;
        }
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(((i % COLUMNS) + 0.5) * cell, (Math.floor(i / COLUMNS) + 0.5) * cell, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      bookedRef.current.textContent = t >= arrival[winner] ? "1" : "0";
      rejectedRef.current.textContent = count(rejected);
    };

    if (reduced || finishedRun.current === run) return draw(Infinity);
    if (!inView) return draw(-1);

    let frame = 0;
    let startedAt = 0;
    const tick = (now) => {
      startedAt ||= now;
      const t = now - startedAt;
      draw(t);
      if (t < RACE_MS) {
        frame = requestAnimationFrame(tick);
      } else {
        draw(Infinity);
        finishedRun.current = run;
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, run, width, total, rows]);

  return (
    <figure ref={root}>
      <figcaption className="display text-d4">{proof.title}</figcaption>
      <p className="mt-3 text-small leading-normal text-muted">{proof.caption}</p>

      <div className="mt-5">
        <canvas ref={canvasRef} className="block w-full" aria-hidden="true" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <dl className="flex flex-wrap gap-x-6 gap-y-2 text-small">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-accent" aria-hidden="true" />
            <dt className="text-muted">{proof.booked}</dt>
            <dd ref={bookedRef} className="font-semibold tabular-nums">
              1
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-line-strong" aria-hidden="true" />
            <dt className="text-muted">{proof.rejected}</dt>
            <dd ref={rejectedRef} className="font-semibold tabular-nums">
              {count(total - 1)}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-muted">{proof.doubleBooked}</dt>
            <dd className="font-semibold tabular-nums">0</dd>
          </div>
        </dl>
        {!reduced && (
          <button
            type="button"
            onClick={() => setRun((n) => n + 1)}
            className="ml-auto inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-4 text-small font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <LuRotateCcw className="size-4" aria-hidden="true" />
            {labels.runAgain}
          </button>
        )}
      </div>

      <p className="mt-5 text-small leading-normal text-muted">{proof.note}</p>
    </figure>
  );
}
