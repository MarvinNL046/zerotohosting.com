"use client";

import { useState } from "react";
import { hosts } from "@/data/hosts";
import ComparisonTable from "@/components/ComparisonTable";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BarChart3, Plus, X } from "lucide-react";

export default function ComparePage() {
  const sortedHosts = [...hosts].sort((a, b) => b.rating - a.rating);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
    "kinsta",
    "siteground",
    "hostinger",
  ]);

  const toggleHost = (slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), slug];
      }
      return [...prev, slug];
    });
  };

  const selectedHosts = selectedSlugs
    .map((slug) => hosts.find((h) => h.slug === slug)!)
    .filter(Boolean);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
        <div className="container-max">
          <Breadcrumbs items={[{ label: "Compare Hosting" }]} />
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 text-[#2563EB] text-sm font-bold px-3 py-1.5 rounded-full mb-4">
              <BarChart3 size={14} />
              Side-by-Side Comparison
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
              Compare Web Hosting Providers
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto">
              Select up to 3 hosting providers to compare side-by-side. Compare speed, pricing, features, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max py-10">
        {/* Host Picker */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <h2 className="font-bold text-[#0F172A] mb-1">Select hosts to compare</h2>
          <p className="text-sm text-slate-500 mb-4">
            Select up to 3 hosts. Currently selected: {selectedSlugs.length}/3
          </p>
          <div className="flex flex-wrap gap-2">
            {sortedHosts.map((host) => {
              const isSelected = selectedSlugs.includes(host.slug);
              return (
                <button
                  key={host.slug}
                  onClick={() => toggleHost(host.slug)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    isSelected
                      ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {isSelected ? <X size={13} /> : <Plus size={13} />}
                  {host.name}
                  <span className={`text-xs ${isSelected ? "text-blue-200" : "text-slate-400"}`}>
                    {host.rating.toFixed(1)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedHosts.length >= 2 ? (
          <ComparisonTable hosts={selectedHosts} />
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <BarChart3 size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">Select at least 2 hosting providers to compare</p>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center mt-6 italic">
          Prices shown are starting promotional prices. Renewal rates are higher. Data accurate as of March 2025.
        </p>
      </div>
    </div>
  );
}
