import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, Clock, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Web Hosting Blog — Tips, Guides & News for Beginners",
  description:
    "Beginner-friendly guides on web hosting, WordPress, website building, and making your first site. Updated weekly by our testing team.",
};

const posts = [
  {
    slug: "how-to-choose-web-hosting",
    title: "How to Choose Web Hosting in 2025: A Complete Beginner's Guide",
    excerpt:
      "Confused by hosting options? We break down everything you need to know — shared vs VPS, what specs matter, and how to avoid the common traps.",
    category: "Beginner Guides",
    readTime: "8 min read",
    date: "March 15, 2025",
    featured: true,
  },
  {
    slug: "shared-vs-vps-vs-managed-wordpress",
    title: "Shared vs VPS vs Managed WordPress Hosting: What's Right for You?",
    excerpt:
      "The three most common types of hosting explained in plain English. We'll tell you exactly which one you need based on your website type and budget.",
    category: "Comparisons",
    readTime: "6 min read",
    date: "March 10, 2025",
    featured: false,
  },
  {
    slug: "web-hosting-speed-guide",
    title: "Web Hosting Speed: How It Affects Your Website (And What to Do About It)",
    excerpt:
      "A slow website costs you visitors and search rankings. Learn what makes hosting fast, how to test your own site speed, and what to upgrade.",
    category: "Performance",
    readTime: "7 min read",
    date: "March 5, 2025",
    featured: false,
  },
  {
    slug: "web-hosting-terms-glossary",
    title: "Web Hosting Terms Explained: A Glossary for Non-Tech People",
    excerpt:
      "SSD vs HDD, shared vs dedicated IP, PHP version, cPanel, WHM... we explain every technical term you'll encounter when buying hosting.",
    category: "Beginner Guides",
    readTime: "10 min read",
    date: "February 28, 2025",
    featured: false,
  },
  {
    slug: "hostinger-vs-siteground",
    title: "Hostinger vs SiteGround 2025: Which One Should You Choose?",
    excerpt:
      "Both are top-rated hosts, but they serve different needs. We tested both and break down exactly when you should choose one over the other.",
    category: "Comparisons",
    readTime: "9 min read",
    date: "February 20, 2025",
    featured: false,
  },
  {
    slug: "free-hosting-vs-paid-hosting",
    title: "Free Hosting vs Paid Hosting: Why Free Is Never Really Free",
    excerpt:
      "Free hosting sounds tempting but comes with serious limitations. Here's exactly what you give up — and why $3/month is worth every penny.",
    category: "Beginner Guides",
    readTime: "5 min read",
    date: "February 15, 2025",
    featured: false,
  },
  {
    slug: "ssl-certificate-guide",
    title: "SSL Certificates Explained: Why Your Website Needs HTTPS",
    excerpt:
      "Every website needs SSL. Learn what it is, why Google requires it, and how to get a free SSL certificate from your hosting provider.",
    category: "Security",
    readTime: "5 min read",
    date: "February 10, 2025",
    featured: false,
  },
  {
    slug: "web-hosting-for-small-business",
    title: "The Best Web Hosting for Small Business in 2025",
    excerpt:
      "From professional email to eCommerce capabilities, here's what small businesses need from hosting — and which providers deliver it best.",
    category: "Small Business",
    readTime: "7 min read",
    date: "February 1, 2025",
    featured: false,
  },
];

const categories = ["All", "Beginner Guides", "Comparisons", "Performance", "Security", "Small Business"];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
        <div className="container-max">
          <Breadcrumbs items={[{ label: "Blog" }]} />
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 text-[#2563EB] text-sm font-bold px-3 py-1.5 rounded-full mb-4">
              <BookOpen size={14} />
              Hosting Knowledge Base
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
              Web Hosting Blog
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto">
              Beginner-friendly guides, comparisons, and tips from our hosting experts. No jargon, no fluff.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                cat === "All"
                  ? "bg-[#2563EB] text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="block bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] rounded-2xl p-8 mb-8 group hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-2 text-[#10B981] text-sm font-bold mb-3">
            <Tag size={13} />
            Featured Article
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-[#10B981] transition-colors">
            {featured.title}
          </h2>
          <p className="text-slate-300 mb-4 max-w-2xl leading-relaxed">{featured.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="bg-white/10 px-2.5 py-1 rounded-full">{featured.category}</span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {featured.readTime}
            </span>
            <span>{featured.date}</span>
          </div>
        </Link>

        {/* Post grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group hover:border-[#2563EB]"
            >
              <div className="mb-3">
                <span className="tag text-xs">{post.category}</span>
              </div>
              <h3 className="font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span>{post.date}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#EFF6FF] to-[#F0FDF4] border border-blue-100 rounded-2xl p-8 text-center">
          <BookOpen size={36} className="text-[#2563EB] mx-auto mb-4" />
          <h2 className="text-xl font-black text-[#0F172A] mb-2">
            Get new guides in your inbox
          </h2>
          <p className="text-slate-500 mb-5">
            Join 8,000+ readers who get weekly hosting tips and exclusive deals.
          </p>
          <Link href="/#newsletter" className="btn-primary">
            Subscribe Free <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
