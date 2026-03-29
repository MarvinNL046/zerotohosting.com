import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Newsletter from "@/components/Newsletter";
import { Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Minimal static blog posts data
const blogPosts: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}> = {
  "how-to-choose-web-hosting": {
    title: "How to Choose Web Hosting in 2025: A Complete Beginner's Guide",
    excerpt: "Confused by hosting options? We break down everything you need to know.",
    category: "Beginner Guides",
    readTime: "8 min read",
    date: "March 15, 2025",
    content: `
      <h2>What is web hosting?</h2>
      <p>Web hosting is essentially renting space on a computer (called a server) that's connected to the internet 24/7. When someone types your website address, their browser connects to that server and loads your site's files.</p>
      <p>Think of it like renting an apartment. The domain name (like yoursite.com) is your address, and the hosting is the physical space where everything lives.</p>

      <h2>The 4 main types of hosting</h2>
      <h3>1. Shared Hosting ($2–$10/month)</h3>
      <p>Your website shares server resources with hundreds of other websites. It's the most affordable option and perfect for beginners. The downside is that if another site on the server gets a traffic spike, it can slow yours down.</p>
      <p><strong>Best for:</strong> Blogs, small business sites, portfolios, first websites.</p>

      <h3>2. VPS Hosting ($15–$80/month)</h3>
      <p>A Virtual Private Server gives you a dedicated portion of a server's resources. You get more power, full root access, and better performance than shared hosting.</p>
      <p><strong>Best for:</strong> Growing websites, developers, sites needing specific server configurations.</p>

      <h3>3. Managed WordPress Hosting ($25–$150/month)</h3>
      <p>Purpose-built for WordPress. The hosting company handles updates, security, caching, and backups. You just focus on your content.</p>
      <p><strong>Best for:</strong> Serious WordPress sites, agencies, businesses that want peace of mind.</p>

      <h3>4. Dedicated Hosting ($80–$300+/month)</h3>
      <p>An entire physical server dedicated to your website. Maximum performance and control, but overkill for most websites.</p>
      <p><strong>Best for:</strong> Enterprise sites, high-traffic e-commerce, applications requiring specific hardware.</p>

      <h2>5 things to check before buying</h2>
      <ol>
        <li><strong>Uptime guarantee:</strong> Look for 99.9% or better. Anything lower means your site could be down for hours every month.</li>
        <li><strong>Support quality:</strong> 24/7 live chat is essential for beginners. Test it before you buy.</li>
        <li><strong>Renewal prices:</strong> Many hosts offer low introductory prices that triple at renewal. Check the renewal rate before signing up.</li>
        <li><strong>Storage and bandwidth:</strong> For a basic blog or business site, 10–50GB of SSD storage is plenty. Unlimited bandwidth is a nice bonus.</li>
        <li><strong>Free SSL:</strong> Every website needs SSL (the padlock in the browser). It should be included for free.</li>
      </ol>

      <h2>Our top recommendation for beginners</h2>
      <p>After testing 50+ hosts, we recommend <strong>Hostinger</strong> for most beginners. Here's why:</p>
      <ul>
        <li>Starts at $2.99/month — affordable for anyone</li>
        <li>The hPanel interface is genuinely easy to use</li>
        <li>Free SSL and 24/7 live chat included</li>
        <li>One-click WordPress installation</li>
        <li>30-day money-back guarantee if you change your mind</li>
      </ul>
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: "Blog Post | Zero To Hosting",
    };
  }

  return {
    title: `${post.title} | Zero To Hosting`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  // For slugs that don't have full content yet, render a placeholder
  if (!post) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
          <div className="container-max">
            <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Article" }]} />
          </div>
        </div>
        <div className="container-max py-16 text-center max-w-2xl mx-auto">
          <BookOpen size={64} className="text-slate-300 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-[#0F172A] mb-4">Coming Soon</h1>
          <p className="text-slate-500 mb-6">
            This article is being written by our team of hosting experts. Check back soon!
          </p>
          <Link href="/blog" className="btn-primary">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Zero To Hosting",
      url: "https://zerotohosting.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Zero To Hosting",
      logo: {
        "@type": "ImageObject",
        url: "https://zerotohosting.com/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] pt-8 pb-12">
          <div className="container-max max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.title.substring(0, 40) + "..." },
              ]}
            />
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-[#2563EB]/20 text-[#2563EB] text-xs font-bold px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400 text-sm">
                  <Clock size={13} />
                  {post.readTime}
                </span>
                <span className="text-slate-400 text-sm">{post.date}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
                {post.title}
              </h1>
              <p className="text-slate-300 mt-4 text-lg">{post.excerpt}</p>
            </div>
          </div>
        </div>

        {/* Article */}
        <div className="container-max py-10 max-w-4xl">
          <div className="grid lg:grid-cols-4 gap-10">
            <article className="lg:col-span-3">
              <div
                className="prose-hosting bg-white rounded-2xl border border-slate-200 p-6 md:p-10"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Back link */}
              <div className="mt-6 flex items-center justify-between">
                <Link href="/blog" className="flex items-center gap-2 text-[#2563EB] font-semibold hover:underline text-sm">
                  <ArrowLeft size={14} /> Back to Blog
                </Link>
                <Link href="/reviews" className="flex items-center gap-2 text-[#2563EB] font-semibold hover:underline text-sm">
                  Read Our Reviews <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-20 bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-[#0F172A] text-sm mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/best/beginners" className="text-[#2563EB] hover:underline flex items-center gap-1">
                      <ArrowRight size={12} /> Best for Beginners
                    </Link>
                  </li>
                  <li>
                    <Link href="/best/wordpress" className="text-[#2563EB] hover:underline flex items-center gap-1">
                      <ArrowRight size={12} /> Best for WordPress
                    </Link>
                  </li>
                  <li>
                    <Link href="/compare" className="text-[#2563EB] hover:underline flex items-center gap-1">
                      <ArrowRight size={12} /> Compare Hosting
                    </Link>
                  </li>
                  <li>
                    <Link href="/deals" className="text-[#2563EB] hover:underline flex items-center gap-1">
                      <ArrowRight size={12} /> Current Deals
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* Newsletter */}
        <Newsletter />
      </div>
    </>
  );
}
