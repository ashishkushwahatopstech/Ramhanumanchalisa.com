"use client";

import React, { useState } from "react";

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  placeholder?: string;
  disclaimer?: string;
}

export default function SubscriptionGadget({
  title = "Daily Morning Hanuman Blessings",
  subtitle = "Receive daily Chaupai verses, auspicious tithis, and divine audio directly in your inbox.",
  buttonText = "Receive Blessings 🙏",
  placeholder = "Enter your email address...",
  disclaimer = "No spam. Pure devotional blessings sent every morning.",
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "sidebar_gadget" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "🙏 Jai Shree Ram! You have been subscribed for daily blessings.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription could not be completed. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage("Network error. Please try again in a few moments.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-maroon-deep via-[#4A0E17] to-maroon-deep border-2 border-brass-gold/60 text-stone-ivory rounded-xl p-5 sm:p-6 shadow-md relative overflow-hidden">
      {/* Decorative Om Aura */}
      <div className="absolute -top-3 -right-3 text-5xl opacity-10 font-serif select-none pointer-events-none">
        ॐ
      </div>

      <div className="flex items-center gap-2 border-b border-brass-gold/30 pb-2.5 mb-3">
        <span className="text-xl filter drop-shadow">🪔</span>
        <h3 className="font-serif-display font-bold text-marigold text-base uppercase tracking-wider leading-snug">
          {title}
        </h3>
      </div>

      {subtitle && (
        <p className="text-xs text-stone-ivory/80 leading-relaxed mb-4">
          {subtitle}
        </p>
      )}

      {status === "success" ? (
        <div className="bg-marigold/20 border border-marigold/70 rounded-lg p-3.5 text-center space-y-1.5 animate-fadeIn">
          <span className="text-2xl block">✨🙏✨</span>
          <p className="text-xs font-bold text-marigold leading-snug">
            {message}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-[11px] text-stone-ivory/70 hover:text-stone-ivory underline mt-1 block mx-auto"
          >
            Add another email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="gadget-sub-email" className="sr-only">Email address</label>
            <input
              id="gadget-sub-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              disabled={loading}
              className="w-full px-3.5 py-2.5 bg-black/30 border border-brass-gold/40 focus:border-marigold focus:ring-1 focus:ring-marigold rounded-lg text-xs text-stone-ivory placeholder-stone-ivory/50 transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-vermilion hover:bg-marigold hover:text-maroon-deep text-stone-ivory font-bold text-xs uppercase tracking-wider rounded-lg border border-brass-gold/50 shadow transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="animate-spin text-sm">⏳</span>
                <span>Subscribing...</span>
              </>
            ) : (
              <span>{buttonText}</span>
            )}
          </button>

          {status === "error" && (
            <p className="text-[11px] text-red-300 bg-red-950/60 p-2 rounded border border-red-800/60">
              ⚠️ {message}
            </p>
          )}

          {disclaimer && (
            <p className="text-[10px] text-stone-ivory/60 text-center italic">
              {disclaimer}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
