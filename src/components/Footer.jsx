import { useRef } from "react";
import { LuArrowUp } from "react-icons/lu";
import { footer, labels, nav, site } from "../data/portfolio";
import { reveal } from "../lib/reveal";
import { useScroll } from "../lib/scroll";
import { useFitText } from "../lib/useFitText";
import { Words } from "./RiseWords";
import { Logo, SectionLink, SocialLinks } from "./ui";

export default function Footer() {
  const scroll = useScroll();
  const nameRef = useRef(null);
  useFitText(nameRef, { id: "footer-name", bleedStart: 0.023, bleedEnd: -0.005, lazy: true });

  return (
    <footer className="border-t border-line">
      <div className="container-page">
        <div className="flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div ref={reveal} className="reveal">
            <Logo />
          </div>
          <nav ref={reveal} aria-label={labels.footerNav} className="reveal" style={{ "--reveal-delay": "90ms" }}>
            <ul className="-mx-3 flex flex-wrap">
              {nav.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    id={item.id}
                    className="inline-flex min-h-11 items-center px-3 text-muted transition-colors duration-200 hover:text-fg"
                  >
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div ref={reveal} className="reveal" style={{ "--reveal-delay": "180ms" }}>
            <SocialLinks />
          </div>
        </div>

        {/* The name, fitted to the page like the hero word it answers, and rising into place the same way.
            Decorative: the logo above already says it. */}
        <div ref={reveal} className="rise-words overflow-y-clip border-t border-line pt-8 lg:pt-10">
          <p
            ref={nameRef}
            aria-hidden="true"
            className="display inline-block text-[19vw] leading-[0.8] whitespace-nowrap text-line-strong uppercase"
          >
            <Words text={site.name} />
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-8">
          <p className="text-small text-muted">
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </p>
          <button
            type="button"
            onClick={() => scroll.scrollTo(0)}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-5 text-small font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            {labels.backToTop}
            <LuArrowUp className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
