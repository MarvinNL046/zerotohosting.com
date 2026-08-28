import Link from "next/link";
import { ArrowRight, Cpu, LockKeyhole, ServerCog } from "lucide-react";

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

const comparisonPath = "/guides/hermes-agent-vs-openclaw/";
const openClawVpsPath = "/guides/best-vps-for-openclaw/";
const hermesVpsPath = "/guides/best-vps-for-hermes-agent/";
const n8nHostingPath = "/guides/best-n8n-hosting/";
const whatsappAiAgentPath = "/guides/whatsapp-ai-agent/";

export const metadata = createPageMetadata({
  title: "AI agent hosting: a simple beginner's guide",
  description:
    "Learn what AI agent hosting is, when you need a VPS, what you must manage, and how to choose a path for OpenClaw or Hermes Agent.",
  path: publicPageFrontmatter.aiAgentHostingGuide.path,
});

const toc = [
  ["what-is-hosted", "What is hosted"],
  ["message-channels", "Message channels"],
  ["do-you-need-hosting", "Do you need hosting"],
  ["four-places", "Four places to run"],
  ["openclaw-and-hermes", "OpenClaw and Hermes"],
  ["server-power", "Server power"],
  ["who-manages-what", "Who manages what"],
  ["safety-checks", "Safety checks"],
  ["cost-parts", "Cost parts"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const runPlaces = [
  {
    title: "Your computer",
    good: "A way to learn and test without another server.",
    work: "You install and update the app. It stops when the computer is off.",
    avoid: "Avoid it when the agent must answer while your computer sleeps.",
  },
  {
    title: "Home server",
    good: "Keeps the agent on hardware you control at home.",
    work: "You care for power and internet. You also own remote access, updates and backups.",
    avoid: "Avoid it when nobody can fix the home network or hardware.",
  },
  {
    title: "Self-managed VPS",
    good: "An always-on virtual server that lets you choose the software and how you connect.",
    work: "You update the server and the app. You also protect access, set network rules, and make backups.",
    avoid: "Avoid it when nobody owns those server jobs.",
  },
  {
    title: "Managed agent plan",
    good: "Can remove some setup, update, or server work.",
    work: "You still choose who can use it, which actions are allowed, the secret service keys, the tools, and the AI model.",
    avoid: "Avoid it when the plan never explains what the provider manages.",
  },
] as const;

const faqs = [
  {
    question: "Do I need a VPS for an AI agent?",
    answer:
      "No. Start on your own computer. Use a VPS when the agent must stay online without that computer.",
  },
  {
    question: "Can normal web hosting run an AI agent?",
    answer:
      "Do not assume it can. The plan must support the required software and a service that can keep running in the background.",
  },
  {
    question: "Does a VPS include the AI model?",
    answer:
      "Not always. The agent and the AI model can be separate services. Check which outside AI service and secret key the setup expects.",
  },
  {
    question: "How much RAM does an AI agent need?",
    answer:
      "RAM is the server’s working memory. The amount depends on the tools. Calling an outside AI model usually needs less memory than browser tasks, several agent jobs running at once, or an AI model running on the server.",
  },
  {
    question: "Is self-hosting completely private?",
    answer:
      "Not automatically. You control the host, but prompts may still go to the model provider and other services that you configure.",
  },
  {
    question: "What does managed AI agent hosting mean?",
    answer:
      "It means the provider manages specific listed tasks. Check exactly who handles the app, system updates, secure access, and backups.",
  },
] as const;

export default function AiAgentHostingGuidePage() {
  const page = publicPageFrontmatter.aiAgentHostingGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: page.path, label: "AI agent hosting" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "AI agent hosting" }]}
        eyebrow={
          <>
            Updated{" "}
            <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="AI agent hosting, explained simply"
        lede={
          <p>
            AI agent hosting means keeping agent software on a computer that can
            stay on when you need it. Start on your own computer while you learn.
            Use a home server, a VPS (a virtual server you rent), or a managed
            app only when the agent must work while your computer is off. The AI
            model may still come from another company.
          </p>
        }
        actions={[
          { href: "#do-you-need-hosting", label: "Find my starting option" },
          { href: openClawVpsPath, label: "Compare OpenClaw VPS setups", quiet: true },
        ]}
        trustItems={[
          "Hosting and the AI model stay separate",
          "Server work is named clearly",
          "Published minimums are not speed promises",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="what-is-hosted" className="anchor-target">
          <p className="eyebrow">The moving parts</p>
          <h2>The host keeps the agent connected and its settings available.</h2>
          <div className="agent-flow" aria-label="Simple AI agent hosting flow">
            <div><span>YOU</span><strong>Phone or computer</strong><small>Send a message or task</small></div>
            <i aria-hidden="true">→</i>
            <div><span>HOST</span><strong>Agent Gateway</strong><small>Routes messages and keeps settings</small></div>
            <i aria-hidden="true">→</i>
            <div><span>TOOLS</span><strong>AI model and tools</strong><small>Think and do approved work</small></div>
          </div>
          <p>
            The Gateway is the part that stays online and receives messages. It
            keeps the agent’s settings and conversations. The agent can use the
            tools and access you connect to it, so give it only what it needs. An
            outside AI company may still process your messages.
          </p>
        </section>

        <section id="message-channels" className="anchor-target">
          <p className="eyebrow">A different kind of gateway</p>
          <h2>The agent hub and the messaging service do different jobs.</h2>
          <div className="answer-split-grid product-answer-grid">
            <article>
              <span className="guide-card-number">AGENT HUB</span>
              <h3>Keeps the agent ready</h3>
              <p>
                It keeps the agent’s sessions and settings together. It also
                connects tools and outside AI models.
              </p>
            </article>
            <article>
              <span className="guide-card-number">MESSAGING SERVICE</span>
              <h3>Carries a WhatsApp or SMS message</h3>
              <p>
                It carries messages between WhatsApp or SMS and the agent.
                OpenClaw and Hermes each have their own way to connect WhatsApp.
                Other WhatsApp services are separate products and do not work
                with every agent automatically.
              </p>
            </article>
          </div>
          <PageNextStep
            href={whatsappAiAgentPath}
            label="Compare three ways to connect an AI agent to WhatsApp"
          />
        </section>

        <section id="do-you-need-hosting" className="anchor-target">
          <p className="eyebrow">Start with the job</p>
          <h2>You may not need an always-on server yet.</h2>
          <div className="comparison-scroll" role="region" aria-label="AI agent starting options" tabIndex={0}>
            <table className="comparison-table">
              <thead><tr><th scope="col">Your need</th><th scope="col">A sensible place to start</th></tr></thead>
              <tbody>
                <tr><th scope="row">You are only learning</th><td>Your own computer</td></tr>
                <tr><th scope="row">It must work while your computer is off</th><td>An always-on server or managed app</td></tr>
                <tr><th scope="row">You can use SSH, a secure command window, and update a server</th><td>A self-managed VPS</td></tr>
                <tr><th scope="row">You want less server work</th><td>A managed or ready-made setup, after checking which jobs it really handles</td></tr>
                <tr><th scope="row">You want to run an AI model on the server too</th><td>Check the hardware requirements for the exact AI model</td></tr>
              </tbody>
            </table>
          </div>
          <p className="supporting-link-row">
            <span>Read the setup guides:</span>
            <ExternalSourceLink href="https://docs.openclaw.ai/help/faq-first-run">
              OpenClaw resource guidance
            </ExternalSourceLink>
            <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/docker/">
              Hermes Docker resource guidance
            </ExternalSourceLink>
          </p>
        </section>

        <section id="four-places" className="anchor-target">
          <p className="eyebrow">Four options</p>
          <h2>Each option balances work and control.</h2>
          <div className="editorial-card-grid hosting-place-grid">
            {runPlaces.map((place, index) => (
              <article className="editorial-card" key={place.title}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{place.title}</h3>
                <dl className="mini-definition-list">
                  <div><dt>Good for</dt><dd>{place.good}</dd></div>
                  <div><dt>Your work</dt><dd>{place.work}</dd></div>
                  <div><dt>Be careful</dt><dd>{place.avoid}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section id="openclaw-and-hermes" className="anchor-target">
          <p className="eyebrow">Two products</p>
          <h2>OpenClaw and Hermes can both keep a messaging hub online.</h2>
          <div className="answer-split-grid product-answer-grid">
            <article>
              <span className="guide-card-number">OPENCLAW</span>
              <h3>The Gateway owns the live connection</h3>
              <p>
                OpenClaw says its Gateway keeps sessions and routes messages to
                chat connections. On a VPS, back up its settings and work files.
              </p>
              <ExternalSourceLink href="https://docs.openclaw.ai/vps">
                Check the current OpenClaw server guide
              </ExternalSourceLink>
              <Link className="text-link" href={openClawVpsPath}>
                Compare five OpenClaw VPS setups <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <span className="guide-card-number">HERMES</span>
              <h3>Keep the messaging data folder</h3>
              <p>
                Hermes documents a normal install and a container, which is a
                packaged place for the app to run. Its data folder must stay safe
                when that package is replaced.
              </p>
              <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/docker/">
                Check the current Hermes container guide
              </ExternalSourceLink>
              <Link className="text-link" href={comparisonPath}>
                Compare Hermes and OpenClaw <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link className="text-link" href={hermesVpsPath}>
                Check a VPS for Hermes Agent <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          </div>
          <PageNextStep
            href={n8nHostingPath}
            label="Compare n8n Cloud, managed hosting, and a Docker VPS"
            prefix="Also in this cluster"
          />
        </section>

        <section id="server-power" className="anchor-target">
          <p className="eyebrow">Minimum server size</p>
          <h2>Treat the minimum as a starting point.</h2>
          <p>
            These numbers come from product guides checked on August 25, 2026. A
            vCPU is a virtual processor, RAM is working memory, and disk is
            storage. The minimum does not promise a smooth setup.
          </p>
          <div className="comparison-scroll" role="region" aria-label="Published AI agent server requirements" tabIndex={0}>
            <table className="comparison-table three-column-table">
              <thead><tr><th scope="col">Product setup</th><th scope="col">Published minimum</th><th scope="col">Suggested size for more room</th></tr></thead>
              <tbody>
                <tr><th scope="row">Basic OpenClaw Gateway</th><td>1 vCPU, 1 GB RAM, about 500 MB disk</td><td>1–2 vCPU and 2 GB+ RAM</td></tr>
                <tr><th scope="row">Hermes container gateway</th><td>1 core, 1 GB RAM, 500 MB data</td><td>2 cores, 2–4 GB RAM, and 2 GB+ data</td></tr>
              </tbody>
            </table>
          </div>
          <div className="avoid-panel compact-advice-panel">
            <Cpu size={24} aria-hidden="true" />
            <p>
              Controlling a browser, using several chat channels, running separate
              agent jobs, or running the AI model on the server can need more
              memory. Check the tools you will really use.
            </p>
          </div>
        </section>

        <section id="who-manages-what" className="anchor-target">
          <p className="eyebrow">Who does each job?</p>
          <h2>“Hosted” does not mean every job is managed.</h2>
          <div className="responsibility-grid">
            <article><ServerCog size={22} aria-hidden="true" /><h3>Hosting company</h3><p>Runs the physical hardware and network. A managed plan may promise more.</p></article>
            <article><LockKeyhole size={22} aria-hidden="true" /><h3>You</h3><p>Choose who can use it, the secret service keys, chat apps, allowed actions, tools, and the AI model.</p></article>
            <article><Cpu size={22} aria-hidden="true" /><h3>Self-managed VPS owner</h3><p>Also updates the server and app. The owner must watch the server, make backups, and block unwanted network connections.</p></article>
          </div>
          <PageNextStep href={openClawVpsPath} label="Compare five OpenClaw VPS setups" />
        </section>

        <section id="safety-checks" className="anchor-target">
          <p className="eyebrow">Five checks</p>
          <h2>Protect the door, keys, work area, and backup.</h2>
          <ol className="decision-question-list safety-question-list">
            <li><span>01</span><p><strong>Keep the dashboard private.</strong> Use a private or protected network connection.</p></li>
            <li><span>02</span><p><strong>Approve users.</strong> Approve each person who connects, or keep a list of allowed users.</p></li>
            <li><span>03</span><p><strong>Protect secret keys and access codes.</strong> Never publish them or put them in public code.</p></li>
            <li><span>04</span><p><strong>Limit the work area.</strong> Give the agent a limited account, not the root account that can control everything. Keep risky work in a separate area.</p></li>
            <li><span>05</span><p><strong>Back up saved information.</strong> Test that you can restore the agent settings and work files.</p></li>
          </ol>
        </section>

        <section id="cost-parts" className="anchor-target">
          <p className="eyebrow">The full agent bill</p>
          <h2>The server is only one cost.</h2>
          <div className="answer-formula agent-cost-formula" aria-label="AI agent cost parts">
            <span>Server</span><i>+</i><span>AI model</span><i>+</i><span>Storage</span><i>+</i><span>Backups</span><i>+</i><span>Your time</span><strong>= total agent cost</strong>
          </div>
          <p>
            Add any domain, secure network tool, or paid search and browser
            service that your setup uses. Prices can change, so use the current
            checkout instead of a number from this guide.
          </p>
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and limits</p>
          <h2>Read the current product guides before you choose.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/vps">OpenClaw Linux server guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/help/faq-first-run">OpenClaw first-run FAQ</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/gateway/security">OpenClaw security guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/docker/">Hermes Docker guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/integrations/providers">Hermes model provider guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/security/">Hermes security guide</ExternalSourceLink></li>
            </ul>
            <p>
              Sources checked August 25, 2026. Server requirements and
              managed-plan duties can change. We did not speed-test these server
              setups.
            </p>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>AI agent hosting questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">OpenClaw next</p>
            <h2>Choose where your agent should run first.</h2>
            <p className="pilot-final-copy">
              Review the four starting options. Move to a server only after you
              know what must stay online.
            </p>
          </div>
          <Link className="button button-accent" href="#do-you-need-hosting">
            Find my starting option <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
