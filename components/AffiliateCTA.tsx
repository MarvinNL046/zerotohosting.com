import { ExternalLink, Tag, Shield } from "lucide-react";

interface AffiliateCTAProps {
  hostName: string;
  affiliateUrl: string;
  startingPrice: number;
  discount?: string;
  couponCode?: string;
  variant?: "default" | "compact" | "banner";
}

export default function AffiliateCTA({
  hostName,
  affiliateUrl,
  startingPrice,
  discount,
  couponCode,
  variant = "default",
}: AffiliateCTAProps) {
  if (variant === "compact") {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn-primary text-sm py-2.5"
        >
          Visit {hostName}
          <ExternalLink size={14} />
        </a>
        {discount && (
          <span className="flex items-center gap-1 text-sm font-semibold text-[#10B981]">
            <Tag size={13} />
            {discount} available
          </span>
        )}
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] rounded-2xl p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h3 className="text-xl font-bold mb-1">
              Ready to get started with {hostName}?
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              Plans starting from <strong className="text-white">${startingPrice}/mo</strong>
              {discount && ` — ${discount} discount available`}
            </p>
            {couponCode && (
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 w-fit">
                <Tag size={13} className="text-[#10B981]" />
                <span className="text-xs text-slate-300">Use code:</span>
                <code className="text-sm font-mono font-bold text-[#10B981]">{couponCode}</code>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary whitespace-nowrap"
            >
              Get {discount ?? "Best Price"}
              <ExternalLink size={15} />
            </a>
            <p className="text-[11px] text-slate-500 text-center">
              <Shield size={10} className="inline mr-1" />
              30-day money-back guarantee
            </p>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 mt-4 pt-4 border-t border-white/5">
          * Affiliate disclosure: We earn a commission if you purchase through our link, at no extra cost to you. This helps us keep our reviews free and independent.
        </p>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0FDF4] border border-[#BFDBFE] rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[#1E293B] text-lg">
            Try {hostName} today
          </p>
          <p className="text-slate-600 text-sm mt-0.5">
            Starting at <strong className="text-[#2563EB]">${startingPrice}/month</strong>
            {discount && (
              <span className="ml-2 text-[#10B981] font-semibold">
                ({discount} off!)
              </span>
            )}
          </p>
          {couponCode && (
            <div className="flex items-center gap-1.5 mt-2">
              <Tag size={12} className="text-[#10B981]" />
              <span className="text-xs text-slate-500">Coupon:</span>
              <code className="text-xs font-mono font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded">
                {couponCode}
              </code>
            </div>
          )}
        </div>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn-primary shrink-0"
        >
          View Deal
          <ExternalLink size={15} />
        </a>
      </div>
      <p className="text-[11px] text-slate-400 mt-4 italic">
        Affiliate link — we earn a small commission at no extra cost to you.
      </p>
    </div>
  );
}
