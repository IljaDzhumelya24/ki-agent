"use client";

import type { FormEvent } from "react";

const fieldClassName =
  "mt-2 min-h-12 w-full border border-black/25 bg-white px-4 py-3 text-base text-[var(--ink)] outline-none transition-[border-color,box-shadow] placeholder:text-black/45 focus:border-black focus:shadow-[inset_0_0_0_1px_#0b0c0c]";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Anfrage von ${name}${business ? ` · ${business}` : ""}`);
    const details = [`Name: ${name}`, `E-Mail: ${email}`];
    if (business) details.push(`Betrieb: ${business}`);
    const body = encodeURIComponent(["Hallo,", "", message, "", ...details].join("\n"));

    window.location.href = `mailto:demo@placeholder.ai?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form mt-8 border-t border-black/20 pt-7">
      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold" htmlFor="contact-name">
          Dein Name
          <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Wie heißt du?" className={fieldClassName} />
        </label>
        <label className="block text-sm font-semibold" htmlFor="contact-email">
          Deine E-Mail
          <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="name@betrieb.de" className={fieldClassName} />
        </label>
        <label className="block text-sm font-semibold sm:col-span-2" htmlFor="contact-business">
          Dein Betrieb <span className="font-normal text-[var(--graphite)]">(optional)</span>
          <input id="contact-business" name="business" type="text" autoComplete="organization" placeholder="Name deines Betriebs" className={fieldClassName} />
        </label>
        <label className="block text-sm font-semibold sm:col-span-2" htmlFor="contact-message">
          Deine Nachricht
          <textarea id="contact-message" name="message" required rows={4} placeholder="Was soll für dich leichter werden?" className={`${fieldClassName} min-h-28 resize-y`} />
        </label>
      </div>

      <div className="mt-7">
        <button type="submit" className="group flex min-h-13 w-full items-center justify-between gap-7 border border-black bg-black px-6 font-mono text-[0.75rem] font-bold uppercase tracking-[0.07em] text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
          E-Mail vorbereiten <span aria-hidden="true" className="text-lg font-normal transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </button>
        <p className="mt-3 text-xs leading-relaxed text-[var(--graphite)]">Dein Mailprogramm öffnet sich mit der vorbereiteten Nachricht. Erst dort wird sie gesendet.</p>
      </div>
    </form>
  );
}
