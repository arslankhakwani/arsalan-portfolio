"use client";

import React, { useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export function ContactSection() {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "fallback" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const subjectText = `Portfolio Inquiry from ${name || "Hiring Team"}`;
  const bodyText = `Hi Muhammad Arsalan,\n\n${message}\n\n---\nFrom: ${name}\nReply-to: ${senderEmail}`;

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    profile.email
  )}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

  const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(bodyText)}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!WEB3FORMS_KEY) {
      setStatus("fallback");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: subjectText,
          from_name: name,
          email: senderEmail,
          replyto: senderEmail,
          message,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("sent");
        setName("");
        setSenderEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(
          data.message ||
            "Could not send message. Please use Gmail or direct email."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error while sending. Please use Gmail or direct email below."
      );
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Direct Contact Options */}
            <div className="lg:col-span-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                Direct Channels
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
                Prefer reaching out directly?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                I&apos;m based in {profile.location} and open to remote or
                relocation roles. Email is the fastest way to reach me.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    profile.email
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-sm font-semibold text-on-accent shadow-glow transition-all duration-200 hover:scale-[1.02] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email me</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-text shadow-card transition-all duration-200 hover:border-accent/50 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-success" />
                      <span>Copied email</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-accent" />
                      <span>{profile.email}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 space-y-3 border-t border-border/80 pt-6">
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface/90 px-4 py-3.5 text-sm font-medium text-text shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="inline-flex items-center gap-3">
                    <Linkedin className="h-4 w-4 text-accent" />
                    <span>LinkedIn</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-text-muted" />
                </a>

                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface/90 px-4 py-3.5 text-sm font-medium text-text shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="inline-flex items-center gap-3">
                    <Github className="h-4 w-4 text-accent-2" />
                    <span>GitHub</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-text-muted" />
                </a>
              </div>
            </div>

            {/* Gradient-bordered Message Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-gradient-to-br from-accent/45 via-accent-2/35 to-border p-[1px] shadow-card-hover">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[calc(1rem-1px)] bg-surface/95 p-6 backdrop-blur-xl sm:p-8"
                >
                  <h3 className="font-display text-lg font-bold text-text">
                    Send a quick message
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">
                    {WEB3FORMS_KEY
                      ? `Sends directly to ${profile.email}.`
                      : `Delivers to ${profile.email} via Gmail or your mail app.`}
                  </p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-text"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="mt-1.5 w-full rounded-xl border border-border bg-bg-soft/80 px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/75 transition-all focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/25"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-text"
                      >
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className="mt-1.5 w-full rounded-xl border border-border bg-bg-soft/80 px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/75 transition-all focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/25"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-text"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about the role, team, or project..."
                        className="mt-1.5 w-full rounded-xl border border-border bg-bg-soft/80 px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/75 transition-all focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/25"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-sm font-semibold text-on-accent shadow-glow transition-all duration-200 hover:scale-[1.01] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    {status === "sent" && (
                      <div className="rounded-xl border border-success/35 bg-success/10 p-3 text-xs font-medium text-success">
                        Message sent! Thanks for reaching out — I will reply to
                        your email soon.
                      </div>
                    )}

                    {status === "error" && (
                      <div className="space-y-2 rounded-xl border border-danger/35 bg-danger/10 p-3 text-xs text-danger">
                        <p>{errorMessage}</p>
                        <a
                          href={gmailComposeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-text underline"
                        >
                          <span>Send via Gmail instead</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}

                    {status === "fallback" && (
                      <div className="space-y-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-xs text-text">
                        <p className="font-semibold text-accent">
                          Choose how you want to send this message:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={gmailComposeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-3.5 py-2 font-semibold text-on-accent shadow-glow transition-opacity hover:opacity-95"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            <span>Send via Gmail (Web)</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <a
                            href={mailtoUrl}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 font-semibold text-text transition-colors hover:bg-surface-hover"
                          >
                            <span>Default Mail App</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
