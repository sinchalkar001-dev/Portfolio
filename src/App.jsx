import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { IntroProvider } from "./lib/intro";
import { ScrollTrigger } from "./lib/motion";
import { SmoothScroll, useScroll } from "./lib/scroll";
import Home from "./pages/Home";

// Case studies are a separate download, fetched the first time one is opened.
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <IntroProvider>
          <Header />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            <Suspense fallback={<div className="min-h-svh" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<CaseStudy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <RouteScroll />
        </IntroProvider>
      </SmoothScroll>
    </BrowserRouter>
  );
}

// Where each history entry was scrolled to, so Back and Forward return to the same spot.
const positions = new Map();

// Puts the page where it should be after every navigation:
// the remembered position for Back and Forward, the linked section for a #hash, otherwise the top.
// Animations themselves are cleaned up by each component's useGSAP scope when the old route unmounts.
function RouteScroll() {
  const { key, pathname, hash } = useLocation();
  const type = useNavigationType();
  const scroll = useScroll();
  const currentKey = useRef(key);
  const firstRender = useRef(true);

  useEffect(() => {
    // We place the page ourselves. Tell ScrollTrigger too, or it hands scroll restoration
    // back to the browser after every refresh and the two fight over the Back button.
    ScrollTrigger.clearScrollMemory("manual");
    const remember = () => positions.set(currentKey.current, window.scrollY);
    window.addEventListener("scroll", remember, { passive: true });
    return () => window.removeEventListener("scroll", remember);
  }, []);

  useLayoutEffect(() => {
    currentKey.current = key;
    const remembered = type === "POP" ? positions.get(key) : undefined;
    const id = hash ? decodeURIComponent(hash.slice(1)) : null;
    let frame = 0;
    let tries = 0;

    // A fresh load with no #hash is already at the top: nothing to place, nothing to measure.
    if (firstRender.current && !id) {
      firstRender.current = false;
      return;
    }

    // A lazy route may not have rendered yet, so retry for a moment until the target exists.
    const settle = () => {
      const target = id ? document.getElementById(id) : null;
      const pageIsTallEnough = document.documentElement.scrollHeight >= (remembered ?? 0) + window.innerHeight;
      const waiting = remembered !== undefined ? !pageIsTallEnough : id !== null && !target;
      if (waiting && tries++ < 90) {
        frame = requestAnimationFrame(settle);
        return;
      }
      if (remembered !== undefined) scroll.scrollTo(remembered, { immediate: true });
      else if (target) scroll.scrollTo(target, { immediate: true });
      else scroll.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };
    settle();

    // After a link click, start keyboard and screen-reader users at the top of the new page.
    if (!firstRender.current && type !== "POP" && !id) {
      document.getElementById("main")?.focus({ preventScroll: true });
    }
    firstRender.current = false;

    return () => cancelAnimationFrame(frame);
  }, [key, pathname, hash, type, scroll]);

  return null;
}
