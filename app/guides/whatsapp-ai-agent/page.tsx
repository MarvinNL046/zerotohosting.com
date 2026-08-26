import Link from "next/link";
import { ArrowRight, CheckCircle2, Link2, MessageCircle, ServerCog } from "lucide-react";

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
const openClawPath = "/guides/openclaw-whatsapp/";
const hermesPath = "/guides/hermes-agent-whatsapp/";
const smsComparisonPath = "/guides/sms-vs-whatsapp/";
const voidfixPath = "/guides/voidfix-gateway/";

export const metadata = createPageMetadata({
  title: "WhatsApp AI Agent: 3 Ways to Connect, Explained",
  description:
    "Learn three ways to connect a WhatsApp chatbot or AI agent: a linked device, the official Cloud API, or an outside messaging gateway.",
  path: publicPageFrontmatter.whatsappAiAgentGuide.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["message-flow", "Message flow"],
  ["three-routes", "Three ways to connect"],
  ["choose-a-route", "Choose an option"],
  ["product-support", "Product examples"],
  ["permission-and-safety", "Permission and safety"],
  ["hosting-needs", "Hosting needs"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const routes = [
  {
    label: "WAY 1",
    title: "A linked WhatsApp device",
    answer:
      "The agent links to a WhatsApp account with a QR code. OpenClaw and Hermes both use Baileys, a tool that connects through WhatsApp Web.",
    work:
      "The agent gateway must keep running. You must protect the saved WhatsApp session and control who may message the agent.",
    limit:
      "This is not the official WhatsApp Business Cloud API. WhatsApp can change its web connection, and its terms still apply.",
  },
  {
    label: "WAY 2",
    title: "The official WhatsApp Business Cloud API",
    answer:
      "Meta sends incoming business messages to a secure public web address, called a webhook. That address passes the message to your agent.",
    work:
      "You need a WhatsApp Business Account, a Meta app, a business phone number, secret access codes called tokens, and a public HTTPS address that protects data while it travels.",
    limit:
      "Business messaging rules apply. You need permission to contact people, and some messages need an approved template.",
  },
  {
    label: "WAY 3",
    title: "An outside messaging gateway",
    answer:
      "Another messaging service can pass the message and the needed details to your agent or customer system.",
    work:
      "Check exactly which WhatsApp connection the service uses. Find out where messages and contact data are stored, and how the service protects keys.",
    limit:
      "A gateway does not remove WhatsApp rules or local laws. It is a separate product, not a built-in OpenClaw or Hermes channel.",
  },
] as const;

const faqs = [
  {
    question: "Is a WhatsApp chatbot the same as a WhatsApp AI agent?",
    answer:
      "A chatbot is any program that answers in a chat. An AI agent can also use an AI model or approved tools. Both still need a supported WhatsApp connection and clear access rules.",
  },
  {
    question: "Can an AI agent reply to WhatsApp messages?",
    answer:
      "Yes, when a supported connection passes the message to the agent and the agent is running. You must still limit who can reach it and what tools it may use.",
  },
  {
    question: "Does OpenClaw need a separate WhatsApp gateway?",
    answer:
      "Not for its documented built-in WhatsApp channel. OpenClaw links a WhatsApp account through its own channel plugin and keeps the session in the OpenClaw Gateway.",
  },
  {
    question: "Does Hermes Agent use the official WhatsApp API?",
    answer:
      "Hermes documents two ways to connect. Its Baileys option links a device through WhatsApp Web. Its Cloud API option uses Meta's official WhatsApp Business platform.",
  },
  {
    question: "Is a QR-code connection the WhatsApp Cloud API?",
    answer:
      "No. A QR code normally links a device or web session. The Cloud API uses a WhatsApp Business Account, a Meta app, credentials, and a webhook.",
  },
  {
    question: "Do I need a VPS for a WhatsApp AI agent?",
    answer:
      "Not while you are only testing on your own computer. You need an always-on computer or service when messages must be handled while your computer is off.",
  },
  {
    question: "Can I message any phone number after setup?",
    answer:
      "No. Get clear permission, explain what messages the person will receive, honor every stop request, and follow the rules for the person's country and messaging channel.",
  },
] as const;

export default function WhatsappAiAgentGuidePage() {
  const page = publicPageFrontmatter.whatsappAiAgentGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: aiHostingPath, label: "AI agent hosting" },
    { href: page.path, label: "WhatsApp AI agent" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: aiHostingPath, label: "AI agent hosting" },
          { label: "WhatsApp AI agent" },
        ]}
        eyebrow={
          <>
            Updated{" "}
            <time dateTime={page.lastModified}>
              {formatPageDate(page.lastModified)}
            </time>
          </>
        }
        title="How to Connect an AI Agent to WhatsApp"
        lede={
          <p>
            You can link a WhatsApp device. You can also use Meta&apos;s official
            WhatsApp Business Cloud API, a business system for sending and
            receiving messages. A third way to connect uses an outside
            messaging gateway, a service that passes messages between WhatsApp
            and your agent. The right option depends on your agent software. It also
            depends on who you message and which setup work you can manage.
          </p>
        }
        actions={[
          { href: "#three-routes", label: "Compare the three options" },
        ]}
        trustItems={[
          "See which connections are built in and which need another service",
          "Learn why a linked device is different from the Cloud API",
          "Permission and access checks come before sending",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The short answer</p>
          <h2>Start with the connection your agent already supports.</h2>
          <p>
            OpenClaw links through WhatsApp Web. Hermes offers a similar link
            through Baileys and a separate connection to Meta&apos;s Cloud API.
            Start with the option already built into your agent. Add another
            service only when you need something the built-in option cannot do.
          </p>
          <p>
            A WhatsApp chatbot is a program that answers inside the chat. An AI
            agent may also use an AI model or approved tools. Both need one of
            these ways to connect before they can receive or send a reply.
          </p>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <p>
              Write down the option name before you start. “WhatsApp connection”
              is too vague when one option uses a QR code and another uses a
              business API with a webhook. A webhook is a secure public web
              address that receives messages.
            </p>
          </div>
        </section>

        <section id="message-flow" className="anchor-target">
          <p className="eyebrow">One clear picture</p>
          <h2>The connection carries messages; the agent decides what to do.</h2>
          <div className="agent-flow" aria-label="WhatsApp AI agent message flow">
            <div>
              <span>PERSON</span>
              <strong>WhatsApp chat</strong>
              <small>Sends an allowed message</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>CONNECTION</span>
              <strong>Device, API, or gateway</strong>
              <small>Passes the message</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>AGENT</span>
              <strong>Model and approved tools</strong>
              <small>Builds a reply or takes an allowed action</small>
            </div>
          </div>
          <p>
            Hosting keeps the agent online. It does not give the agent permission
            to contact people. The WhatsApp connection, agent access rules, and
            tool permissions are separate choices.
          </p>
        </section>

        <section id="three-routes" className="anchor-target">
          <p className="eyebrow">Three connection shapes</p>
          <h2>Each way to connect gives you a different setup job.</h2>
          <div className="editorial-card-grid hosting-place-grid">
            {routes.map((route) => (
              <article className="editorial-card" key={route.title}>
                <span className="guide-card-number">{route.label}</span>
                <h3>{route.title}</h3>
                <dl className="mini-definition-list">
                  <div>
                    <dt>How it works</dt>
                    <dd>{route.answer}</dd>
                  </div>
                  <div>
                    <dt>Your work</dt>
                    <dd>{route.work}</dd>
                  </div>
                  <div>
                    <dt>Important limit</dt>
                    <dd>{route.limit}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <PageNextStep
            href="#product-support"
            label="See how one product connects"
          />
        </section>

        <section id="choose-a-route" className="anchor-target">
          <p className="eyebrow">A simple option check</p>
          <h2>Match the connection to the real job.</h2>
          <div
            className="comparison-scroll"
            role="region"
            aria-label="WhatsApp AI agent connection comparison"
            tabIndex={0}
          >
            <table className="comparison-table three-column-table">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Option to check</th>
                  <th scope="col">Check before setup</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Does your agent have a built-in WhatsApp channel?</th>
                  <td>Linked-device option</td>
                  <td>Where it saves the WhatsApp login and how it blocks unknown senders</td>
                </tr>
                <tr>
                  <th scope="row">Will customers use it to contact your business?</th>
                  <td>Official Cloud API option</td>
                  <td>Business account and webhook. Also check approved templates and the support path.</td>
                </tr>
                <tr>
                  <th scope="row">Must messages also enter a tool that stores customer details, or another app?</th>
                  <td>Outside gateway or direct app integration</td>
                  <td>Check where messages go, what is saved, and who owns the account.</td>
                </tr>
                <tr>
                  <th scope="row">Are you only learning?</th>
                  <td>Local test with a dedicated number</td>
                  <td>Do not invite real users until access and stop rules work</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="product-support" className="anchor-target">
          <p className="eyebrow">Keep the ways to connect separate</p>
          <h2>See how OpenClaw, Hermes and VoidFix connect.</h2>
          <div className="answer-split-grid product-answer-grid three-route-answer-grid">
            <article>
              <MessageCircle size={22} aria-hidden="true" />
              <h3>OpenClaw</h3>
              <p>
                OpenClaw&apos;s built-in channel uses a linked WhatsApp Web
                session. Its Gateway owns the live connection. This connection
                is not an outside gateway and is not Meta&apos;s Cloud API.
              </p>
              <Link className="text-link" href={openClawPath}>
                Follow the OpenClaw setup guide
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <ServerCog size={22} aria-hidden="true" />
              <h3>Hermes Agent</h3>
              <p>
                Hermes offers two connection options: a linked-device Baileys
                bridge and an official WhatsApp Business Cloud API connection.
                Choose one before following its setup steps.
              </p>
              <Link className="text-link" href={hermesPath}>
                Compare the two Hermes options
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <Link2 size={22} aria-hidden="true" />
              <h3>Outside gateway example</h3>
              <p>
                VoidFix documents a separate QR-linked WhatsApp setup. It is not
                built into OpenClaw or Hermes, and it is not Meta&apos;s Cloud API.
                We have not tested delivery or compatibility with either agent.
              </p>
              <Link className="text-link" href={voidfixPath}>
                See how VoidFix connects
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </section>

        <section id="permission-and-safety" className="anchor-target">
          <p className="eyebrow">Before the first real message</p>
          <h2>Protect people, the account, and the agent tools.</h2>
          <ol className="decision-question-list safety-question-list">
            <li>
              <span>01</span>
              <p>
                <strong>Get clear permission.</strong> Tell people what kinds of
                messages they will receive and how often.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Honor every stop request.</strong> Remove the person from
                future messages when they ask you to stop.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>Limit who can reach the agent.</strong> Use pairing or a
                fixed list of approved phone numbers while testing. Do not leave
                a tool-enabled agent open to strangers.
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                <strong>Protect secrets.</strong> Never publish QR codes, saved
                sessions, access tokens, app secrets, or webhook secrets.
              </p>
            </li>
            <li>
              <span>05</span>
              <p>
                <strong>Limit agent tools.</strong> A message can contain harmful
                instructions. Give the agent only the tools and files it needs.
              </p>
            </li>
          </ol>
          <p>
            WhatsApp Business requires opt-in permission and says businesses
            must honor requests to stop. Local laws may add more duties. Check
            the rules for every country where you send messages.
          </p>
        </section>

        <section id="hosting-needs" className="anchor-target">
          <p className="eyebrow">Keep the connection available</p>
          <h2>An always-on agent needs an always-on gateway.</h2>
          <p>
            You can test on your own computer. If the agent must reply while that
            computer is off, run the agent gateway on a suitable always-on
            computer, a VPS (a virtual computer that stays online), or a
            managed service. The Cloud API also needs a public HTTPS webhook
            that Meta can reach.
          </p>
          <PageNextStep href={aiHostingPath} label="Learn how AI agent hosting works" />
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">What supports this guide</p>
          <h2>Read the guides and rules used for this page.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li>
                <ExternalSourceLink href="https://docs.openclaw.ai/channels/whatsapp">
                  OpenClaw WhatsApp channel guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://docs.openclaw.ai/gateway/security">
                  OpenClaw Gateway security guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/messaging/whatsapp">
                  Hermes linked-device WhatsApp guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/messaging/whatsapp-cloud">
                  Hermes WhatsApp Business Cloud API guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://www.whatsapp.com/legal/business-policy">
                  WhatsApp Business Messaging Policy
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://www.whatsapp.com/legal/terms-of-service">
                  WhatsApp Terms of Service
                </ExternalSourceLink>
              </li>
            </ul>
            <p>
              Sources checked August 26, 2026. Product steps and messaging rules
              can change. We did not test delivery, account limits, or uptime for
              this guide. This page is general information, not legal advice.
            </p>
          </div>
          <PageNextStep href={smsComparisonPath} label="Compare SMS and WhatsApp" />
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>WhatsApp AI agent questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Choose an option first</p>
            <h2>Choose the connection before adding another service.</h2>
            <p className="pilot-final-copy">
              Compare a linked device, Cloud API, and a separate messaging
              service. Then follow the setup that matches your agent and
              message job.
            </p>
          </div>
          <Link className="button button-accent" href="#three-routes">
            Compare the three options
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
