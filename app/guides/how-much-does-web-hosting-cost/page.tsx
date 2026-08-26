import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  EditorialFaqList,
  EditorialGuideHero,
  EditorialGuideLayout,
  ExternalSourceLink,
  PageNextStep,
} from "@/components/editorial-guide";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";
import hostingerPlans from "@/public/images/guides/best-hosting-for-beginners/hostinger-plans-2026-08-25.jpg";

const calculatorPath = "/tools/website-cost-calculator/";
const chooserPath = "/tools/hosting-type-chooser/";

export const metadata = createPageMetadata({
  title: "How much does web hosting cost?",
  description:
    "See the costs behind a website, including hosting and renewal. Add the domain, email, paid tools and help in our simple calculator.",
  path: publicPageFrontmatter.webHostingCostGuide.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["full-bill", "The full website bill"],
  ["first-year-and-renewal", "First year and renewal"],
  ["three-setups", "Three common setups"],
  ["reading-a-plan-page", "Read a plan page"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const costParts = [
  ["Hosting or builder plan", "The service that keeps the site online. A hosted builder may already include hosting."],
  ["Domain name", "Your web address. Check the first-year amount and the later renewal amount."],
  ["Business email", "A mailbox may be included, optional, or sold as a separate product."],
  ["Paid apps or plugins", "Only count the forms, store tools, booking tools, or other add-ons you need."],
  ["Backups and security", "Check what the plan already handles before you buy another tool."],
  ["Setup and website care", "Help can be a one-time build cost or a cost that returns each year."],
  ["Tax and extra use", "Add tax, extra storage, traffic, store fees, or pay-per-use software services when they apply."],
] as const;

const setupExamples = [
  {
    title: "Hosted website builder",
    formula: "Builder plan + domain + optional email + optional apps",
    note: "Hosting can be part of the builder plan. Check the current plan before you buy a second host.",
  },
  {
    title: "Self-hosted WordPress",
    formula: "Hosting + domain + optional tools + optional maintenance",
    note: "WordPress is the site software. The hosting service gives it a server to run on.",
  },
  {
    title: "Custom website or app",
    formula: "Server or platform + domain + developer help + alerts and ongoing care",
    note: "Add any service that charges by storage, traffic, requests, or AI use.",
  },
] as const;

const faqs = [
  {
    question: "How much does web hosting cost per month?",
    answer:
      "There is no single monthly price for every site. Divide the full plan charge by the number of covered months when you want a monthly comparison. Keep the full amount due in your budget too.",
  },
  {
    question: "Is a domain included with web hosting?",
    answer:
      "Sometimes. Treat the domain as a separate cost until the checkout page clearly says it is included. Always check what it may cost to renew later.",
  },
  {
    question: "Are email and website care included?",
    answer:
      "It depends on the plan. Read the included-features list. Add email, backups, security tools, or help only when they are sold separately.",
  },
  {
    question: "Does a website builder include hosting?",
    answer: (
      <>
        Some hosted builders do. For example, the current help pages from{" "}
        <ExternalSourceLink href="https://support.wix.com/en/article/wix-site-hosting">
          Wix
        </ExternalSourceLink>{" "}
        and{" "}
        <ExternalSourceLink href="https://support.squarespace.com/hc/en-us/articles/207155658-Is-hosting-included">
          Squarespace
        </ExternalSourceLink>{" "}
        say hosting is included. A self-hosted tool or custom app normally needs
        a separate service that can run it.
      </>
    ),
  },
  {
    question: "Why should I compare the renewal total?",
    answer:
      "A first-term offer does not show the full long-term cost. A later-year total gives you a second budget based on the renewal amounts you can find today.",
  },
] as const;

export default function WebHostingCostGuidePage() {
  const page = publicPageFrontmatter.webHostingCostGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: page.path, label: "Web hosting cost" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Web hosting cost" }]}
        eyebrow={
          <>
            Cost guide / checked{" "}
            <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="How much does web hosting cost?"
        lede={
          <p>
            Web hosting is not one fixed bill. Start with the amount for hosting.
            Then add the domain, email, paid tools, and any help you need. Compare
            the first-year total with the later-year total. Those two totals are
            more useful than a small monthly-looking number in an ad.
          </p>
        }
        actions={[
          { href: calculatorPath, label: "Open the cost calculator" },
          { href: chooserPath, label: "Choose a hosting type", quiet: true },
        ]}
        trustItems={[
          "Uses only the prices you enter",
          "First year and later year stay separate",
          "Plans and offers can change",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The useful formula</p>
          <h2>Count the whole website, not one plan number.</h2>
          <div className="answer-formula" aria-label="Website cost formula">
            <span>Hosting</span>
            <i>+</i>
            <span>Domain</span>
            <i>+</i>
            <span>Email</span>
            <i>+</i>
            <span>Tools</span>
            <i>+</i>
            <span>Help</span>
            <strong>= your website cost</strong>
          </div>
          <p>
            Some plans put several items in one bill. Other plans sell them one
            by one. Use the final checkout or a written quote. If a later price is
            missing, write “unknown” instead of making one up.
          </p>
          <PageNextStep href={calculatorPath} label="Open the cost calculator" />
        </section>

        <section id="full-bill" className="anchor-target">
          <p className="eyebrow">Seven places to look</p>
          <h2>Build the bill one part at a time.</h2>
          <div className="editorial-card-grid cost-part-grid">
            {costParts.map(([title, text], index) => (
              <article className="editorial-card" key={title}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <PageNextStep href={calculatorPath} label="Open the cost calculator" />
        </section>

        <section id="first-year-and-renewal" className="anchor-target">
          <p className="eyebrow">Two budgets</p>
          <h2>Keep year one and a later year apart.</h2>
          <p>
            A first year can contain setup work or a first-term offer. A later
            year may have a different domain or plan amount. Make both totals so
            the change is visible.
          </p>
          <div className="comparison-scroll" role="region" aria-label="First-year and later-year cost comparison" tabIndex={0}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">First-year total</th>
                  <th scope="col">Later-year total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>What the website costs in its first 12 months</td>
                  <td>What the same setup may cost in the next full year</td>
                </tr>
                <tr>
                  <td>Includes one-time setup or design work</td>
                  <td>Leaves out work you will not buy again</td>
                </tr>
                <tr>
                  <td>Uses the first known plan and domain amounts</td>
                  <td>Uses the next known plan and domain amounts</td>
                </tr>
              </tbody>
            </table>
          </div>
          <PageNextStep href={calculatorPath} label="Open the cost calculator" />
        </section>

        <section id="three-setups" className="anchor-target">
          <p className="eyebrow">Common cost shapes</p>
          <h2>Different builds create different bills.</h2>
          <div className="build-path-grid">
            {setupExamples.map((setup, index) => (
              <article className="build-path-card" key={setup.title}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{setup.title}</h3>
                <p className="cost-formula-line">{setup.formula}</p>
                <p>{setup.note}</p>
              </article>
            ))}
          </div>
          <PageNextStep
            href={calculatorPath}
            label="Open the cost calculator"
          />
        </section>

        <section id="reading-a-plan-page" className="anchor-target">
          <p className="eyebrow">Check a real plan</p>
          <h2>Find the term, full charge, and renewal.</h2>
          <p>
            This screenshot shows where one plan lists its offer and renewal
            price. It is not a recommendation, and the live page may have
            changed.
          </p>
          <article className="provider-evidence-card">
            <header className="provider-evidence-header">
              <span className="guide-card-number">01</span>
              <h3>Hostinger public web-hosting page</h3>
            </header>
            <figure>
              <div className="provider-screenshot-frame">
                <Image
                  src={hostingerPlans}
                  alt="Hostinger web-hosting page showing plan terms, offer prices, and renewal prices."
                  sizes="(max-width: 760px) calc(100vw - 56px), (max-width: 1180px) calc(100vw - 330px), 850px"
                />
              </div>
              <figcaption>
                Hostinger plan page, saved August 25, 2026. This is the company’s
                own information, not our test. Check today’s full price, renewal
                price, tax, limits, and rules before buying.
              </figcaption>
            </figure>
            <div className="provider-evidence-copy">
              <h4>What to copy into your budget</h4>
              <ul>
                <li>The full amount charged for the chosen term</li>
                <li>The number of months covered by that amount</li>
                <li>The stated renewal amount and when it starts</li>
              </ul>
              <p className="provider-source-link">
                <span>View today’s plan:</span>
                <ExternalSourceLink href="https://www.hostinger.com/web-hosting">
                  Check the current Hostinger web-hosting page
                </ExternalSourceLink>
              </p>
            </div>
          </article>
          <PageNextStep href={calculatorPath} label="Open the cost calculator" />
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and limits</p>
          <h2>Use these guides for the basics, then use checkout for the price.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li>
                <ExternalSourceLink href="https://www.icann.org/resources/pages/domain-name-registration-process-2023-11-02-en">
                  ICANN: domain registration process
                </ExternalSourceLink>{" "}
                — domain terms come from the agreement with the registrar.
              </li>
              <li>
                <ExternalSourceLink href="https://support.wix.com/en/article/wix-site-hosting">
                  Wix Help Center: site hosting
                </ExternalSourceLink>{" "}
                — Wix says hosting is included for Wix sites.
              </li>
              <li>
                <ExternalSourceLink href="https://wordpress.org/documentation/article/hosting-wordpress/">
                  WordPress.org: hosting WordPress
                </ExternalSourceLink>{" "}
                — self-hosted WordPress needs a web server.
              </li>
            </ul>
            <p>Sources checked August 25, 2026. Prices and plan terms can change.</p>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>Web hosting cost questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Use your real numbers</p>
            <h2>Turn the checkout into two clear totals.</h2>
            <p className="pilot-final-copy">
              Add the first-year amount and the later-year amount. The calculator
              uses only the numbers you enter.
            </p>
          </div>
          <Link className="button button-accent" href={calculatorPath}>
            Open the cost calculator <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
