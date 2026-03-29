import { CheckCircle2, ExternalLink, Star } from "lucide-react";
import { PricingTier } from "@/data/hosts";

interface PricingTableProps {
  tiers: PricingTier[];
  hostName: string;
  affiliateUrl: string;
}

export default function PricingTable({ tiers, hostName, affiliateUrl }: PricingTableProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`rounded-2xl border p-6 relative ${
            tier.highlighted
              ? "bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] border-[#2563EB] text-white shadow-xl shadow-blue-500/10"
              : "bg-white border-slate-200 hover:border-[#2563EB] hover:shadow-lg transition-all"
          }`}
        >
          {tier.highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={10} fill="currentColor" />
              Most Popular
            </div>
          )}

          <div className="mb-4">
            <h3 className={`text-lg font-bold ${tier.highlighted ? "text-white" : "text-[#0F172A]"}`}>
              {tier.name}
            </h3>
            <div className="mt-2">
              <span className={`text-3xl font-black ${tier.highlighted ? "text-white" : "text-[#0F172A]"}`}>
                ${tier.price}
              </span>
              <span className={`text-sm ${tier.highlighted ? "text-slate-400" : "text-slate-500"}`}>
                /{tier.period}
              </span>
            </div>
            {tier.renewalPrice !== tier.price && (
              <p className={`text-xs mt-1 ${tier.highlighted ? "text-slate-400" : "text-slate-500"}`}>
                Renews at ${tier.renewalPrice}/{tier.period}
              </p>
            )}
          </div>

          <ul className="space-y-2 mb-6">
            {tier.features.map((feature, i) => (
              <li key={i} className={`flex items-start gap-2 text-sm ${tier.highlighted ? "text-slate-300" : "text-slate-600"}`}>
                <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${tier.highlighted ? "text-[#10B981]" : "text-[#10B981]"}`} />
                {feature}
              </li>
            ))}
          </ul>

          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm transition-all ${
              tier.highlighted
                ? "bg-[#10B981] hover:bg-[#059669] text-white"
                : "bg-[#EFF6FF] hover:bg-[#2563EB] text-[#2563EB] hover:text-white"
            }`}
          >
            Get {tier.name} Plan
            <ExternalLink size={13} />
          </a>
        </div>
      ))}
    </div>
  );
}
