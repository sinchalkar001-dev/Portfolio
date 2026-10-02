import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "./motion";
import { usePrefersReducedMotion } from "./hooks";

const ScrollContext = createContext(null);

export const useScroll = () => useContext(ScrollContext);

const headerHeight = () => document.querySelector("[data-site-header]")?.offsetHeight ?? 0;

// How many still frames to wait before deciding a scroll has come to rest.
const REST_FRAMES = 20;

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis always agree on the scroll position.
// With reduced motion Lenis is never created and every scroll is an instant, native one.
export function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef(null);
  const wakeRef = useRef(null);
  const locks = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    // Lenis only needs frames while it is easing towards a target. Left running, its loop would make the
    // browser produce a main-thread frame sixty times a second for nothing. So the loop is switched on by
    // input (wheel, touch, a programmatic scroll) and off again once the page has come to rest.
    // Lenis is fed its own clock, which only advances while the loop runs. Fed wall-clock time, the first
    // frame after a pause would look seconds long and the scroll would jump straight to its target.
    let running = false;
    let stillFor = 0;
    let clock = 0;
    let last = 0;
    const tick = (seconds) => {
      const now = seconds * 1000;
      if (last) clock += Math.min(now - last, 50);
      last = now;
      lenis.raf(clock);
      stillFor = lenis.isScrolling ? 0 : stillFor + 1;
      if (stillFor > REST_FRAMES) sleep();
    };
    const wake = () => {
      stillFor = 0;
      if (running) return;
      running = true;
      last = 0;
      gsap.ticker.add(tick);
    };
    const sleep = () => {
      running = false;
      gsap.ticker.remove(tick);
    };
    lenis.on("virtual-scroll", wake);
    wakeRef.current = wake;

    if (locks.current > 0) lenis.stop();
    return () => {
      sleep();
      lenis.destroy();
      lenisRef.current = null;
      wakeRef.current = null;
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
          if (!immediate) wakeRef.current?.();
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
