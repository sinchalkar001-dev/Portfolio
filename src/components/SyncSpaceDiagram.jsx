import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cx, useInView, usePrefersReducedMotion } from "../lib";

// A live sketch of SyncSpace: while it's on screen, edits and code runs travel through
// the architecture (CSS animations keyed off data-phase) and land in the room log.
const PHASES = {
  a: { who: "you", text: "edit merged, snapshot saved, update logged" },
  b: { who: "Sinchal", text: "ran Main.java in a sandbox container" },
};
const PHASE_MS = 2600;
const LOG_DELAY_MS = 1650; // when the packet reaches the storage row

const clock = () => new Date().toLocaleTimeString("en-GB", { hour12: false });

export default function SyncSpaceDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3, once: false });
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(null);
  const [log, setLog] = useState(() => [
    { id: 0, time: clock(), who: "you", text: "joined the room" },
    { id: 1, time: clock(), who: "Sinchal", text: "joined the room" },
  ]);

  useEffect(() => {
    if (!inView || reduced) return;
    const flip = () => setPhase((p) => (p === "a" ? "b" : "a"));
    flip();
    const id = setInterval(flip, PHASE_MS);
    return () => clearInterval(id);
  }, [inView, reduced]);

  useEffect(() => {
    if (!phase) return;
    const t = setTimeout(
      () => setLog((lines) => [...lines.slice(-2), { id: lines.at(-1).id + 1, time: clock(), ...PHASES[phase] }]),
      LOG_DELAY_MS,
    );
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <figure ref={ref} data-phase={phase ?? undefined} className="self-start rounded-xl border border-line bg-bg p-3 sm:p-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Node id="me" dot="bg-accent" title="Sinchal" sub="browser, React" />
        <Node id="you" dot="bg-peer" title="you" sub="browser, React" />
      </div>
      <Wires name="in" from={[0.25, 0.75]} to={[0.5, 0.5]} label="Yjs updates over WebSocket" />
      <Node id="server" title="Node.js + Express" sub="Socket.io rooms and chat, JWT with 6‑level roles" center />
      <Wires name="out" from={[0.5, 0.5, 0.5]} to={[1 / 6, 0.5, 5 / 6]} />
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Node id="snapshots" title="snapshots" sub="debounced" wideOnly />
        <Node id="log" title="update log" sub="append‑only" wideOnly />
        <Node id="sandbox" title="sandbox" sub="container per run" wideOnly />
        <p className="col-span-2 border-t border-line-strong pt-1.5 text-center font-mono text-[12px] text-faint">MongoDB</p>
      </div>

      <ol aria-hidden="true" className="mt-5 min-h-[4.25rem] space-y-1 border-t border-line pt-4 font-mono text-[12px] leading-5">
        {log.map((line) => (
          <li key={line.id} className="flex animate-log-in gap-3 whitespace-nowrap">
            <span className="text-faint tabular-nums">{line.time}</span>
            <span className={line.who === "you" ? "text-peer" : "text-accent"}>{line.who}</span>
            <span className="min-w-0 truncate text-muted">{line.text}</span>
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">
        How an edit moves through SyncSpace: browsers send Yjs updates over WebSockets to a Node.js and Express
        server, which stores debounced snapshots and an append-only update log in MongoDB, and runs code in a
        sandboxed container.
      </figcaption>
    </figure>
  );
}

function Node({ id, title, sub, dot, center, wideOnly }) {
  return (
    <div data-node={id} className={cx("rounded-md border border-line-strong bg-raised px-2.5 py-2 sm:px-3 sm:py-2.5", center && "text-center")}>
      <div className={cx("flex items-center gap-2 font-mono text-[12px] text-fg sm:text-[13px]", center && "justify-center")}>
        {dot && <span className={cx("size-2 shrink-0 rounded-full", dot)} aria-hidden="true" />}
        {title}
      </div>
      <div className={cx("mt-1 font-mono text-[12px] leading-snug text-faint", wideOnly && "hidden sm:block")}>{sub}</div>
    </div>
  );
}

// Curved connectors drawn in real pixels, so the travelling packet keeps its shape at any width
function Wires({ name, from, to, label }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const height = 56;

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-14">
      {width > 0 && (
        <svg className="absolute inset-0 overflow-visible" width={width} height={height} aria-hidden="true">
          {from.map((f, i) => {
            const x1 = f * width;
            const x2 = to[i] * width;
            const d = `M${x1} 0 C${x1} ${height * 0.55} ${x2} ${height * 0.45} ${x2} ${height}`;
            return (
              <g key={i} data-wire={`${name}-${i}`}>
                <path d={d} fill="none" stroke="var(--color-line-strong)" strokeWidth="1.5" strokeDasharray="3 5" />
                <path
                  d={d}
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="packet"
                  style={{ "--len": Math.ceil(Math.hypot(x2 - x1, height) * 1.1) + 18 }}
                />
              </g>
            );
          })}
        </svg>
      )}
      {label && (
        <span className="absolute top-1/2 left-1/2 max-w-[90%] -translate-x-1/2 -translate-y-1/2 truncate rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[12px] text-muted">
          {label}
        </span>
      )}
    </div>
  );
}
