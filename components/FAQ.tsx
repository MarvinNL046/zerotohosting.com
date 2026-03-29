"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  schema?: boolean;
}

export default function FAQ({ items, title = "Frequently Asked Questions", schema = true }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = schema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <section className="section-padding">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className="container-max max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-[#0F172A] text-center mb-10">{title}</h2>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-[#2563EB] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-[#0F172A] text-sm sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180 text-[#2563EB]" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 border-t border-slate-100">
                  <p className="text-slate-600 leading-relaxed pt-4 text-sm sm:text-base">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
