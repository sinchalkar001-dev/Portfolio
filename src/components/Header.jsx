import { useMemo, useState } from "react";
import { useLocation } from "react-router";
import { LuDownload, LuMenu } from "react-icons/lu";
import { labels, nav, site } from "../data/portfolio";
import { cx, useActiveSection } from "../lib/hooks";
import MenuPanel from "./MenuPanel";
import { Button, Logo, SectionLink } from "./ui";

export default function Header() {
  const { pathname } = useLocation();
  const ids = useMemo(() => nav.map((item) => item.id), []);
  const active = useActiveSection(ids, pathname === "/");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
      >
        {labels.skipLink}
      </a>

      <header data-site-header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink">
        <div className="container-page flex h-(--header-h) items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {nav.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    id={item.id}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cx(
                      "inline-flex h-12 items-center px-4 text-small font-medium transition-colors duration-200",
                      active === item.id ? "text-accent" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* On phones the CV button lives in the menu instead. */}
            <div className="max-sm:hidden">
              <Button href={site.resume} download={site.resumeFileName}>
                <LuDownload className="size-4" aria-hidden="true" />
                {labels.downloadCv}
              </Button>
            </div>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <LuMenu className="size-5" aria-hidden="true" />
              <span className="sr-only">{labels.openMenu}</span>
            </button>
          </div>
        </div>
      </header>

      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  );
}
