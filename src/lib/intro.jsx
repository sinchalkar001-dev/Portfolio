import { createContext, useContext, useEffect, useState } from "react";

const IntroContext = createContext(true);

// True once the preloader has started to lift (or was never shown). The hero waits for this before it animates in.
export const useIntroDone = () => useContext(IntroContext);

// The preloader itself is plain HTML and CSS in index.html, so it paints before this script has loaded.
// Here we only decide when to lift it: once its letters have landed and the app is mounted.
const LETTERS_LANDED_MS = 720;
const LIFT_MS = 400;

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
    const elapsed = performance.now() - (window.__introStart ?? 0);
    const timer = setTimeout(
      () => {
        curtain.classList.add("is-leaving");
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {
          // Storage can be blocked; the preloader then simply shows again next time.
        }
        setDone(true);
        setTimeout(() => curtain.remove(), LIFT_MS + 50);
      },
      Math.max(0, LETTERS_LANDED_MS - elapsed),
    );
    return () => clearTimeout(timer);
  }, []);

  return <IntroContext.Provider value={done}>{children}</IntroContext.Provider>;
}
