import Link from "next/link";
import { Server, ExternalLink, Shield, Mail } from "lucide-react";

const zeroToSites = [
  { href: "https://zerotovpn.com", label: "ZeroToVPN.com", desc: "VPN reviews & guides" },
  { href: "https://zerotowp.com", label: "ZeroToWP.com", desc: "WordPress made simple" },
  { href: "https://zerotowordpress.com", label: "ZeroToWordPress.com", desc: "WordPress tutorials" },
  { href: "https://zerotoaiagents.com", label: "ZeroToAIAgents.com", desc: "AI agent automation" },
  { href: "https://zerotopassiveincome.com", label: "ZeroToPassiveIncome.com", desc: "Passive income guides" },
  { href: "https://zerotowander.com", label: "ZeroToWander.com", desc: "Travel on a budget" },
];

const go2Sites = [
  { href: "https://go2thailand.com", label: "Go2Thailand.com", desc: "Thailand travel guide" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-slate-400 border-t border-white/5">
      {/* Affiliate Disclosure */}
      <div className="border-b border-white/5">
        <div className="container-max py-4">
          <div className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-4">
            <Shield size={16} className="text-[#2563EB] mt-0.5 shrink-0" />
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-400">Affiliate Disclosure:</strong> ZeroToHosting.com is reader-supported. When you purchase through links on our site, we may earn an affiliate commission at no extra cost to you. Our reviews and recommendations are based on independent testing and genuine user experience. We never accept payment to write positive reviews.{" "}
              <Link href="/about" className="text-[#2563EB] hover:underline">
                Learn how we test →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-max py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#10B981] rounded-lg flex items-center justify-center">
                <Server size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-none">Zero To</div>
                <div className="text-[#10B981] font-bold text-sm leading-none">Hosting</div>
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              From zero to online — your first website starts here. Honest hosting reviews for real beginners.
            </p>
            <a
              href="mailto:hello@zerotohosting.com"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
            >
              <Mail size={14} />
              hello@zerotohosting.com
            </a>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Top Reviews</h3>
            <ul className="space-y-2.5">
              {[
                ["hostinger", "Hostinger"],
                ["siteground", "SiteGround"],
                ["cloudways", "Cloudways"],
                ["wp-engine", "WP Engine"],
                ["kinsta", "Kinsta"],
                ["bluehost", "Bluehost"],
              ].map(([slug, name]) => (
                <li key={slug}>
                  <Link
                    href={`/reviews/${slug}`}
                    className="text-sm text-slate-500 hover:text-white transition-colors"
                  >
                    {name} Review
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Best For */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Best Hosting For</h3>
            <ul className="space-y-2.5">
              {[
                ["beginners", "Beginners"],
                ["wordpress", "WordPress"],
                ["ecommerce", "eCommerce"],
                ["budget", "Budget"],
                ["small-business", "Small Business"],
                ["vps", "VPS"],
              ].map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`/best/${slug}`}
                    className="text-sm text-slate-500 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {[
                ["/compare", "Compare Hosting"],
                ["/deals", "Hosting Deals"],
                ["/tools", "Free Tools"],
                ["/blog", "Hosting Blog"],
                ["/about", "How We Test"],
                ["/about", "About Us"],
              ].map(([href, label]) => (
                <li key={`${href}-${label}`}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Zero To Network */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <h3 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#2563EB] rounded-full" />
            Zero To Network
            <span className="w-4 h-0.5 bg-[#2563EB] rounded-full" />
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {zeroToSites.map((site) => (
              <a
                key={site.href}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/10 rounded-lg p-3 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors truncate">
                    {site.label.split(".")[0]}
                  </span>
                  <ExternalLink size={10} className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 ml-1" />
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">{site.desc}</div>
              </a>
            ))}
            {go2Sites.map((site) => (
              <a
                key={site.href}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/10 rounded-lg p-3 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors truncate">
                    {site.label.split(".")[0]}
                  </span>
                  <ExternalLink size={10} className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 ml-1" />
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">{site.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-max py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {currentYear} ZeroToHosting.com — Part of the Zero To Network
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
