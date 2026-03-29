"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Server, Zap, Globe, ExternalLink } from "lucide-react";

const reviewLinks = [
  { href: "/reviews/hostinger", label: "Hostinger Review" },
  { href: "/reviews/siteground", label: "SiteGround Review" },
  { href: "/reviews/cloudways", label: "Cloudways Review" },
  { href: "/reviews/wp-engine", label: "WP Engine Review" },
  { href: "/reviews/kinsta", label: "Kinsta Review" },
  { href: "/reviews", label: "All Reviews →" },
];

const bestForLinks = [
  { href: "/best/wordpress", label: "Best for WordPress" },
  { href: "/best/beginners", label: "Best for Beginners" },
  { href: "/best/ecommerce", label: "Best for eCommerce" },
  { href: "/best/budget", label: "Best Budget Hosting" },
  { href: "/best/small-business", label: "Best for Small Business" },
];

const networkLinks = [
  { href: "https://zerotovpn.com", label: "ZeroToVPN.com", desc: "Best VPN reviews" },
  { href: "https://zerotowp.com", label: "ZeroToWP.com", desc: "WordPress made easy" },
  { href: "https://zerotowordpress.com", label: "ZeroToWordPress.com", desc: "WordPress tutorials" },
  { href: "https://zerotoaiagents.com", label: "ZeroToAIAgents.com", desc: "AI automation guides" },
  { href: "https://zerotopassiveincome.com", label: "ZeroToPassiveIncome.com", desc: "Make money online" },
  { href: "https://zerotowander.com", label: "ZeroToWander.com", desc: "Travel on a budget" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav
      className={`sticky-nav transition-all duration-300 ${
        scrolled ? "shadow-xl shadow-black/20" : ""
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#10B981] rounded-lg flex items-center justify-center">
              <Server size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm leading-none">Zero To</span>
              <span className="text-[#10B981] font-bold text-sm leading-none">Hosting</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Reviews dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("reviews")}
                className="flex items-center gap-1 text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
              >
                Reviews <ChevronDown size={14} className={`transition-transform ${activeDropdown === "reviews" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "reviews" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                  {reviewLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Best For dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("bestfor")}
                className="flex items-center gap-1 text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
              >
                Best For <ChevronDown size={14} className={`transition-transform ${activeDropdown === "bestfor" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "bestfor" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                  {bestForLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/compare" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">
              Compare
            </Link>
            <Link href="/deals" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">
              <span className="flex items-center gap-1">
                Deals
                <span className="bg-[#10B981] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">HOT</span>
              </span>
            </Link>
            <Link href="/tools" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">
              Tools
            </Link>
            <Link href="/blog" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">
              Blog
            </Link>

            {/* Zero To Network */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("network")}
                className="flex items-center gap-1 text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
              >
                <Globe size={14} />
                Network <ChevronDown size={14} className={`transition-transform ${activeDropdown === "network" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "network" && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 text-xs text-slate-500 uppercase tracking-wider font-semibold">Zero To Network</div>
                  {networkLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between px-4 py-2.5 hover:bg-white/5 transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div>
                        <div className="text-sm text-white font-medium">{link.label}</div>
                        <div className="text-xs text-slate-500">{link.desc}</div>
                      </div>
                      <ExternalLink size={12} className="text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/best/beginners"
              className="hidden md:flex btn-primary text-sm py-2.5 px-5"
            >
              <Zap size={15} />
              Get Started
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0F172A]">
          <div className="container-max py-4 space-y-1">
            <Link href="/reviews" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              All Reviews
            </Link>
            <Link href="/compare" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Compare Hosting
            </Link>
            <Link href="/best/beginners" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Best for Beginners
            </Link>
            <Link href="/best/wordpress" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Best for WordPress
            </Link>
            <Link href="/deals" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Deals & Coupons
            </Link>
            <Link href="/tools" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Free Tools
            </Link>
            <Link href="/blog" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/about" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <div className="pt-2 border-t border-white/10">
              <Link href="/best/beginners" className="btn-primary w-full justify-center mt-2" onClick={() => setIsOpen(false)}>
                <Zap size={16} /> Get Started Free
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </nav>
  );
}
