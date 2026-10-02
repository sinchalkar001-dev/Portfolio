import { useRef } from "react";
import { cx, useOnScreen } from "../lib/hooks";

// An endless horizontal strip. The content is laid out twice and the track slides by exactly one copy,
// so the loop has no seam. `repeat` widens each copy for content that is narrower than a wide screen.
// Only the very first copy is exposed to screen readers.
//
// The strip only runs while it is on screen. Off screen the browser cannot hand the animation to the
// compositor, so it would otherwise recompute styles on the main thread for every frame, unseen.
export default function Marquee({
  children,
  repeat = 1,
  duration = 40,
  reverse = false,
  paused = false,
  pauseOnHover = false,
  wrapWhenStill = false,
  className,
}) {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  const group = (duplicate) => (
    <div className="marquee__group" data-marquee-copy={duplicate || undefined} aria-hidden={duplicate || undefined}>
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className="flex shrink-0 items-center"
          data-marquee-copy={i > 0 || undefined}
          aria-hidden={(!duplicate && i > 0) || undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className={cx("marquee", className)}
      data-paused={paused || !onScreen || undefined}
      data-pause-on-hover={pauseOnHover || undefined}
      data-wrap-when-still={wrapWhenStill || undefined}
      style={{ "--marquee-duration": `${duration}s` }}
    >
      <div className="marquee__track" data-reverse={reverse || undefined}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
