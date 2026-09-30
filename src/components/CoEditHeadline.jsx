import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { headlineNotes } from "../data";
import { cx, usePrefersReducedMotion } from "../lib";

// The headline is "typed" by two collaborators at once, the way SyncSpace merges edits.
// Each editor anchors to a different character, so their concurrent inserts can never
// collide: "me" types after the last "s" of "systems", "peer" types before the full stop.
// Once merged, Sinchal leaves margin comments that back each claim with a number.
const SEED = "I build systems.";
export const HEADLINE = "I build systems that stay correct under concurrent load.";

const EDITORS = {
  me: { label: "Sinchal", mode: "after", anchor: "s14" },
  peer: { label: "you", mode: "before", anchor: "s15" },
};

const SCRIPTS = {
  me: [{ wait: 250 }, { type: " that work" }, { wait: 380 }, { erase: 5 }, { wait: 120 }, { type: " stay correct" }],
  peer: [{ wait: 700 }, { type: " under concurrent load" }],
};

const NOTES = headlineNotes.map((note) => {
  const start = HEADLINE.indexOf(note.anchor);
  return { ...note, start, end: start + note.anchor.length };
});

const toOps = (script) =>
  script.flatMap((step) => {
    if (step.wait) return [{ kind: "wait", ms: step.wait }];
    if (step.type) return [...step.type].map((ch) => ({ kind: "ins", ch }));
    return Array.from({ length: step.erase }, () => ({ kind: "del" }));
  });

const OPS = { me: toOps(SCRIPTS.me), peer: toOps(SCRIPTS.peer) };

const seedState = () => ({
  doc: [...SEED].map((ch, i) => ({ id: `s${i}`, ch, by: null })),
  anchors: { me: EDITORS.me.anchor, peer: EDITORS.peer.anchor },
  done: false,
});

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return seedState();
    case "settle":
      return settledState();
    case "finish":
      // Once both are done, "me" jumps to the end of the line, like pressing End.
      return { ...state, done: true, anchors: { ...state.anchors, me: state.doc.at(-1).id } };
    case "ins":
    case "del": {
      const { editor } = action;
      const doc = state.doc.slice();
      const anchors = { ...state.anchors };
      const at = doc.findIndex((c) => c.id === anchors[editor]);
      const char = { id: action.id, ch: action.ch, by: editor };
      if (EDITORS[editor].mode === "after") {
        if (action.type === "ins") {
          doc.splice(at + 1, 0, char);
          anchors[editor] = char.id;
        } else {
          doc.splice(at, 1);
          anchors[editor] = doc[at - 1].id;
        }
      } else if (action.type === "ins") {
        doc.splice(at, 0, char);
      } else {
        doc.splice(at - 1, 1);
      }
      return { ...state, doc, anchors };
    }
    default:
      return state;
  }
}

// Apply every edit instantly. Order between editors doesn't matter; that's the point.
function settledState() {
  let state = seedState();
  let n = 0;
  for (const editor of ["me", "peer"]) {
    for (const op of OPS[editor]) {
      if (op.kind !== "wait") state = reducer(state, { type: op.kind, editor, ch: op.ch, id: `${editor}-x${n++}` });
    }
  }
  return reducer(state, { type: "finish" });
}

const noteDelay = (n) => 250 + n * 280;

export default function CoEditHeadline({ children }) {
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(0);
  const [state, dispatch] = useReducer(reducer, undefined, reduced ? settledState : seedState);
  const [peerLeft, setPeerLeft] = useState(reduced);
  const [activeNote, setActiveNote] = useState(null);
  const [marks, setMarks] = useState([]);
  const frameRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (reduced) {
      dispatch({ type: "settle" });
      setPeerLeft(true);
      return;
    }
    dispatch({ type: "reset" });
    setPeerLeft(false);

    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    let typing = 2;
    let seq = 0;

    for (const editor of ["me", "peer"]) {
      const ops = OPS[editor];
      let i = 0;
      const step = () => {
        if (i === ops.length) {
          if (--typing === 0) {
            dispatch({ type: "finish" });
            later(() => setPeerLeft(true), 1500);
          }
          return;
        }
        const op = ops[i++];
        if (op.kind === "wait") return later(step, op.ms);
        dispatch({ type: op.kind, editor, ch: op.ch, id: `${editor}-${run}-${seq++}` });
        later(step, op.kind === "del" ? 55 : 32 + Math.random() * 52);
      };
      later(step, 500);
    }
    return () => timers.forEach(clearTimeout);
  }, [run, reduced]);

  const { doc, anchors, done } = state;

  // Once the text has settled, measure where each commented phrase sits (per line),
  // and keep measuring as the layout changes.
  useLayoutEffect(() => {
    if (!done) {
      setMarks([]);
      return;
    }
    const frame = frameRef.current;
    const measure = () => {
      const chars = layerRef.current.querySelectorAll("[data-ch]");
      if (chars.length !== HEADLINE.length) return;
      const origin = frame.getBoundingClientRect();
      setMarks(
        NOTES.map((note) => {
          const lines = [];
          for (let i = note.start; i < note.end; i++) {
            const r = chars[i].getBoundingClientRect();
            const top = r.top - origin.top;
            const line = lines.find((l) => Math.abs(l.top - top) < 4);
            if (line) line.right = Math.max(line.right, r.right - origin.left);
            else lines.push({ top, left: r.left - origin.left, right: r.right - origin.left, height: r.height });
          }
          return lines;
        }),
      );
    };
    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [done]);

  return (
    <div>
      <Presence done={done} peerLeft={peerLeft} reduced={reduced} onReplay={() => setRun((r) => r + 1)} />

      <div className="relative mt-10">
        <div ref={frameRef} className="relative">
          <h1 className="max-w-[9.2em] text-[clamp(2.1rem,9.2vw,5.6rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-wrap">
            <span className="sr-only">{HEADLINE}</span>
            <span aria-hidden="true" className="grid">
              {/* Invisible final text reserves the height, so nothing below shifts while typing */}
              <span className="invisible col-start-1 row-start-1">{HEADLINE}</span>
              <span ref={layerRef} className="col-start-1 row-start-1">
                {doc.map((c) => (
                  <span
                    key={c.id}
                    data-ch=""
                    className={cx(
                      "relative",
                      c.by === "me" && !reduced && "animate-ink-me",
                      c.by === "peer" && !reduced && "animate-ink-peer",
                    )}
                  >
                    {c.ch}
                    {c.id === anchors.me && <Caret editor="me" blinking={done} labelHidden={peerLeft} />}
                    {c.id === anchors.peer && <Caret editor="peer" hidden={peerLeft} />}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          {/* Comment anchors: an underline under each commented phrase, tinted while its comment is hovered */}
          {marks.map((lines, n) =>
            lines.map((line, k) => (
              <span
                key={`${n}-${k}`}
                aria-hidden="true"
                className={cx(
                  "pointer-events-none absolute rounded-[3px] transition-colors duration-300",
                  activeNote === n ? "bg-accent/15" : "bg-transparent",
                )}
                style={{ left: line.left - 3, top: line.top, width: line.right - line.left + 6, height: line.height }}
              >
                <span
                  className="absolute inset-x-0.75 bottom-[12%] h-0.75 origin-left animate-underline-in rounded-full bg-accent/75"
                  style={{ animationDelay: `${noteDelay(n)}ms` }}
                />
              </span>
            )),
          )}
        </div>

        <MarginNotes marks={marks} activeNote={activeNote} onActive={setActiveNote} />
      </div>

      {children}

      {done && (
        <ul className="mt-14 grid gap-3 md:grid-cols-3 xl:hidden" aria-label="Notes on the headline">
          {NOTES.map((note, n) => (
            <li key={note.anchor}>
              <NoteCard note={note} n={n} active={activeNote === n} onActive={setActiveNote} quote className="h-full" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// On wide screens the comments sit in the right margin, level with the phrase they annotate.
function MarginNotes({ marks, activeNote, onActive }) {
  const cardRefs = useRef([]);
  const [tops, setTops] = useState(null);

  useLayoutEffect(() => {
    if (!marks.length) {
      setTops(null);
      return;
    }
    let floor = -Infinity;
    setTops(
      marks.map((lines, n) => {
        const line = lines[0];
        const height = cardRefs.current[n]?.offsetHeight ?? 0;
        const top = Math.max(line.top + (line.height - height) / 2, floor);
        floor = top + height + 10;
        return top;
      }),
    );
  }, [marks]);

  if (!marks.length) return null;
  return (
    <ul className="absolute inset-y-0 right-0 hidden w-[20rem] xl:block" aria-label="Notes on the headline">
      {NOTES.map((note, n) => (
        <li key={note.anchor} className="absolute inset-x-0" style={{ top: tops?.[n] ?? 0, visibility: tops ? "visible" : "hidden" }}>
          <NoteCard note={note} n={n} active={activeNote === n} onActive={onActive} cardRef={(el) => (cardRefs.current[n] = el)} />
        </li>
      ))}
    </ul>
  );
}

function NoteCard({ note, n, active, onActive, quote, cardRef, className }) {
  return (
    <a
      ref={cardRef}
      href={note.href}
      onMouseEnter={() => onActive(n)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(n)}
      onBlur={() => onActive(null)}
      style={{ animationDelay: `${noteDelay(n)}ms` }}
      className={cx(
        "flex animate-comment-in gap-3 rounded-xl border bg-surface p-3.5 transition-colors duration-300",
        active ? "border-accent/60 bg-raised" : "border-line",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-6 shrink-0 place-items-center rounded-full bg-accent font-mono text-[10px] font-semibold text-accent-ink"
      >
        SK
      </span>
      <span className="min-w-0">
        {quote && <span className="mb-1 block text-[13px] text-faint">On “{note.anchor}”</span>}
        <span className="block text-[14.5px] leading-[1.45] text-fg">{note.text}</span>
      </span>
    </a>
  );
}

function Caret({ editor, blinking, hidden, labelHidden }) {
  const isMe = editor === "me";
  return (
    <span
      className={cx(
        "pointer-events-none absolute top-[0.1em] bottom-[0.02em] w-0.75 transition-opacity duration-500",
        isMe ? "right-0 translate-x-[60%]" : "left-0 translate-x-[-60%]",
        hidden && "opacity-0",
      )}
    >
      <span className={cx("absolute inset-0 rounded-full", isMe ? "bg-accent" : "bg-peer", blinking && "animate-caret-blink")} />
      <span
        className={cx(
          "absolute left-0 rounded-sm px-1.5 py-0.75 font-mono text-[11px] leading-none font-semibold tracking-normal whitespace-nowrap text-accent-ink transition-opacity duration-500",
          isMe ? "bottom-full rounded-bl-none bg-accent" : "top-full rounded-tl-none bg-peer",
          labelHidden && "opacity-0",
        )}
      >
        {EDITORS[editor].label}
      </span>
    </span>
  );
}

function Presence({ done, peerLeft, reduced, onReplay }) {
  return (
    <div className="flex min-h-11 items-center gap-3 font-mono text-[13px] text-muted">
      <div className="flex" aria-hidden="true">
        <span className="z-10 grid size-7 place-items-center rounded-full bg-accent text-[11px] font-semibold text-accent-ink ring-2 ring-bg">
          SK
        </span>
        <span
          className={cx(
            "grid size-7 place-items-center rounded-full bg-peer text-[11px] font-semibold text-accent-ink ring-2 ring-bg transition-[opacity,margin] duration-500",
            peerLeft ? "-ml-7 opacity-0" : "-ml-1",
          )}
        >
          you
        </span>
      </div>
      {done ? (
        <span className="flex items-center gap-1.5 text-fg">
          <Check className="size-4 text-accent" aria-hidden="true" />
          <span className="hidden sm:inline">Merged 2 concurrent edits, 0 conflicts</span>
          <span className="sm:hidden">Merged, 0 conflicts</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
          2 editors in /portfolio
        </span>
      )}
      {done && !reduced && (
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-md px-2 text-faint transition-colors duration-200 hover:text-peer"
          aria-label="Replay the headline animation"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">replay</span>
        </button>
      )}
    </div>
  );
}
