import Link from "next/link";
import { ExternalLink, CheckCircle2, Star, Zap, Shield, Headphones } from "lucide-react";
import { HostingProvider } from "@/data/hosts";

interface HostingCardProps {
  host: HostingProvider;
  rank?: number;
  variant?: "default" | "featured" | "compact";
}

function getRatingColor(score: number) {
  if (score >= 9) return "rating-badge-excellent";
  if (score >= 7.5) return "rating-badge-good";
  return "rating-badge-average";
}

export default function HostingCard({ host, rank, variant = "default" }: HostingCardProps) {
  if (variant === "compact") {
    return (
      <div className="card flex items-center gap-4">
        {rank && (
          <div className="text-2xl font-black text-slate-200 w-8 text-center shrink-0">
            {rank}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[#0F172A]">{host.name}</div>
          <div className="text-sm text-slate-500">{host.tagline}</div>
        </div>
        <div className={`rating-badge ${getRatingColor(host.rating)} shrink-0`}>
          {host.rating.toFixed(1)}
        </div>
        <Link
          href={`/reviews/${host.slug}`}
          className="btn-secondary text-sm py-2 px-4 shrink-0"
        >
          Review
        </Link>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="relative bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] rounded-2xl p-6 text-white overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        {rank && (
          <div className="absolute top-4 left-4 bg-[#10B981] text-white text-xs font-bold px-2 py-1 rounded-full">
            #{rank} PICK
          </div>
        )}

        <div className="mt-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-black">{host.name}</h3>
              <p className="text-slate-300 text-sm mt-1">{host.tagline}</p>
            </div>
            <div className={`rating-badge ${getRatingColor(host.rating)} text-xl w-14 h-14`}>
              {host.rating.toFixed(1)}
            </div>
          </div>

          {host.discount && (
            <div className="inline-flex items-center gap-1.5 bg-[#10B981]/20 text-[#10B981] text-sm font-bold px-3 py-1.5 rounded-full mb-4">
              <Star size={13} fill="currentColor" />
              {host.discount}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <Zap size={16} className="text-[#10B981] mx-auto mb-1" />
              <div className="text-xs text-slate-400">Speed</div>
              <div className="font-bold text-sm">{host.speedScore}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <Shield size={16} className="text-[#2563EB] mx-auto mb-1" />
              <div className="text-xs text-slate-400">Uptime</div>
              <div className="font-bold text-sm">{host.uptimeGuarantee}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <Headphones size={16} className="text-amber-400 mx-auto mb-1" />
              <div className="text-xs text-slate-400">Support</div>
              <div className="font-bold text-sm">{host.ratings.support.toFixed(1)}/10</div>
            </div>
          </div>

          <ul className="space-y-1.5 mb-6">
            {host.pros.slice(0, 4).map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 size={14} className="text-[#10B981] mt-0.5 shrink-0" />
                {pro}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400">Starting from</div>
              <div className="text-2xl font-black text-white">
                ${host.startingPrice}
                <span className="text-sm font-normal text-slate-400">/mo</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={host.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-primary text-sm py-2.5 px-5"
              >
                Get Deal <ExternalLink size={13} />
              </a>
              <Link
                href={`/reviews/${host.slug}`}
                className="text-center text-xs text-slate-400 hover:text-white transition-colors"
              >
                Read full review →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card
  return (
    <div className="card group">
      {rank && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            #{rank} Recommended
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
            {host.name}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5 truncate">{host.tagline}</p>
        </div>
        <div className={`rating-badge ${getRatingColor(host.rating)} shrink-0`}>
          {host.rating.toFixed(1)}
        </div>
      </div>

      {host.discount && (
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#10B981] text-xs font-bold px-2.5 py-1 rounded-full mb-3">
          <Star size={11} fill="currentColor" />
          {host.discount}
        </div>
      )}

      <ul className="space-y-1.5 mb-4">
        {host.pros.slice(0, 3).map((pro, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle2 size={14} className="text-[#10B981] mt-0.5 shrink-0" />
            {pro}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {host.bestFor.slice(0, 3).map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">From</div>
          <div className="text-xl font-black text-[#0F172A]">
            ${host.startingPrice}
            <span className="text-sm font-normal text-slate-400">/mo</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/reviews/${host.slug}`}
            className="btn-secondary text-sm py-2 px-4"
          >
            Review
          </Link>
          <a
            href={host.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary text-sm py-2 px-4"
          >
            View Deal
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
