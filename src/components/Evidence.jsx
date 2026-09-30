import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { cx, useInView, usePrefersReducedMotion, useTween } from "../lib";

// Each project shows the result that proves it, animated once when it scrolls into view.

function Panel({ panelRef, title, children }) {
  return (
    <figure ref={panelRef} className="rounded-xl border border-line bg-bg p-5 sm:p-6">
      <figcaption className="text-[15px] font-medium text-fg">{title}</figcaption>
      {children}
    </figure>
  );
}

function Bar({ label, value, fill, highlight }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-[14px]">
        <span className={highlight ? "text-fg" : "text-muted"}>{label}</span>
        <span className={cx("font-mono tabular-nums", highlight ? "text-fg" : "text-muted")}>{value}</span>
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-line/70" aria-hidden="true">
        <div
          className={cx("h-full rounded-full", highlight ? "bg-accent" : "bg-line-strong")}
          style={{ clipPath: `inset(0 ${100 - fill}% 0 0 round 999px)` }}
        />
      </div>
    </div>
  );
}

// Skill Sphere: the indexed query shrinks from 820 ms to 140 ms.
export function QueryEvidence() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.5 });
  const ms = useTween(inView, 820, 140, { duration: 1600, delay: 300 });

  return (
    <Panel panelRef={ref} title="Dashboard query time">
      <div className="mt-5 space-y-4">
        <Bar label="Without compound indexes" value="820 ms" fill={100} />
        <Bar label="With compound indexes" value={`${Math.round(ms)} ms`} fill={(ms / 820) * 100} highlight />
      </div>
      <p className="mt-6 border-t border-line pt-4 text-[14px] leading-relaxed text-muted">
        83% faster. Under load the API held 180 ms p95 at 200 concurrent users, with zero failed requests.
      </p>
    </Panel>
  );
}

// Credit Risk: the model against the majority-class baseline.
export function AccuracyEvidence() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.5 });
  const baseline = useTween(inView, 0, 70, { duration: 1000, delay: 200 });
  const model = useTween(inView, 0, 91, { duration: 1300, delay: 550 });

  return (
    <Panel panelRef={ref} title="Test accuracy">
      <div className="mt-5 space-y-4">
        <Bar label="Majority-class baseline" value={`${Math.round(baseline)}%`} fill={baseline} />
        <Bar label="Gradient Boosting" value={`${Math.round(model)}%`} fill={model} highlight />
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-4">
        {[
          ["Precision", "0.88"],
          ["Recall", "0.85"],
          ["F1", "0.86"],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-[13px] text-muted">{label}</dt>
            <dd className="mt-0.5 font-mono text-[15px] text-fg">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[13px] text-faint">Measured on a 70/30 class imbalance.</p>
    </Panel>
  );
}

// E-Medico: a thousand requests race for one slot; the first atomic update wins.
const COLS = 50;
const ROWS = 20;
const RACE_MS = 1150;

function seeded(seed) {
  let a = seed + 0x9e3779b9;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function RaceEvidence() {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const bookedRef = useRef(null);
  const rejectedRef = useRef(null);
  const playedRef = useRef(-1);
  const inView = useInView(ref, { threshold: 0.5 });
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(0);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(canvasRef.current.parentElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!width) return;
    const n = COLS * ROWS;
    const cell = width / COLS;
    const height = cell * ROWS;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const css = getComputedStyle(document.documentElement);
    const color = (name) => css.getPropertyValue(name).trim();
    const tone = { idle: color("--color-line"), inFlight: color("--color-fg"), rejected: color("--color-line-strong"), booked: color("--color-accent") };

    const random = seeded(run);
    const arrival = Array.from({ length: n }, () => random() * 800);
    const winner = arrival.indexOf(Math.min(...arrival));

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      let rejected = 0;
      for (let i = 0; i < n; i++) {
        const age = t - arrival[i];
        let fill = tone.idle;
        let r = cell * 0.26;
        if (i === winner && age >= 0) {
          fill = tone.booked;
          r = cell * Math.min(0.48, 0.26 + age / 600);
        } else if (age >= 0 && age < 170) {
          fill = tone.inFlight;
          r = cell * 0.3;
        } else if (age >= 170) {
          fill = tone.rejected;
          rejected++;
        }
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(((i % COLS) + 0.5) * cell, (Math.floor(i / COLS) + 0.5) * cell, r, 0, Math.PI * 2);
        ctx.fill();
      }
      bookedRef.current.textContent = t >= arrival[winner] ? "1" : "0";
      rejectedRef.current.textContent = rejected.toLocaleString("en-US");
    };

    if (reduced || playedRef.current === run) return draw(Infinity);
    if (!inView) return draw(-1);

    let frame = 0;
    let start = 0;
    const tick = (now) => {
      start ||= now;
      const t = now - start;
      draw(t);
      if (t < RACE_MS) frame = requestAnimationFrame(tick);
      else playedRef.current = run;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, run, width]);

  return (
    <Panel panelRef={ref} title="One slot, a thousand requests">
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
        Booking is a single atomic conditional update, so the first request claims the slot and every other one fails
        the condition. Nothing gets booked twice.
      </p>
      <div className="mt-5">
        <canvas ref={canvasRef} className="block w-full" aria-hidden="true" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 font-mono text-[12.5px] text-muted">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-accent" aria-hidden="true" />
          booked <span ref={bookedRef} className="text-fg">0</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-line-strong" aria-hidden="true" />
          rejected <span ref={rejectedRef} className="text-fg">0</span>
        </span>
        {!reduced && (
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="ml-auto inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-md px-2 text-faint transition-colors duration-200 hover:text-peer"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            run again
          </button>
        )}
      </div>
      <p className="mt-3 border-t border-line pt-4 text-[14px] leading-relaxed text-muted">
        An illustration running in your browser. In testing, E-Medico held 100% booking consistency across 1,000+
        simulated parallel requests.
      </p>
    </Panel>
  );
}
