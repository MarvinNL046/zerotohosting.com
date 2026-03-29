import type { Metadata } from "next";
import { hosts } from "@/data/hosts";
import HostingCard from "@/components/HostingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight, Star, Filter } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Web Hosting Reviews 2025 — All Providers Tested",
  description:
    "In-depth, independent reviews of 10+ web hosting providers. We test speed, uptime, support and value so you can make an informed decision.",
};

const sortedHosts = [...hosts].sort((a, b) => b.rating - a.rating);

export default function ReviewsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
        <div className="container-max">
          <Breadcrumbs items={[{ label: "Reviews" }]} />
          <div className="mt-6 text-center">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
              Web Hosting Reviews 2025
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto">
              {hosts.length} hosting providers tested and ranked by speed, uptime, support, and value. All reviews are based on independent testing.
            </p>
          </div>
        </div>
      </div>

      {/* Top picks */}
      <div className="container-max py-10">
        {/* Rating legend */}
        <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-sm">
            <Filter size={14} className="text-slate-500" />
            <span className="font-semibold text-slate-700">Rating Scale:</span>
          </div>
          {[
            { range: "9.0+", label: "Excellent", color: "bg-[#10B981]" },
            { range: "8.0–8.9", label: "Very Good", color: "bg-[#2563EB]" },
            { range: "7.0–7.9", label: "Good", color: "bg-amber-500" },
            { range: "Below 7", label: "Average", color: "bg-slate-400" },
          ].map((r) => (
            <div key={r.range} className="flex items-center gap-1.5 text-sm">
              <div className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
              <span className="text-slate-600">{r.range} — {r.label}</span>
            </div>
          ))}
        </div>

        {/* Best pick banner */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#10B981] text-sm font-bold mb-1">
              <Star size={14} fill="currentColor" />
              EDITOR&apos;S CHOICE 2025
            </div>
            <h2 className="text-xl font-black text-white">
              {sortedHosts[0].name} is our #1 pick
            </h2>
            <p className="text-slate-400 text-sm mt-1">{sortedHosts[0].tagline}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center">
              <div className="text-3xl font-black text-[#10B981]">{sortedHosts[0].rating.toFixed(1)}</div>
              <div className="text-xs text-slate-500">out of 10</div>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={sortedHosts[0].affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-primary text-sm py-2.5"
              >
                View Deal
              </a>
              <Link href={`/reviews/${sortedHosts[0].slug}`} className="text-xs text-slate-400 hover:text-white text-center transition-colors">
                Read review →
              </Link>
            </div>
          </div>
        </div>

        {/* All reviews grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {sortedHosts.map((host, i) => (
            <HostingCard key={host.slug} host={host} rank={i + 1} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4">Not sure which host is right for you?</p>
          <Link href="/best/beginners" className="btn-primary">
            Help Me Choose <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
