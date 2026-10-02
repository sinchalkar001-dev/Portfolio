import FillText from "../components/FillText";
import { about } from "../data/portfolio";
import { reveal } from "../lib/reveal";

export default function About() {
  return (
    <section id="about" tabIndex={-1} className="py-24 focus:outline-none lg:py-32">
      <div className="container-page">
        <FillText text={about.statement} className="display mx-auto max-w-[22ch] text-center text-d1" />

        <div className="mx-auto mt-16 grid max-w-6xl gap-x-16 gap-y-12 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <dl className="grid content-start gap-x-8 sm:grid-cols-2 lg:grid-cols-1">
            {about.stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={reveal}
                className="reveal flex flex-col-reverse gap-1 border-t border-line py-7"
                style={{ "--reveal-delay": `${i * 90}ms` }}
              >
                <dt className="max-w-[24ch] leading-normal text-muted">{stat.label}</dt>
                <dd className="display text-d1 tabular-nums">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="max-w-[68ch] space-y-6 text-lg lg:pt-7">
            {about.paragraphs.map((paragraph, i) => (
              <p key={paragraph} ref={reveal} className="reveal" style={{ "--reveal-delay": `${120 + i * 90}ms` }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
