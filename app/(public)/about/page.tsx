import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle2, Shield, Zap, Headphones, BarChart3, Clock, Award, Star } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Zero To Hosting — How We Test Web Hosting",
  description:
    "Learn how Zero To Hosting independently tests and reviews web hosting providers. Our testing methodology, editorial standards, and affiliate disclosure.",
};

const testingSteps = [
  {
    step: "01",
    title: "Sign Up as a Real Customer",
    description:
      "We use our own money to purchase hosting plans. No special arrangements, no free accounts — we experience exactly what you'd experience as a paying customer.",
  },
  {
    step: "02",
    title: "Install WordPress & Test Sites",
    description:
      "We set up identical WordPress installations on each host, using the same theme and plugins, so we can compare performance fairly.",
  },
  {
    step: "03",
    title: "Run 30-Day Uptime Monitoring",
    description:
      "We use UptimeRobot to monitor every host every 5 minutes for a minimum of 30 days. We track every second of downtime.",
  },
  {
    step: "04",
    title: "Conduct Speed Tests",
    description:
      "We run 10+ speed tests per host using GTmetrix, Pingdom, and Google PageSpeed Insights from multiple global locations at different times of day.",
  },
  {
    step: "05",
    title: "Test Customer Support",
    description:
      "We contact support multiple times via live chat, email, and phone with real technical questions. We rate response time, accuracy, and helpfulness.",
  },
  {
    step: "06",
    title: "Evaluate Features & Value",
    description:
      "We audit every feature included in the plan — storage, bandwidth, email accounts, SSL, CDN, backups, staging — and compare to the price.",
  },
];

const ratingCriteria = [
  { icon: Zap, label: "Speed (25%)", desc: "Load time, TTFB, Core Web Vitals" },
  { icon: Shield, label: "Uptime (25%)", desc: "30-day uptime percentage" },
  { icon: Headphones, label: "Support (20%)", desc: "Response time and quality" },
  { icon: BarChart3, label: "Features (15%)", desc: "Included tools and capabilities" },
  { icon: Award, label: "Value (15%)", desc: "What you get for your money" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
        <div className="container-max">
          <Breadcrumbs items={[{ label: "About" }]} />
          <div className="mt-6 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              About Zero To Hosting
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              We&apos;re a team of web professionals who were tired of hosting review sites that just copy-paste marketing material. So we built one that actually tests things.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max py-10 max-w-4xl mx-auto">
        {/* Mission */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-black text-[#0F172A] mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Zero To Hosting exists to help beginners get their first website online without getting ripped off. The web hosting industry is full of misleading marketing, fake reviews, and confusing pricing tricks.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            We believe everyone deserves honest, independent information — backed by real testing data, not affiliate maximization.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              { value: "50+", label: "Hosts tested" },
              { value: "5 years", label: "Industry experience" },
              { value: "100%", label: "Independent reviews" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-[#F8FAFC] rounded-xl">
                <div className="text-2xl font-black text-[#2563EB]">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testing Methodology */}
        <section className="mb-8">
          <h2 className="text-2xl font-black text-[#0F172A] mb-6">
            How We Test Web Hosting
          </h2>
          <div className="space-y-4">
            {testingSteps.map((step) => (
              <div key={step.step} className="flex gap-5 bg-white rounded-2xl border border-slate-200 p-6">
                <div className="w-10 h-10 bg-[#2563EB]/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-[#2563EB] font-black text-sm">{step.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rating System */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-black text-[#0F172A] mb-2">Our Rating System</h2>
          <p className="text-slate-500 mb-6">
            All hosts are rated on a 0–10 scale across 5 weighted categories:
          </p>
          <div className="space-y-4">
            {ratingCriteria.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0F172A]">{item.label}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-black text-[#0F172A] mb-4">Editorial Standards</h2>
          <ul className="space-y-3">
            {[
              "We never accept payment to write positive reviews or boost ratings",
              "All affiliate commissions are disclosed clearly on every page",
              "Ratings are based solely on testing data, never on affiliate commission rates",
              "We update reviews when hosting providers make significant changes",
              "We disclose if we receive free hosting accounts for testing purposes",
              "Our team has no direct relationship with any hosting company",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                <span className="text-slate-600 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Affiliate Disclosure */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-black text-[#0F172A] mb-3 flex items-center gap-2">
            <Shield size={20} className="text-amber-500" />
            Affiliate Disclosure
          </h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Zero To Hosting participates in affiliate programs with the hosting companies we review. This means we earn a commission if you click a link and purchase a hosting plan.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            This commission comes at no extra cost to you — hosting companies pay us from their marketing budget.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <strong>Critically:</strong> Affiliate commission rates have zero influence on our ratings or recommendations. We rate hosts based on testing data alone. If a host pays us more but performs worse, it will rank lower.
          </p>
        </section>

        {/* Meet the Founder */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-black text-[#0F172A] mb-4">Meet the Founder</h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src="/images/team/marvin.webp"
              alt="Marvin — Founder & Developer"
              width={160}
              height={160}
              className="rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-1">Marvin</h3>
              <p className="text-sm text-[#2563EB] font-medium mb-3">Founder &amp; Developer</p>
              <p className="text-slate-600 mb-3">
                Marvin is a Dutch web developer and digital entrepreneur who builds tools and resources to help
                people get started online. From travel guides to hosting reviews, VPN comparisons to WordPress
                tutorials — he creates practical, honest content based on hands-on testing and real experience.
              </p>
              <p className="text-slate-600">
                When he&apos;s not coding, you&apos;ll find him exploring Southeast Asia or testing the latest
                web technologies for his growing network of niche websites.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-500 mb-4">Ready to find the right host for your website?</p>
          <Link href="/best/beginners" className="btn-primary">
            <Star size={16} /> Find the Best Host for Me
          </Link>
        </div>
      </div>
    </div>
  );
}
