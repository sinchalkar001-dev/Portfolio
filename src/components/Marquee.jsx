import { cx } from "../lib/hooks";

// An endless horizontal strip. The content is laid out twice and the track slides by exactly one copy,
// so the loop has no seam. `repeat` widens each copy for content that is narrower than a wide screen.
// Only the very first copy is exposed to screen readers.
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
      className={cx("marquee", className)}
      data-paused={paused || undefined}
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
