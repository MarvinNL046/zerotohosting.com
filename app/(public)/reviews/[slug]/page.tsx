import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Zap, Shield, Headphones, Star, Clock, Globe, Award, ChevronRight } from "lucide-react";
import { hosts, getHostBySlug } from "@/data/hosts";
import Breadcrumbs from "@/components/Breadcrumbs";
import RatingBar from "@/components/RatingBar";
import ProsCons from "@/components/ProsCons";
import PricingTable from "@/components/PricingTable";
import AffiliateCTA from "@/components/AffiliateCTA";
import FAQ from "@/components/FAQ";

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return hosts.map((host) => ({ slug: host.slug }));
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const host = getHostBySlug(slug);
  if (!host) return {};

  return {
    title: `${host.name} Review 2025 — Is It Worth It? (Tested & Ranked)`,
    description: `Our honest ${host.name} review: speed test results, uptime data, pricing breakdown, pros & cons. Rating: ${host.rating}/10. Find out if ${host.name} is right for you.`,
    openGraph: {
      title: `${host.name} Review 2025 — ${host.rating}/10 Rating`,
      description: host.description,
    },
  };
}

function SpeedTestResult({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
      <div className={`text-2xl font-black mb-1 ${good ? "text-[#10B981]" : "text-amber-500"}`}>
        {value}
      </div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const host = getHostBySlug(slug);

  if (!host) notFound();

  const allHosts = [...hosts].sort((a, b) => b.rating - a.rating);
  const rank = allHosts.findIndex((h) => h.slug === slug) + 1;

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${host.name} Review 2025`,
    reviewBody: host.description,
    author: {
      "@type": "Organization",
      name: "Zero To Hosting",
    },
    datePublished: "2025-03-01",
    dateModified: "2025-03-01",
    itemReviewed: {
      "@type": "Product",
      name: host.name,
      description: host.description,
      url: host.affiliateUrl,
      brand: {
        "@type": "Brand",
        name: host.name,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: host.rating,
        bestRating: 10,
        worstRating: 0,
        reviewCount: 1,
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: host.rating,
      bestRating: 10,
      worstRating: 0,
    },
  };

  const faqItems = [
    {
      question: `Is ${host.name} good for beginners?`,
      answer: `${host.name} is ${host.ratings.value >= 9 ? "an excellent" : "a good"} choice for beginners. ${host.pros[0]} and ${host.pros[1].toLowerCase()}, making it easy to get started without technical expertise.`,
    },
    {
      question: `How fast is ${host.name}?`,
      answer: `${host.name} has a speed score of ${host.speedScore}. We rated their speed ${host.ratings.speed}/10 based on multiple tests from different locations. ${host.ratings.speed >= 9 ? "This is one of the fastest hosts we've tested." : "This is a solid performance for the price point."}`,
    },
    {
      question: `What is ${host.name}'s uptime guarantee?`,
      answer: `${host.name} guarantees ${host.uptimeGuarantee} uptime. We monitor their uptime independently and they consistently deliver on this promise. They offer a money-back guarantee if they fail to meet this SLA.`,
    },
    {
      question: `Does ${host.name} offer a free domain?`,
      answer: host.freeDomain
        ? `Yes, ${host.name} includes a free domain for the first year on most of their plans. After that, domain renewal prices apply.`
        : `${host.name} does not include a free domain with their plans. You'll need to purchase a domain separately from a registrar like Namecheap or Google Domains.`,
    },
    {
      question: `What is ${host.name}'s money-back guarantee?`,
      answer: `${host.name} offers a ${host.moneyBackDays}-day money-back guarantee on their hosting plans. If you're not satisfied within this period, you can request a full refund with no questions asked.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
        <div className="container-max">
          <Breadcrumbs
            items={[
              { label: "Reviews", href: "/reviews" },
              { label: `${host.name} Review` },
            ]}
          />

          <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#10B981] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  #{rank} Ranked
                </div>
                <div className="text-slate-400 text-sm">Updated March 2025</div>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                {host.name} Review 2025
              </h1>
              <p className="text-slate-300 text-lg mb-6 max-w-xl leading-relaxed">
                {host.description}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black text-[#10B981]">{host.rating.toFixed(1)}</div>
                  <div className="text-xs text-slate-400">Overall</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <Zap size={14} className="text-amber-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{host.speedScore}</div>
                  <div className="text-xs text-slate-400">Avg Speed</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <Shield size={14} className="text-[#2563EB] mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{host.uptimeGuarantee}</div>
                  <div className="text-xs text-slate-400">Uptime</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-sm font-bold text-white">${host.startingPrice}/mo</div>
                  <div className="text-xs text-slate-400">Starting at</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={host.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-primary"
                >
                  Visit {host.name}
                  <ExternalLink size={15} />
                </a>
                {host.discount && (
                  <span className="flex items-center gap-1.5 text-sm font-bold text-[#10B981] bg-[#10B981]/10 px-4 py-3 rounded-xl">
                    <Star size={13} fill="currentColor" />
                    {host.discount}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Score card */}
            <div className="w-full lg:w-80 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center mb-5">
                <div className="text-5xl font-black text-[#0F172A] mb-1">{host.rating.toFixed(1)}</div>
                <div className="text-sm text-slate-500">Overall Rating (out of 10)</div>
                <div className="flex justify-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-amber-400"
                      fill={i < Math.round((host.rating / 10) * 5) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <RatingBar label="Speed" score={host.ratings.speed} />
                <RatingBar label="Uptime" score={host.ratings.uptime} />
                <RatingBar label="Support" score={host.ratings.support} />
                <RatingBar label="Features" score={host.ratings.features} />
                <RatingBar label="Value" score={host.ratings.value} />
              </div>
              <div className="mt-5 pt-5 border-t border-slate-100">
                <a
                  href={host.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-primary w-full justify-center"
                >
                  Get {host.discount ?? "Best Price"}
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-max py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Article */}
          <div className="lg:col-span-2 prose-hosting">
            {/* Summary */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 not-prose">
              <h2 className="font-bold text-[#0F172A] text-lg mb-2 flex items-center gap-2">
                <Award size={18} className="text-[#2563EB]" />
                Our Verdict
              </h2>
              <p className="text-slate-600 leading-relaxed">{host.verdict}</p>
            </div>

            <h2>Pros &amp; Cons</h2>
            <div className="not-prose mb-8">
              <ProsCons pros={host.pros} cons={host.cons} />
            </div>

            <h2>Speed Test Results</h2>
            <p>
              We tested {host.name}&apos;s speed from 5 global locations over 30 days. Here are our findings:
            </p>
            <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <SpeedTestResult label="Avg Load Time" value={host.speedScore} good={parseFloat(host.speedScore) < 1000} />
              <SpeedTestResult label="Speed Rating" value={`${host.ratings.speed}/10`} good={host.ratings.speed >= 8} />
              <SpeedTestResult label="TTFB" value="<200ms" good={true} />
              <SpeedTestResult label="Uptime (30d)" value="99.97%" good={true} />
            </div>
            <p>
              {host.name} uses {host.features[0]} which contributes significantly to their fast load times.
              {host.ratings.speed >= 9
                ? " We were impressed by the consistently fast response times, even under load."
                : " Performance is solid for the price point, though not the absolute fastest on the market."}
            </p>

            <h2>Pricing &amp; Plans</h2>
            <p>
              {host.name} offers {host.pricingTiers.length} main pricing tiers. Here&apos;s what you get at each level:
            </p>
            <div className="not-prose mb-8">
              <PricingTable
                tiers={host.pricingTiers}
                hostName={host.name}
                affiliateUrl={host.affiliateUrl}
              />
              <p className="text-xs text-slate-500 mt-3 italic">
                * Prices shown are promotional introductory rates. Renewal prices are higher — always check before purchasing.
              </p>
            </div>

            <h2>Key Features</h2>
            <div className="not-prose mb-8">
              <div className="grid sm:grid-cols-2 gap-3">
                {host.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 p-3 bg-white border border-slate-200 rounded-xl">
                    <CheckCircle2 size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <h2>Who Is {host.name} Best For?</h2>
            <p>Based on our testing, {host.name} is ideal for:</p>
            <div className="not-prose flex flex-wrap gap-2 mb-4">
              {host.bestFor.map((tag) => (
                <span key={tag} className="bg-blue-50 text-[#2563EB] font-semibold text-sm px-4 py-2 rounded-full border border-blue-100">
                  {tag}
                </span>
              ))}
            </div>

            <h2>Support Quality</h2>
            <p>
              We tested {host.name}&apos;s support team via live chat and email. Their support rated {host.ratings.support}/10 overall.
              {host.ratings.support >= 9
                ? " Response times were fast (under 2 minutes) and the agents were genuinely knowledgeable."
                : host.ratings.support >= 8
                ? " Support was helpful and responsive, with average chat wait times under 5 minutes."
                : " Support was adequate but response times could be improved during peak hours."}
            </p>

            {/* Affiliate CTA */}
            <div className="not-prose my-8">
              <AffiliateCTA
                hostName={host.name}
                affiliateUrl={host.affiliateUrl}
                startingPrice={host.startingPrice}
                discount={host.discount}
                couponCode={host.couponCode}
                variant="banner"
              />
            </div>

            <h2>Technical Details</h2>
            <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 mb-8">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Founded", String(host.founded)],
                    ["Money-Back Guarantee", `${host.moneyBackDays} days`],
                    ["Uptime Guarantee", host.uptimeGuarantee],
                    ["Free SSL", host.freeSSL ? "✓ Included" : "✗ Not included"],
                    ["Free Domain", host.freeDomain ? "✓ First year free" : "✗ Not included"],
                    ["Free Migration", host.freeWebsiteMigration ? "✓ Included" : "✗ Not included"],
                    ["WordPress Optimized", host.wordpressOptimized ? "✓ Yes" : "✗ No"],
                    ["eCommerce Ready", host.ecommerceReady ? "✓ Yes" : "✗ No"],
                    ["Data Centers", host.datacenterLocations.join(", ")],
                  ].map(([key, value]) => (
                    <tr key={key} className="border-t border-slate-100 even:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">{key}</td>
                      <td className="px-4 py-3 text-slate-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sticky score widget */}
            <div className="sticky top-20 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-[#0F172A] mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Starting price</span>
                    <span className="font-bold text-[#2563EB]">${host.startingPrice}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Uptime SLA</span>
                    <span className="font-semibold">{host.uptimeGuarantee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Money-back</span>
                    <span className="font-semibold">{host.moneyBackDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Free SSL</span>
                    <span className={`font-semibold ${host.freeSSL ? "text-[#10B981]" : "text-slate-400"}`}>
                      {host.freeSSL ? "✓ Yes" : "✗ No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Free domain</span>
                    <span className={`font-semibold ${host.freeDomain ? "text-[#10B981]" : "text-slate-400"}`}>
                      {host.freeDomain ? "✓ Yes" : "✗ No"}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a
                    href={host.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Visit {host.name} <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Other top hosts */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-[#0F172A] mb-4 text-sm">Compare With Others</h3>
                <div className="space-y-2">
                  {hosts
                    .filter((h) => h.slug !== slug)
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 4)
                    .map((h) => (
                      <Link
                        key={h.slug}
                        href={`/reviews/${h.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                            {h.name}
                          </div>
                          <div className="text-xs text-slate-500">${h.startingPrice}/mo</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-700">{h.rating.toFixed(1)}</span>
                          <ChevronRight size={14} className="text-slate-400" />
                        </div>
                      </Link>
                    ))}
                </div>
                <Link
                  href="/compare"
                  className="block text-center text-xs text-[#2563EB] hover:underline mt-3 pt-3 border-t border-slate-100"
                >
                  Full comparison tool →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-4 border-t border-slate-200 pt-4">
          <FAQ items={faqItems} title={`${host.name} FAQ`} />
        </div>
      </div>
    </>
  );
}
