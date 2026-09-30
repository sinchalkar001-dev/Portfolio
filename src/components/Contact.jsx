import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { profile } from "../data";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Container } from "./ui";

const channels = [
  { label: "LinkedIn", handle: profile.linkedinHandle, href: profile.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", handle: profile.githubHandle, href: profile.github, Icon: GitHubIcon },
  { label: "Résumé", handle: "PDF, one page", href: profile.resume, Icon: FileText },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container>
        <div className="border-t border-line pt-8">
          <h2 className="max-w-[14em] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
            Let's build something that holds up.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Reach out about roles, projects or anything on this page.
          </p>
        </div>

        <EmailRow />

        <ul className="mt-12 max-w-3xl border-t border-line">
          {channels.map(({ label, handle, href, Icon }) => (
            <li key={label} className="border-b border-line">
              <a href={href} target="_blank" rel="noopener" className="group flex h-16 items-center gap-4">
                <Icon className="size-5 shrink-0 text-muted transition-colors duration-200 group-hover:text-peer" aria-hidden="true" />
                <span className="w-24 shrink-0 text-fg sm:w-32">{label}</span>
                <span className="min-w-0 flex-1 truncate text-muted transition-colors duration-200 group-hover:text-peer">
                  {handle}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-faint transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-peer"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function EmailRow() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${profile.email}`}
        className="text-[clamp(1.35rem,4vw,2.25rem)] font-medium tracking-[-0.02em] break-all text-fg underline decoration-line-strong decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-peer hover:decoration-peer"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-line-strong px-3.5 text-[14px] text-muted transition-colors duration-200 hover:border-peer hover:text-peer"
      >
        {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
