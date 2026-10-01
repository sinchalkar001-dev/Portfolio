import { useEffect, useState } from "react";
import { cx } from "../lib/hooks";

// The value statement, written by two people at once, the way SyncSpace merges edits.
// It starts as `before + after`. "Sinchal" types `byMe` right after `before`, while "you" type `byYou`
// just ahead of `after`. Each cursor is anchored to a different spot, so the two edits can never collide.
//   start    begin typing (the hero flips this once its entrance has finished)
//   instant  skip the typing and show the finished sentence (reduced motion, or already seen)
export default function CoEditStatement({ statement, start, instant, className }) {
  const { before, byMe, byYou, after, me, you } = statement;
  const sentence = before + byMe + byYou + after;
  const [typed, setTyped] = useState(() => (instant ? [byMe.length, byYou.length] : [0, 0]));
  const [cursors, setCursors] = useState(instant ? "gone" : "shown"); // shown -> leaving -> gone

  useEffect(() => {
    if (instant) {
      setTyped([byMe.length, byYou.length]);
      setCursors("gone");
      return;
    }
    if (!start) return;

    const timers = new Set();
    const later = (fn, ms) => {
      const id = setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };
    const type = (who, text, count) => {
      setTyped((prev) => (who === 0 ? [count, prev[1]] : [prev[0], count]));
      if (count < text.length) later(() => type(who, text, count + 1), 34 + Math.random() * 48);
    };
    later(() => type(0, byMe, 1), 260);
    later(() => type(1, byYou, 1), 560);
    return () => timers.forEach(clearTimeout);
  }, [start, instant, byMe, byYou]);

  const done = typed[0] === byMe.length && typed[1] === byYou.length;

  // Once both edits have merged, the cursors linger for a moment, fade, and are then removed.
  useEffect(() => {
    if (!done || instant) return;
    const fade = setTimeout(() => setCursors("leaving"), 1500);
    const remove = setTimeout(() => setCursors("gone"), 2100);
    return () => {
      clearTimeout(fade);
      clearTimeout(remove);
    };
  }, [done, instant]);

  return (
    <p className={className}>
      <span className="sr-only">{sentence}</span>
      <span aria-hidden="true" className="grid">
        {/* The finished sentence, invisible, holds the space so nothing below moves while the text grows. */}
        <span className="invisible col-start-1 row-start-1">{sentence}</span>
        <span className="col-start-1 row-start-1">
          {before}
          <Typed text={byMe.slice(0, typed[0])} animation={instant ? null : "animate-ink-me"} />
          {cursors !== "gone" && <Cursor label={me} tone="me" leaving={cursors === "leaving"} blinking={done} />}
          <Typed text={byYou.slice(0, typed[1])} animation={instant ? null : "animate-ink-you"} />
          {cursors !== "gone" && <Cursor label={you} tone="you" leaving={cursors === "leaving"} blinking={done} />}
          {after}
        </span>
      </span>
    </p>
  );
}

// One span per character, so each new one can flash in its author's colour as it lands.
function Typed({ text, animation }) {
  if (!animation) return text;
  return [...text].map((ch, i) => (
    <span key={i} className={animation}>
      {ch}
    </span>
  ));
}

// A caret with its owner's name flag. It takes no space in the line, so it never changes how the text wraps.
function Cursor({ label, tone, leaving, blinking }) {
  const mine = tone === "me";
  return (
    <span className="relative">
      <span
        className={cx(
          "pointer-events-none absolute top-[0.1em] bottom-[0.06em] left-0 w-0.75 -translate-x-1/2 transition-opacity duration-500",
          leaving && "opacity-0",
        )}
      >
        <span className={cx("absolute inset-0 rounded-full", mine ? "bg-accent" : "bg-fg", blinking && "animate-caret")} />
        <span
          className={cx(
            "absolute left-0 rounded-[3px] px-1.5 py-0.75 text-[11px] leading-none font-bold tracking-normal whitespace-nowrap text-ink font-stretch-100%",
            mine ? "bottom-full rounded-bl-none bg-accent" : "top-full rounded-tl-none bg-fg",
          )}
        >
          {label}
        </span>
      </span>
    </span>
  );
}
