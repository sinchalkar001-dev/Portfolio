import { cx } from "../lib";

export function Container({ className, children }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

const buttonBase =
  "inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98]";

const buttonVariants = {
  // Lime: Sinchal's own calls to action
  primary: "bg-accent text-accent-ink hover:bg-[#d8fb80]",
  // Hover is drawn in the visitor's color
  secondary: "border border-line-strong text-fg hover:border-peer hover:text-peer",
};

export function ButtonLink({ variant = "primary", className, children, ...props }) {
  return (
    <a className={cx(buttonBase, buttonVariants[variant], className)} {...props}>
      {children}
    </a>
  );
}

export function SectionHeader({ title, children }) {
  return (
    <header className="border-t border-line pt-8">
      <h2 className="text-[clamp(2.1rem,4.4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">{title}</h2>
      {children && <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{children}</p>}
    </header>
  );
}

// The editor-style name flag used by both collaborators
export function NameFlag({ who, className, children }) {
  return (
    <span
      className={cx(
        "inline-block rounded-sm px-1.5 py-0.75 font-mono text-[11px] leading-none font-semibold whitespace-nowrap text-accent-ink",
        who === "you" ? "bg-peer" : "bg-accent",
        className,
      )}
    >
      {children ?? (who === "you" ? "you" : "Sinchal")}
    </span>
  );
}
