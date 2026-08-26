import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "ZeroToHosting helps people choose a hosting type without made-up rankings, big claims, or server power they do not need.",
  path: publicPageFrontmatter.about.path,
});

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-hero">
        <p className="eyebrow">About ZeroToHosting</p>
        <h1>Start with what your site needs, not a huge list of plans.</h1>
        <p className="lede">
          ZeroToHosting helps you understand which kind of hosting may fit your
          website or app. We make the choice smaller and clearer, so you can
          compare fewer plans.
        </p>
        <p className="meta-row">
          Updated{" "}
          <time dateTime={publicPageFrontmatter.about.lastModified}>
            {formatPageDate(publicPageFrontmatter.about.lastModified)}
          </time>
        </p>
      </header>

      <section className="content-section" aria-labelledby="mission-heading">
        <div className="prose">
          <h2 id="mission-heading">Our goal</h2>
          <p>
            Hosting words can make a normal choice sound hard. We turn the choice
            into simple questions. What does your site run? Which features does it
            need? What problems have you measured? How much server work do you want
            to handle yourself?
          </p>
          <p>
            Good advice should also stop upgrades that you do not need. A useful
            answer may be hosting that is already included, a static host that sends
            ready-made files, or better testing. You may not need a bigger server.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="payment-heading">
        <div className="prose">
          <h2 id="payment-heading">How this project may earn money</h2>
          <p>
            Some pages have affiliate links. We may earn money if you sign up or buy
            through one. We label every affiliate link. This payment does not affect
            the chooser’s questions or results.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="audience-heading">
        <div className="card-grid">
          <article className="card">
            <h2 id="audience-heading">Who this is for</h2>
            <p>
              This is for website owners and creators. It is also for small teams
              and developers who want a clear place to start before comparing plans.
            </p>
          </article>
          <article className="card">
            <h2>What you can use</h2>
            <p>
              Use the Hosting Type Chooser, read about hosting types, and see how
              we check our advice.
            </p>
          </article>
          <article className="card">
            <h2>How to use it</h2>
            <p>
              Use the tool to find a possible hosting type. Read the reasons and
              warnings. Then check the hosting company&apos;s latest information before you buy.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section" aria-labelledby="claims-heading">
        <div className="callout">
          <h2 id="claims-heading">Claims we will not make</h2>
          <ul>
            <li>that one host fits every website;</li>
            <li>that we tested a product or collected data when we did not;</li>
            <li>that an old price, feature, or limit is still correct;</li>
            <li>that one short speed test can predict how every real site will work;</li>
            <li>that a tool result promises speed, safety, or that you will meet every rule.</li>
          </ul>
          <p>
            We tell you when we do not know enough or when you should ask an expert.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="next-heading">
        <div className="prose">
          <h2 id="next-heading">See how we check our advice</h2>
          <p>
            Read the <Link className="text-link" href="/methodology/">way we work</Link>
            {" "}to learn which sources we trust, what the tool can decide, and how
            we fix errors. Read the
            <Link className="text-link" href="/affiliate-disclosure/"> affiliate notice</Link>
            {" "}to learn how affiliate links are labeled and kept out of chooser results.
          </p>
        </div>
      </section>
    </main>
  );
}
