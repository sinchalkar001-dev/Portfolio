import { useLayoutEffect, useRef } from "react";

const PROBE_PX = 100;

// Sizes a single line of text so it spans the full width of its parent.
// `bleedStart` and `bleedEnd` (in em) let the outer letters overhang their box,
// so that their ink, not their side bearing, lines up with the edges of the page grid.
// `onFit(sizePx, el)` runs after every fit, for layouts that hang off the fitted size.
export function useFitText(ref, { bleedStart = 0, bleedEnd = 0, onFit } = {}) {
  const onFitRef = useRef(onFit);
  onFitRef.current = onFit;

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      const available = parent.clientWidth;
      if (!available) return;
      el.style.fontSize = `${PROBE_PX}px`;
      el.style.marginInline = "0";
      const natural = el.getBoundingClientRect().width / PROBE_PX;
      const size = available / (natural - bleedStart - bleedEnd);
      el.style.fontSize = `${size}px`;
      el.style.marginInline = `${-bleedStart * size}px ${-bleedEnd * size}px`;
      onFitRef.current?.(size, el);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, [ref, bleedStart, bleedEnd]);
}
