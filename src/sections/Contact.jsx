import ContactForm from "../components/ContactForm";
import RiseWords from "../components/RiseWords";
import { SocialLinks } from "../components/ui";
import { contact, site } from "../data/portfolio";
import { reveal } from "../lib/reveal";

export default function Contact() {
  return (
    <section id="contact" tabIndex={-1} className="pb-24 focus:outline-none lg:pb-28">
      <div className="container-page">
        <div
          ref={reveal}
          className="reveal grid gap-x-16 gap-y-12 rounded-card bg-raised px-6 py-10 sm:p-10 lg:grid-cols-2 lg:p-16"
        >
          <div className="flex flex-col">
            <RiseWords text={contact.heading} className="display text-d1" />
            <p ref={reveal} className="reveal mt-6 max-w-[38ch] text-lg text-muted" style={{ "--reveal-delay": "200ms" }}>
              {contact.line}
            </p>

            <div ref={reveal} className="reveal mt-10 lg:mt-auto lg:pt-16" style={{ "--reveal-delay": "120ms" }}>
              <a
                href={`mailto:${site.email}`}
                className="display text-[clamp(1.5rem,6.4vw,2.5rem)] break-all underline decoration-accent decoration-3 underline-offset-[0.22em] transition-colors duration-200 hover:text-accent lg:text-[clamp(1.75rem,2.6vw,2.75rem)]"
              >
                {site.email}
              </a>
              <SocialLinks className="mt-8" />
            </div>
          </div>

          <div ref={reveal} className="reveal" style={{ "--reveal-delay": "160ms" }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
