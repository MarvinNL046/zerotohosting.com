import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

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
import shopifyOnlineStore from "@/public/images/guides/provider-choices/shopify-online-store-2026-08-28.png";
import wixSiteHosting from "@/public/images/guides/provider-choices/wix-site-hosting-2026-08-28.png";
import sitegroundPlans from "@/public/images/guides/best-hosting-for-beginners/siteground-plans-2026-08-25.jpg";

const chooserPath = "/tools/hosting-type-chooser/";
const costPath = "/guides/how-much-does-web-hosting-cost/";

export const metadata = createPageMetadata({
  title: "Best web hosting for small business: 4 choices",
  description:
    "Find the best web hosting type for a small business. Compare a website builder, managed WordPress, static hosting, and hosted ecommerce before you pay.",
  path: publicPageFrontmatter.smallBusinessHostingGuide.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["business-needs", "What your business needs"],
  ["four-routes", "Four hosting routes"],
  ["provider-examples", "Provider examples"],
  ["decision-table", "Decision table"],
  ["buying-checks", "Buying checks"],
  ["moving-later", "Moving later"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const providerExamples: readonly ProviderProof[] = [
  {
    name: "Wix website hosting",
    image: wixSiteHosting,
    alt: "Wix Help Center page explaining that hosting is included with a Wix website and that a paid plan is needed for a custom domain.",
    caption:
      "Official Wix hosting guide captured August 28, 2026. It shows documented features, not our speed or support test.",
    observations: [
      "Wix says hosting is included with every Wix website.",
      "A free site uses a Wix address; a custom domain needs a paid plan.",
      "Check the live plan for today’s storage, bandwidth, price, and renewal rules.",
    ],
    href: "https://www.wix.com/free/web-hosting",
    ctaLabel: "See Wix hosting",
  },
  {
    name: "SiteGround WordPress hosting",
    image: sitegroundPlans,
    alt: "SiteGround public hosting page showing WordPress hosting plans, introductory prices, renewal prices, storage, and website limits.",
    caption:
      "Official SiteGround plan page captured August 25, 2026. Prices and plan rules can change, so check the live page before paying.",
    observations: [
      "The plan cards separate the first offer from the renewal price.",
      "Website and storage limits change between plans.",
      "Confirm which backups, restores, updates, and support jobs are included.",
    ],
    href: "https://www.siteground.com/wordpress-hosting.htm",
    ctaLabel: "See SiteGround WordPress hosting",
  },
  {
    name: "Shopify online store",
    image: shopifyOnlineStore,
    alt: "Shopify Help Center page explaining its hosted online store, pages, products, custom domains, checkout buttons, and responsive themes.",
    caption:
      "Official Shopify online-store guide captured August 28, 2026. It confirms store features, not sales results or support quality.",
    observations: [
      "Shopify describes the online store as the online home for a business.",
      "The guide covers pages, products, a custom domain, checkout, and themes.",
      "Check the current plan, payment fees, app costs, shipping tools, and export options.",
    ],
    href: "https://www.shopify.com/online",
    ctaLabel: "See Shopify online stores",
  },
];

const routes = [
  {
    title: "Hosted website builder",
    fit: "A service business that wants to edit pages, forms, and opening hours without caring for a server.",
    work: "The builder hosts the site. You still manage the domain, pages, users, and any paid add-ons.",
    check: "Can you export the content, connect your domain, add forms, and move away later?",
  },
  {
    title: "Managed WordPress hosting",
    fit: "A content-heavy site that needs WordPress themes, add-ons, or a team that already knows WordPress.",
    work: "The host manages the main server. Your team still updates the site, checks add-ons, and tests backups.",
    check: "Which WordPress updates, backups, restores, and security jobs are included in writing?",
  },
  {
    title: "Static hosting",
    fit: "A fast brochure site made from ready-to-show files by a developer or site-building tool.",
    work: "The host serves the files. Forms, editing, and other changing features may use separate services.",
    check: "Who can publish changes, where form messages go, and how the last good version is restored?",
  },
  {
    title: "Hosted ecommerce platform",
    fit: "A store that needs products, checkout, orders, and payments in one system.",
    work: "The platform hosts the store. You manage products, taxes, shipping, staff access, and store settings.",
    check: "Payment fees, app costs, product limits, exports, and what happens when you cancel.",
  },
] as const;

const buyingChecks = [
  ["The full first payment", "A low monthly number may require one, two, or four years paid in advance."],
  ["The renewal price", "Write down the later price and the date it starts."],
  ["Business email", "Website hosting does not always include email for your domain."],
  ["Forms and bookings", "Check where customer details go and who can read them."],
  ["Backups and restores", "A backup matters only when somebody can restore it."],
  ["Staff access", "Each person should have their own login and only the access they need."],
  ["Support boundaries", "Find what support will fix and what stays your job."],
  ["Moving out", "Check how to take the domain, pages, products, contacts, and files with you."],
] as const;

const faqs = [
  {
    question: "What is the best web hosting for a small business?",
    answer:
      "For a simple service site, start with a hosted website builder. Use managed WordPress when WordPress features matter. Use static hosting for a coded brochure site. Use a hosted ecommerce platform when the main job is selling online.",
  },
  {
    question: "Does a small business need a VPS?",
    answer:
      "Usually not for a normal website. A VPS adds server updates, access rules, monitoring, backups, and recovery work. Choose it only when a simpler service cannot run what you need and a named person will manage the server.",
  },
  {
    question: "Is business email included with web hosting?",
    answer:
      "Sometimes, but not always. Check email as a separate line. Find the number of mailboxes, storage, spam protection, renewal price, and how you can move old mail later.",
  },
  {
    question: "Should I choose the cheapest small-business hosting?",
    answer:
      "Choose the smallest plan that can do the full job. Compare the total paid today, renewal, limits, backups, support, and moving costs. A cheap first term can become expensive when key features need paid add-ons.",
  },
  {
    question: "Did you test or rank hosting companies?",
    answer:
      "No. This page helps you choose a hosting type and gives you checks for a real plan. It does not claim that one company is fastest, safest, or best for every business.",
  },
] as const;

export default function BestWebHostingForSmallBusinessPage() {
  const page = publicPageFrontmatter.smallBusinessHostingGuide;
  const breadcrumbs = [
    { href: "/", label: "Home" },
    { href: publicPageFrontmatter.hostingTypesGuide.path, label: "Hosting types" },
    { href: page.path, label: "Small-business hosting" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: publicPageFrontmatter.hostingTypesGuide.path, label: "Hosting types" },
          { label: "Small-business hosting" },
        ]}
        eyebrow={
          <>
            Updated <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="What is the best web hosting for a small business?"
        lede={
          <p>
            The best choice depends on the job. A hosted website builder is a
            simple start for many service businesses. Managed WordPress fits a
            site that needs WordPress. Static hosting fits ready-made site files.
            A hosted ecommerce platform fits a store. Start with the job, then
            compare the full bill and who must care for the site.
          </p>
        }
        actions={[
          { href: "#decision-table", label: "Find my starting route" },
          { href: chooserPath, label: "Use the hosting chooser", quiet: true },
        ]}
        trustItems={[
          "Four clear hosting routes",
          "No paid company ranking",
          "Official product guides checked",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The useful answer</p>
          <h2>Most small businesses should buy less server work, not more.</h2>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <p>
              Choose a service that already handles the server when your team
              only needs to edit pages, collect leads, take bookings, or sell
              products. A VPS is not an upgrade when nobody will update, watch,
              back up, and recover it.
            </p>
          </div>
        </section>

        <section id="business-needs" className="anchor-target">
          <p className="eyebrow">Write this down first</p>
          <h2>Seven facts turn a vague “best” search into a real choice.</h2>
          <ol className="buying-check-grid">
            {[
              "The pages you need now",
              "Who will edit the site",
              "Whether you sell or take bookings",
              "Where form details must go",
              "How many people need access",
              "Who can fix the site after a problem",
              "What must move with you later",
            ].map((item, index) => (
              <li key={item}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <p><strong>{item}</strong></p>
              </li>
            ))}
          </ol>
          <p>
            Do not start with a traffic guess. A new local business may have few
            visitors but still needs a working contact form, safe staff access,
            and a clear recovery plan.
          </p>
        </section>

        <section id="four-routes" className="anchor-target">
          <p className="eyebrow">Four sensible routes</p>
          <h2>Match the host to the way the business site is built.</h2>
          <div className="editorial-card-grid">
            {routes.map((route, index) => (
              <article className="editorial-card" key={route.title}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{route.title}</h3>
                <dl className="mini-definition-list">
                  <div><dt>May fit</dt><dd>{route.fit}</dd></div>
                  <div><dt>Work split</dt><dd>{route.work}</dd></div>
                  <div><dt>Check</dt><dd>{route.check}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <p className="supporting-link-row">
            <span>See how these routes work:</span>
            <Link className="text-link" href={publicPageFrontmatter.hostingTypesGuide.path}>
              Read the hosting-type guide <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </p>
        </section>

        <section id="provider-examples" className="anchor-target">
          <p className="eyebrow">See the real provider pages</p>
          <h2>Three providers that match three different business jobs.</h2>
          <p>
            These are examples, not winners. Wix shows the all-in-one builder
            route, SiteGround shows managed WordPress plans, and Shopify shows
            the hosted-store route. Use the screenshot to learn what to look for,
            then open the current provider page before making a choice.
          </p>
          <ProviderProofList providers={providerExamples} />
        </section>

        <section id="decision-table" className="anchor-target">
          <p className="eyebrow">Quick decision table</p>
          <h2>Start with the row that sounds most like your business.</h2>
          <div className="comparison-scroll" role="region" aria-label="Small-business hosting decision table" tabIndex={0}>
            <table className="comparison-table three-column-table">
              <thead>
                <tr><th scope="col">Your main need</th><th scope="col">Start with</th><th scope="col">Why</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Services, about page, contact form</th><td>Hosted website builder</td><td>Editing and hosting stay in one service.</td></tr>
                <tr><th scope="row">Regular articles and WordPress add-ons</th><td>Managed WordPress</td><td>The plan is made to run WordPress while the host handles the main server.</td></tr>
                <tr><th scope="row">Developer-built brochure site</th><td>Static hosting</td><td>It serves ready-made files without a full server for you to manage.</td></tr>
                <tr><th scope="row">Products, checkout, orders, shipping</th><td>Hosted ecommerce platform</td><td>The store tools and hosting are one system.</td></tr>
                <tr><th scope="row">A custom app with special server needs</th><td>Managed app platform first</td><td>It can run code while removing some server work.</td></tr>
              </tbody>
            </table>
          </div>
          <PageNextStep href={chooserPath} label="Answer eight questions in the hosting chooser" />
        </section>

        <section id="buying-checks" className="anchor-target">
          <p className="eyebrow">Before checkout</p>
          <h2>Check the full service, not the large sale number.</h2>
          <ol className="decision-question-list">
            {buyingChecks.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p><strong>{title}.</strong> {text}</p>
              </li>
            ))}
          </ol>
          <PageNextStep href={costPath} label="Learn how to compare first-year and renewal costs" />
        </section>

        <section id="moving-later" className="anchor-target">
          <p className="eyebrow">Keep an exit door</p>
          <h2>Your domain and business records should not be trapped.</h2>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <p>
              Before you build, ask how to export pages, products, contacts,
              orders, images, and form entries. Keep the domain in an account
              the business controls. Keep a separate copy of important files.
              A site backup does not always include email or domain settings.
            </p>
          </div>
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and limits</p>
          <h2>What the official guides confirm.</h2>
          <div className="method-panel source-ledger-panel">
            <p>
              We checked these official pages on August 28, 2026. They confirm
              how each product type works. They do not prove speed, support
              quality, uptime, or which company is best for your business.
            </p>
            <ul>
              <li><ExternalSourceLink href="https://support.wix.com/en/article/wix-site-hosting">Wix site-hosting guide</ExternalSourceLink> — Wix says hosting is included with a Wix site.</li>
              <li><ExternalSourceLink href="https://support.squarespace.com/hc/en-us/articles/207155658-Is-hosting-included">Squarespace hosting guide</ExternalSourceLink> — Squarespace says its site plans include hosting and bandwidth.</li>
              <li><ExternalSourceLink href="https://wordpress.org/documentation/article/hosting-wordpress/">WordPress hosting guide</ExternalSourceLink> — WordPress explains normal and WordPress-specific hosting.</li>
              <li><ExternalSourceLink href="https://developers.cloudflare.com/pages/">Cloudflare Pages overview</ExternalSourceLink> — Cloudflare documents Git and direct-upload routes for ready-made files.</li>
              <li><ExternalSourceLink href="https://help.shopify.com/en/manual/online-store">Shopify online-store guide</ExternalSourceLink> — Shopify documents pages, products, checkout, and store tools in one service.</li>
            </ul>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target" aria-labelledby="small-business-faq-heading">
          <h2 id="small-business-faq-heading">FAQ</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta" aria-labelledby="small-business-next-step">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Your next step</p>
            <h2 id="small-business-next-step">Choose the work split before the company.</h2>
            <p className="pilot-final-copy">Answer eight simple questions. Keep any unknown answer visible instead of guessing.</p>
          </div>
          <Link className="button button-accent" href={chooserPath}>
            Use the hosting chooser <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
