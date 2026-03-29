"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] py-16 md:py-20">
      <div className="container-max max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 bg-[#2563EB]/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Mail size={28} className="text-[#2563EB]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          Get the best hosting deals in your inbox
        </h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          We send exclusive discounts, new reviews, and beginner tips. No spam — unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-[#10B981]">
            <CheckCircle2 size={24} />
            <span className="text-lg font-semibold text-white">You&apos;re in! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Joining...
                </span>
              ) : (
                <>
                  Subscribe <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}
        <p className="text-xs text-slate-600 mt-4">
          Join 8,000+ beginners who get weekly hosting tips. No spam, ever.
        </p>
      </div>
    </section>
  );
}
