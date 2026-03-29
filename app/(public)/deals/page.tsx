import type { Metadata } from "next";
import Link from "next/link";
import { hosts } from "@/data/hosts";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Tag, ExternalLink, Clock, Star, Zap, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Web Hosting Deals & Coupons March 2025",
  description:
    "Exclusive hosting discounts and coupon codes for March 2025. Save up to 80% on Hostinger, SiteGround, Cloudways and more. Updated daily.",
};

const hostsWithDeals = hosts.filter((h) => h.discount);
const allHosts = [...hosts].sort((a, b) => b.rating - a.rating);

export default function DealsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
        <div className="container-max">
          <Breadcrumbs items={[{ label: "Hosting Deals" }]} />
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/20 text-[#10B981] text-sm font-bold px-3 py-1.5 rounded-full mb-4">
              <Tag size={14} />
              Updated March 28, 2025
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
              Best Hosting Deals & Coupons
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto">
              We negotiate exclusive discounts for our readers. All deals verified and working as of today.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max py-10">
        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8">
          <Clock size={15} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Note on pricing:</strong> All prices shown are introductory promotional rates for new customers. Renewal rates are typically 2–3x higher. Always check the renewal price before purchasing. Deals can expire without notice.
          </p>
        </div>

        {/* Featured deals */}
        <h2 className="text-2xl font-black text-[#0F172A] mb-6">
          🔥 Active Deals — March 2025
        </h2>

        <div className="space-y-4 mb-12">
          {allHosts.map((host, i) => (
            <div
              key={host.slug}
              className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 hover:border-[#2563EB] hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                {/* Rank + name */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="text-2xl font-black text-slate-200 w-6 shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-[#0F172A] text-lg">{host.name}</span>
                      <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#10B981]/10 text-[#10B981] font-black text-sm">
                        {host.rating.toFixed(1)}
                      </div>
                      {host.discount && (
                        <span className="flex items-center gap-1 bg-rose-50 text-rose-600 text-xs font-bold px-2.5 py-1 rounded-full border border-rose-100">
                          <Star size={10} fill="currentColor" />
                          {host.discount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">{host.tagline}</p>
                  </div>
                </div>

                {/* Price + coupon */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-0.5">Starting from</div>
                    <div className="text-2xl font-black text-[#2563EB]">${host.startingPrice}<span className="text-sm font-normal text-slate-400">/mo</span></div>
                    <div className="text-xs text-slate-400">Renews higher</div>
                  </div>

                  {host.couponCode && (
                    <div className="bg-[#0F172A] rounded-xl px-4 py-3">
                      <div className="text-xs text-slate-400 mb-1">Coupon code</div>
                      <code className="text-sm font-mono font-bold text-[#10B981]">
                        {host.couponCode}
                      </code>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <a
                      href={host.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="btn-primary text-sm py-2.5 px-5"
                    >
                      Get Deal
                      <ExternalLink size={13} />
                    </a>
                    <Link
                      href={`/reviews/${host.slug}`}
                      className="text-xs text-slate-400 hover:text-[#2563EB] text-center transition-colors"
                    >
                      Read review →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Key features */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                {host.pros.slice(0, 3).map((pro) => (
                  <div key={pro} className="flex items-center gap-1 text-xs text-slate-600">
                    <CheckCircle2 size={12} className="text-[#10B981]" />
                    {pro}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* How to use deals */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-black text-[#0F172A] mb-4 flex items-center gap-2">
            <Zap size={20} className="text-[#2563EB]" />
            How to Claim These Deals
          </h2>
          <ol className="space-y-3 text-slate-600">
            {[
              "Click the 'Get Deal' button next to your chosen hosting provider",
              "You'll be taken directly to their website with any discount pre-applied",
              "If a coupon code is shown, enter it at checkout",
              "Choose your plan and billing period (longer terms = bigger discounts)",
              "Complete your purchase and get online!",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#2563EB]/10 text-[#2563EB] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm">{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs text-slate-400 mt-6 italic">
            Affiliate disclosure: We earn a commission when you purchase through our links, at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
