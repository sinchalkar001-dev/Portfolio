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

// The id of the section currently crossing the middle of the viewport, for nav highlighting.
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((current) => (current === entry.target.id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids, enabled]);
  return active;
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
