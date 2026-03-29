import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Zap, Shield, Globe, ArrowRight, ExternalLink, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Website Tools — Speed Test, Uptime Checker & More",
  description:
    "Free tools to test your website's speed, check uptime, analyze hosting performance, and compare providers. No signup required.",
};

const tools = [
  {
    icon: Zap,
    title: "Website Speed Test",
    description:
      "Test how fast your website loads from multiple global locations. Get actionable recommendations to improve speed.",
    href: "https://gtmetrix.com",
    external: true,
    label: "Use GTmetrix (Free)",
    color: "text-amber-500",
    bg: "bg-amber-50",
    badge: "External Tool",
  },
  {
    icon: Shield,
    title: "Uptime Monitor",
    description:
      "Monitor your website's uptime 24/7 for free. Get instant alerts when your site goes down via email or SMS.",
    href: "https://uptimerobot.com",
    external: true,
    label: "Use UptimeRobot (Free)",
    color: "text-[#2563EB]",
    bg: "bg-blue-50",
    badge: "External Tool",
  },
  {
    icon: Globe,
    title: "DNS Lookup Tool",
    description:
      "Check your domain's DNS records, nameservers, and propagation status. Useful when setting up or migrating hosting.",
    href: "https://mxtoolbox.com/DNSLookup.aspx",
    external: true,
    label: "Check DNS Records",
    color: "text-[#10B981]",
    bg: "bg-emerald-50",
    badge: "External Tool",
  },
  {
    icon: Wrench,
    title: "SSL Certificate Checker",
    description:
      "Verify your website's SSL certificate is valid and properly installed. Check expiry dates and certificate chain.",
    href: "https://www.ssllabs.com/ssltest/",
    external: true,
    label: "Check SSL Certificate",
    color: "text-purple-500",
    bg: "bg-purple-50",
    badge: "External Tool",
  },
  {
    icon: Zap,
    title: "PageSpeed Insights",
    description:
      "Google's official tool for measuring Core Web Vitals and page experience scores. Essential for SEO performance.",
    href: "https://pagespeed.web.dev",
    external: true,
    label: "Check with Google",
    color: "text-rose-500",
    bg: "bg-rose-50",
    badge: "Google Tool",
  },
  {
    icon: Shield,
    title: "Website Security Scanner",
    description:
      "Scan your website for malware, blacklisting, and security vulnerabilities. Get a free security report instantly.",
    href: "https://sitecheck.sucuri.net",
    external: true,
    label: "Scan for Malware",
    color: "text-slate-600",
    bg: "bg-slate-50",
    badge: "External Tool",
  },
];

export default function ToolsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
        <div className="container-max">
          <Breadcrumbs items={[{ label: "Free Tools" }]} />
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 text-[#2563EB] text-sm font-bold px-3 py-1.5 rounded-full mb-4">
              <Wrench size={14} />
              No Signup Required
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
              Free Website Hosting Tools
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto">
              Tools we actually use to test hosting providers. Test your website speed, monitor uptime, check SSL, and more — all free.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.title} className="card group">
                <div className={`w-12 h-12 ${tool.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={22} className={tool.color} />
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {tool.title}
                  </h2>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full shrink-0">
                    {tool.badge}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{tool.description}</p>
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:underline"
                >
                  {tool.label}
                  <ExternalLink size={13} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Compare CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#EFF6FF] to-[#F0FDF4] border border-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-[#0F172A] mb-2">
            Compare Hosting Providers
          </h2>
          <p className="text-slate-500 mb-5">
            We&apos;ve already run these tools on 10+ hosting providers. See the results in our comparison.
          </p>
          <Link href="/compare" className="btn-primary">
            Compare Hosting <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
