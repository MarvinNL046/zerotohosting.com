import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hosts, categories, getHostsByCategory } from "@/data/hosts";
import HostingCard from "@/components/HostingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import AffiliateCTA from "@/components/AffiliateCTA";
import { Award, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

const categoryFAQs: Record<string, { question: string; answer: string }[]> = {
  beginners: [
    {
      question: "What is the easiest web hosting for beginners?",
      answer: "Hostinger is the easiest hosting for beginners thanks to its intuitive hPanel control panel, one-click WordPress install, and 24/7 live chat support. The interface is designed for people with zero technical experience.",
    },
    {
      question: "How long does it take to set up a website for the first time?",
      answer: "With a beginner-friendly host like Hostinger or Bluehost, you can have WordPress installed and a basic site running in under 30 minutes. The hosting provider handles all the server setup — you just choose a template and start adding content.",
    },
    {
      question: "Do I need coding skills to use web hosting?",
      answer: "Not at all! Modern web hosting with WordPress requires zero coding. You manage your site through a visual dashboard. Coding knowledge helps for advanced customization, but it's completely optional for most websites.",
    },
  ],
  wordpress: [
    {
      question: "Is WordPress hosting different from regular hosting?",
      answer: "Yes. WordPress-optimized hosting includes specific server configurations, caching plugins, and one-click installers tuned for WordPress. Managed WordPress hosting goes further by handling updates, security, and backups automatically.",
    },
    {
      question: "What's the difference between managed and unmanaged WordPress hosting?",
      answer: "Managed WordPress hosting (like WP Engine, Kinsta) handles WordPress updates, security scans, backups, and optimization for you. Unmanaged shared hosting (like Hostinger) gives you WordPress on a server but you manage the CMS yourself.",
    },
  ],
  ecommerce: [
    {
      question: "What hosting do I need for an online store?",
      answer: "For a WooCommerce store, you need hosting with PHP 8+, MySQL, sufficient RAM (at least 512MB), SSL certificate, and ideally a CDN. For a Shopify store, Shopify handles hosting for you. We recommend Cloudways or SiteGround for growing WooCommerce stores.",
    },
    {
      question: "Is shared hosting good enough for an online store?",
      answer: "For a brand-new store with low traffic, shared hosting works fine. As you grow past 1,000 monthly orders, you'll want to upgrade to managed cloud hosting for better performance and reliability. Customer experience directly impacts conversion rates.",
    },
  ],
  budget: [
    {
      question: "What is the cheapest reliable web hosting?",
      answer: "Hostinger offers the best value at $2.99/month. You get SSD storage, free SSL, LiteSpeed servers, and 24/7 support. Avoid hosts that are cheap because they oversell servers — Hostinger maintains quality at low prices.",
    },
    {
      question: "Are cheap hosting plans worth it?",
      answer: "Yes, if you choose the right provider. Budget hosting from quality providers like Hostinger is perfect for blogs, small business sites, and portfolio sites. Avoid 'too good to be true' prices from unknown providers — they often have terrible uptime.",
    },
  ],
};

const categoryContent: Record<string, { intro: string; criteria: string[] }> = {
  beginners: {
    intro: "Getting your first website online can feel overwhelming. We've selected hosting providers that make it simple — with intuitive control panels, one-click WordPress installs, and patient 24/7 support teams.",
    criteria: [
      "Easy-to-use control panel (no cPanel complexity)",
      "One-click WordPress installation",
      "24/7 live chat support",
      "Affordable pricing under $5/month",
      "Free SSL certificate included",
      "Good documentation and tutorials",
    ],
  },
  wordpress: {
    intro: "WordPress powers 43% of the web, but not all hosting is created equal for WP sites. These providers are optimized for WordPress with fast caching, automatic updates, and WordPress-expert support.",
    criteria: [
      "WordPress-optimized server configuration",
      "Automatic WordPress updates",
      "One-click staging environment",
      "WP-specific caching (Varnish, Redis)",
      "WordPress malware scanning",
      "Easy migration tools",
    ],
  },
  ecommerce: {
    intro: "Running an online store demands reliable, fast hosting. Slow page loads cost you sales — research shows a 1-second delay reduces conversions by 7%. Here are the best hosts for WooCommerce and online stores.",
    criteria: [
      "WooCommerce pre-installed or optimized",
      "SSL certificate included (required for payments)",
      "Sufficient PHP memory (512MB+)",
      "High availability and uptime",
      "PCI compliant infrastructure",
      "CDN for global performance",
    ],
  },
  budget: {
    intro: "You don't have to spend a lot to get reliable hosting. These providers offer excellent performance at prices under $5/month, perfect for blogs, small sites, and first-time website owners.",
    criteria: [
      "Under $5/month for starter plan",
      "No hidden fees or forced add-ons",
      "Free SSL certificate",
      "Decent speed (under 1.5s load time)",
      "Money-back guarantee",
      "24/7 support",
    ],
  },
  "small-business": {
    intro: "Small business websites need reliable hosting with professional email, solid uptime, and room to grow. These providers balance performance, support, and pricing for business websites.",
    criteria: [
      "Professional email hosting included",
      "99.9%+ uptime guarantee",
      "Free SSL and CDN",
      "Easy scalability",
      "eCommerce support",
      "Business-grade support",
    ],
  },
  vps: {
    intro: "VPS hosting gives you dedicated resources, root access, and the ability to configure your server environment. Ideal for high-traffic sites, developers, and businesses that have outgrown shared hosting.",
    criteria: [
      "Dedicated CPU and RAM",
      "Root/SSH access",
      "SSD NVMe storage",
      "Choice of OS and control panel",
      "DDoS protection",
      "Scalable resources",
    ],
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};

  return {
    title: `${cat.label} 2025 — Top Picks Tested & Ranked`,
    description: `We tested 10+ hosting providers to find the best ${cat.label.toLowerCase()}. Compare speed, pricing, features and pick the right host for your needs.`,
  };
}

export default async function BestCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const categoryHosts = getHostsByCategory(category);
  const topHosts = categoryHosts.length > 0
    ? categoryHosts
    : [...hosts].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const topHost = topHosts[0];
  const content = categoryContent[category] || categoryContent.beginners;
  const faqs = categoryFAQs[category] || categoryFAQs.beginners;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${cat.label} 2025`,
    description: cat.description,
    itemListElement: topHosts.slice(0, 5).map((host, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: host.name,
        url: `https://zerotohosting.com/reviews/${host.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
        <div className="container-max">
          <Breadcrumbs
            items={[
              { label: "Best Hosting", href: "/reviews" },
              { label: cat.label },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/20 text-[#10B981] text-sm font-bold px-3 py-1.5 rounded-full mb-4">
              <Award size={14} />
              Updated March 2025
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              Best {cat.label} in 2025
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">{content.intro}</p>
          </div>
        </div>
      </div>

      <div className="container-max py-10">
        {/* Selection criteria */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <h2 className="font-bold text-[#0F172A] mb-4">How We Selected These Picks</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {content.criteria.map((criterion) => (
              <div key={criterion} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={15} className="text-[#10B981] mt-0.5 shrink-0" />
                <span className="text-slate-600">{criterion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* #1 Pick Highlight */}
        {topHost && (
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-bold text-[#10B981] bg-emerald-50 px-3 py-2 rounded-full w-fit mb-4">
              <Award size={14} />
              Our #1 Pick for {cat.label}
            </div>
            <AffiliateCTA
              hostName={topHost.name}
              affiliateUrl={topHost.affiliateUrl}
              startingPrice={topHost.startingPrice}
              discount={topHost.discount}
              couponCode={topHost.couponCode}
              variant="banner"
            />
          </div>
        )}

        {/* Host list */}
        <h2 className="text-2xl font-black text-[#0F172A] mb-6">
          Top {topHosts.length} Picks for {cat.label}
        </h2>
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {topHosts.map((host, i) => (
            <HostingCard key={host.slug} host={host} rank={i + 1} />
          ))}
        </div>

        {/* Compare link */}
        <div className="text-center mb-12">
          <Link href="/compare" className="btn-secondary">
            Compare These Hosts Side-by-Side <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* FAQ */}
      {faqs.length > 0 && (
        <div className="bg-[#F8FAFC]">
          <FAQ items={faqs} title={`${cat.label} FAQ`} />
        </div>
      )}
    </>
  );
}
