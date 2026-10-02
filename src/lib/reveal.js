// Decides when a block comes in as the page is scrolled. How it looks while it waits and how it
// arrives are CSS (see "Scroll motion" in index.css); this file only sets `data-revealed` at the right moment.
//
// A block is shown once its top edge has come up past a line near the bottom of the screen.
// It is reset only when it is back below the screen, out of sight, so it plays again on the way down
// and nothing ever fades out while it is being looked at.
//
// Both observers reach far above the screen. Whatever has been scrolled past, or jumped past by a link,
// counts as "in", so content above the screen is never left hidden.
//
// Use: <div ref={reveal} className="reveal">, or the RiseWords component for a heading.

const ABOVE = "100000px";
const SHOW_LINE = "-12%"; // the line a block's top edge has to cross, measured up from the bottom of the screen
const RESET_BELOW = "96px"; // how far under the screen a block has to be before it is reset

let entering;
let leaving;
let started = false;
const waiting = new Set();

function watch(node) {
  entering ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) entry.target.setAttribute("data-revealed", "");
    },
    { rootMargin: `${ABOVE} 0px ${SHOW_LINE} 0px` },
  );
  leaving ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (!entry.isIntersecting) entry.target.removeAttribute("data-revealed");
    },
    { rootMargin: `${ABOVE} 0px ${RESET_BELOW} 0px` },
  );
  entering.observe(node);
  leaving.observe(node);
}

// Reveals wait for this. It is called when the preloader starts to lift,
// so blocks at the top of a page come in as the page appears rather than behind the curtain.
export function startReveals() {
  if (started) return;
  started = true;
  waiting.forEach(watch);
  waiting.clear();
}

// A ref callback: <div ref={reveal} className="reveal">
export function reveal(node) {
  if (!node) return;
  if (started) watch(node);
  else waiting.add(node);
  return () => {
    waiting.delete(node);
    entering?.unobserve(node);
    leaving?.unobserve(node);
  };
}
