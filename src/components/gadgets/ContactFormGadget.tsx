"use client";

import React, { useState } from "react";

interface Props {
  title?: string;
  subtitle?: string;
  recipientNote?: string;
}

export default function ContactFormGadget({
  title = "Devotee Inquiries & Prayers",
  subtitle = "Have questions or prayer intentions? Share them with our seva team.",
  recipientNote = "All inquiries are kept confidential and pure.",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setFeedback("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, subject: "Sidebar Contact Gadget" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFeedback(data.message || "🙏 Your message has been received.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setFeedback(data.error || "Unable to send message.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-ivory border border-brass-gold/35 rounded-xl p-5 shadow-xs space-y-3">
      <div className="flex items-center gap-2 border-b border-brass-gold/20 pb-2">
        <span className="text-xl">✉️</span>
        <h3 className="font-serif-display font-bold text-maroon-deep text-base uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {subtitle && (
        <p className="text-xs text-charcoal-brown/80 leading-relaxed">
          {subtitle}
        </p>
      )}

      {status === "success" ? (
        <div className="bg-marigold/20 border border-marigold rounded-lg p-3 text-center space-y-1">
          <span className="text-2xl block">🌺🙏🌺</span>
          <p className="text-xs font-bold text-maroon-deep">{feedback}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-[11px] text-vermilion hover:underline mt-1 block mx-auto"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label className="block text-[11px] font-bold text-charcoal-brown mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              required
              disabled={loading}
              className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs text-charcoal-brown focus:border-maroon-deep outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-charcoal-brown mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              required
              disabled={loading}
              className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs text-charcoal-brown focus:border-maroon-deep outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-charcoal-brown mb-1">Your Message / Prayer</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your note or question..."
              rows={3}
              required
              disabled={loading}
              className="w-full px-3 py-1.5 bg-white border border-brass-gold/30 rounded text-xs text-charcoal-brown focus:border-maroon-deep outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-maroon-deep hover:bg-vermilion text-stone-ivory font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-xs flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Sending..." : "Submit Inquiry 🙏"}
          </button>

          {status === "error" && (
            <p className="text-[11px] text-red-600 bg-red-50 p-2 rounded border border-red-200">
              ⚠️ {feedback}
            </p>
          )}

          {recipientNote && (
            <p className="text-[10px] text-charcoal-brown/60 text-center italic">
              {recipientNote}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
