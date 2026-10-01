import { useRef } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";
import { gsap, useGSAP } from "../lib/motion";

const format = (n) => Math.round(n).toLocaleString("en-US");

// Counts from zero to `value` the first time it scrolls into view, once `ready` is true.
// With reduced motion, and for screen readers, it is simply the final number.
export default function CountUp({ value, suffix = "", ready = true, className }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const final = format(value) + suffix;

  useGSAP(
    () => {
      if (reduced) return;
      const el = ref.current;
      const state = { n: 0 };
      const render = () => (el.textContent = format(state.n) + suffix);
      render();
      if (!ready) return;
      gsap.to(state, {
        n: value,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: render,
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
      return () => (el.textContent = final);
    },
    { dependencies: [reduced, ready, value, suffix] },
  );

  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {final}
      </span>
    </span>
  );
}
