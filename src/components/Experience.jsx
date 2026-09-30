import { certifications, timeline } from "../data";
import { cx } from "../lib";
import { Container, SectionHeader } from "./ui";

export default function Experience() {
  return (
    <section id="log" className="py-20 sm:py-28">
      <Container>
        <SectionHeader title="Experience & education" />
        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <ol className="lg:col-span-7">
            {timeline.map((item, i) => (
              <li key={item.title} className="relative pb-12 pl-9 last:pb-0">
                {i < timeline.length - 1 && (
                  <span aria-hidden="true" className="absolute top-3 bottom-0 left-1.25 w-px bg-line" />
                )}
                <span
                  aria-hidden="true"
                  className={cx(
                    "absolute top-1.75 left-0 size-2.75 rounded-full border-2",
                    item.current ? "border-accent bg-accent" : "border-line-strong bg-bg",
                  )}
                />
                <p className="text-[14px] text-faint tabular-nums">
                  {item.when}
                  {item.current && <span className="ml-3 text-accent">now</span>}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em] sm:text-2xl">{item.title}</h3>
                <p className="mt-1 text-fg">{item.org}</p>
                {item.meta && <p className="mt-1 text-[15px] text-muted">{item.meta}</p>}
                {item.body && <p className="mt-3 max-w-xl leading-relaxed text-muted">{item.body}</p>}
              </li>
            ))}
          </ol>

          <div className="self-start rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:col-span-5">
            <h3 className="text-lg font-semibold">Certifications</h3>
            <ul className="mt-3 divide-y divide-line">
              {certifications.map((cert) => (
                <li key={cert.name} className="py-4 last:pb-0">
                  <p className="text-fg">{cert.name}</p>
                  <p className="mt-0.5 text-[14px] text-muted">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
