import RiseWords from "../components/RiseWords";
import { Button } from "../components/ui";
import { labels, site } from "../data/portfolio";
import { usePageMeta } from "../lib/hooks";
import { reveal } from "../lib/reveal";

export default function NotFound() {
  usePageMeta(`${labels.notFoundTitle} | ${site.name}`);
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-start justify-center pt-(--header-h)">
      <RiseWords as="h1" text={labels.notFoundTitle} className="display text-d1" />
      <p ref={reveal} className="reveal mt-5 text-lg text-muted" style={{ "--reveal-delay": "150ms" }}>
        {labels.notFoundBody}
      </p>
      <div ref={reveal} className="reveal mt-9" style={{ "--reveal-delay": "240ms" }}>
        <Button to="/">{labels.notFoundAction}</Button>
      </div>
    </section>
  );
}
