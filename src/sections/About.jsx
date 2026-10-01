import { about } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" tabIndex={-1} className="py-24 focus:outline-none lg:py-32">
      <div className="container-page">
        <h2 className="display mx-auto max-w-[22ch] text-center text-d1">{about.statement}</h2>

        <div className="mx-auto mt-16 grid max-w-6xl gap-x-16 gap-y-12 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <dl className="grid content-start gap-x-8 sm:grid-cols-2 lg:grid-cols-1">
            {about.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1 border-t border-line py-7">
                <dt className="max-w-[24ch] leading-normal text-muted">{stat.label}</dt>
                <dd className="display text-d1 tabular-nums">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="max-w-[68ch] space-y-6 text-lg lg:pt-7">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
