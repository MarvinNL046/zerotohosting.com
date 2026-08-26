import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "How we work",
  description:
    "Learn how ZeroToHosting checks hosting facts, handles missing information, and keeps affiliate payment out of chooser results.",
  path: publicPageFrontmatter.methodology.path,
});

export default function MethodologyPage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">How we work</p>
        <h1>See how we check our advice—and when it may not fit.</h1>
        <p className="lede">
          We start with your project and who will manage the server. We explain
          the good and bad sides of each choice using sources you can check. If
          key facts are missing, we say so.
        </p>
        <p className="meta-row">
          Last updated:{" "}
          <time dateTime={publicPageFrontmatter.methodology.lastModified}>
            {formatPageDate(publicPageFrontmatter.methodology.lastModified)}
          </time>
        </p>
      </header>

      <section className="content-section" aria-labelledby="evidence-heading">
        <div className="prose">
          <h2 id="evidence-heading">Which sources we trust first</h2>
          <p>
            Different sources answer different questions. We use the source
            closest to the fact and explain what it cannot show.
          </p>
          <ol>
            <li>
              <strong>The company’s product guides and rules.</strong> We start
              here to check features and plan limits. We also check support,
              billing and allowed use.
            </li>
            <li>
              <strong>The company’s status and problem reports.</strong> These
              can show that one problem happened, but not how reliable the
              service is all the time.
            </li>
            <li>
              <strong>Tests that other people can repeat.</strong> When we test
              something, we record the setup and place. We also record the date,
              each step and every limit.
              This helps people understand or repeat the result.
            </li>
            <li>
              <strong>Research from other groups.</strong> We may use it when it
              clearly explains how the work was done and when.
            </li>
          </ol>
          <p>
            We do not use sales pages, unknown online stories, or old screenshots
            as proof that a service is fast or reliable for every website.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="checks-heading">
        <div className="card-grid">
          <article className="card">
            <h2 id="checks-heading">Tests people can repeat</h2>
            <p>
              A number is useful only when you know how it was measured. We list
              the software, settings, test place, test length, and important
              limits. One test run on a computer cannot show how every real site
              will work.
            </p>
          </article>
          <article className="card">
            <h2>Use current sources</h2>
            <p>
              Hosting plans change. We link the source for features and limits.
              We also show when we checked speed or price. Check again before you
              buy or move a site.
            </p>
          </article>
          <article className="card">
            <h2>Missing facts</h2>
            <p>
              An unknown answer stays unknown. We use simple confidence labels.
              These labels show how sure the result is. We explain which missing
              fact could change the advice. We do not
              make up exact scores, chances, or numbers.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section" aria-labelledby="tool-heading">
        <div className="prose">
          <h2 id="tool-heading">What the Hosting Type Chooser can decide</h2>
          <p>
            The chooser uses your answers about software and what the site does. It
            also checks server care, plan limits and problems you have measured. It
            suggests a <em>type</em> of hosting.
            It may also tell you to measure first or ask an expert for help.
          </p>
          <p>The tool does not:</p>
          <ul>
            <li>choose a hosting company or plan;</li>
            <li>promise speed, time online, safety, or that you will meet every rule;</li>
            <li>replace a full check of server needs, a plan for moving a site, or expert advice;</li>
            <li>choose from visitor numbers or price alone.</li>
          </ul>
          <p>
            Each result explains the reasons, things you should check, another
            possible option, and signs that mean you should look again. Use the
            result to help you decide. It is not a promise.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="affiliate-heading">
        <div className="callout">
          <h2 id="affiliate-heading">Payments do not affect chooser results</h2>
          <p>
            Some pages have affiliate links, which may pay us after a sign-up or
            purchase. They do not affect the chooser’s questions or results. We
            label every affiliate link. Payment does not show that a product is good,
            so we check products with affiliate links by the same rules as all other products.
          </p>
          <p>
            Read the full <Link className="text-link" href="/affiliate-disclosure/">affiliate notice</Link>.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="corrections-heading">
        <div className="prose">
          <h2 id="corrections-heading">Fixes and updates</h2>
          <p>
            When an important correction changes the advice, we update the date
            and explain the correction.
          </p>
          <p>
            Direct correction requests are not currently available. We still
            review dated sources and update pages when information changes. See the
            <Link className="text-link" href="/contact/"> contact page</Link> for
            the latest status.
          </p>
        </div>
      </section>
    </main>
  );
}
