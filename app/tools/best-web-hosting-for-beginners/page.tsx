import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";
import hostingerPlans from "@/public/images/guides/best-hosting-for-beginners/hostinger-plans-2026-08-25.jpg";
import namecheapPlans from "@/public/images/guides/best-hosting-for-beginners/namecheap-plans-2026-08-25.jpg";
import sitegroundPlans from "@/public/images/guides/best-hosting-for-beginners/siteground-plans-2026-08-25.jpg";

const chooserPath = "/tools/hosting-type-chooser/";

export const metadata = createPageMetadata({
  title: "Best web hosting for beginners: 4 choices",
  description:
    "Find the best web hosting for beginners. Match the plan to a site builder, WordPress, static files, or a custom app before comparing companies.",
  path: publicPageFrontmatter.firstWebsiteHostingTool.path,
});

const toc = [
  ["quick-answer", "Quick answer"],
  ["buying-checks", "Buying checks"],
  ["live-plan-examples", "Live plan-page examples"],
  ["what-to-avoid", "What to avoid"],
  ["how-this-guide-was-made", "Sources and test limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const buildPaths = [
  {
    title: "Hosted website builder",
    start: "The hosting included with the builder.",
    why: "The building tool and hosting are one service, so you do not need a second host.",
    check: "Your must-have features and what happens if you leave.",
  },
  {
    title: "WordPress",
    start: "Provider-managed web hosting or managed WordPress.",
    why: "The provider runs the server. Your team still cares for the website itself.",
    check: "Rules for WordPress add-ons and who will restore a backup.",
  },
  {
    title: "HTML, CSS, or a tool that builds ready-made page files",
    start: "Static hosting. It sends ready-made page files to visitors.",
    why: "It is made to publish ready-made page files.",
    check: "Forms and how updates go live.",
  },
  {
    title: "Custom app",
    start:
      "A managed app platform when it supports your app. This service runs your code while the provider manages the main server system.",
    why: "Your team can focus on the app instead of setting up the whole server.",
    check: "Your code, saved information, and any task that must keep running.",
  },
] as const;

const buyingChecks = [
  {
    title: "Total due today",
    text: "A small monthly number may be the price divided across a long term, so find the full amount charged at checkout.",
  },
  {
    title: "Renewal",
    text: "Find the price after the first offer and the date the new price starts.",
  },
  {
    title: "Fits your site",
    text: "Make sure the plan supports the builder, WordPress setup, static build, or app that you will really use.",
  },
  {
    title: "Server care",
    text: "Write down who installs updates, watches for problems, makes backups, restores the site, and fixes the server.",
  },
  {
    title: "Limits",
    text: "Find the written limits for websites, file space, running tasks, and server work.",
  },
  {
    title: "Moving later",
    text: "Check how to move the domain and all site information; also verify that you can move email and take your backups.",
  },
] as const;

type ProviderExample = Readonly<{
  name: string;
  image: StaticImageData;
  alt: string;
  observations: readonly string[];
  href: string;
  sourceLabel: string;
  caption: string;
}>;

const providerExamples: readonly ProviderExample[] = [
  {
    name: "Hostinger public web-hosting page",
    image: hostingerPlans,
    alt: "Hostinger web-hosting page with plan cards, a 48-month option, offer prices, and renewal prices.",
    observations: [
      "The selector shows a 48-month plan.",
      "The cards separate the offer from the renewal amount.",
      "The monthly number is not the same as paying one month at a time.",
    ],
    href: "https://www.hostinger.com/web-hosting",
    sourceLabel: "Check the current Hostinger web-hosting page",
    caption:
      "Hostinger plan page, saved August 25, 2026. This is the company’s own information, not our test. Check today’s term, full price, renewal price, sales tax, plan limits, and heavy-use rules before buying.",
  },
  {
    name: "SiteGround public web-hosting page",
    image: sitegroundPlans,
    alt: "SiteGround web-hosting page with three plans, 12-month prepayment, offer prices, and renewal prices.",
    observations: [
      "The cards state a 12-month prepaid term.",
      "The promotional and renewal prices appear separately.",
      "Website and storage limits differ by plan.",
    ],
    href: "https://www.siteground.com/web-hosting.htm",
    sourceLabel: "Check the current SiteGround web-hosting page",
    caption:
      "SiteGround plan page, saved August 25, 2026. This is the company’s own information, not our test. Check today’s price and currency. Also check sales tax, the current offer, the feature list and the full terms before buying.",
  },
  {
    name: "Namecheap public shared-hosting page",
    image: namecheapPlans,
    alt: "Namecheap shared-hosting page with plan cards, a 30-day trial, later monthly prices, and plan limits.",
    observations: [
      "The cards show a 30-day trial and what the monthly price becomes afterward.",
      "The page lets the visitor switch the billing term.",
      "The cards list the number of websites and the amount of storage.",
    ],
    href: "https://www.namecheap.com/hosting/shared/",
    sourceLabel: "Check the current Namecheap shared-hosting page",
    caption:
      "Namecheap plan page, saved August 25, 2026. This is the company’s own information, not our test. Check today’s trial, renewal price, server location, plan limits, and terms before buying.",
  },
];

const avoidItems = [
  "A VPS that your team must manage when nobody owns the server. Someone must control access, install updates, watch for problems, and make backups. That person must also test recovery and fix failures.",
  "A larger plan because a page feels slow, before a test shows that hosting is the cause.",
  "A long prepaid term only because its monthly equivalent looks small.",
  "A plan whose written limits you cannot find or understand.",
  "A provider only because another page placed it first.",
] as const;

const faqs = [
  {
    question: "Is shared hosting best for every beginner?",
    answer:
      "No. It can fit a WordPress site when the provider runs the server and the plan supports the site. A hosted builder already includes hosting. A static site or custom app may need a different type.",
  },
  {
    question: "Does a more expensive plan mean better hosting?",
    answer:
      "No. First check whether the hosting can run your site and who will manage it. Then compare limits, recovery, what support will fix, the full term, and renewal. A larger plan does not fix the wrong hosting type.",
  },
  {
    question: "Should a first website use a VPS?",
    answer:
      "Only when the site needs a feature that simpler hosting cannot provide and a named person will manage the server. A VPS makes your team responsible for its updates and access. The same person must watch for problems and make backups. They must also test recovery and fix failures.",
  },
  {
    question: "Are the three companies shown here recommended?",
    answer:
      "No. The screenshots show how plans list prices and terms, plus plan limits. We did not test, rank, or recommend these companies.",
  },
] as const;

function ChooserTextLink() {
  return (
    <p className="section-next-step">
      <span>Next step:</span>
      <Link className="text-link" href={chooserPath}>
        Match my site to a hosting type
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </p>
  );
}

export default function BestWebHostingForBeginnersPage() {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    {
      href: publicPageFrontmatter.toolsHub.path,
      label: "Tools",
    },
    {
      href: publicPageFrontmatter.firstWebsiteHostingTool.path,
      label: "Best web hosting for beginners",
    },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <header className="guide-hero page-shell pilot-guide-hero">
        <Breadcrumb
          items={[
            {
              label: "Tools",
              href: publicPageFrontmatter.toolsHub.path,
            },
            { label: "First website hosting" },
          ]}
        />
        <p className="eyebrow">
          Updated{" "}
          <time
            dateTime={
              publicPageFrontmatter.firstWebsiteHostingTool.lastModified
            }
          >
            {formatPageDate(
              publicPageFrontmatter.firstWebsiteHostingTool.lastModified,
            )}
          </time>
        </p>
        <h1>What is the best web hosting for beginners?</h1>
        <p className="lede">
          The right starting type follows the way you plan to build and who will
          manage the server. A hosted website builder already includes hosting.
          WordPress often fits web hosting where the provider runs the server,
          or managed WordPress. A coded site made from ready-to-use page files
          can use static hosting. Start with a VPS (a virtual server that your
          team manages) only when a named person will manage the whole server.
        </p>
        <div className="button-row">
          <Link className="button button-primary" href={chooserPath}>
            Match my site to a hosting type
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ul className="trust-list" aria-label="Page limits">
          <li>
            <CheckCircle2 size={15} aria-hidden="true" />
            No provider ranking
          </li>
          <li>
            <CheckCircle2 size={15} aria-hidden="true" />
            Examples are not company recommendations
          </li>
          <li>
            <CheckCircle2 size={15} aria-hidden="true" />
            The screenshots are examples, not recommendations
          </li>
        </ul>
      </header>

      <div className="guide-layout page-shell pilot-guide-layout">
        <aside className="guide-toc" aria-label="Page sections">
          <h2>On this page</h2>
          <ol>
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={"#" + id}>{label}</a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="guide-body pilot-guide-body">
          <section id="quick-answer" className="anchor-target">
            <p className="eyebrow">Start here</p>
            <h2>Choose how you will build before you choose a company.</h2>
            <p>
              The word “best” changes with the website. Find the row that
              matches your build path. Then check the plan&apos;s limits and who
              will do the server work.
            </p>

            <div className="build-path-grid">
              {buildPaths.map((path, index) => (
                <article className="build-path-card" key={path.title}>
                  <span className="guide-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{path.title}</h3>
                  <dl>
                    <div>
                      <dt>Start with</dt>
                      <dd>{path.start}</dd>
                    </div>
                    <div>
                      <dt>Why</dt>
                      <dd>{path.why}</dd>
                    </div>
                    <div>
                      <dt>Check</dt>
                      <dd>{path.check}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            <p className="supporting-link-row">
              <span>Learn more:</span>
              <Link
                className="text-link"
                href="/guides/types-of-web-hosting/"
              >
                Read the full hosting-type guide
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
            <p className="supporting-link-row">
              <span>Comparisons for a specific job:</span>
              <Link className="text-link" href="/tools/best-web-hosting-for-small-business/">
                Small-business hosting
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="text-link" href="/tools/best-web-hosting-for-artists/">
                Artist portfolio hosting
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
            <ChooserTextLink />
          </section>

          <section id="buying-checks" className="anchor-target">
            <p className="eyebrow">Before you pay</p>
            <h2>Six checks matter more than a “best” badge.</h2>
            <ol className="buying-check-grid">
              {buyingChecks.map((check, index) => (
                <li key={check.title}>
                  <span className="guide-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>
                    <strong>{check.title}</strong>
                    {" — "}
                    {check.text}
                  </p>
                </li>
              ))}
            </ol>
            <ChooserTextLink />
          </section>

          <section id="live-plan-examples" className="anchor-target">
            <p className="eyebrow">See what to check</p>
            <h2>See how three public plan pages show the details.</h2>
            <p>
              These screenshots show where to find the payment term, renewal
              price, and plan limits. They do not rank or recommend the
              companies. The images are from August 25, 2026, so check the live
              pages before buying.
            </p>

            <div className="provider-evidence-list">
              {providerExamples.map((provider, index) => (
                <article className="provider-evidence-card" key={provider.name}>
                  <header className="provider-evidence-header">
                    <span className="guide-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{provider.name}</h3>
                  </header>
                  <figure>
                    <div className="provider-screenshot-frame">
                      <Image
                        src={provider.image}
                        alt={provider.alt}
                        sizes="(max-width: 760px) calc(100vw - 56px), (max-width: 1180px) calc(100vw - 330px), 850px"
                      />
                    </div>
                    <figcaption>{provider.caption}</figcaption>
                  </figure>
                  <div className="provider-evidence-copy">
                    <h4>What this page tells you</h4>
                    <ul>
                      {provider.observations.map((observation) => (
                        <li key={observation}>{observation}</li>
                      ))}
                    </ul>
                    <p className="provider-source-link">
                      <span>View the current plan page:</span>
                      <a
                        className="text-link"
                        href={provider.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {provider.sourceLabel}
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <ChooserTextLink />
          </section>

          <section id="what-to-avoid" className="anchor-target">
            <p className="eyebrow">Keep the first choice small</p>
            <h2>Do not buy server work or power you cannot explain yet.</h2>
            <div className="avoid-panel">
              <AlertTriangle size={24} aria-hidden="true" />
              <ul>
                {avoidItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <ChooserTextLink />
          </section>

          <section id="how-this-guide-was-made" className="anchor-target">
            <h2>What these screenshots can and cannot tell you.</h2>
            <div className="method-panel">
              <p>
                The images were saved on August 25, 2026. We did not buy the
                plans or test speed, uptime, security, or support. Use the live
                pages for today’s prices and terms. The companies are not
                ranked.
              </p>
            </div>
            <ChooserTextLink />
            <p className="supporting-link-row">
              <span>How we check our advice:</span>
              <Link className="text-link" href="/methodology/">
                Read how we review hosting
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </section>

          <section
            id="frequently-asked-questions"
            className="anchor-target"
            aria-labelledby="first-website-faq-heading"
          >
            <h2 id="first-website-faq-heading">FAQ</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
            <ChooserTextLink />
          </section>
        </article>
      </div>

      <section className="final-cta" aria-labelledby="first-website-next-step">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Your next step</p>
            <h2 id="first-website-next-step">
              Match your website to a hosting type before you compare companies.
            </h2>
            <p className="pilot-final-copy">
              Answer eight simple questions. The chooser will show a hosting
              type that may fit, or tell you what still needs a decision. It
              keeps “not sure” answers visible.
            </p>
          </div>
          <Link className="button button-quiet" href={chooserPath}>
            Match my site to a hosting type
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
