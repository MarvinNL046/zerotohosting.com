import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Learn why contact is not available in this private preview and what to include when it opens.",
  path: publicPageFrontmatter.contact.path,
});

export default function ContactPage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Contact is not available yet.</h1>
        <p className="lede">
          This site is still a private preview. We will add and test an email
          address before the site opens to the public. This page has no contact
          form. It does not collect names, email addresses, messages, or files.
        </p>
        <p className="meta-row">
          Status updated:{" "}
          <time dateTime={publicPageFrontmatter.contact.lastModified}>
            {formatPageDate(publicPageFrontmatter.contact.lastModified)}
          </time>
        </p>
      </header>

      <section className="content-section" aria-labelledby="status-heading">
        <div className="callout">
          <h2 id="status-heading">Why there is no email address yet</h2>
          <p>
            We need to make sure email arrives. We also need to block spam and
            protect messages. Then we can say when you may get a reply.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="future-heading">
        <div className="prose">
          <h2 id="future-heading">What to include when contact opens</h2>
          <p>
            When contact opens, please include these details when you report an error:
          </p>
          <ul>
            <li>The page link and exact words you want us to check.</li>
            <li>A current page from the company or service, if one exists.</li>
            <li>The date you saw the problem.</li>
            <li>A short note that says what seems wrong or unclear.</li>
          </ul>
          <p>
            Do not send passwords, secret access keys, bills, private customer
            data, or other secrets.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="policies-heading">
        <div className="card-grid">
          <article className="card">
            <h2 id="policies-heading">Corrections</h2>
            <p>
              The <Link className="text-link" href="/methodology/">way we work</Link>
              {" "}explains how we check facts, update pages, and fix important errors.
            </p>
          </article>
          <article className="card">
            <h2>Privacy</h2>
            <p>
              The <Link className="text-link" href="/privacy/">privacy notice</Link>
              {" "}explains what data this site may use.
            </p>
          </article>
          <article className="card">
            <h2>Tool questions</h2>
            <p>
              Read ‘How we work’ to learn what the chooser can and cannot decide.
              Help for the chooser is not available yet.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
