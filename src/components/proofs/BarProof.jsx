import { useRef } from "react";
import { cx, usePrefersReducedMotion } from "../../lib/hooks";
import { gsap, useGSAP } from "../../lib/motion";

// Horizontal bars that animate once when they scroll into view. Used for two proofs:
//   query     one bar starts at the "before" value and shrinks to the "after" value
//   accuracy  each bar fills from zero to its value
// Every bar's final state is what React renders, so reduced motion and no-script both show the result.
export default function BarProof({ proof }) {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();
  const bars = toBars(proof);
  const max = Math.max(...bars.map((bar) => Math.max(bar.from, bar.to)), proof.unit === "%" ? 100 : 0);

  useGSAP(
    () => {
      if (reduced) return;
      const rows = gsap.utils.toArray("[data-bar]", root.current);
      const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 80%", once: true } });

      rows.forEach((row, i) => {
        const { from, to } = bars[i];
        if (from === to) return;
        const fill = row.querySelector("[data-bar-fill]");
        const value = row.querySelector("[data-bar-value]");
        const state = { v: from };
        const render = () => {
          fill.style.width = `${(state.v / max) * 100}%`;
          value.textContent = Math.round(state.v);
        };
        render();
        timeline.to(state, { v: to, duration: 1.5, ease: "power3.inOut", onUpdate: render }, 0.25 + i * 0.2);
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <figure ref={root}>
      <figcaption className="display text-d4">{proof.title}</figcaption>
      <div className="mt-6 space-y-6">
        {bars.map((bar) => (
          <div key={bar.label} data-bar>
            <div className="flex items-baseline justify-between gap-4">
              <span className={cx("text-small", bar.highlight ? "text-fg" : "text-muted")}>{bar.label}</span>
              <span className={cx("display text-d4 tabular-nums", bar.highlight ? "text-fg" : "text-muted")}>
                <span data-bar-value>{bar.to}</span>
                {proof.unit === "%" ? "%" : ` ${proof.unit}`}
              </span>
            </div>
            <div className="mt-2.5 h-3 rounded-full bg-line" aria-hidden="true">
              <div
                data-bar-fill
                className={cx("h-full rounded-full", bar.highlight ? "bg-accent" : "bg-line-strong")}
                style={{ width: `${(bar.to / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {proof.note && <p className="mt-6 text-small leading-normal text-muted">{proof.note}</p>}
    </figure>
  );
}

function toBars(proof) {
  if (proof.type === "query") {
    return [
      { label: proof.before.label, from: proof.before.value, to: proof.before.value },
      { label: proof.after.label, from: proof.before.value, to: proof.after.value, highlight: true },
    ];
  }
  return proof.bars.map((bar) => ({ ...bar, from: 0, to: bar.value }));
}
