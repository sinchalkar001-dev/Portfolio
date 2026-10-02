import { createContext, useContext, useEffect, useState } from "react";

const IntroContext = createContext(true);

// True once the preloader has started to lift (or was never shown). The hero waits for this before it animates in.
export const useIntroDone = () => useContext(IntroContext);

// The preloader itself is plain HTML and CSS in index.html, so it paints before this script has loaded.
// Here we only decide when to lift it: once its own animation has played and the app is mounted.
// Adding the `is-leaving` class starts the exit, which is choreographed in index.html's CSS.
const MIN_ON_SCREEN_MS = 950; // letters landed, the word mostly filled
const REVEAL_AFTER_MS = 260; // the columns start to lift; the hero begins underneath them
const EXIT_MS = 1150; // last column gone

const introIsShowing = () =>
  !document.documentElement.classList.contains("no-intro") && document.getElementById("intro") !== null;

export function IntroProvider({ children }) {
  const [done, setDone] = useState(() => !introIsShowing());

  useEffect(() => {
    const curtain = document.getElementById("intro");
    if (!curtain) return;
    if (!introIsShowing()) {
      curtain.remove();
      return;
    }
    const timers = [];
    const elapsed = performance.now() - (window.__introStart ?? 0);
    timers.push(
      setTimeout(
        () => {
          curtain.classList.add("is-leaving");
          timers.push(setTimeout(() => setDone(true), REVEAL_AFTER_MS));
          setTimeout(() => curtain.remove(), EXIT_MS);
        },
        Math.max(0, MIN_ON_SCREEN_MS - elapsed),
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return <IntroContext.Provider value={done}>{children}</IntroContext.Provider>;
}
