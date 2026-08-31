import Link from "next/link";
import { AlertTriangle, ArrowRight, LockKeyhole, QrCode } from "lucide-react";

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

const whatsappHubPath = "/guides/whatsapp-ai-agent/";
const aiHostingPath = "/guides/ai-agent-hosting/";
const openClawVpsPath = "/tools/best-vps-for-openclaw/";

export const metadata = createPageMetadata({
  title: "OpenClaw WhatsApp Setup: Connect the Built-In Channel",
  description:
    "Connect OpenClaw to WhatsApp with its channel plugin, QR login, sender pairing, and clear access checks. No outside gateway is required.",
  path: publicPageFrontmatter.openClawWhatsappGuide.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["what-this-route-is", "How OpenClaw connects"],
  ["before-you-start", "Before you start"],
  ["setup-steps", "Setup steps"],
  ["pairing-and-access", "Pairing and access"],
  ["security-checks", "Security checks"],
  ["troubleshooting", "Troubleshooting"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const setupSteps = [
  {
    title: "Add the WhatsApp channel",
    text: (
      <>
        Run <code>openclaw onboard</code> or{" "}
        <code>openclaw channels add --channel whatsapp</code>. OpenClaw offers
        to install its WhatsApp channel plugin when it is missing.
      </>
    ),
  },
  {
    title: "Choose the sender policy",
    text: (
      <>
        In the channel settings, keep direct messages on <code>pairing</code>{" "}
        while you set up. An allowlist is a fixed list of approved phone
        numbers. Add only known numbers to it.
      </>
    ),
  },
  {
    title: "Show the login QR code",
    text: (
      <>
        Run <code>openclaw channels login --channel whatsapp</code>. Keep the
        terminal open because the live QR code can expire.
      </>
    ),
  },
  {
    title: "Link the WhatsApp account",
    text: (
      <>
        On the phone, open WhatsApp&apos;s Linked Devices screen and scan the QR
        code. Treat that QR code like a short-lived password.
      </>
    ),
  },
  {
    title: "Start the OpenClaw Gateway",
    text: (
      <>
        Run <code>openclaw gateway</code>. The Gateway keeps the live WhatsApp
        connection and listens for messages.
      </>
    ),
  },
  {
    title: "Approve the first sender",
    text: (
      <>
        Send a message to the linked number. Approve the new request in Settings
        or with <code>openclaw pairing approve whatsapp &lt;CODE&gt;</code>.
      </>
    ),
  },
] as const;

const faqs = [
  {
    question: "Does OpenClaw have a built-in way to connect WhatsApp?",
    answer:
      "Yes. OpenClaw documents a WhatsApp channel plugin that the normal channel setup can install. The OpenClaw Gateway owns the linked session after login.",
  },
  {
    question: "Does OpenClaw WhatsApp use the official Cloud API?",
    answer:
      "No. OpenClaw uses WhatsApp Web through Baileys. The WhatsApp Business Cloud API is a different connection. It needs a Meta app, a business account, private login details, and a secure web address that receives new messages.",
  },
  {
    question: "Do I need VoidFix or Twilio for OpenClaw WhatsApp?",
    answer:
      "Not for this built-in channel. An outside messaging service would be a separate way to connect, with its own setup and message path.",
  },
  {
    question: "Can I use my personal WhatsApp number?",
    answer:
      "OpenClaw documents personal-number and self-chat support, but it recommends a separate number. A separate number also makes testing and account ownership easier to understand.",
  },
  {
    question: "Why does an unknown sender get a pairing code?",
    answer:
      "Pairing stops an unknown sender's message from reaching the agent until the operator approves that sender. It is different from the QR code that links the WhatsApp account.",
  },
  {
    question: "Will WhatsApp keep working when my computer is off?",
    answer:
      "Only if the OpenClaw Gateway runs on another always-on computer or server. The linked phone alone does not keep your OpenClaw process running.",
  },
] as const;

export default function OpenClawWhatsappGuidePage() {
  const page = publicPageFrontmatter.openClawWhatsappGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: aiHostingPath, label: "AI agent hosting" },
    { href: whatsappHubPath, label: "WhatsApp AI agent" },
    { href: page.path, label: "OpenClaw WhatsApp" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: aiHostingPath, label: "AI agent hosting" },
          { href: whatsappHubPath, label: "WhatsApp AI agent" },
          { label: "OpenClaw WhatsApp" },
        ]}
        eyebrow={
          <>
            Updated{" "}
            <time dateTime={page.lastModified}>
              {formatPageDate(page.lastModified)}
            </time>
          </>
        }
        title="How to Connect OpenClaw to WhatsApp"
        lede={
          <p>
            OpenClaw connects through its WhatsApp channel plugin. You link a
            WhatsApp account with a QR code, start the OpenClaw Gateway, and
            approve the people who may reach the agent. You do not need VoidFix,
            Twilio, or Meta&apos;s Cloud API for this setup.
          </p>
        }
        actions={[
          { href: "#setup-steps", label: "Follow the setup steps" },
        ]}
        trustItems={[
          "The QR login and sender pairing are different steps",
          "With pairing, unknown senders stay outside until approved",
          "This linked-device setup is not the Cloud API",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The short answer</p>
          <h2>Use OpenClaw&apos;s own channel before adding another service.</h2>
          <p>
            OpenClaw connects through WhatsApp Web with Baileys. Its Gateway
            keeps that link running. You normally do not need another messaging
            service for this setup.
          </p>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <p>
              A linked-device connection does not remove WhatsApp&apos;s rules.
              Do not use it for unwanted bulk messages or contact people who did
              not expect your message.
            </p>
          </div>
        </section>

        <section id="what-this-route-is" className="anchor-target">
          <p className="eyebrow">Name the parts</p>
          <h2>The channel carries the chat into the OpenClaw Gateway.</h2>
          <div className="agent-flow" aria-label="OpenClaw WhatsApp connection flow">
            <div>
              <span>WHATSAPP</span>
              <strong>Linked account</strong>
              <small>Receives the chat</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>CHANNEL</span>
              <strong>OpenClaw WhatsApp plugin</strong>
              <small>Keeps the Baileys connection</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>GATEWAY</span>
              <strong>Agent and allowed tools</strong>
              <small>Handles an approved message</small>
            </div>
          </div>
          <p>
            This is not the official WhatsApp Business Cloud API. It is also not
            VoidFix or another outside messaging gateway. Those ways to connect
            use different accounts and message paths. They also use different
            credentials.
          </p>
          <PageNextStep href={whatsappHubPath} label="Compare three ways to connect WhatsApp" />
        </section>

        <section id="before-you-start" className="anchor-target">
          <p className="eyebrow">Prepare four things</p>
          <h2>Decide who owns the number and who may use the agent.</h2>
          <div className="editorial-card-grid two-column-card-grid">
            <article className="editorial-card">
              <span className="guide-card-number">01</span>
              <h3>A running OpenClaw install</h3>
              <p>
                Finish the normal OpenClaw setup first. The Gateway must be able
                to start before a chat channel can stay connected.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">02</span>
              <h3>A WhatsApp number you control</h3>
              <p>
                OpenClaw recommends a separate number. Decide who owns it and
                who can use the linked phone.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">03</span>
              <h3>A private place for the QR code</h3>
              <p>
                Scan the live code directly. Do not publish it in a screenshot,
                chat, guide, support post, or recording.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">04</span>
              <h3>A sender access plan</h3>
              <p>
                Start with pairing or a small allowlist. Do not open a
                tool-enabled agent to every unknown sender.
              </p>
            </article>
          </div>
          <p className="supporting-link-row">
            <span>OpenClaw setup guide:</span>
            <ExternalSourceLink href="https://docs.openclaw.ai/channels/whatsapp">
              OpenClaw WhatsApp channel guide
            </ExternalSourceLink>
          </p>
        </section>

        <section id="setup-steps" className="anchor-target">
          <p className="eyebrow">Six setup steps</p>
          <h2>Link the account, then approve the person.</h2>
          <ol className="decision-question-list">
            {setupSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>
                  <strong>{step.title}.</strong> {step.text}
                </p>
              </li>
            ))}
          </ol>
          <p>
            The QR code links the WhatsApp account to OpenClaw. The later
            pairing code approves a person who wants to message the agent. One
            code does not replace the other.
          </p>
        </section>

        <section id="pairing-and-access" className="anchor-target">
          <p className="eyebrow">Two separate doors</p>
          <h2>Account login and sender approval protect different things.</h2>
          <div className="answer-split-grid product-answer-grid">
            <article>
              <QrCode size={22} aria-hidden="true" />
              <h3>Door 1: WhatsApp login</h3>
              <p>
                The QR code links the WhatsApp account. Anyone who gets a live
                login code may be able to add a linked device, so keep it private.
              </p>
            </article>
            <article>
              <LockKeyhole size={22} aria-hidden="true" />
              <h3>Door 2: agent access</h3>
              <p>
                The direct-message policy decides which senders can reach the
                agent. With pairing, an unknown sender waits until the operator
                approves the request.
              </p>
            </article>
          </div>
          <p className="supporting-link-row">
            <span>
              Pairing rules can change. Check how long a pairing request stays
              open and how many requests can wait:
            </span>
            <ExternalSourceLink href="https://docs.openclaw.ai/start/pairing">
              OpenClaw sender pairing guide
            </ExternalSourceLink>
          </p>
        </section>

        <section id="security-checks" className="anchor-target">
          <p className="eyebrow">Before real users</p>
          <h2>Keep the sender list small and the agent&apos;s power limited.</h2>
          <ol className="decision-question-list safety-question-list">
            <li>
              <span>01</span>
              <p>
                <strong>Run OpenClaw&apos;s built-in safety check.</strong> Use{" "}
                <code>openclaw security audit</code> after changing access and
                before other people can reach the Gateway.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Use pairing or allowlists.</strong> Give access only to
                people who should be able to trigger the agent.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>Limit groups.</strong> Keep groups off or allow only the
                groups and senders you have reviewed.
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                <strong>Protect saved login files.</strong> Keep the OpenClaw
                data folder and WhatsApp login files out of public backups and
                shared code folders.
              </p>
            </li>
            <li>
              <span>05</span>
              <p>
                <strong>Do not trust links, files, or instructions inside messages.</strong>{" "}
                They can try to trick the agent. Limit risky tools and keep
                sensitive work separate.
              </p>
            </li>
          </ol>
          <p>
            If different groups must not share data, read the security guide to
            learn how to keep them separate.
          </p>
        </section>

        <section id="troubleshooting" className="anchor-target">
          <p className="eyebrow">Small checks first</p>
          <h2>Find whether the problem is login, Gateway, or access.</h2>
          <div
            className="comparison-scroll"
            role="region"
            aria-label="OpenClaw WhatsApp troubleshooting checks"
            tabIndex={0}
          >
            <table className="comparison-table three-column-table">
              <thead>
                <tr>
                  <th scope="col">What you see</th>
                  <th scope="col">Check</th>
                  <th scope="col">Useful command</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Not linked</th>
                  <td>Run QR login again and scan the live code</td>
                  <td><code>openclaw channels login --channel whatsapp</code></td>
                </tr>
                <tr>
                  <th scope="row">Linked but no replies</th>
                  <td>Check Gateway and channel health</td>
                  <td><code>openclaw channels status --probe</code></td>
                </tr>
                <tr>
                  <th scope="row">Unknown sender waits</th>
                  <td>Review the direct-message access request</td>
                  <td><code>openclaw pairing list whatsapp</code></td>
                </tr>
                <tr>
                  <th scope="row">Repeated reconnects</th>
                  <td>Check the host connection and run diagnostics. Then read the logs.</td>
                  <td><code>openclaw doctor</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Back up the correct account data before logging out or linking the
            account again. Logging out removes the saved WhatsApp login for that
            OpenClaw account.
          </p>
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Guides used for this setup</p>
          <h2>Check OpenClaw&apos;s guides for updated steps.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li>
                <ExternalSourceLink href="https://docs.openclaw.ai/channels/whatsapp">
                  OpenClaw WhatsApp channel guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://docs.openclaw.ai/start/pairing">
                  OpenClaw sender pairing guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://docs.openclaw.ai/gateway/security">
                  OpenClaw Gateway security guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://www.whatsapp.com/legal/terms-of-service">
                  WhatsApp Terms of Service
                </ExternalSourceLink>
              </li>
            </ul>
            <p>
              Sources checked August 26, 2026. Commands, plugin behavior, and
              WhatsApp rules can change. We did not test message delivery,
              connection time, or account limits for this page.
            </p>
          </div>
          <PageNextStep href={openClawVpsPath} label="Compare OpenClaw VPS setups" />
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>OpenClaw WhatsApp questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Keep the Gateway online</p>
            <h2>Choose where OpenClaw will keep running.</h2>
            <p className="pilot-final-copy">
              Compare the hosting options, then decide who will handle updates
              and backups.
            </p>
          </div>
          <Link className="button button-accent" href={openClawVpsPath}>
            Compare OpenClaw VPS setups
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
