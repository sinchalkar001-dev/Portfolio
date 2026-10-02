import { useLayoutEffect, useRef } from "react";

// The last fit of each text, kept for the life of the page. When a page is shown again
// (coming back from a case study), its text takes this size at once, before anything is measured.
const remembered = new Map();

// Sizes a single line of text so it spans the full width of its parent.
//
// All measuring happens inside a ResizeObserver callback. The browser runs those after it has laid the
// page out and before it paints, so reading sizes there is free and the fitted size is in place on the
// very first paint. Measuring while the page mounts instead would force a full layout mid-script.
//
//   id                    a name for this text, used to remember its fit between visits
//   bleedStart, bleedEnd  how far (in em) the outer letters may overhang their box, so that their ink,
//                         not their side bearing, lines up with the edges of the page grid
//   lazy                  wait until the text is near the viewport before fitting it
//   measure(el, rect)     optional extra readings, taken before anything is changed
//   onFit({ size, scale, offset, extra })
//                         size in px, how much the text grew (scale), where its left edge now sits
//                         relative to the parent (offset), and whatever `measure` returned
export function useFitText(ref, { id, bleedStart = 0, bleedEnd = 0, lazy = false, measure, onFit } = {}) {
  const hooks = useRef({ measure, onFit });
  hooks.current = { measure, onFit };

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    let fitted = false;
    let active = false;

    const apply = (fitting) => {
      el.style.fontSize = `${fitting.size}px`;
      el.style.marginInline = `${-bleedStart * fitting.size}px ${-bleedEnd * fitting.size}px`;
      fitted = true;
      hooks.current.onFit?.(fitting);
    };

    const fit = () => {
      const available = parent.clientWidth;
      if (!available) return;
      const current = parseFloat(getComputedStyle(el).fontSize);
      const rect = el.getBoundingClientRect();
      const scale = available / (rect.width - (bleedStart + bleedEnd) * current);
      if (fitted && Math.abs(scale - 1) < 0.0005) return;
      const extra = hooks.current.measure?.(el, rect);
      const size = current * scale;
      const fitting = { size, scale, offset: -bleedStart * size, extra };
      if (id) remembered.set(id, fitting);
      apply(fitting);
    };

    if (id && remembered.has(id)) apply(remembered.get(id));

    const resize = new ResizeObserver(fit);
    const start = () => {
      active = true;
      resize.observe(parent);
    };

    let nearby;
    if (lazy && !fitted) {
      nearby = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          nearby.disconnect();
          start();
        },
        { rootMargin: "800px 0px" },
      );
      nearby.observe(parent);
    } else {
      start();
    }
    // A late web font changes the text's natural width without resizing its parent.
    document.fonts?.ready.then(() => active && fit());

    return () => {
      active = false;
      resize.disconnect();
      nearby?.disconnect();
    };
  }, [ref, id, bleedStart, bleedEnd, lazy]);
}
