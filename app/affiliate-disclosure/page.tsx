import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "Affiliate Links",
  description:
    "Learn how ZeroToHosting labels affiliate links, may earn commissions, and keeps affiliate payment out of chooser results.",
  path: publicPageFrontmatter.affiliateDisclosure.path,
});

export default function AffiliateDisclosurePage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">How affiliate links work</p>
        <h1>Some links can pay us.</h1>
        <p className="lede">
          ZeroToHosting may earn money when you sign up or buy through a clearly
          labeled affiliate link. Right now, we have affiliate links for VoidFix’s WhatsApp
          Gateway and SMS Gateway. The Hosting Type Chooser still recommends
          hosting types, not companies.
        </p>
        <p className="meta-row">
          Last updated:{" "}
          <time dateTime={publicPageFrontmatter.affiliateDisclosure.lastModified}>
            {formatPageDate(publicPageFrontmatter.affiliateDisclosure.lastModified)}
          </time>
        </p>
      </header>

      <section className="content-section" aria-labelledby="current-heading">
        <div className="callout">
          <h2 id="current-heading">Where you may see affiliate links</h2>
          <p>
            Pages about VoidFix may have affiliate links. We place this note next to
            each one: ‘Affiliate link — we may earn a commission.’ Links to
            information sources do not contain a referral code.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="rules-heading">
        <div className="prose">
          <h2 id="rules-heading">Rules for affiliate links</h2>
          <ul>
            <li>
              We place a clear affiliate label next to every affiliate link.
            </li>
            <li>
              Payment will not change the Hosting Type Chooser&apos;s questions,
              rules, confidence labels, or results.
            </li>
            <li>
              A company cannot pay for a ranking, a better result, or to hide an
              important limit. We check paid companies by the same rules as all
              other companies.
            </li>
            <li>
              We will not use fake urgency, hide renewal terms, or treat a
              payment as proof that a product is good.
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section" aria-labelledby="separation-heading">
        <div className="card-grid">
          <article className="card">
            <h2 id="separation-heading">How the tool works</h2>
            <p>
              Payments do not affect your result. The result comes from your
              project, needs, test results, and who will manage the service.
              Clicking an affiliate link does not become a chooser answer or change a
              chooser result.
            </p>
          </article>
          <article className="card">
            <h2>Facts still need support</h2>
            <p>
              We keep information links separate from affiliate links. Payment does
              not make an unsupported claim okay.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section" aria-labelledby="before-click-heading">
        <div className="prose">
          <h2 id="before-click-heading">What happens when you use an affiliate link</h2>
          <p>
            When you open an affiliate link, you leave ZeroToHosting. The other company
            may use cookies and logs. It may also save account records. Its terms
            and privacy notice apply.
          </p>
          <p>
            You should check the current price, limits, renewal rules, and refund
            rules before you sign up. An affiliate link is not a promise that the
            product will fit your needs.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="learn-heading">
        <div className="prose">
          <h2 id="learn-heading">See how recommendations are made</h2>
          <p>
            The <Link className="text-link" href="/methodology/">‘How we work’ page</Link>
            {" "}explains which sources matter most, what the tool cannot decide,
            how it handles missing answers, and how we fix errors.
          </p>
        </div>
      </section>
    </main>
  );
}
