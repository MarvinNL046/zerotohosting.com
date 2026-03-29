import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://zerotohosting.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-slate-500 flex-wrap">
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight size={14} className="text-slate-300" />}
            {item.href && index !== allItems.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-[#2563EB] transition-colors flex items-center gap-1"
              >
                {index === 0 && <Home size={13} />}
                {item.label}
              </Link>
            ) : (
              <span className="text-[#0F172A] font-medium flex items-center gap-1">
                {index === 0 && <Home size={13} />}
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
