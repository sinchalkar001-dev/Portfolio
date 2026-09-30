import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../data";
import { cx, useActiveSection, useScrolledPast } from "../lib";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "log", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
const IDS = LINKS.map((l) => l.id);

export default function Nav() {
  const scrolled = useScrolledPast(8);
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.01em] text-fg">
          <Mark />
          Sinchal Kar
        </a>

        <SectionLinks active={active} />

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener"
            className="inline-flex h-10 items-center rounded-lg border border-line-strong px-4 text-[14px] font-medium text-fg transition-colors duration-200 hover:border-peer hover:text-peer"
          >
            Résumé
          </a>
          <button
            type="button"
            className="grid size-11 cursor-pointer place-items-center rounded-lg text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line px-5 pb-4 md:hidden">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? "location" : undefined}
                className={cx(
                  "flex h-12 items-center border-b border-line text-[17px]",
                  active === link.id ? "text-accent" : "text-fg",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

// Desktop section links with a marker that slides to whichever section you're reading
function SectionLinks({ active }) {
  const listRef = useRef(null);
  const [marker, setMarker] = useState(null);

  useLayoutEffect(() => {
    const place = () => {
      const item = active && listRef.current?.querySelector(`a[href="#${active}"]`)?.parentElement;
      setMarker(item ? { x: item.offsetLeft, width: item.offsetWidth } : null);
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <ul ref={listRef} className="relative hidden items-center md:flex">
      <li
        aria-hidden="true"
        className="absolute inset-y-0 left-0 rounded-md bg-raised transition-[transform,width,opacity] duration-500 ease-out-quart"
        style={marker ? { transform: `translateX(${marker.x}px)`, width: marker.width } : { opacity: 0, width: 0 }}
      >
        <span className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-accent" />
      </li>
      {LINKS.map((link) => (
        <li key={link.id} className="relative">
          <a
            href={`#${link.id}`}
            aria-current={active === link.id ? "location" : undefined}
            className={cx(
              "block rounded-md px-3 py-2 text-[14px] transition-colors duration-200",
              active === link.id ? "text-fg" : "text-muted hover:text-peer",
            )}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

// The site mark: a text caret with its collaborator flag
function Mark() {
  return (
    <svg viewBox="0 0 14 20" className="h-5 w-3.5 text-accent" aria-hidden="true">
      <rect x="0" y="0" width="3" height="20" rx="1" fill="currentColor" />
      <rect x="3" y="0" width="10" height="7" rx="1.5" fill="currentColor" />
    </svg>
  );
}
