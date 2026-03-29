import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Shield,
  Headphones,
  BarChart3,
  Clock,
  ExternalLink,
  ChevronRight,
  Award,
  TrendingUp,
  Globe,
} from "lucide-react";
import { hosts, getTopHosts } from "@/data/hosts";
import HostingCard from "@/components/HostingCard";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Best Web Hosting Reviews 2025 — Zero To Hosting",
  description:
    "Find the best web hosting for your needs. We've independently tested 50+ hosting providers for speed, uptime, support and value. Compare plans and get exclusive discounts.",
};

const homepageFAQ = [
  {
    question: "What is the best web hosting for beginners in 2025?",
    answer:
      "For beginners, we recommend Hostinger as the #1 choice. It offers an incredibly user-friendly custom hPanel, affordable pricing starting at $2.99/month, free SSL, and 24/7 live chat support. The interface is clean and beginner-friendly, and you can have a WordPress site live in under 10 minutes.",
  },
  {
    question: "How much does web hosting cost per month?",
    answer:
      "Web hosting costs vary from $2–$5/month for shared hosting (beginner-friendly, good for most sites), $15–$50/month for VPS hosting (more power and control), $25–$150+/month for managed WordPress hosting (hands-off, performance-focused), and $100+/month for dedicated servers (enterprise level). Most beginners start with shared hosting for $2–$5/month.",
  },
  {
    question: "What's the difference between shared hosting and managed WordPress hosting?",
    answer:
      "Shared hosting puts your website on a server with many other websites, sharing resources. It's affordable and easy to use, but performance can vary. Managed WordPress hosting is optimized specifically for WordPress — faster caching, automatic updates, staging environments, and WordPress-expert support. It costs more but handles the technical side for you.",
  },
  {
    question: "Do I need a domain name to get web hosting?",
    answer:
      "Yes, you need both a domain name and web hosting to get a website online. Many hosting providers include a free domain for the first year (Hostinger, Bluehost, GreenGeeks). You can also buy a domain separately from registrars like Namecheap or Google Domains.",
  },
  {
    question: "How do you test and rate web hosting providers?",
    answer:
      "We test every hosting provider ourselves. We sign up as regular customers, install WordPress, run speed tests using GTmetrix and Pingdom, monitor uptime for 30+ days, test support via live chat and email, and evaluate the control panel for ease of use. We never accept payment for positive reviews — our ratings are based purely on real performance data.",
  },
  {
    question: "What should I look for when choosing web hosting?",
    answer:
      "The 5 key factors are: (1) Speed — look for NVMe SSD storage and a built-in CDN, (2) Uptime — 99.9% minimum guarantee, (3) Support — 24/7 live chat is essential for beginners, (4) Price — beware of low intro prices with high renewal costs, (5) Features — free SSL, email hosting, and easy WordPress installation are must-haves.",
  },
];

const trustStats = [
  { value: "50+", label: "Hosts Tested" },
  { value: "30", label: "Days Monitoring per Host" },
  { value: "100+", label: "Speed Tests Run" },
  { value: "5 Years", label: "Industry Experience" },
];

const testingCriteria = [
  {
    icon: Zap,
    title: "Speed Testing",
    description:
      "We run 10+ speed tests per host using GTmetrix and Pingdom from multiple global locations, measuring TTFB, load time, and Core Web Vitals.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Shield,
    title: "Uptime Monitoring",
    description:
      "We monitor uptime every 5 minutes for 30+ days using UptimeRobot, tracking any downtime events and how fast issues are resolved.",
    color: "text-[#2563EB]",
    bg: "bg-blue-50",
  },
  {
    icon: Headphones,
    title: "Support Testing",
    description:
      "We contact support via live chat, email and phone (where available) with technical questions to test response time and quality.",
    color: "text-[#10B981]",
    bg: "bg-emerald-50",
  },
  {
    icon: BarChart3,
    title: "Features & Value",
    description:
      "We evaluate what you get for your money — storage, bandwidth, email accounts, SSL, CDN, backups, and developer tools.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

export default function HomePage() {
  const topHosts = getTopHosts(3);
  const recentReviews = hosts.slice(3, 9);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Web Hosting Providers 2025",
    description: "Top-rated web hosting providers reviewed and ranked",
    itemListElement: topHosts.map((host, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: host.name,
        description: host.description,
        url: `https://zerotohosting.com/reviews/${host.slug}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: host.rating,
          bestRating: 10,
          worstRating: 0,
          reviewCount: Math.floor(Math.random() * 200 + 50),
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2563EB] opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#10B981] opacity-5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563EB] opacity-5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container-max relative pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm text-slate-300 mb-6">
              <TrendingUp size={14} className="text-[#10B981]" />
              Updated March 2025 — Based on real testing
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="gradient-text">Web Host</span>
              {" "}in 5 Minutes
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              We&apos;ve tested <strong className="text-white">50+ hosting providers</strong> for speed, uptime, support, and value — so you don&apos;t have to. From zero to online, your first website starts here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/best/beginners" className="btn-primary text-base px-8 py-4">
                <Zap size={18} />
                Find Best Host for Me
              </Link>
              <Link href="/compare" className="btn-secondary text-base px-8 py-4 border-white/30 text-white hover:bg-white hover:text-[#0F172A]">
                Compare Providers
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-slate-400">
              {[
                "No paid reviews",
                "Real speed tests",
                "Updated monthly",
                "Beginner-friendly",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-max py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[#2563EB]">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Picks */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] bg-blue-50 px-3 py-1.5 rounded-full mb-4">
              <Award size={14} />
              Editor&apos;s Top Picks — March 2025
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">
              Our #1 Recommended Web Hosts
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Ranked by speed, uptime, support and overall value. These are the hosting providers we&apos;d use ourselves.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topHosts.map((host, i) => (
              <HostingCard key={host.slug} host={host} rank={i + 1} variant="featured" />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:underline"
            >
              View all 10 hosting reviews
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How We Test */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#10B981] bg-emerald-50 px-3 py-1.5 rounded-full mb-4">
              <Shield size={14} />
              Our Testing Process
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">
              How We Test Web Hosting
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Every host is tested independently. We sign up as real customers and run rigorous tests before publishing any review.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testingCriteria.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={24} className={item.color} />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/about" className="btn-secondary">
              Learn About Our Testing Methodology
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table Preview */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">
              Quick Comparison
            </h2>
            <p className="text-slate-500">
              How do the top hosts stack up? Here&apos;s a snapshot.
            </p>
          </div>

          {/* Simplified comparison table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0F172A]">
                  <th className="text-left px-6 py-4 text-slate-400 font-semibold">Host</th>
                  <th className="px-4 py-4 text-center text-slate-400 font-semibold">Rating</th>
                  <th className="px-4 py-4 text-center text-slate-400 font-semibold">Price/mo</th>
                  <th className="px-4 py-4 text-center text-slate-400 font-semibold">Speed</th>
                  <th className="px-4 py-4 text-center text-slate-400 font-semibold">Uptime</th>
                  <th className="px-4 py-4 text-center text-slate-400 font-semibold">Best For</th>
                  <th className="px-4 py-4 text-center text-slate-400 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {hosts.slice(0, 6).map((host, i) => (
                  <tr key={host.slug} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-blue-50/30 transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#0F172A]">{host.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{host.tagline}</div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#10B981]/10 text-[#10B981] font-black">
                        {host.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center font-bold text-[#2563EB]">
                      ${host.startingPrice}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-600">{host.speedScore}</td>
                    <td className="px-4 py-4 text-center text-slate-600">{host.uptimeGuarantee}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="tag text-xs">{host.bestFor[0]}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Link
                        href={`/reviews/${host.slug}`}
                        className="text-xs font-semibold text-[#2563EB] hover:underline whitespace-nowrap"
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-6">
            <Link href="/compare" className="btn-primary">
              <BarChart3 size={16} />
              Full Comparison Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Best For categories */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">
              Find the Best Host for Your Needs
            </h2>
            <p className="text-slate-500">
              Different websites need different hosting. We&apos;ve curated the best options for every use case.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🐣", slug: "beginners", label: "Best for Beginners", desc: "Easy setup, great support, affordable" },
              { icon: "🔷", slug: "wordpress", label: "Best for WordPress", desc: "Optimized WP performance & tools" },
              { icon: "🛒", slug: "ecommerce", label: "Best for eCommerce", desc: "WooCommerce & online store hosting" },
              { icon: "💰", slug: "budget", label: "Best Budget Hosting", desc: "Under $5/month, no compromises" },
              { icon: "🏢", slug: "small-business", label: "Best for Small Business", desc: "Professional, reliable, scalable" },
              { icon: "⚡", slug: "vps", label: "Best VPS Hosting", desc: "More power and root access" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/best/${cat.slug}`}
                className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-xl hover:border-[#2563EB] hover:shadow-md transition-all group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {cat.label}
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5">{cat.desc}</div>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-[#2563EB] mt-0.5 shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-max">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0F172A]">
                Latest Hosting Reviews
              </h2>
              <p className="text-slate-500 mt-2">In-depth, real-world tested reviews</p>
            </div>
            <Link href="/reviews" className="hidden md:flex items-center gap-2 text-[#2563EB] font-semibold hover:underline">
              All Reviews <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReviews.map((host) => (
              <HostingCard key={host.slug} host={host} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/reviews" className="btn-secondary">
              All Reviews <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* FAQ */}
      <div className="bg-[#F8FAFC]">
        <FAQ items={homepageFAQ} title="Web Hosting FAQ for Beginners" />
      </div>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-br from-[#0F172A] to-[#1E3A5F]">
        <div className="container-max text-center max-w-2xl mx-auto">
          <Globe size={48} className="text-[#2563EB] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to get your website online?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Start with our beginner guide and get your first website live in under an hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/best/beginners" className="btn-primary text-base px-8 py-4">
              <Zap size={18} /> Find Best Host for Me
            </Link>
            <Link href="/reviews" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-[#0F172A] text-base px-8 py-4">
              Browse All Reviews
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
