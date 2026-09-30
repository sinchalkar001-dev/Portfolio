import { useEffect, useState } from "react";

export const cx = (...classes) => classes.filter(Boolean).join(" ");

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    onChange();
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

// True once the element has scrolled into view (or while it is in view, with once: false).
export function useInView(ref, { threshold = 0.35, once = true } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);
  return inView;
}

// Eases a number from `from` to `to` once `active` turns true. Change `runKey` to play it again.
// With reduced motion the final value is shown straight away.
export function useTween(active, from, to, { duration = 1200, delay = 0, runKey = 0 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!active || reduced) return;
    let frame = 0;
    let start = 0;
    setValue(from);
    const timer = setTimeout(() => {
      const tick = (now) => {
        start ||= now;
        const p = Math.min(1, (now - start) / duration);
        setValue(from + (to - from) * (1 - (1 - p) ** 4));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [active, reduced, from, to, duration, delay, runKey]);

  return reduced ? to : value;
}

// Tracks which section is crossing the middle of the viewport, for nav highlighting.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function useScrolledPast(offset) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}
