import { useMemo, useRef } from "react";
import { cx, usePrefersReducedMotion } from "../lib/hooks";
import { gsap, useGSAP } from "../lib/motion";

// A statement that inks itself in, letter by letter, as it is scrolled through, and fades back if you scroll up.
// The script only moves one number (--fill, 0 to 1) with the scroll position; the colour of each letter is
// worked out from it in CSS (see "Scroll motion" in index.css).
//
// The letters are plain inline spans, so the text wraps and kerns exactly as it would unsplit.
// Screen readers get the sentence whole, from the label.
export default function FillText({ as: Tag = "h2", text, className }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const letters = useMemo(() => [...text], [text]);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ref.current,
        { "--fill": 0 },
        {
          "--fill": 1,
          ease: "none",
          // From the moment the statement comes into view until just before it reaches the middle of the screen.
          scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 40%", scrub: 0.5 },
        },
      );
    },
    { dependencies: [reduced, text] },
  );

  return (
    <Tag ref={ref} className={cx("fill-text", className)} aria-label={text} style={{ "--n": letters.length }}>
      <span data-fill aria-hidden="true">
        {letters.map((letter, i) =>
          letter === " " ? (
            " "
          ) : (
            <span key={i} style={{ "--i": i }}>
              {letter}
            </span>
          ),
        )}
      </span>
    </Tag>
  );
}
