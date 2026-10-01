import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "./motion";
import { usePrefersReducedMotion } from "./hooks";

const ScrollContext = createContext(null);

export const useScroll = () => useContext(ScrollContext);

const headerHeight = () => document.querySelector("[data-site-header]")?.offsetHeight ?? 0;

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis always agree on the scroll position.
// With reduced motion Lenis is never created and every scroll is an instant, native one.
export function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef(null);
  const locks = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (locks.current > 0) lenis.stop();
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const api = useMemo(
    () => ({
      // target: a pixel offset, an element, or a selector such as "#projects"
      scrollTo(target, { immediate = false, onComplete } = {}) {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (el == null) return;
        const offset = typeof el === "number" ? 0 : -headerHeight();
        const lenis = lenisRef.current;
        if (lenis) {
          // Lenis caches the page height and clamps to it, so measure again first:
          // after a route change the cached height still belongs to the previous page.
          lenis.resize();
          lenis.scrollTo(el, { offset, immediate, force: true, onComplete });
        } else {
          const top = typeof el === "number" ? el : el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: "auto" });
          onComplete?.();
        }
      },
      // Freeze page scrolling while a dialog is open. Calls nest.
      lock() {
        if (++locks.current === 1) {
          document.documentElement.classList.add("is-locked");
          lenisRef.current?.stop();
        }
      },
      unlock() {
        if (locks.current > 0 && --locks.current === 0) {
          document.documentElement.classList.remove("is-locked");
          lenisRef.current?.start();
        }
      },
    }),
    [],
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}
