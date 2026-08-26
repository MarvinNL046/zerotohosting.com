import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "Terms",
  description:
    "Simple terms for using ZeroToHosting's guides and hosting choice tool.",
  path: publicPageFrontmatter.terms.path,
});

export default function TermsPage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">Terms of use</p>
        <h1>Use this guidance as a starting point. Check the facts before you decide.</h1>
        <p className="lede">
          ZeroToHosting gives general information and a tool for comparing
          hosting choices. We do not sell or operate hosting. Any hosting
          contract is between you and the hosting company.
        </p>
        <p className="meta-row">
          Last updated:{" "}
          <time dateTime={publicPageFrontmatter.terms.lastModified}>
            {formatPageDate(publicPageFrontmatter.terms.lastModified)}
          </time>
        </p>
      </header>

      <section className="content-section" aria-labelledby="information-heading">
        <div className="prose">
          <h2 id="information-heading">General information only</h2>
          <p>
            The site and Hosting Type Chooser help you think through a hosting
            choice. They are not legal, security, financial, or other expert
            advice. They cannot prove that you follow every law or rule, and they
            do not replace an expert checking your real site or app.
          </p>
          <p>
            You must decide whether a service meets your needs. You are also
            responsible for protecting your apps, data, accounts, backups,
            passwords and keys, and recovery steps.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="verify-heading">
        <div className="callout">
          <h2 id="verify-heading">Check the hosting company&apos;s terms before you decide</h2>
          <p>
            Plans, prices, renewal rules and limits can change. Support and server
            locations can change too. Read the hosting company&apos;s latest rules and
            contract before you buy, renew, move, or rely on a feature.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="guarantees-heading">
        <div className="card-grid">
          <article className="card">
            <h2 id="guarantees-heading">We cannot promise results</h2>
            <p>
              A recommendation does not promise that a service will stay online,
              be fast, handle all traffic, work with every system, or stay secure.
              It also does not promise that the service meets laws or rules,
              offers good support, or helps a business succeed.
            </p>
          </article>
          <article className="card">
            <h2>Access to this site</h2>
            <p>
              We may fix, change, move, or remove site content and tools. We do
              not promise that the site will always work, stay online, or have
              no errors.
            </p>
          </article>
          <article className="card">
            <h2>Other sites and services</h2>
            <p>
              Other sites and services have their own terms. A link or mention
              does not make ZeroToHosting responsible for what they publish,
              how safe or available they are, or how they act.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section" aria-labelledby="affiliate-heading">
        <div className="prose">
          <h2 id="affiliate-heading">Affiliate links and other companies</h2>
          <p>
            Some pages may contain a clearly labeled affiliate link. We may earn
            a commission if you sign up or buy through that link. This payment
            does not change the Hosting Type Chooser&apos;s questions or results.
          </p>
          <p>
            Read the current price and renewal rules before you decide. Also read
            the refund terms and privacy notice.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="limits-heading">
        <div className="prose">
          <h2 id="limits-heading">Our responsibility and its limits</h2>
          <p>
            We try to use facts you can check, but some details may be wrong or
            out of date. As far as the law allows, ZeroToHosting is not
            responsible for losses caused by using this information as a
            promise. Always check current facts before an important choice.
            These terms do not remove rights given to you by law.
          </p>
          <p>
            If something looks wrong, read our
            <Link className="text-link" href="/methodology/"> “How we work” page</Link>
            {" "}and check our current <Link className="text-link" href="/contact/">contact status</Link>.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="updates-heading">
        <div className="prose">
          <h2 id="updates-heading">Changes to these terms</h2>
          <p>
            We will explain any major change clearly instead of hiding it in an
            undated edit.
          </p>
        </div>
      </section>
    </main>
  );
}
