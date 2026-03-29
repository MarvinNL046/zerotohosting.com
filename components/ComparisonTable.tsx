import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { HostingProvider } from "@/data/hosts";

interface ComparisonTableProps {
  hosts: HostingProvider[];
}

type RowConfig = {
  label: string;
  key: keyof HostingProvider | string;
  type: "text" | "rating" | "price" | "boolean" | "custom";
  format?: (host: HostingProvider) => string | number | boolean;
};

const rows: RowConfig[] = [
  { label: "Overall Rating", key: "rating", type: "rating" },
  { label: "Starting Price", key: "startingPrice", type: "price" },
  { label: "Speed Score", key: "speedScore", type: "text" },
  { label: "Uptime Guarantee", key: "uptimeGuarantee", type: "text" },
  {
    label: "Speed Rating",
    key: "ratings.speed",
    type: "custom",
    format: (h) => `${h.ratings.speed.toFixed(1)}/10`,
  },
  {
    label: "Support Rating",
    key: "ratings.support",
    type: "custom",
    format: (h) => `${h.ratings.support.toFixed(1)}/10`,
  },
  { label: "Free SSL", key: "freeSSL", type: "boolean" },
  { label: "Free Domain", key: "freeDomain", type: "boolean" },
  { label: "Free Migration", key: "freeWebsiteMigration", type: "boolean" },
  { label: "WordPress Optimized", key: "wordpressOptimized", type: "boolean" },
  { label: "eCommerce Ready", key: "ecommerceReady", type: "boolean" },
  { label: "Money-Back Guarantee", key: "moneyBackDays", type: "custom", format: (h) => `${h.moneyBackDays} days` },
  { label: "Founded", key: "founded", type: "text" },
];

function getCellValue(host: HostingProvider, row: RowConfig) {
  if (row.format) return row.format(host);
  const keys = row.key.toString().split(".");
  let value: unknown = host;
  for (const k of keys) {
    value = (value as Record<string, unknown>)[k];
  }
  return value;
}

export default function ComparisonTable({ hosts }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#0F172A]">
            <th className="text-left px-6 py-4 text-slate-400 font-semibold w-48">Feature</th>
            {hosts.map((host) => (
              <th key={host.slug} className="px-4 py-4 text-center min-w-[180px]">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-white font-bold">{host.name}</span>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#10B981]/20 text-[#10B981] font-black text-lg">
                    {host.rating.toFixed(1)}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={row.label}
              className={`border-t border-slate-100 ${rowIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
            >
              <td className="px-6 py-3.5 font-medium text-slate-700">{row.label}</td>
              {hosts.map((host) => {
                const value = getCellValue(host, row);
                return (
                  <td key={host.slug} className="px-4 py-3.5 text-center">
                    {row.type === "boolean" ? (
                      value ? (
                        <CheckCircle2 size={18} className="text-[#10B981] mx-auto" />
                      ) : (
                        <XCircle size={18} className="text-slate-300 mx-auto" />
                      )
                    ) : row.type === "rating" ? (
                      <span className="font-bold text-[#0F172A] text-base">{String(value)}</span>
                    ) : row.type === "price" ? (
                      <span className="font-bold text-[#2563EB]">${String(value)}/mo</span>
                    ) : (
                      <span className="text-slate-700">{String(value)}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
          {/* CTA row */}
          <tr className="border-t border-slate-200 bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-700">Get Started</td>
            {hosts.map((host) => (
              <td key={host.slug} className="px-4 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <a
                    href={host.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="btn-primary text-xs py-2 px-4"
                  >
                    Visit
                    <ExternalLink size={12} />
                  </a>
                  <Link
                    href={`/reviews/${host.slug}`}
                    className="text-xs text-[#2563EB] hover:underline"
                  >
                    Full Review
                  </Link>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
