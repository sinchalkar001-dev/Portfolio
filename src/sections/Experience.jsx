import RiseWords from "../components/RiseWords";
import { experience, labels } from "../data/portfolio";
import { reveal } from "../lib/reveal";

const ROW =
  "reveal grid gap-x-10 gap-y-4 border-b border-line py-9 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:py-11";

export default function Experience() {
  return (
    <section id="experience" tabIndex={-1} className="py-24 focus:outline-none lg:py-28">
      <div className="container-page">
        <RiseWords text={experience.heading} className="display text-d2" />

        <ol className="mt-10 border-t border-line lg:mt-14">
          {experience.items.map((item) => (
            <li key={item.title} ref={reveal} className={ROW}>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-2 self-start text-muted tabular-nums lg:pt-2">
                {item.period}
                {item.current && (
                  <span className="inline-flex items-center gap-2 text-small font-semibold text-accent">
                    <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
                    {labels.now}
                  </span>
                )}
              </p>
              <div>
                <h3 className="display text-d3">{item.title}</h3>
                <p className="mt-3 text-lg text-muted">{item.org}</p>
                {item.detail && <p className="mt-4 max-w-[62ch] text-lg">{item.detail}</p>}
              </div>
            </li>
          ))}
        </ol>

        <div ref={reveal} className={ROW}>
          <h3 className="self-start text-muted lg:pt-2">{experience.certificationsHeading}</h3>
          <ul className="space-y-4">
            {experience.certifications.map((cert) => (
              <li key={cert.name} className="text-lg">
                <span className="font-semibold">{cert.name}</span>
                <span className="text-muted">, {cert.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
