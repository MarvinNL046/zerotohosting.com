import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, LockKeyhole, ServerCog } from "lucide-react";

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

const aiHostingPath = "/guides/ai-agent-hosting/";

export const metadata = createPageMetadata({
  title: "Best n8n hosting: cloud vs self-hosted",
  description:
    "Compare n8n Cloud, managed n8n hosting, a self-managed Docker VPS, and a larger self-hosted setup. Check updates, webhooks, backups, and security.",
  path: publicPageFrontmatter.bestN8nHostingTool.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["four-routes", "Four hosting routes"],
  ["what-must-stay-safe", "Data and secrets"],
  ["webhooks-and-access", "Webhooks and access"],
  ["when-to-scale", "When to scale"],
  ["decision-table", "Decision table"],
  ["buying-checks", "Buying checks"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const routes = [
  {
    title: "n8n Cloud",
    fit: "You want n8n to handle the hosting layer and you do not need a self-hosted-only feature.",
    work: "You build workflows, connect accounts, control users, and decide what data each workflow can reach.",
    check: "Plan limits, execution history, users, data location, available features, and how to export workflows.",
  },
  {
    title: "Managed n8n hosting from another company",
    fit: "You want a ready-made n8n setup but prefer another host or service package.",
    work: "The work split changes by provider. Get updates, backups, access, restores, and support promises in writing.",
    check: "Who owns the n8n account, encryption key, domain, database, backups, and move-out process?",
  },
  {
    title: "Self-managed Docker VPS",
    fit: "You can manage Linux, Docker, HTTPS, a database, backups, updates, logs, and server access.",
    work: "You own the server and the n8n app. A VPS company normally manages only the hardware and network.",
    check: "Persistent data, a custom encryption key, webhook URL, TLS, updates, and a tested restore.",
  },
  {
    title: "Larger self-hosted setup",
    fit: "Tests show that one n8n process is not enough or your team needs stricter controls and separate workers.",
    work: "You may add PostgreSQL, Redis, workers, monitoring, external file storage, and a planned update process.",
    check: "Do not add this setup before measurements show the need and your team can operate every part.",
  },
] as const;

const faqs = [
  {
    question: "What is the best n8n hosting?",
    answer:
      "n8n Cloud is the simplest starting route when you do not want server work. A managed third-party service may fit when its work split is clear. A Docker VPS fits only when someone can manage Linux, Docker, HTTPS, updates, backups, and recovery.",
  },
  {
    question: "Is self-hosting n8n free?",
    answer:
      "The software route may avoid a cloud subscription, but the server, domain, backups, storage, monitoring, and your time still cost money. Some team, scaling, and external-storage features also depend on the n8n plan.",
  },
  {
    question: "Does n8n need a VPS?",
    answer:
      "No. n8n Cloud is hosted by n8n. You can also test n8n locally. Use a VPS when you choose to self-host and need the workflows and webhooks to stay available.",
  },
  {
    question: "Can normal shared web hosting run n8n?",
    answer:
      "Do not assume it can. n8n needs an app process that can keep running, saved data, environment settings, and public webhook routes. A normal shared website plan may not allow those things.",
  },
  {
    question: "When does n8n need queue mode?",
    answer:
      "Queue mode is for a setup with separate worker processes. Add it when real execution tests show one process is not enough and your team can operate the database, Redis, workers, and shared settings.",
  },
  {
    question: "Did you test n8n hosting companies?",
    answer:
      "No. This page compares hosting routes using n8n's official documentation. We did not test speed, uptime, support, busy workflows, or provider backup quality.",
  },
] as const;

export default function BestN8nHostingPage() {
  const page = publicPageFrontmatter.bestN8nHostingTool;
  const breadcrumbs = [
    { href: "/", label: "Home" },
    { href: publicPageFrontmatter.toolsHub.path, label: "Tools" },
    { href: page.path, label: "Best n8n hosting" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: publicPageFrontmatter.toolsHub.path, label: "Tools" },
          { label: "Best n8n hosting" },
        ]}
        eyebrow={
          <>
            Updated <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="What is the best n8n hosting?"
        lede={
          <p>
            n8n Cloud is the simple starting route when you do not want to manage
            a server. A managed n8n service can also remove work, but you must read
            what it really manages. A self-hosted Docker VPS gives you more control
            and all the server jobs. Choose the work split before the price.
          </p>
        }
        actions={[
          { href: "#decision-table", label: "Find my n8n route" },
          { href: aiHostingPath, label: "Read the AI hosting guide", quiet: true },
        ]}
        trustItems={[
          "Cloud and self-hosting compared",
          "Security work stays visible",
          "No untested provider ranking",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The useful answer</p>
          <h2>Start with n8n Cloud unless you can explain why you need self-hosting.</h2>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <p>
              Self-hosting may give you more control, but it also gives you Linux,
              Docker, HTTPS, database, update, backup, monitoring, and recovery
              jobs. Choose it for a real need, not because a small VPS price looks cheaper.
            </p>
          </div>
        </section>

        <section id="four-routes" className="anchor-target">
          <p className="eyebrow">Four routes</p>
          <h2>Each route moves work between you and the host.</h2>
          <div className="provider-route-list">
            {routes.map((route, index) => (
              <article className="provider-route-card" key={route.title}>
                <header>
                  <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{route.title}</h3><p>n8n hosting route</p></div>
                </header>
                <dl>
                  <div><dt>May fit when</dt><dd>{route.fit}</dd></div>
                  <div><dt>Your work</dt><dd>{route.work}</dd></div>
                  <div><dt>Check</dt><dd>{route.check}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section id="what-must-stay-safe" className="anchor-target">
          <p className="eyebrow">The important data</p>
          <h2>Workflows are only one part of an n8n backup.</h2>
          <div className="responsibility-grid">
            <article><LockKeyhole size={22} aria-hidden="true" /><h3>Credentials</h3><p>n8n stores connections to other services. Protect the encryption key and limit who can view or use each credential.</p></article>
            <article><ServerCog size={22} aria-hidden="true" /><h3>Database</h3><p>Workflows, settings, users, and execution records can live in the database. Back it up in a way you can restore.</p></article>
            <article><CheckCircle2 size={22} aria-hidden="true" /><h3>Files and history</h3><p>Some workflows handle files or keep execution data. Decide how long to keep it and where large files live.</p></article>
          </div>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <p>
              A copy of the workflow canvas is not a full recovery plan. Test a
              clean restore with the database, encryption key, required files,
              environment settings, and the same n8n version.
            </p>
          </div>
        </section>

        <section id="webhooks-and-access" className="anchor-target">
          <p className="eyebrow">The public door</p>
          <h2>Webhooks need a public address, but the editor needs protection.</h2>
          <p>
            A webhook is an address another service calls to start a workflow.
            Your webhook routes may need to be public. That does not mean the n8n
            editor, database, or server login should be open to everyone. Use HTTPS,
            a correct public webhook address, and strong access controls.
          </p>
          <ol className="decision-question-list safety-question-list">
            <li><span>01</span><p><strong>Give n8n a stable public address.</strong> The domain should keep pointing to the current service after a restart or move.</p></li>
            <li><span>02</span><p><strong>Use HTTPS.</strong> Protect information while it travels between the caller and your server.</p></li>
            <li><span>03</span><p><strong>Protect the editor.</strong> Limit users and give each person only the access they need.</p></li>
            <li><span>04</span><p><strong>Review risky nodes.</strong> Code, file, community, and custom nodes can reach more of the host.</p></li>
            <li><span>05</span><p><strong>Keep n8n current.</strong> Plan updates and read release notes before changing a production system.</p></li>
          </ol>
        </section>

        <section id="when-to-scale" className="anchor-target">
          <p className="eyebrow">More parts are not automatically better</p>
          <h2>Scale after a test shows what is full.</h2>
          <p>
            n8n documents queue mode for a main process and separate workers.
            That route also needs Redis and a supported database. More parts can
            run more work, but they also create more things to update, watch, back
            up, and recover.
          </p>
          <div className="comparison-scroll" role="region" aria-label="n8n scaling checks" tabIndex={0}>
            <table className="comparison-table">
              <thead><tr><th scope="col">What a test shows</th><th scope="col">What to check next</th></tr></thead>
              <tbody>
                <tr><th scope="row">One workflow uses too much memory</th><td>Fix the workflow, file handling, or execution-data settings before buying a larger system.</td></tr>
                <tr><th scope="row">Too many jobs wait at once</th><td>Check concurrency and whether queue mode fits the real workload.</td></tr>
                <tr><th scope="row">Large files fill local disk</th><td>Check file retention and whether supported external storage is part of your plan.</td></tr>
                <tr><th scope="row">The editor is slow but workflows are fine</th><td>Measure the database, browser, and network separately.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="decision-table" className="anchor-target">
          <p className="eyebrow">Quick guide</p>
          <h2>Choose the simplest route that meets the real need.</h2>
          <div className="comparison-scroll" role="region" aria-label="n8n hosting decision table" tabIndex={0}>
            <table className="comparison-table three-column-table">
              <thead><tr><th scope="col">Your situation</th><th scope="col">Start with</th><th scope="col">Why</th></tr></thead>
              <tbody>
                <tr><th scope="row">You want to build workflows, not manage a server</th><td>n8n Cloud</td><td>n8n handles the hosting layer.</td></tr>
                <tr><th scope="row">You want a ready-made outside service</th><td>Managed n8n hosting</td><td>It may remove setup work, but read the work split.</td></tr>
                <tr><th scope="row">You need self-hosting and know Linux and Docker</th><td>Self-managed Docker VPS</td><td>You control the host and accept every server job.</td></tr>
                <tr><th scope="row">Measured load needs separate workers</th><td>Larger self-hosted setup</td><td>Queue mode can split work across processes.</td></tr>
              </tbody>
            </table>
          </div>
          <PageNextStep href={aiHostingPath} label="Learn when an always-on server is needed" />
        </section>

        <section id="buying-checks" className="anchor-target">
          <p className="eyebrow">Before you pay</p>
          <h2>Get twelve answers in writing.</h2>
          <ol className="buying-check-grid openclaw-buying-grid">
            {[
              "Who updates n8n?",
              "Who updates the operating system and Docker?",
              "Where is the database?",
              "Who controls the encryption key?",
              "How are backups made and restored?",
              "How is HTTPS handled?",
              "How are public webhook addresses kept stable?",
              "Which execution and storage limits apply?",
              "Can I install community nodes?",
              "How are staff accounts controlled?",
              "How do I export workflows and data?",
              "What is the full renewal cost?",
            ].map((item, index) => (
              <li key={item}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <p><strong>{item}</strong></p>
              </li>
            ))}
          </ol>
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and limits</p>
          <h2>Official n8n guides, not hosting-company promises.</h2>
          <div className="method-panel source-ledger-panel">
            <p>
              We checked these official n8n pages on August 28, 2026. They support
              the hosting routes, security checks, and scaling notes. We did not
              run the same workflows on different hosts or test speed, uptime,
              support, backups, or recovery times.
            </p>
            <ul>
              <li><ExternalSourceLink href="https://docs.n8n.io/">n8n documentation overview</ExternalSourceLink> — cloud, npm, and self-hosted choices.</li>
              <li><ExternalSourceLink href="https://docs.n8n.io/hosting/installation/docker/">n8n Docker installation</ExternalSourceLink> — the official container route.</li>
              <li><ExternalSourceLink href="https://docs.n8n.io/hosting/securing/overview/">n8n security overview</ExternalSourceLink> — security checks for a self-hosted instance.</li>
              <li><ExternalSourceLink href="https://docs.n8n.io/hosting/securing/security-audit/">n8n security audit</ExternalSourceLink> — checks for credentials, files, nodes, webhooks, and missing settings.</li>
              <li><ExternalSourceLink href="https://docs.n8n.io/hosting/scaling/queue-mode/">n8n queue mode</ExternalSourceLink> — main process, workers, Redis, and database requirements.</li>
              <li><ExternalSourceLink href="https://docs.n8n.io/hosting/scaling/external-storage/">n8n external storage</ExternalSourceLink> — plan limits and file-storage behavior.</li>
            </ul>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target" aria-labelledby="n8n-faq-heading">
          <h2 id="n8n-faq-heading">FAQ</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta" aria-labelledby="n8n-next-step">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Start small</p>
            <h2 id="n8n-next-step">Build the workflow before you build a server platform.</h2>
            <p className="pilot-final-copy">Move to a more complex setup only after a test shows what the simple route cannot handle.</p>
          </div>
          <Link className="button button-accent" href={aiHostingPath}>
            Read the AI hosting guide <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
