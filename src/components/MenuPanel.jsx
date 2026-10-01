import { useEffect, useRef } from "react";
import { LuDownload, LuMail, LuMapPin, LuX } from "react-icons/lu";
import { labels, nav, site } from "../data/portfolio";
import { cx } from "../lib/hooks";
import { useScroll } from "../lib/scroll";
import { Button, SectionLink, socialIcon } from "./ui";

// The off-canvas panel behind the menu button: contact details on desktop,
// and the full-screen menu (section links first) on phones and tablets.
// A native <dialog> gives it the focus trap, Escape to close and an inert page behind for free.
export default function MenuPanel({ open, onClose, active }) {
  const dialogRef = useRef(null);
  const locked = useRef(false);
  const scroll = useScroll();

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

  // Unlock first: releasing the lock resets Lenis, which would cancel a scroll started by a menu link.
  const close = () => {
    release();
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="menu-panel"
      aria-label={labels.menu}
      data-lenis-prevent
      onClose={() => {
        release();
        onClose();
      }}
      onClick={(event) => event.target === dialogRef.current && close()}
    >
      <div className="flex min-h-full flex-col px-5 pb-8 sm:px-8 lg:px-10 lg:pb-10">
        <div className="flex h-(--header-h) shrink-0 items-center justify-end">
          <button
            type="button"
            onClick={close}
            className="grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <LuX className="size-5" aria-hidden="true" />
            <span className="sr-only">{labels.closeMenu}</span>
          </button>
        </div>

        <nav aria-label="Primary" className="mt-2 lg:hidden">
          <ul className="border-t border-line">
            {nav.map((item) => (
              <li key={item.id} className="border-b border-line">
                <SectionLink
                  id={item.id}
                  onNavigate={close}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cx(
                    "display block py-4 text-[clamp(2.25rem,9vw,3.25rem)] transition-colors duration-200",
                    active === item.id ? "text-accent" : "text-fg hover:text-accent",
                  )}
                >
                  {item.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <h2 className="display mt-10 text-d3 lg:mt-6">{labels.menuHeading}</h2>

        <dl className="mt-8 space-y-7">
          <div className="flex gap-4">
            <LuMapPin className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <dt className="text-small text-muted">{labels.location}</dt>
              <dd className="mt-0.5 text-lg">{site.location}</dd>
            </div>
          </div>
          <div className="flex gap-4">
            <LuMail className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="text-small text-muted">{labels.email}</dt>
              <dd className="mt-0.5 text-lg">
                <a
                  href={`mailto:${site.email}`}
                  className="wrap-break-word underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                >
                  {site.email}
                </a>
              </dd>
            </div>
          </div>
        </dl>

        <p className="mt-9 text-small text-muted">{labels.elsewhere}</p>
        <ul className="mt-3 space-y-1">
          {site.socials.map(({ label, href }) => {
            const Icon = socialIcon(label);
            return (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-12 items-center gap-4 text-lg"
                >
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                  <span className="underline decoration-line-strong underline-offset-4 transition-colors duration-200 group-hover:decoration-accent">
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-10">
          <Button href={site.resume} download={site.resumeFileName} className="w-full">
            <LuDownload className="size-4" aria-hidden="true" />
            {labels.downloadCv}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
