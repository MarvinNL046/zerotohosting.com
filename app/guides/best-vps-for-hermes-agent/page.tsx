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
const comparisonPath = "/guides/hermes-agent-vs-openclaw/";

export const metadata = createPageMetadata({
  title: "Best VPS for Hermes Agent: what to check",
  description:
    "Choose a VPS for Hermes Agent without guessing. Check Docker, persistent storage, dashboard access, backups, updates, and who manages the server.",
  path: publicPageFrontmatter.bestVpsForHermesGuide.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["what-the-vps-needs", "What the VPS needs"],
  ["four-routes", "Four routes"],
  ["docker-and-data", "Docker and saved data"],
  ["access-and-security", "Access and security"],
  ["buying-checks", "Buying checks"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const faqs = [
  {
    question: "What is the best VPS for Hermes Agent?",
    answer:
      "Start with a Linux VPS that can run Docker, keep one persistent data folder, restart the gateway, and make backups. The best provider is the one whose server work, access tools, and backup system you can manage. We did not test a winning company.",
  },
  {
    question: "Does Hermes Agent need a VPS?",
    answer:
      "No. You can learn on your own computer. A VPS is useful when the gateway must keep running while that computer is off.",
  },
  {
    question: "Can Hermes Agent run in Docker?",
    answer:
      "Yes. The official guide documents running Hermes inside Docker. It stores settings, keys, sessions, skills, memories, and logs in one mounted data directory.",
  },
  {
    question: "Should I expose the Hermes dashboard to the public internet?",
    answer:
      "Do not expose it without proper access protection. The official guide says a non-local dashboard needs an authentication provider. A private network or protected tunnel is a safer starting route when you know how to manage it.",
  },
  {
    question: "Does the VPS price include an AI model?",
    answer:
      "Usually not. Hermes can connect to an outside AI model service. Add that model bill, backups, storage, and your server-care time to the VPS price.",
  },
  {
    question: "Did you test Hermes VPS providers?",
    answer:
      "No. We used the official Hermes install, Docker, and security guides. We did not rent servers or test speed, uptime, support, or heavy workloads.",
  },
] as const;

export default function BestVpsForHermesAgentPage() {
  const page = publicPageFrontmatter.bestVpsForHermesGuide;
  const breadcrumbs = [
    { href: "/", label: "Home" },
    { href: aiHostingPath, label: "AI agent hosting" },
    { href: page.path, label: "Best VPS for Hermes Agent" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: aiHostingPath, label: "AI agent hosting" },
          { label: "Best VPS for Hermes Agent" },
        ]}
        eyebrow={
          <>
            Updated <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="What is the best VPS for Hermes Agent?"
        lede={
          <p>
            A good Hermes VPS can run Docker, keep the Hermes data folder safe,
            restart the gateway, and let you make backups. A cheap server is not
            a good deal when nobody updates it or protects access. Start on your
            own computer, then rent a VPS only when Hermes must stay online.
          </p>
        }
        actions={[
          { href: "#buying-checks", label: "Check a VPS plan" },
          { href: comparisonPath, label: "Compare Hermes and OpenClaw", quiet: true },
        ]}
        trustItems={[
          "Official Hermes guides checked",
          "No untested speed claims",
          "Server jobs named clearly",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The useful answer</p>
          <h2>Choose the server owner before the server size.</h2>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <p>
              Use a self-managed VPS only when one person owns system updates,
              Docker updates, network rules, access, monitoring, backups, and
              recovery. If that list is new, keep learning locally or choose a
              service that clearly includes more server care.
            </p>
          </div>
        </section>

        <section id="what-the-vps-needs" className="anchor-target">
          <p className="eyebrow">Six required answers</p>
          <h2>A Hermes VPS is more than CPU and RAM.</h2>
          <div className="editorial-card-grid best-criteria-grid">
            {[
              ["Linux and Docker", "The official container route needs a server where you can install and update Docker."],
              ["Persistent disk", "The Hermes data folder must survive a container replacement and server restart."],
              ["Safe access", "Use SSH for server work. Protect any dashboard or API before it can be reached from the internet."],
              ["Restart policy", "The gateway should come back after a crash or server restart."],
              ["Backups", "Back up the data folder and test a restore on a clean setup."],
              ["Enough room", "Allow room for logs, browser tools, files, and more than one agent profile when you use them."],
            ].map(([title, text], index) => (
              <article className="editorial-card" key={title}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="four-routes" className="anchor-target">
          <p className="eyebrow">Four places to run</p>
          <h2>The best route changes with the work you can handle.</h2>
          <div className="comparison-scroll" role="region" aria-label="Hermes Agent hosting routes" tabIndex={0}>
            <table className="comparison-table three-column-table">
              <thead><tr><th scope="col">Route</th><th scope="col">May fit when</th><th scope="col">Your main work</th></tr></thead>
              <tbody>
                <tr><th scope="row">Your own computer</th><td>You are learning or use Hermes only while you are present.</td><td>Install Hermes and keep the computer on during use.</td></tr>
                <tr><th scope="row">Self-managed Docker VPS</th><td>The gateway must stay online and you can manage Linux and Docker.</td><td>Updates, access, network rules, monitoring, backups, and recovery.</td></tr>
                <tr><th scope="row">Managed container service</th><td>You want the platform to run containers but can manage the app and its data.</td><td>Confirm persistent storage, public access, restarts, secrets, and backups.</td></tr>
                <tr><th scope="row">Remote or serverless work area</th><td>Hermes tasks can run in an outside work area that sleeps when idle.</td><td>Check what stays saved, wake-up time, limits, and model costs.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="table-limit-note">Hermes documents local, Docker, SSH, Daytona, Modal, and other work areas. This table does not rank hosting companies.</p>
        </section>

        <section id="docker-and-data" className="anchor-target">
          <p className="eyebrow">The part you must keep</p>
          <h2>The container can change. The data folder must not disappear.</h2>
          <p>
            The official Docker guide maps the host&apos;s Hermes folder into
            <code> /opt/data</code> inside the container. That folder can contain
            service keys, settings, sessions, memories, skills, work files,
            scheduled jobs, and logs. The app image can be replaced during an
            update, but the saved folder must stay.
          </p>
          <div className="answer-split-grid product-answer-grid">
            <article>
              <span className="guide-card-number">APP IMAGE</span>
              <h3>Replace this during an update</h3>
              <p>The packaged Hermes app can be pulled again. Check the release notes and keep a rollback route.</p>
            </article>
            <article>
              <span className="guide-card-number">DATA FOLDER</span>
              <h3>Back up this part</h3>
              <p>Keep the mounted data directory on persistent storage. Test that a new container can use a restored copy.</p>
            </article>
          </div>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <p>Never run two Hermes gateway containers against the same data folder at the same time. The official guide warns that its session and memory files are not made for two writers.</p>
          </div>
        </section>

        <section id="access-and-security" className="anchor-target">
          <p className="eyebrow">Protect the doors</p>
          <h2>A public dashboard needs real access protection.</h2>
          <div className="responsibility-grid">
            <article><ServerCog size={22} aria-hidden="true" /><h3>SSH for server work</h3><p>The Hermes guide recommends SSH instead of browser VPS consoles for pasted install commands.</p></article>
            <article><LockKeyhole size={22} aria-hidden="true" /><h3>Dashboard login</h3><p>A dashboard that listens beyond the local machine needs an authentication provider. Do not publish it without one.</p></article>
            <article><CheckCircle2 size={22} aria-hidden="true" /><h3>Limited network access</h3><p>Open only the connections you need. Keep secret keys out of screenshots, public code, and shared notes.</p></article>
          </div>
          <p>
            A private network or a protected tunnel is a sensible starting point
            for remote access. If you use a public domain and reverse proxy, make
            sure HTTPS, login, and trusted proxy settings are correct.
          </p>
        </section>

        <section id="buying-checks" className="anchor-target">
          <p className="eyebrow">Before you pay</p>
          <h2>Ask these ten questions about a Hermes VPS.</h2>
          <ol className="buying-check-grid openclaw-buying-grid">
            {[
              "Can I install and update Docker?",
              "Does the disk stay after a restart or rebuild?",
              "How do I take and restore a backup?",
              "Who updates the Linux system?",
              "Who updates the Hermes container?",
              "How will I reach the server with SSH?",
              "How will dashboard access be protected?",
              "Which network connections will be open?",
              "What happens when the process crashes?",
              "What is the full renewal cost?",
            ].map((item, index) => (
              <li key={item}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <p><strong>{item}</strong></p>
              </li>
            ))}
          </ol>
          <PageNextStep href={aiHostingPath} label="Read the full AI agent hosting guide" />
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and limits</p>
          <h2>Official Hermes guidance, not a rented-server test.</h2>
          <div className="method-panel source-ledger-panel">
            <p>
              We checked these official pages on August 28, 2026. We used them
              to identify install routes, saved data, gateway behavior, and access
              warnings. We did not rent VPS plans or test speed, uptime, support,
              regional performance, or busy browser workloads.
            </p>
            <ul>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/">Hermes Agent overview and install choices</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/docker/">Hermes Docker setup</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/security/">Hermes security guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/configuration/">Hermes configuration guide</ExternalSourceLink></li>
            </ul>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target" aria-labelledby="hermes-vps-faq-heading">
          <h2 id="hermes-vps-faq-heading">FAQ</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta" aria-labelledby="hermes-vps-next-step">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Choose the owner first</p>
            <h2 id="hermes-vps-next-step">A VPS needs a person who will care for it.</h2>
            <p className="pilot-final-copy">If nobody owns updates, access, backups, and recovery, keep learning locally or choose a managed route.</p>
          </div>
          <Link className="button button-accent" href={comparisonPath}>
            Compare Hermes and OpenClaw <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
