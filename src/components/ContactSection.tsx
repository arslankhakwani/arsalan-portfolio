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
          data.message || "Could not send message. Please use Gmail or direct email."
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
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B192E] py-20 text-white sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[360px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Get In Touch
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  together
                </span>
                .
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
                Looking for a dependable Laravel backend developer or someone
                who can also step into an ASP.NET codebase? Send a note or
                reach out directly.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    profile.email
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email me</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-blue-400/50 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Copied email</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-cyan-400" />
                      <span>{profile.email}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-800 pt-6">
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  <Linkedin className="h-4 w-4 text-cyan-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                </a>

                <span className="text-slate-700">•</span>

                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  <Github className="h-4 w-4 text-blue-400" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-blue-400/20 bg-slate-900/75 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-md sm:p-8"
              >
                <h3 className="text-lg font-semibold text-white">
                  Send a quick message
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {WEB3FORMS_KEY
                    ? `Sends directly to ${profile.email}.`
                    : `Delivers to ${profile.email} via Gmail or your mail app.`}
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-slate-300"
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
                      className="mt-1.5 w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-slate-300"
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
                      className="mt-1.5 w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-slate-300"
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
                      className="mt-1.5 w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
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
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                      Message sent! Thanks for reaching out — I will reply to
                      your email soon.
                    </div>
                  )}

                  {status === "error" && (
                    <div className="space-y-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                      <p>{errorMessage}</p>
                      <a
                        href={gmailComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-white underline"
                      >
                        <span>Send via Gmail instead</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  {status === "fallback" && (
                    <div className="space-y-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-xs text-slate-200">
                      <p className="font-medium text-cyan-300">
                        Choose how you want to send this message:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={gmailComposeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-3.5 py-2 font-semibold text-white transition-all hover:from-blue-500 hover:to-cyan-500"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Send via Gmail (Web)</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <a
                          href={mailtoUrl}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 font-semibold text-slate-200 transition-colors hover:bg-slate-800"
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
        </Reveal>
      </div>
    </section>
  );
}
