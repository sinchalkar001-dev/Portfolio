import { useEffect, useState } from "react";
import { site } from "../data/portfolio";

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

// True while the element is in, or within `margin` of, the viewport.
// Used to stop endless animations that nobody can see.
export function useOnScreen(ref, margin = "120px 0px") {
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin: margin });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, margin]);
  return onScreen;
}

// The id of the section currently crossing the middle of the viewport, for nav highlighting.
// Sections that mount a moment after the page does are picked up as they appear.
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

    const waiting = new Set(ids);
    const attach = () => {
      for (const id of [...waiting]) {
        const el = document.getElementById(id);
        if (!el) continue;
        observer.observe(el);
        waiting.delete(id);
      }
      return waiting.size === 0;
    };

    let watcher;
    if (!attach()) {
      watcher = new MutationObserver(() => attach() && watcher.disconnect());
      watcher.observe(document.getElementById("main") ?? document.body, { childList: true, subtree: true });
    }
    return () => {
      observer.disconnect();
      watcher?.disconnect();
    };
  }, [ids, enabled]);
  return active;
}

// Sets the tab title and the canonical address for the page being shown.
export function usePageMeta(title) {
  useEffect(() => {
    document.title = title;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = site.url + window.location.pathname;
  }, [title]);
}
