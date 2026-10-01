import { Link, useLocation } from "react-router";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import { site } from "../data/portfolio";
import { cx } from "../lib/hooks";
import { useScroll } from "../lib/scroll";

const BUTTON_BASE =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-small leading-none font-semibold whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const BUTTON_VARIANTS = {
  primary: "bg-accent text-ink hover:bg-accent-hover",
  ghost: "border border-line-strong text-fg hover:border-fg",
};

// Renders a router link (`to`), a plain link (`href`) or a button, all with the same look.
export function Button({ variant = "primary", className, to, href, external, children, ...props }) {
  const classes = cx(BUTTON_BASE, BUTTON_VARIANTS[variant], className);
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

// A link to a section of the home page. On the home page it glides there; from any other page it routes home first.
export function SectionLink({ id, onNavigate, children, ...props }) {
  const { pathname } = useLocation();
  const scroll = useScroll();

  const onClick = (event) => {
    onNavigate?.(event);
    if (pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const target = document.getElementById(id);
    scroll.scrollTo(target, { onComplete: () => target?.focus({ preventScroll: true }) });
    window.history.replaceState(window.history.state, "", `#${id}`);
  };

  return (
    <Link to={{ pathname: "/", hash: `#${id}` }} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}

// Monogram and name: the site's logo. Goes to the top of the home page.
export function Logo({ className, onNavigate }) {
  const { pathname } = useLocation();
  const scroll = useScroll();

  const onClick = (event) => {
    onNavigate?.(event);
    if (pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    scroll.scrollTo(0);
    window.history.replaceState(window.history.state, "", "/");
  };

  return (
    <Link to="/" onClick={onClick} className={cx("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="display grid size-10 place-items-center rounded-[0.625rem] border-2 border-fg text-xl leading-none tracking-normal"
      >
        {site.monogram}
      </span>
      <span className="leading-none font-semibold whitespace-nowrap">{site.name}</span>
    </Link>
  );
}

const SOCIAL_ICONS = { GitHub: FaGithub, LinkedIn: FaLinkedinIn };

export const socialIcon = (label) => SOCIAL_ICONS[label] ?? LuLink;

// Round icon links for the social profiles.
export function SocialLinks({ className }) {
  return (
    <ul className={cx("flex gap-3", className)}>
      {site.socials.map(({ label, href }) => {
        const Icon = socialIcon(label);
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-12 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Icon className="size-5" aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
