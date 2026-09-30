import { skills } from "../data";
import { Container, SectionHeader } from "./ui";

export default function Stack() {
  return (
    <section id="stack" className="py-20 sm:py-28">
      <Container>
        <SectionHeader title="Stack" />
        <dl className="mt-12 border-t border-line">
          {skills.map((row) => (
            <div key={row.group} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
              <dt className="text-[15px] text-muted">{row.group}</dt>
              <dd className="text-[17px] leading-relaxed text-fg">{row.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
