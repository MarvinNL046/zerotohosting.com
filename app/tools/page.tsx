import Link from "next/link";
import { ArrowRight, Bot, Calculator, Compass, FileSearch } from "lucide-react";

import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "Web hosting tools and comparisons",
  description:
    "Use free hosting tools, calculate website costs, and compare the best hosting routes for a specific website or app.",
  path: publicPageFrontmatter.toolsHub.path,
});

const websiteComparisons = [
  {
    href: publicPageFrontmatter.firstWebsiteHostingTool.path,
    label: "Best web hosting for beginners",
    description:
      "Compare a site builder, managed WordPress, static hosting, and a managed app platform.",
  },
  {
    href: publicPageFrontmatter.smallBusinessHostingTool.path,
    label: "Best web hosting for small business",
    description:
      "Match hosting to pages, leads, bookings, products, staff access, and recovery work.",
  },
  {
    href: publicPageFrontmatter.artistHostingTool.path,
    label: "Best web hosting for artists",
    description:
      "Compare portfolio builders, WordPress, static hosting, and the work behind image-heavy sites.",
  },
] as const;

const appComparisons = [
  {
    href: publicPageFrontmatter.bestVpsForOpenClawTool.path,
    label: "Best VPS for OpenClaw",
    description:
      "Compare five documented OpenClaw setup routes and the server work each one leaves to you.",
  },
  {
    href: publicPageFrontmatter.bestVpsForHermesTool.path,
    label: "Best VPS for Hermes Agent",
    description:
      "Check Docker, storage, dashboard access, backups, updates, and who manages the server.",
  },
  {
    href: publicPageFrontmatter.bestN8nHostingTool.path,
    label: "Best n8n hosting",
    description:
      "Compare n8n Cloud, managed hosting, a Docker VPS, and a larger self-hosted setup.",
  },
] as const;

export default function ToolsPage() {
  const page = publicPageFrontmatter.toolsHub;
  const breadcrumbs = [
    { href: "/", label: "Home" },
    { href: page.path, label: "Tools" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <header className="page-hero page-shell">
        <Breadcrumb items={[{ label: "Tools" }]} />
        <p className="eyebrow">Choose with less guesswork</p>
        <h1>Web hosting tools for choosing, comparing, and calculating.</h1>
        <p className="lede">
          Start with a free decision tool or open one focused comparison. Each
          “best” page uses the needs of that website or app instead of pretending
          that one hosting company fits everyone.
        </p>
        <p className="meta-row">
          Updated <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
        </p>
      </header>

      <section className="content-section page-shell" aria-labelledby="decision-tools-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Free decision tools</p>
            <h2 id="decision-tools-heading">Answer questions or calculate your own costs.</h2>
          </div>
          <p>No account, email address, or guessed traffic number is required.</p>
        </div>
        <div className="topic-hub-grid">
          <article className="topic-hub-card topic-hub-card-dark">
            <span className="topic-hub-icon"><Compass size={24} aria-hidden="true" /></span>
            <p className="eyebrow light-eyebrow">Hosting type chooser</p>
            <h3>Find a hosting type—or the next choice you need to make.</h3>
            <p>Answer eight questions about the website, server care, and evidence that you need more power.</p>
            <Link className="topic-hub-primary" href={publicPageFrontmatter.hostingChooser.path}>
              Use the hosting chooser <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
          <article className="topic-hub-card">
            <span className="topic-hub-icon"><Calculator size={24} aria-hidden="true" /></span>
            <p className="eyebrow">Website cost calculator</p>
            <h3>Separate the first-year bill from the later yearly cost.</h3>
            <p>Enter the amounts you found. The calculator adds your figures without inventing market averages.</p>
            <Link className="topic-hub-primary" href={publicPageFrontmatter.websiteCostCalculator.path}>
              Calculate website costs <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="content-section page-shell" aria-labelledby="website-comparisons-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Best hosting by website</p>
            <h2 id="website-comparisons-heading">Start with what the website must do.</h2>
          </div>
          <p>Different jobs need different selection criteria, provider examples, and buying checks.</p>
        </div>
        <div className="card-grid">
          {websiteComparisons.map((item) => (
            <article className="card" key={item.href}>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
              <Link className="text-link" href={item.href}>
                Open comparison <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section page-shell" aria-labelledby="app-comparisons-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Best hosting by app</p>
            <h2 id="app-comparisons-heading">Check the software and server work together.</h2>
          </div>
          <Bot size={32} aria-hidden="true" />
        </div>
        <div className="card-grid">
          {appComparisons.map((item) => (
            <article className="card" key={item.href}>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
              <Link className="text-link" href={item.href}>
                Open comparison <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section page-shell" aria-labelledby="limits-heading">
        <div className="callout">
          <FileSearch size={24} aria-hidden="true" />
          <h2 id="limits-heading">A “best” page must show its evidence and limits.</h2>
          <p>
            Provider examples are not automatic winners. Check the source date,
            what was and was not tested, the current checkout price, renewal,
            support boundaries, backups, and the work that stays with you.
          </p>
          <Link className="text-link" href="/methodology/">
            See how ZeroToHosting checks advice <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
