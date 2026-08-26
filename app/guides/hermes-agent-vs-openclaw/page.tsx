import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

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
import hermesDocs from "@/public/images/guides/ai-agent-hosting/hermes-agent-docs-2026-08-25.png";
import openclawDocs from "@/public/images/guides/ai-agent-hosting/openclaw-docs-2026-08-25.png";

const aiHostingPath = "/guides/ai-agent-hosting/";

export const metadata = createPageMetadata({
  title: "Hermes Agent vs OpenClaw: which setup fits you?",
  description:
    "Compare Hermes Agent and OpenClaw in simple language. See what each tool is, how it installs, what you manage, and which setup may fit your needs.",
  path: publicPageFrontmatter.hermesVsOpenClawGuide.path,
});

const toc = [
  ["short-difference", "Short difference"],
  ["at-a-glance", "At a glance"],
  ["official-product-pages", "Product overviews"],
  ["what-you-install", "What you install"],
  ["who-keeps-it-running", "Who keeps it running"],
  ["which-may-fit", "Which may fit"],
  ["safety-and-moving", "Safety and moving"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const comparisonRows = [
  ["Main idea", "An agent whose docs focus on learning and memory. They also cover tools and several places to run work", "A self-hosted Gateway, the always-on hub for an assistant reached through chat apps"],
  ["Ways to use it", "Desktop app or a window where you type commands. It also has a messaging gateway and an API connection for other software", "Chat apps or a web dashboard. It also has linked devices and tools used from a command window"],
  ["Install paths", "Desktop installer or a command that sets up the app. A Docker container is another path", "An install command or Windows setup. A Docker container is another path"],
  ["Always-on part", "Hermes messaging gateway", "OpenClaw Gateway"],
  ["Server work", "Yours unless a provider clearly manages it", "Yours unless a provider clearly manages it"],
  ["Universal winner?", "No", "No"],
] as const;

type ProductSource = Readonly<{
  name: string;
  image: StaticImageData;
  alt: string;
  href: string;
  notes: readonly string[];
}>;

const productSources: readonly ProductSource[] = [
  {
    name: "Hermes Agent guides",
    image: hermesDocs,
    alt: "Hermes Agent guide showing the product description and setup choices.",
    href: "https://hermes-agent.nousresearch.com/docs/",
    notes: [
      "The page puts its learning loop, which saves useful lessons from earlier work, at the center.",
      "It shows a desktop setup and a setup from a command window.",
      "The guides also cover a messaging hub and several places where commands can run.",
    ],
  },
  {
    name: "OpenClaw guides",
    image: openclawDocs,
    alt: "OpenClaw guide showing the Gateway overview and supported chat apps.",
    href: "https://docs.openclaw.ai/",
    notes: [
      "The page puts one Gateway at the center.",
      "It shows many chat apps, a web page, and linked mobile devices.",
      "The Gateway keeps agent sessions and sends each message to the right chat app.",
    ],
  },
] as const;

const faqs = [
  {
    question: "Is Hermes Agent the same as OpenClaw?",
    answer: (
      <>
        No. They are separate projects. Compare the current{" "}
        <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/">Hermes</ExternalSourceLink>{" "}
        and <ExternalSourceLink href="https://docs.openclaw.ai/">OpenClaw</ExternalSourceLink>{" "}
        guides.
      </>
    ),
  },
  {
    question: "Can Hermes Agent and OpenClaw both run on a VPS?",
    answer: (
      <>
        Yes. See the current <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/docker/">Hermes container guide</ExternalSourceLink>{" "}
        and <ExternalSourceLink href="https://docs.openclaw.ai/vps">OpenClaw server guide</ExternalSourceLink>.
      </>
    ),
  },
  {
    question: "Which one is easier to install?",
    answer:
      "There is no proven winner. Both offer installers. A ready-made server setup may remove steps, but check which jobs the provider handles.",
  },
  {
    question: "Does either product include the AI model?",
    answer:
      "Not in every setup. You normally choose or connect a model provider. Some managed plans can include a built-in connection to an AI model.",
  },
  {
    question: "Can Hermes import my OpenClaw setup?",
    answer: (
      <>
        Hermes currently documents a migration command. Preview the import,
        make a backup, and check the result before relying on it. Read the{" "}
        <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/guides/migrate-from-openclaw">
          current Hermes migration guide
        </ExternalSourceLink>.
      </>
    ),
  },
  {
    question: "Which one costs less?",
    answer:
      "It depends on the server and model provider. Tools and backups can also change the cost. A fair fixed answer needs the same test setup, which we have not run.",
  },
] as const;

export default function HermesVsOpenClawGuidePage() {
  const page = publicPageFrontmatter.hermesVsOpenClawGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: aiHostingPath, label: "AI agent hosting" },
    { href: page.path, label: "Hermes Agent vs OpenClaw" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: aiHostingPath, label: "AI agent hosting" },
          { label: "Hermes Agent vs OpenClaw" },
        ]}
        eyebrow={
          <>
            Hermes vs OpenClaw / updated{" "}
            <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="Hermes Agent vs OpenClaw: which setup fits you?"
        lede={
          <p>
            Both products can run an AI agent on your computer or an always-on
            server. OpenClaw may fit when chat apps are the center of your setup.
            Hermes may fit when saved lessons and reusable work tools matter
            more. Neither product is a proven winner for every person.
          </p>
        }
        actions={[
          { href: aiHostingPath, label: "Open the AI agent hosting guide" },
          { href: "#at-a-glance", label: "Compare them side by side", quiet: true },
        ]}
        trustItems={[
          "No speed test was run",
          "No universal winner",
          "The linked product guides may change",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-difference" className="anchor-target">
          <p className="eyebrow">Start with the center</p>
          <h2>OpenClaw centers the Gateway. Hermes centers the agent&apos;s learning and tools.</h2>
          <div className="answer-split-grid product-answer-grid">
            <article>
              <span className="guide-card-number">H</span>
              <h3>Hermes Agent</h3>
              <p>
                The Hermes guides focus on a learning loop that saves useful
                lessons from earlier work. They also cover memory, reusable tools,
                and several places where work can run.
              </p>
              <p className="provider-source-link">
                <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/">
                  Check the current Hermes overview
                </ExternalSourceLink>
              </p>
            </article>
            <article>
              <span className="guide-card-number">O</span>
              <h3>OpenClaw</h3>
              <p>
                The OpenClaw guides focus on one self-hosted Gateway. A Gateway
                is the always-on hub that connects chat apps, saved conversations,
                a dashboard, and linked devices.
              </p>
              <p className="provider-source-link">
                <ExternalSourceLink href="https://docs.openclaw.ai/">
                  Check the current OpenClaw overview
                </ExternalSourceLink>
              </p>
            </article>
          </div>
          <p>
            Both connect to messaging services and tools. Both can save setup
            information and connect to an AI service outside the server. That
            outside service may receive your prompts. The difference here is a
            product focus, not a hard wall around every feature.
          </p>
        </section>

        <section id="at-a-glance" className="anchor-target">
          <p className="eyebrow">Side by side</p>
          <h2>Start with what you want the agent to do.</h2>
          <p>
            A container is a packaged place for the app to run. An API is a
            connection that lets other software use the agent.
          </p>
          <div className="comparison-scroll" role="region" aria-label="Hermes Agent and OpenClaw comparison" tabIndex={0}>
            <table className="comparison-table three-column-table">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Hermes Agent</th>
                  <th scope="col">OpenClaw</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([question, hermes, openclaw]) => (
                  <tr key={question}>
                    <th scope="row">{question}</th>
                    <td>{hermes}</td>
                    <td>{openclaw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="supporting-link-row">
            <span>Read the product guides:</span>
            <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/">
              Hermes overview
            </ExternalSourceLink>
            <ExternalSourceLink href="https://docs.openclaw.ai/">
              OpenClaw overview
            </ExternalSourceLink>
          </p>
          <PageNextStep href={aiHostingPath} label="Open the AI agent hosting guide" />
        </section>

        <section id="official-product-pages" className="anchor-target">
          <p className="eyebrow">See the product focus</p>
          <h2>See the main page for each product.</h2>
          <p>
            The screenshots show what each project highlights. They were saved
            on August 25, 2026, so the current pages may look different. They do
            not compare speed, reliability, support, or safety.
          </p>
          <div className="provider-evidence-list source-pair-grid">
            {productSources.map((source, index) => (
              <article className="provider-evidence-card" key={source.name}>
                <header className="provider-evidence-header">
                  <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{source.name}</h3>
                </header>
                <figure>
                  <div className="provider-screenshot-frame agent-source-frame">
                    <Image
                      src={source.image}
                      alt={source.alt}
                      sizes="(max-width: 760px) calc(100vw - 56px), (max-width: 1180px) calc(100vw - 330px), 850px"
                    />
                  </div>
                  <figcaption>
                    Product page saved August 25, 2026. This is a setup example,
                    not a speed or reliability test.
                  </figcaption>
                </figure>
                <div className="provider-evidence-copy">
                  <h4>What this page shows</h4>
                  <ul>{source.notes.map((note) => <li key={note}>{note}</li>)}</ul>
                  <p className="provider-source-link">
                    <span>View the current page:</span>
                    <ExternalSourceLink href={source.href}>Open the product page</ExternalSourceLink>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="what-you-install" className="anchor-target">
          <p className="eyebrow">Install paths</p>
          <h2>Both can start on your own computer.</h2>
          <div className="editorial-card-grid two-column-card-grid">
            <article className="editorial-card">
              <span className="guide-card-number">HERMES</span>
              <h3>Desktop, install command, or Docker container</h3>
              <p>
                Hermes documents a desktop installer and a typed command that
                sets up the app. It also documents a Docker container for an
                always-on messaging gateway.
              </p>
              <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/">
                Read the current Hermes install choices
              </ExternalSourceLink>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">OPENCLAW</span>
              <h3>Installer, Windows path, or Docker container</h3>
              <p>
                OpenClaw documents an installer and a Windows setup. It also has
                a Docker container. Its Gateway stays running for chat apps and
                the web dashboard.
              </p>
              <ExternalSourceLink href="https://docs.openclaw.ai/install">
                Read the current OpenClaw install choices
              </ExternalSourceLink>
            </article>
          </div>
          <p>
            Try the product locally first. Move it to a server only after you know
            which part must stay online.
          </p>
        </section>

        <section id="who-keeps-it-running" className="anchor-target">
          <p className="eyebrow">Who does the work</p>
          <h2>Where it runs changes who does the work.</h2>
          <div className="route-list compact-route-list">
            <article><span>01</span><h3>Your computer</h3><p>You keep the machine awake and update the app.</p></article>
            <article><span>02</span><h3>Self-managed VPS</h3><p>A VPS is a virtual server you rent. You manage access, system updates, the agent, and backups.</p></article>
            <article><span>03</span><h3>Managed plan</h3><p>The provider handles only the tasks named in its current terms.</p></article>
          </div>
          <PageNextStep href={aiHostingPath} label="Open the AI agent hosting guide" />
        </section>

        <section id="which-may-fit" className="anchor-target">
          <p className="eyebrow">Which one may fit</p>
          <h2>Pick the focus that matches your work.</h2>
          <div className="answer-split-grid fit-answer-grid">
            <article>
              <h3>Hermes may fit when…</h3>
              <ul>
                <li>you want the agent to save useful lessons from earlier work;</li>
                <li>you need work to run inside a separate package, on another server, or in a separate online work area;</li>
                <li>you want to start work from a desktop app, a typed command window, or a messaging app;</li>
                <li>you want to preview importing an existing OpenClaw setup.</li>
              </ul>
              <p className="provider-source-link">
                <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/">
                  See the Hermes features and setup paths
                </ExternalSourceLink>
              </p>
            </article>
            <article>
              <h3>OpenClaw may fit when…</h3>
              <ul>
                <li>you want one always-on hub to connect several chat apps;</li>
                <li>you want a product-specific setup guide instead of starting with a blank server;</li>
                <li>you want a web dashboard or linked devices that can do approved local work;</li>
                <li>you already use a ready-made setup from a hosting company;</li>
              </ul>
              <p className="provider-source-link">
                <ExternalSourceLink href="https://docs.openclaw.ai/">
                  See the OpenClaw Gateway and chat paths
                </ExternalSourceLink>
              </p>
            </article>
          </div>
        </section>

        <section id="safety-and-moving" className="anchor-target">
          <p className="eyebrow">No safety winner</p>
          <h2>How you set it up affects how safe it is.</h2>
          <div className="avoid-panel compact-advice-panel">
            <ShieldCheck size={24} aria-hidden="true" />
            <p>
              Neither product is always safer. Safety depends on how you set it
              up. Keep access private, approve users, protect secret keys, keep
              risky work away from important files, install updates, and back up
              your data.
            </p>
          </div>
          <p className="supporting-link-row">
            <span>Current safety guides:</span>
            <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/security/">
              Hermes safety controls
            </ExternalSourceLink>
            <ExternalSourceLink href="https://docs.openclaw.ai/gateway/security">
              OpenClaw safety controls
            </ExternalSourceLink>
          </p>
          <h3>Moving from OpenClaw to Hermes</h3>
          <p>
            Hermes currently documents <code>hermes claw migrate</code> and a
            preview before the move. Make a backup first. Check imported settings
            and skills. Check the keys too before you trust the new setup.
          </p>
          <p className="provider-source-link">
            <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/guides/migrate-from-openclaw">
              Read the current Hermes migration guide
            </ExternalSourceLink>
          </p>
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and limits</p>
          <h2>Read the current product guides before you choose.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/">OpenClaw overview</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/install">OpenClaw install guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/gateway/security">OpenClaw security guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/">Hermes Agent overview</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/security/">Hermes Agent security guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/guides/migrate-from-openclaw">Hermes migration guide</ExternalSourceLink></li>
            </ul>
            <p>
              Sources checked August 25, 2026. We did not install both tools on
              matching servers, test speed, or compare real support cases.
            </p>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>Hermes Agent and OpenClaw questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">The next choice</p>
            <h2>Where should the agent stay online?</h2>
            <p className="pilot-final-copy">
              Learn the difference between your computer, a VPS, and a managed
              agent plan.
            </p>
          </div>
          <Link className="button button-accent" href={aiHostingPath}>
            Open the AI agent hosting guide <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
