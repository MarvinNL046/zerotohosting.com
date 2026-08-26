import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "Read how ZeroToHosting handles chooser answers, basic service logs, cookies, and referral links to other websites.",
  path: publicPageFrontmatter.privacy.path,
});

export default function PrivacyPage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">Privacy notice</p>
        <h1>This small site is built to use as little data as possible.</h1>
        <p className="lede">
          Right now, this site does not track visits, use ad cookies, offer user
          accounts, or have a contact form. It does not ask you to send personal
          information.
        </p>
        <p className="meta-row">
          Last updated:{" "}
          <time dateTime={publicPageFrontmatter.privacy.lastModified}>
            {formatPageDate(publicPageFrontmatter.privacy.lastModified)}
          </time>
        </p>
      </header>

      <section className="content-section" aria-labelledby="not-collected-heading">
        <div className="prose">
          <h2 id="not-collected-heading">What we do not collect</h2>
          <ul>
            <li>account, profile, or newsletter details;</li>
            <li>messages or files from a contact form;</li>
            <li>site analytics or visitor profiles;</li>
            <li>cookies set by ZeroToHosting for ads or affiliate tracking;</li>
            <li>payment details.</li>
          </ul>
          <p>
            The Hosting Type Chooser uses your answers to make a result. It does
            not save results in an account. Your answers appear in the page
            address (URL), so the companies that host or protect the site may
            keep that address in technical logs. Never put passwords or other
            secrets in the URL.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="logs-heading">
        <div className="callout">
          <h2 id="logs-heading">Technical logs needed to run the site</h2>
          <p>
            The companies that host, send, or protect this site may receive basic
            request data. This can include your IP address, browser details, the
            page address and the time. It may also include errors or signs of an
            attack. They may use this data to show the site, fix problems, stop
            abuse and keep it safe.
          </p>
          <p>
            Those companies decide how they protect their logs and how long they
            keep them. Their own terms and privacy notices apply. Before the site
            opens to the public, this notice will name those companies and
            explain how long they keep logs.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="sharing-heading">
        <div className="card-grid">
          <article className="card">
            <h2 id="sharing-heading">Selling and sharing data</h2>
            <p>
              This private preview has no feature that sells personal information.
              It does not use an ad network or a tool that tracks visits. An affiliate
              link can include a referral code that is sent to the website you open.
            </p>
          </article>
          <article className="card">
            <h2>Cookies and data saved in your browser</h2>
            <p>
              This site does not currently set cookies that track visits, show
              ads, or remember choices. It does not save tracking data in your
              browser.
            </p>
          </article>
          <article className="card">
            <h2>Links to other sites</h2>
            <p>
              An affiliate link may tell another site that your visit came from
              ZeroToHosting. That site may use its own cookies, logs, or account
              records. Read its privacy rules before you send information.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section" aria-labelledby="requests-heading">
        <div className="prose">
          <h2 id="requests-heading">Privacy questions and requests</h2>
          <p>
            We will add and test an email address for privacy questions before
            the site opens to the public. You cannot send a privacy request
            through this preview yet. See the
            <Link className="text-link" href="/contact/"> contact page</Link> for
            the latest status.
          </p>
          <p>
            We will update this notice before we add visit tracking, forms,
            accounts, cookies, or another way to collect or use personal data.
          </p>
        </div>
      </section>
    </main>
  );
}
