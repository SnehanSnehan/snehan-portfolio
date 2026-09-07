"use client";

import { useState } from "react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../lib/links";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwlkryek";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setConsent(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="mx-auto w-full max-w-xl flex-1 px-6 py-16">
        <h1 className="font-display text-3xl font-semibold">Contact</h1>
        <Reveal>
          <div className="mt-8 rounded-md border border-accent/40 bg-surface px-5 py-4 text-foreground">
            Message sent — I&apos;ll get back to you soon.
          </div>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-6 border-t border-border pt-8 text-sm">
          <a
            href={`mailto:${EMAIL}`}
            className="text-muted transition-colors hover:text-foreground"
          >
            Email
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold">Contact</h1>
      <p className="mt-2 text-muted">
        Send a message directly from this form — nothing is stored anywhere
        beyond delivering it to me.
      </p>

      <Reveal>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-muted">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
            />
            <span>
              I understand this message is sent via Formspree (a third-party
              form service) directly to Snehan&apos;s email — this site
              itself does not store any data.
            </span>
          </label>

          {status === "error" && (
            <div className="rounded-md border border-red-500/40 bg-surface px-4 py-3 text-sm text-red-400">
              Something went wrong sending that — please try again, or email
              directly at{" "}
              <a href={`mailto:${EMAIL}`} className="underline">
                {EMAIL}
              </a>
              .
            </div>
          )}

          <Magnetic className="mt-2 self-start">
            <button
              type="submit"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
              disabled={!consent || status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </Magnetic>
        </form>
      </Reveal>

      <Reveal className="mt-12 flex flex-wrap gap-6 border-t border-border pt-8 text-sm">
        <a
          href={`mailto:${EMAIL}`}
          className="text-muted transition-colors hover:text-foreground"
        >
          Email
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-foreground"
        >
          GitHub
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-foreground"
        >
          LinkedIn
        </a>
      </Reveal>
    </main>
  );
}
