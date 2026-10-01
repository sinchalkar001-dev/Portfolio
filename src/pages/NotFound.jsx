import { Button } from "../components/ui";
import { labels, site } from "../data/portfolio";
import { useDocumentTitle } from "../lib/hooks";

export default function NotFound() {
  useDocumentTitle(`${labels.notFoundTitle} | ${site.name}`);
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-start justify-center pt-(--header-h)">
      <h1 className="display text-d1">{labels.notFoundTitle}</h1>
      <p className="mt-5 text-lg text-muted">{labels.notFoundBody}</p>
      <Button to="/" className="mt-9">
        {labels.notFoundAction}
      </Button>
    </section>
  );
}
