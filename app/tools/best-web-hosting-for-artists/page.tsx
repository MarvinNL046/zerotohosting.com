import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, ImageIcon } from "lucide-react";

import {
  EditorialFaqList,
  EditorialGuideHero,
  EditorialGuideLayout,
  ExternalSourceLink,
  PageNextStep,
} from "@/components/editorial-guide";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import {
  ProviderProofList,
  type ProviderProof,
} from "@/components/provider-proof-list";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";
import adobePortfolio from "@/public/images/guides/provider-choices/adobe-portfolio-2026-08-28.png";
import squarespacePortfolio from "@/public/images/guides/provider-choices/squarespace-portfolio-guide-2026-08-28.png";
import wixPhotographerTools from "@/public/images/guides/provider-choices/wix-photographer-tools-2026-08-28.png";

const firstWebsitePath = "/tools/best-web-hosting-for-beginners/";

export const metadata = createPageMetadata({
  title: "Best web hosting for artists: 4 options",
  description:
    "Choose the best web hosting type for an artist portfolio. Compare Adobe Portfolio, hosted builders, managed WordPress, and static hosting.",
  path: publicPageFrontmatter.artistHostingTool.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["artist-jobs", "What the site must do"],
  ["four-routes", "Four routes"],
  ["provider-examples", "Provider examples"],
  ["image-checks", "Image checks"],
  ["selling-art", "Selling art"],
  ["decision-table", "Decision table"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const providerExamples: readonly ProviderProof[] = [
  {
    name: "Adobe Portfolio",
    image: adobePortfolio,
    alt: "Adobe Portfolio knowledge-base page describing its portfolio builder, Creative Cloud access, Lightroom and Behance connections, and private sites.",
    caption:
      "Official Adobe Portfolio guide captured August 28, 2026. It shows documented tools, not our image-quality or support test.",
    observations: [
      "Adobe says an eligible paid Creative Cloud plan includes Portfolio.",
      "The guide lists images, video, Lightroom, Behance, and private pages.",
      "Check what stays online if you change or cancel the Creative Cloud plan.",
    ],
    href: "https://portfolio.adobe.com/",
    ctaLabel: "See Adobe Portfolio",
  },
  {
    name: "Squarespace portfolios",
    image: squarespacePortfolio,
    alt: "Squarespace Help Center page titled Building a portfolio site with sections for showing work, client access, leads, and search engines.",
    caption:
      "Official Squarespace portfolio guide captured August 28, 2026. The page can change, so check the current features and plan before paying.",
    observations: [
      "The guide covers art, design, writing, and photographer portfolios.",
      "It includes sections for showing work, private client access, and leads.",
      "Check gallery limits, forms, selling tools, exports, and the renewal price.",
    ],
    href: "https://www.squarespace.com/templates",
    ctaLabel: "Browse Squarespace templates",
  },
  {
    name: "Wix portfolio tools",
    image: wixPhotographerTools,
    alt: "Wix Help Center page about recommended apps for photographers, including Wix Pro Gallery and Wix Portfolio.",
    caption:
      "Official Wix photographer-app guide captured August 28, 2026. It confirms gallery tools, not speed, sales, or image quality.",
    observations: [
      "Wix documents Pro Gallery and Portfolio tools for showing creative work.",
      "The page mentions galleries, collections, media, and ways to reach visitors.",
      "Check plan costs, app costs, image limits, exports, and private-page options.",
    ],
    href: "https://www.wix.com/portfolio-website",
    ctaLabel: "See Wix portfolio websites",
  },
];

const routes = [
  {
    title: "Adobe Portfolio",
    fit: "You already pay for an eligible Adobe Creative Cloud plan and need a clean portfolio, not a large store.",
    strength: "Adobe says content hosting is included. It can connect Lightroom, Behance, Adobe Fonts, and a custom domain.",
    limit: "Publishing needs an active eligible Creative Cloud plan. Check what happens to the live site if that plan ends.",
  },
  {
    title: "Hosted website builder",
    fit: "You want visual editing, galleries, forms, and hosting in one service.",
    strength: "The builder manages the server and gives you ready-made portfolio tools.",
    limit: "Check image and project limits, export options, paid apps, and whether individual projects can be hidden or protected.",
  },
  {
    title: "Managed WordPress",
    fit: "You need WordPress themes or add-ons and accept more website care.",
    strength: "You get more choice over themes, galleries, selling tools, and how the site is built.",
    limit: "Your team must check WordPress, theme, and add-on updates. Confirm who restores a broken site.",
  },
  {
    title: "Static hosting",
    fit: "A developer or design tool produces ready-made files and the portfolio changes only sometimes.",
    strength: "It can keep the hosting layer simple and avoids a full website server that stays running.",
    limit: "Editing, forms, private client pages, and selling usually need separate tools or custom work.",
  },
] as const;

const faqs = [
  {
    question: "What is the best web hosting for an artist?",
    answer:
      "If you already pay for an eligible Creative Cloud plan, check Adobe Portfolio first. A hosted website builder is a simple all-in-one choice. Managed WordPress fits artists who need WordPress features. Static hosting fits a developer-built portfolio.",
  },
  {
    question: "Do artists need unlimited storage?",
    answer:
      "Usually not for the public portfolio. Show selected web-sized copies and keep full original artwork in a separate storage and backup system. Unlimited marketing words can still have fair-use rules, file limits, or media rules.",
  },
  {
    question: "Can I sell art from a portfolio host?",
    answer:
      "Sometimes. Check products, payments, shipping, taxes, order emails, stock, and fees. A small buy button may be enough for a few works. A real online store may fit better when selling is the main job.",
  },
  {
    question: "Should every artwork be one large image?",
    answer:
      "No. Use a clear cover image and add close views only when they help. Large galleries can load slowly, especially on phones. Keep the original file outside the website and upload a web copy.",
  },
  {
    question: "Did you rank hosting companies for artists?",
    answer:
      "No. We compared documented product types and portfolio features. We did not test speed, uptime, support, image quality, or selling results.",
  },
] as const;

export default function BestWebHostingForArtistsPage() {
  const page = publicPageFrontmatter.artistHostingTool;
  const breadcrumbs = [
    { href: "/", label: "Home" },
    { href: publicPageFrontmatter.toolsHub.path, label: "Tools" },
    { href: page.path, label: "Hosting for artists" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: publicPageFrontmatter.toolsHub.path, label: "Tools" },
          { label: "Hosting for artists" },
        ]}
        eyebrow={
          <>
            Updated <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="What is the best web hosting for artists?"
        lede={
          <p>
            Start with the kind of portfolio you need. Adobe Portfolio is worth
            checking when you already pay for an eligible Creative Cloud plan.
            A hosted builder is a simple all-in-one route. Managed WordPress gives
            you more choices but needs more care. Static hosting fits a portfolio
            made from ready-to-show files.
          </p>
        }
        actions={[
          { href: "#decision-table", label: "Find my portfolio route" },
          { href: firstWebsitePath, label: "Read the beginner comparison", quiet: true },
        ]}
        trustItems={[
          "Portfolio needs come first",
          "Original files stay separate",
          "No company speed ranking",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The useful answer</p>
          <h2>The best host helps people see your work without making updates hard.</h2>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <p>
              A beautiful template is not enough. Make sure you can add new work,
              write clear project details, connect your own domain, receive
              messages, and take your content with you later.
            </p>
          </div>
        </section>

        <section id="artist-jobs" className="anchor-target">
          <p className="eyebrow">Before you compare plans</p>
          <h2>Choose the jobs your portfolio must do.</h2>
          <div className="editorial-card-grid">
            {[
              ["Show selected work", "Projects need a clear order, titles, short notes, and images that work on a phone."],
              ["Explain your work", "An about page and project notes help a visitor understand what you make."],
              ["Bring in enquiries", "A contact form must send messages somewhere you check and protect visitor details."],
              ["Share private work", "Client or review pages may need a password or another access rule."],
              ["Sell work", "Products, payments, shipping, taxes, and order messages turn a portfolio into a store."],
              ["Stay easy to update", "The person adding new work should be able to do it without breaking the site."],
            ].map(([title, text], index) => (
              <article className="editorial-card" key={title}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="four-routes" className="anchor-target">
          <p className="eyebrow">Four routes</p>
          <h2>Choose the tool and hosting together.</h2>
          <div className="provider-route-list">
            {routes.map((route, index) => (
              <article className="provider-route-card" key={route.title}>
                <header>
                  <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{route.title}</h3><p>Portfolio hosting route</p></div>
                </header>
                <dl>
                  <div><dt>May fit when</dt><dd>{route.fit}</dd></div>
                  <div><dt>Why people choose it</dt><dd>{route.strength}</dd></div>
                  <div><dt>Check before you choose</dt><dd>{route.limit}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section id="provider-examples" className="anchor-target">
          <p className="eyebrow">See the real portfolio tools</p>
          <h2>Three official pages show what artists can build.</h2>
          <p>
            Adobe Portfolio may fit people who already pay for Creative Cloud.
            Squarespace and Wix are all-in-one builders with portfolio tools.
            These examples are not a speed ranking. Use them to compare the work
            you can show, how you update it, and what happens if you leave.
          </p>
          <ProviderProofList providers={providerExamples} />
        </section>

        <section id="image-checks" className="anchor-target">
          <p className="eyebrow">Images need a plan</p>
          <h2>Your website is a display copy, not the only home for your art.</h2>
          <div className="responsibility-grid">
            <article><ImageIcon size={22} aria-hidden="true" /><h3>Web copies</h3><p>Upload copies sized for the web. Give each useful image a short text description for people who cannot see it.</p></article>
            <article><CheckCircle2 size={22} aria-hidden="true" /><h3>Original files</h3><p>Keep full original files in separate storage with another backup. A website export may not contain every original.</p></article>
            <article><AlertTriangle size={22} aria-hidden="true" /><h3>Large galleries</h3><p>More images can make a page slower. Split a very large body of work into clear projects or series.</p></article>
          </div>
          <p>
            Squarespace documents limits for gallery and portfolio collections.
            Wix documents portfolio collections and media tools. Adobe Portfolio
            documents password protection and up to five sites. Check the live
            plan because limits and plan rules can change.
          </p>
        </section>

        <section id="selling-art" className="anchor-target">
          <p className="eyebrow">Portfolio or store?</p>
          <h2>Selling one print is different from running an online shop.</h2>
          <div className="comparison-scroll" role="region" aria-label="Artist portfolio and store comparison" tabIndex={0}>
            <table className="comparison-table three-column-table">
              <thead><tr><th scope="col">Need</th><th scope="col">Start with</th><th scope="col">Check</th></tr></thead>
              <tbody>
                <tr><th scope="row">Show work and receive enquiries</th><td>Portfolio or hosted builder</td><td>Forms, custom domain, and easy editing</td></tr>
                <tr><th scope="row">Sell a few fixed items</th><td>Portfolio plus a simple selling tool</td><td>Fees, stock, delivery, and refunds</td></tr>
                <tr><th scope="row">Run a growing shop</th><td>Hosted ecommerce platform</td><td>Products, variants, payments, tax, shipping, and exports</td></tr>
                <tr><th scope="row">License digital work</th><td>A service made for digital delivery</td><td>File access, download limits, tax, and customer records</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="decision-table" className="anchor-target">
          <p className="eyebrow">Quick guide</p>
          <h2>Start with the route that removes work you do not want.</h2>
          <div className="comparison-scroll" role="region" aria-label="Artist hosting decision table" tabIndex={0}>
            <table className="comparison-table">
              <thead><tr><th scope="col">Your situation</th><th scope="col">Look at first</th></tr></thead>
              <tbody>
                <tr><th scope="row">You already pay for eligible Creative Cloud</th><td>Adobe Portfolio</td></tr>
                <tr><th scope="row">You want visual editing and hosting together</th><td>A hosted website builder</td></tr>
                <tr><th scope="row">You need WordPress themes or add-ons</th><td>Managed WordPress</td></tr>
                <tr><th scope="row">A developer builds a simple portfolio</th><td>Static hosting</td></tr>
                <tr><th scope="row">Selling is the main job</th><td>A hosted ecommerce platform</td></tr>
              </tbody>
            </table>
          </div>
          <PageNextStep href={firstWebsitePath} label="Check the full first-website hosting guide" />
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and limits</p>
          <h2>Official feature guides, not performance tests.</h2>
          <div className="method-panel source-ledger-panel">
            <p>
              We checked these pages on August 28, 2026. They show current
              portfolio and hosting features. We did not build the same portfolio
              on every service or test speed, image quality, support, uptime, or sales.
            </p>
            <ul>
              <li><ExternalSourceLink href="https://help.myportfolio.com/hc/en-us/articles/360035996893-What-is-Adobe-Portfolio">Adobe Portfolio overview</ExternalSourceLink> — included hosting, integrations, password protection, and domain options.</li>
              <li><ExternalSourceLink href="https://support.squarespace.com/hc/en-us/articles/210295778-Building-a-portfolio-site">Squarespace portfolio guide</ExternalSourceLink> — portfolio pages, galleries, and image blocks.</li>
              <li><ExternalSourceLink href="https://support.wix.com/en/article/recommended-apps-for-photographers">Wix portfolio and gallery guide</ExternalSourceLink> — portfolio collections, galleries, and media tools.</li>
              <li><ExternalSourceLink href="https://wordpress.org/documentation/article/hosting-wordpress/">WordPress hosting guide</ExternalSourceLink> — normal and WordPress-specific hosting.</li>
              <li><ExternalSourceLink href="https://developers.cloudflare.com/pages/">Cloudflare Pages overview</ExternalSourceLink> — hosting for ready-made site files.</li>
            </ul>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target" aria-labelledby="artist-faq-heading">
          <h2 id="artist-faq-heading">FAQ</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta" aria-labelledby="artist-next-step">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Keep it simple</p>
            <h2 id="artist-next-step">Choose a portfolio you will keep updating.</h2>
            <p className="pilot-final-copy">The best-looking system is not useful when adding one new project feels too hard.</p>
          </div>
          <Link className="button button-accent" href={firstWebsitePath}>
            Read the beginner comparison <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
