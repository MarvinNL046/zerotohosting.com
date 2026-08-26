import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
import wixHosting from "@/public/images/guides/website-builder-vs-web-hosting/wix-hosting-included-2026-08-25.png";
import wordpressHosting from "@/public/images/guides/website-builder-vs-web-hosting/wordpress-needs-web-server-2026-08-25.png";

const chooserPath = "/tools/hosting-type-chooser/";

export const metadata = createPageMetadata({
  title: "Website builder vs web hosting: what do you need?",
  description:
    "A website builder helps you make pages. Web hosting puts them online. See when one plan covers both and when you need separate hosting.",
  path: publicPageFrontmatter.websiteBuilderVsHostingGuide.path,
});

const toc = [
  ["quick-answer", "Quick answer"],
  ["four-layers", "The four layers"],
  ["side-by-side", "Side-by-side comparison"],
  ["three-setups", "Three real setups"],
  ["official-examples", "Real examples"],
  ["four-questions", "Four questions"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const comparisonRows = [
  ["How do you build?", "With the platform's editor and tools", "With WordPress, uploaded files, or your own app"],
  ["Is hosting included?", "It can be; check the plan", "Hosting is the service you are buying"],
  ["Who supplies the hosting?", "The builder company when the plan says hosting is included", "The separate hosting company you choose"],
  ["Can you add any tool?", "Only what the platform allows", "It depends on the software and plan"],
  ["Can you move later?", "Check the platform’s moving rules before you choose.", "Check the software and hosting rules before you choose."],
  ["How is it billed?", "One main plan, with possible extras", "Hosting and other services may have separate bills"],
] as const;

const setupExamples = [
  {
    title: "Hosted builder site",
    answer: "Builder + hosting together",
    text: "The editor and hosting are part of one platform. Check the plan for domains, email, store tools, and other extras.",
  },
  {
    title: "Self-hosted WordPress site",
    answer: "Site software + separate hosting",
    text: "WordPress is the software used to make and manage the site. You install it on a web host.",
  },
  {
    title: "Custom website or app",
    answer: "Your code + a service that can run it",
    text: "Choose static hosting, an app platform, or a server that supports what your code needs to do.",
  },
] as const;

type SourceExample = Readonly<{
  title: string;
  label: string;
  image: StaticImageData;
  alt: string;
  href: string;
  notes: readonly string[];
}>;

const sourceExamples: readonly SourceExample[] = [
  {
    title: "Hosted builder example",
    label: "Wix says it hosts Wix sites",
    image: wixHosting,
    alt: "Wix Help Center page explaining that Wix includes hosting for Wix websites.",
    href: "https://support.wix.com/en/article/wix-site-hosting",
    notes: [
      "The builder company also hosts the site.",
      "A custom domain can depend on the chosen plan.",
      "You should not buy a second host for the same Wix site.",
    ],
  },
  {
    title: "Separate hosting example",
    label: "WordPress says the software needs a web server",
    image: wordpressHosting,
    alt: "WordPress.org guide explaining that self-hosted WordPress needs a web server.",
    href: "https://wordpress.org/documentation/article/hosting-wordpress/",
    notes: [
      "WordPress is the website software in this setup.",
      "A web server gives that software a place to run.",
      "WordPress-specific plans may add updates, backups, or tools.",
    ],
  },
] as const;

const faqs = [
  {
    question: "Do I need web hosting if I use a website builder?",
    answer:
      "Not always. A hosted builder can include hosting. Check the builder’s current plan details before buying another hosting plan.",
  },
  {
    question: "Is WordPress a website builder or web hosting?",
    answer:
      "The self-hosted WordPress software helps you build and manage a site. It is not the web host. WordPress.com is a separate hosted service.",
  },
  {
    question: "Can I build a website before buying hosting?",
    answer:
      "Yes, with some local tools, trials, or free builder plans. The finished site still needs a suitable service before every wanted feature can work online.",
  },
  {
    question: "Does web hosting include a drag-and-drop builder?",
    answer:
      "Some hosts include one, but it is not guaranteed. Check the exact plan and the limits of its building tool.",
  },
  {
    question: "Can I move from a builder to another host?",
    answer:
      "Moving is possible on some platforms, but the steps differ. Check which pages and images you can take. Also check whether you can move the domain and saved data before you choose.",
  },
] as const;

export default function WebsiteBuilderVsHostingGuidePage() {
  const page = publicPageFrontmatter.websiteBuilderVsHostingGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: page.path, label: "Website builder vs web hosting" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Builder vs hosting" }]}
        eyebrow={
          <>
            Beginner comparison / checked{" "}
            <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="Website builder vs web hosting"
        lede={
          <p>
            A website builder is the tool you use to make pages, while web hosting
            is the service that keeps the site online. Some builder plans include
            hosting, so one service can cover both. Self-hosted WordPress or your
            own code normally needs a separate hosting service.
          </p>
        }
        actions={[
          { href: chooserPath, label: "Use the hosting type chooser" },
          { href: "/guides/how-much-does-web-hosting-cost/", label: "Compare the costs", quiet: true },
        ]}
        trustItems={[
          "The builder and host are not always separate",
          "Examples are not recommendations",
          "Server work stays visible",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="quick-answer" className="anchor-target">
          <p className="eyebrow">The simple difference</p>
          <h2>One helps you build. The other keeps the result online.</h2>
          <div className="answer-split-grid">
            <article>
              <span className="guide-card-number">BUILD</span>
              <h3>Website builder</h3>
              <p>
                Gives you tools to design and edit a site. It may include page
                blocks and templates. It may also add forms or store tools.
              </p>
            </article>
            <article>
              <span className="guide-card-number">RUN</span>
              <h3>Web hosting</h3>
              <p>
                Gives the website a place to run. It stores or runs the site and
                sends it to visitors.
              </p>
            </article>
          </div>
          <p>
            A hosted builder does both jobs inside one service. A hosting plan
            does not always include an easy page builder.
          </p>
          <PageNextStep href={chooserPath} label="Use the hosting type chooser" />
        </section>

        <section id="four-layers" className="anchor-target">
          <p className="eyebrow">One clear picture</p>
          <h2>Four layers make a website work.</h2>
          <ol className="layer-flow" aria-label="Four website layers">
            <li><span>01</span><strong>Domain</strong><small>The address</small></li>
            <li><span>02</span><strong>Builder or site editor</strong><small>Where you make pages</small></li>
            <li><span>03</span><strong>Hosting</strong><small>Where the site runs</small></li>
            <li><span>04</span><strong>Server care</strong><small>Updates and backups; fixing problems</small></li>
          </ol>
          <p>
            One company may handle several jobs. The jobs still exist; they are
            simply included in one service.
          </p>
        </section>

        <section id="side-by-side" className="anchor-target">
          <p className="eyebrow">At a glance</p>
          <h2>Hosted builder or separate hosting?</h2>
          <div className="comparison-scroll" role="region" aria-label="Website builder and web hosting comparison" tabIndex={0}>
            <table className="comparison-table three-column-table">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Hosted website builder</th>
                  <th scope="col">Separate web hosting</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([question, builder, hosting]) => (
                  <tr key={question}>
                    <th scope="row">{question}</th>
                    <td>{builder}</td>
                    <td>{hosting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PageNextStep href={chooserPath} label="Use the hosting type chooser" />
        </section>

        <section id="three-setups" className="anchor-target">
          <p className="eyebrow">Three common setups</p>
          <h2>See how the builder and hosting work together.</h2>
          <div className="build-path-grid">
            {setupExamples.map((setup, index) => (
              <article className="build-path-card" key={setup.title}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{setup.title}</h3>
                <p className="cost-formula-line">{setup.answer}</p>
                <p>{setup.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="official-examples" className="anchor-target">
          <p className="eyebrow">See the difference</p>
          <h2>Two pages show the difference.</h2>
          <p>
            The Wix page says hosting is included. The WordPress page says
            self-hosted WordPress needs a web server. The screenshots are from
            August 25, 2026. They are examples, not recommendations or speed
            tests.
          </p>
          <div className="provider-evidence-list source-pair-grid">
            {sourceExamples.map((example, index) => (
              <article className="provider-evidence-card" key={example.title}>
                <header className="provider-evidence-header">
                  <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{example.title}</h3>
                </header>
                <figure>
                  <div className="provider-screenshot-frame">
                    <Image
                      src={example.image}
                      alt={example.alt}
                      sizes="(max-width: 760px) calc(100vw - 56px), (max-width: 1180px) calc(100vw - 330px), 850px"
                    />
                  </div>
                  <figcaption>
                    Page saved August 25, 2026. This is the company’s own
                    information, not our test. Check the live page before
                    choosing.
                  </figcaption>
                </figure>
                <div className="provider-evidence-copy">
                  <h4>What the page shows</h4>
                  <ul>
                    {example.notes.map((note) => <li key={note}>{note}</li>)}
                  </ul>
                  <p className="provider-source-link">
                    <span>View the current page:</span>
                    <ExternalSourceLink href={example.href}>{example.label}</ExternalSourceLink>
                  </p>
                </div>
              </article>
            ))}
          </div>
          <PageNextStep href={chooserPath} label="Use the hosting type chooser" />
        </section>

        <section id="four-questions" className="anchor-target">
          <p className="eyebrow">Decide before you buy</p>
          <h2>Answer four small questions.</h2>
          <ol className="decision-question-list">
            <li><span>01</span><p><strong>Do you want a visual editor?</strong> A hosted builder may be the simpler path.</p></li>
            <li><span>02</span><p><strong>Does your chosen tool already include hosting?</strong> Do not pay for the same job twice.</p></li>
            <li><span>03</span><p><strong>Do you need special code or server access?</strong> A builder may limit what you can install.</p></li>
            <li><span>04</span><p><strong>Who will handle updates and backups? Who will fix problems?</strong> Name the person or service.</p></li>
          </ol>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <p>
              If you cannot answer question two, do not buy hosting yet. First
              check what your website tool already includes.
            </p>
          </div>
          <PageNextStep href={chooserPath} label="Use the hosting type chooser" />
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and limits</p>
          <h2>Read the current product pages before you choose.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li>
                <ExternalSourceLink href="https://support.wix.com/en/article/wix-site-hosting">
                  Wix Help Center: site hosting
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://support.squarespace.com/hc/en-us/articles/207155658-Is-hosting-included">
                  Squarespace Help: is hosting included?
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://wordpress.org/documentation/article/hosting-wordpress/">
                  WordPress.org: hosting WordPress
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://wordpress.org/documentation/article/difference-between-wordpress-org-and-wordpress-com/">
                  WordPress.org: WordPress.org and WordPress.com
                </ExternalSourceLink>
              </li>
            </ul>
            <p>
              Sources checked August 25, 2026. We did not compare moving rules
              or test these services. Check the current plan terms.
            </p>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>Builder and hosting questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Choose the setup first</p>
            <h2>Find the hosting type that fits your build.</h2>
            <p className="pilot-final-copy">
              Answer simple questions about how you will build the site, what it
              needs, and who will care for the server.
            </p>
          </div>
          <Link className="button button-accent" href={chooserPath}>
            Use the hosting type chooser <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
