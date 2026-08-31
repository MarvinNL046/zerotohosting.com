import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { BreadcrumbJsonLd, WebsiteCostCalculatorJsonLd } from "@/components/json-ld";
import { EditorialFaqList, EditorialGuideHero } from "@/components/editorial-guide";
import { WebsiteCostCalculator } from "@/components/website-cost-calculator";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "Website cost calculator: first year and renewal",
  description:
    "Enter your own website costs. Get a clear first-year total and later-year total without guessed prices.",
  path: publicPageFrontmatter.websiteCostCalculator.path,
});

const faqs = [
  {
    question: "How accurate is this website cost calculator?",
    answer:
      "The math is exact for the values you enter. The estimate is only as complete as your list of costs.",
  },
  {
    question: "Does the calculator use average hosting prices?",
    answer:
      "No. Average prices can hide billing rules and extra costs. This calculator uses only your own figures.",
  },
  {
    question: "Can I mix euros and dollars?",
    answer:
      "No. Use one currency for every field. The currency choice changes the symbol but does not convert amounts.",
  },
  {
    question: "Should I enter a monthly or yearly hosting price?",
    answer:
      "Enter the full amount for the first year. Then enter the full amount for the next year. Use a monthly amount only if you will really pay it each month for all 12 months.",
  },
  {
    question: "Where do I add AI or pay-per-use costs?",
    answer:
      "Put costs that change with use in ‘Other yearly costs.’ Use a careful estimate and update it when you have real usage data.",
  },
  {
    question: "Are my amounts saved?",
    answer:
      "No. The calculator fields are not saved or sent by the calculator. The totals are worked out in your browser.",
  },
] as const;

export default function WebsiteCostCalculatorPage() {
  const page = publicPageFrontmatter.websiteCostCalculator;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: publicPageFrontmatter.toolsHub.path, label: "Tools" },
    { href: page.path, label: "Website cost calculator" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WebsiteCostCalculatorJsonLd />
      <EditorialGuideHero
        breadcrumbs={[
          { href: publicPageFrontmatter.toolsHub.path, label: "Tools" },
          { label: "Website cost calculator" },
        ]}
        eyebrow={
          <>
            Free cost calculator · Updated{" "}
            <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="Website cost calculator"
        lede={
          <p>
            Enter the amounts from a checkout page, invoice, or quote. See the
            first-year total and a later full year. The calculator does not guess
            what a website should cost.
          </p>
        }
        actions={[
          { href: "#calculator", label: "Use the website cost calculator" },
          { href: "/guides/how-much-does-web-hosting-cost/", label: "See the full cost checklist", quiet: true },
        ]}
        trustItems={[
          "Nothing is pre-filled",
          "No guessed prices",
          "Calculator fields are not saved or sent",
        ]}
      />

      <section className="calculator-section page-shell" aria-label="Website cost calculator">
        <div className="calculator-intro">
          <p className="eyebrow">Before you start</p>
          <h2>Use one currency and full-year amounts.</h2>
          <p>
            Enter 0 when an item does not apply. If an amount is unknown, leave
            it empty and add it to your questions for the company. Blank boxes
            are not included in the known-cost total. The currency menu changes
            the symbol only. It does not convert money.
          </p>
        </div>
        <WebsiteCostCalculator />
      </section>

      <section className="content-section page-shell calculator-explainer" aria-labelledby="estimate-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Know the limit</p>
            <h2 id="estimate-heading">The total is clear. The future is not.</h2>
          </div>
          <p>
            The calculator can add your numbers. It cannot know a future price,
            missing item, or changing amount of use.
          </p>
        </div>
        <div className="answer-split-grid calculator-answer-grid">
          <article>
            <CheckCircle2 size={23} aria-hidden="true" />
            <h3>What it includes</h3>
            <p>
              The first-year, later-year, and one-time amounts that you enter on
              this page.
            </p>
          </article>
          <article>
            <ShieldCheck size={23} aria-hidden="true" />
            <h3>What it cannot know</h3>
            <p>
              Future price changes, extra use, exchange rates, or items that are
              missing from your list.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section page-shell" aria-labelledby="checkout-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Before you pay</p>
            <h2 id="checkout-heading">Check the final order page.</h2>
          </div>
          <p>Old reviews and search results can show an amount that no longer exists.</p>
        </div>
        <ol className="buying-check-grid checkout-check-grid">
          {[
            ["Full charge", "Find the amount that will really leave your account."],
            ["Billing term", "Check how many months or years that amount covers."],
            ["Tax", "Add it only when it is not already inside the amount."],
            ["Later amount", "Find what the same service may cost after the first term."],
            ["Included features", "Do not pay twice for email, backups, or a builder."],
            ["Refund rules", "Read the current terms and important limits."],
          ].map(([title, text], index) => (
            <li key={title}>
              <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
              <p><strong>{title}</strong>{" — "}{text}</p>
            </li>
          ))}
        </ol>
        <p className="section-next-step">
          <span>Learn more:</span>
          <Link className="text-link" href="/guides/how-much-does-web-hosting-cost/">
            Understand every part of the total <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </section>

      <section className="content-section page-shell faq-section" aria-labelledby="calculator-faq-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Straight answers</p>
            <h2 id="calculator-faq-heading">Calculator questions.</h2>
          </div>
          <p>Use your own figures and keep unknown amounts visible.</p>
        </div>
        <EditorialFaqList faqs={faqs} />
      </section>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Change your numbers anytime</p>
            <h2>See your first-year and later-year totals.</h2>
            <p className="pilot-final-copy">
              Add or change any amount above. Both known-cost totals update at once.
            </p>
          </div>
          <Link className="button button-accent" href="#calculator">
            Use the website cost calculator <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
