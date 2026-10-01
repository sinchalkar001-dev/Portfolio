import { useRef, useState } from "react";
import { LuCircleAlert, LuCircleCheck, LuLoaderCircle, LuSend } from "react-icons/lu";
import { contact, site } from "../data/portfolio";
import { cx } from "../lib/hooks";
import { Button } from "./ui";

const { form, emailjs: emailjsConfig } = contact;
const FIELDS = ["name", "email", "message"];
const EMPTY = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = form.errors.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = form.errors.email;
  if (values.message.trim().length < 10) errors.message = form.errors.message;
  return errors;
}

// Name, email and message, sent through EmailJS.
// Each field is checked when you leave it and again as you fix it; the result of sending is always spelled out.
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed | handed-off
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  const errors = validate(values);
  const shown = (field) => (touched[field] ? errors[field] : undefined);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };
  const onBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = FIELDS.find((field) => errors[field]);
    if (firstInvalid) {
      refs[firstInvalid].current.focus();
      return;
    }

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();
    const { serviceId, templateId, publicKey } = emailjsConfig;

    // Until EmailJS is set up in portfolio.js, hand the message to the visitor's own email app.
    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`${form.subject} ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("handed-off");
      return;
    }

    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        { name, email, message, from_name: name, reply_to: email },
        { publicKey },
      );
      setValues(EMPTY);
      setTouched({});
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const field = (name, extra) => ({
    ref: refs[name],
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    required: true,
    "aria-invalid": shown(name) ? "true" : undefined,
    "aria-describedby": shown(name) ? `contact-${name}-error` : undefined,
    className: cx(
      "mt-2 block w-full rounded-xl border bg-ink px-4 py-3.5 text-fg transition-colors duration-200",
      shown(name) ? "border-accent" : "border-line-strong hover:border-muted",
    ),
    ...extra,
  });

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="contact-name" className="font-semibold">
          {form.name}
        </label>
        <input type="text" autoComplete="name" {...field("name")} />
        <FieldError id="contact-name-error" message={shown("name")} />
      </div>
      <div>
        <label htmlFor="contact-email" className="font-semibold">
          {form.email}
        </label>
        <input type="email" autoComplete="email" inputMode="email" spellCheck={false} {...field("email")} />
        <FieldError id="contact-email-error" message={shown("email")} />
      </div>
      <div>
        <label htmlFor="contact-message" className="font-semibold">
          {form.message}
        </label>
        <textarea rows={6} {...field("message", { "data-lenis-prevent": true })} />
        <FieldError id="contact-message-error" message={shown("message")} />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button type="submit" disabled={status === "sending"} aria-busy={status === "sending" || undefined}>
          {status === "sending" ? (
            <>
              <LuLoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              {form.sending}
            </>
          ) : (
            <>
              <LuSend className="size-4" aria-hidden="true" />
              {form.submit}
            </>
          )}
        </Button>
      </div>

      <div aria-live="polite">
        {status === "sent" && (
          <p className="flex gap-3 font-semibold">
            <LuCircleCheck className="mt-[0.2em] size-[1.15em] shrink-0 text-accent" aria-hidden="true" />
            {form.success}
          </p>
        )}
        {status === "handed-off" && (
          <p className="flex gap-3">
            <LuCircleCheck className="mt-[0.2em] size-[1.15em] shrink-0 text-accent" aria-hidden="true" />
            <span>
              {form.viaEmailApp} <EmailLink />.
            </span>
          </p>
        )}
      </div>
      {status === "failed" && (
        <p role="alert" className="flex gap-3 font-semibold">
          <LuCircleAlert className="mt-[0.2em] size-[1.15em] shrink-0 text-accent" aria-hidden="true" />
          <span>
            {form.failure} <EmailLink />.
          </span>
        </p>
      )}
    </form>
  );
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-small text-accent">
      <LuCircleAlert className="size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function EmailLink() {
  return (
    <a href={`mailto:${site.email}`} className="underline decoration-accent underline-offset-4">
      {site.email}
    </a>
  );
}
