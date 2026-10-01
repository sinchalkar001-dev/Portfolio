import { useEffect, useRef } from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { caseStudy } from "../data/portfolio";
import { useScroll } from "../lib/scroll";

const CONTROL =
  "grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong bg-ink text-fg transition-colors duration-200 hover:border-accent hover:text-accent";

// Full-screen viewer for a case study's screenshots. `index` is the open image, or null when closed.
// Left and right arrow keys move between images; Escape or a click on the backdrop closes it.
export default function Lightbox({ images, index, onIndex, onClose }) {
  const dialogRef = useRef(null);
  const locked = useRef(false);
  const scroll = useScroll();
  const open = index !== null;
  const image = open ? images[index] : null;

  const release = () => {
    if (!locked.current) return;
    locked.current = false;
    scroll.unlock();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) {
      dialog.showModal();
      locked.current = true;
      scroll.lock();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, scroll]);

  useEffect(() => release, []);

  const step = (delta) => onIndex((index + delta + images.length) % images.length);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={caseStudy.screenshots}
      data-lenis-prevent
      onClose={() => {
        release();
        onClose();
      }}
      onKeyDown={(event) => {
        if (!open || images.length < 2) return;
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
    >
      {image && (
        <div
          className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-4 p-4 sm:p-6"
          onClick={(event) => event.target === event.currentTarget && dialogRef.current.close()}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-small text-muted tabular-nums" aria-live="polite">
              {index + 1} / {images.length}
            </p>
            <button type="button" className={CONTROL} onClick={() => dialogRef.current.close()}>
              <LuX className="size-5" aria-hidden="true" />
              <span className="sr-only">{caseStudy.closeImage}</span>
            </button>
          </div>

          <div
            className="flex min-h-0 items-center justify-center"
            onClick={(event) => event.target === event.currentTarget && dialogRef.current.close()}
          >
            <img
              key={image.src}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              className="max-h-full w-auto max-w-full rounded-xl border border-line object-contain"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="max-w-[70ch] text-small leading-normal text-muted">{image.alt}</p>
            {images.length > 1 && (
              <div className="flex shrink-0 gap-3">
                <button type="button" className={CONTROL} onClick={() => step(-1)}>
                  <LuChevronLeft className="size-5" aria-hidden="true" />
                  <span className="sr-only">{caseStudy.previousImage}</span>
                </button>
                <button type="button" className={CONTROL} onClick={() => step(1)}>
                  <LuChevronRight className="size-5" aria-hidden="true" />
                  <span className="sr-only">{caseStudy.nextImage}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
