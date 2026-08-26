import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

import {
  EditorialFaqList,
  EditorialGuideHero,
  EditorialGuideLayout,
  ExternalSourceLink,
  PageNextStep,
} from "@/components/editorial-guide";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PaidAffiliateLink } from "@/components/paid-affiliate-link";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

const whatsappHubPath = "/guides/whatsapp-ai-agent/";
const voidfixGuidePath = "/guides/voidfix-gateway/";
const highLevelSetupPath = "/guides/connect-voidfix-to-gohighlevel/";

export const metadata = createPageMetadata({
  title: "How to Connect WhatsApp to VoidFix (Step by Step)",
  description:
    "Connect WhatsApp to VoidFix with a linked-device QR code, check the connection, protect the QR code, and understand the rules that still apply.",
  path: publicPageFrontmatter.connectWhatsappToVoidfixGuide.path,
});

const toc = [
  ["what-this-setup-does", "What this setup does"],
  ["before-you-start", "Before you start"],
  ["connection-steps", "Connection steps"],
  ["check-the-connection", "Check the connection"],
  ["messaging-rules", "Messaging rules"],
  ["problems-and-secrets", "Problems and secrets"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const setupSteps = [
  {
    title: "Sign in and open the WhatsApp connection area",
    text: "Open wa.voidfix.com, sign in to the correct account, and open Host or the current WhatsApp connection area.",
  },
  {
    title: "Check which buttons you see",
    text: "VoidFix's guide starts with Add Account. The Scribe guide starts with Generate Customer Link. Follow the buttons shown in your account and ask VoidFix if neither appears.",
  },
  {
    title: "Follow the buttons shown in your account",
    text: "If you see Add Account, follow those steps. If you see Generate Customer Link, open the private customer page and enter the requested full name. Never publish that link.",
  },
  {
    title: "Create the QR code",
    text: "Use the QR button shown on your current screen. Treat the code like a short-lived login password. Do not copy it into a public screenshot or message.",
  },
  {
    title: "Open Linked Devices on the phone",
    text: "On the phone with the correct WhatsApp account, open WhatsApp's Linked Devices screen and choose the option to link a device.",
  },
  {
    title: "Scan the QR code",
    text: "Use that phone to scan the QR code shown by VoidFix. Check the account on the phone before scanning.",
  },
  {
    title: "Keep the phone online",
    text: "VoidFix's current guide says the phone must remain online to keep the connection active. Plan for reliable power and data. Decide who will care for the device.",
  },
  {
    title: "Check for Connected or Active",
    text: "Return to the VoidFix Host area. Its current guide says the account should show as Connected or Active. A changed dashboard may use a different label.",
  },
  {
    title: "Test with someone who agreed",
    text: "Use a test number that agreed to receive the message. Check one allowed incoming message and one allowed reply. A status label alone does not show that real delivery works.",
  },
  {
    title: "Write down who handles a reconnect",
    text: "Write down who will check the phone, data, WhatsApp account, and VoidFix status if the connection stops. We have not tested how reconnecting works.",
  },
] as const;

const faqs = [
  {
    question: "How does VoidFix connect to WhatsApp?",
    answer:
      "VoidFix's guide shows a QR code in its dashboard. You scan that code from WhatsApp's Linked Devices screen on the phone.",
  },
  {
    question: "Does the WhatsApp phone need to stay online?",
    answer:
      "VoidFix's current guide says yes. Plan for the phone to stay powered and online if you want the connection to remain active.",
  },
  {
    question: "Is this the official Meta WhatsApp Business API setup?",
    answer:
      "No. This guide covers VoidFix's QR-based linked-device setup. Meta's WhatsApp Business API uses a different account and setup process.",
  },
  {
    question: "Can I send cold bulk messages after connecting?",
    answer:
      "A gateway does not give permission to send unwanted messages. Only message people who gave you their number and opted in for that kind of message.",
  },
  {
    question: "Did ZeroToHosting test this connection?",
    answer:
      "No. We used the listed guides, but we did not personally test account setup, reconnecting, delivery, support, or security.",
  },
] as const;

export default function ConnectWhatsappToVoidfixGuidePage() {
  const page = publicPageFrontmatter.connectWhatsappToVoidfixGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: whatsappHubPath, label: "WhatsApp AI agent" },
    { href: voidfixGuidePath, label: "VoidFix Gateway" },
    { href: page.path, label: "Connect WhatsApp to VoidFix" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: whatsappHubPath, label: "WhatsApp AI agent" },
          { href: voidfixGuidePath, label: "VoidFix Gateway" },
          { label: "Connect WhatsApp" },
        ]}
        eyebrow={
          <>
            Setup guide / checked{" "}
            <time dateTime={page.lastModified}>
              {formatPageDate(page.lastModified)}
            </time>
          </>
        }
        title="How to Connect WhatsApp to VoidFix (Step by Step)"
        lede={
          <p>
            VoidFix documents a linked-device setup. Its dashboard makes a QR
            code, and you scan that code from WhatsApp on your phone. This is
            not Meta&apos;s official WhatsApp Business API setup. Protect the QR
            code, keep the phone online, and only message people who opted in.
          </p>
        }
        actions={[
          { href: "#connection-steps", label: "See the connection steps" },
        ]}
        trustItems={[
          "This setup links a phone with a QR code",
          "We did not test the connection or delivery",
          "The sender must get permission and honor stop requests",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="what-this-setup-does" className="anchor-target">
          <p className="eyebrow">What the QR code connects</p>
          <h2>Your phone account is linked to the VoidFix dashboard.</h2>
          <div className="agent-flow" aria-label="VoidFix WhatsApp connection flow">
            <div>
              <span>PHONE</span>
              <strong>WhatsApp account</strong>
              <small>Scan from Linked Devices</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>LINK</span>
              <strong>QR connection</strong>
              <small>Keep this private</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>DASHBOARD</span>
              <strong>VoidFix host</strong>
              <small>Check the connection status</small>
            </div>
          </div>
          <p>
            The QR code gives a new device access to the WhatsApp account. Treat
            it as a secret. VoidFix says this setup does not use Meta&apos;s
            WhatsApp Business API. WhatsApp&apos;s rules, local laws, and account
            risks still apply.
          </p>
        </section>

        <section id="before-you-start" className="anchor-target">
          <p className="eyebrow">Prepare first</p>
          <h2>You need the phone, account access, and a test contact who said yes.</h2>
          <ol className="decision-question-list">
            <li>
              <span>01</span>
              <p>
                <strong>The correct WhatsApp phone.</strong> You need access to
                the account&apos;s Linked Devices screen.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>A phone that can stay online.</strong> VoidFix&apos;s
                guide says the linked phone must remain online.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>A private place to scan.</strong> Do not share, save, or
                publish the QR code.
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                <strong>An opted-in test number.</strong> The person must have
                agreed to receive the kind of message you will test.
              </p>
            </li>
          </ol>

          <div className="method-panel">
            <p>
              <strong>Affiliate link:</strong> We may earn a commission if you buy
              through this link. This does not change our advice. We have not
              tested product quality.
            </p>
            <div className="button-row">
              <PaidAffiliateLink
                className="button button-primary"
                destination="voidfixWhatsappGateway"
              >
                Open the VoidFix WhatsApp signup
              </PaidAffiliateLink>
            </div>
          </div>
        </section>

        <section id="connection-steps" className="anchor-target">
          <p className="eyebrow">Ten clear steps</p>
          <h2>Connect the account, then test the real path.</h2>
          <div className="method-panel">
            <p>
              <strong>The two guides start differently.</strong> One shows Host
              and Add Account. The Scribe guide shows Generate Customer Link and
              a customer page. Follow the labels in your current dashboard. Ask
              VoidFix if neither set of steps matches.
            </p>
          </div>
          <ol className="buying-check-grid openclaw-buying-grid">
            {setupSteps.map((step, index) => (
              <li key={step.title}>
                <span className="guide-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>
                  <strong>{step.title}</strong>
                </p>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="supporting-link-row">
            <span>Compare the two setup guides:</span>
            <ExternalSourceLink href="https://gateway.voidfix.com/whatsapp-device-connection">
              Read the current VoidFix device guide
            </ExternalSourceLink>
            <ExternalSourceLink href="https://scribehow.com/o/aPVt4GmYRV2kilMIKOBJFA/viewer/WhatsApp_Connection_or_VoidFix_Gateway__WtCxdum-S3WXSynJ22wUsg">
              Read the VoidFix WhatsApp Scribe guide
            </ExternalSourceLink>
          </p>
        </section>

        <section id="check-the-connection" className="anchor-target">
          <p className="eyebrow">A green label is only step one</p>
          <h2>Check messages in both directions and plan for stop requests and reconnecting.</h2>
          <div className="editorial-card-grid">
            <article className="editorial-card">
              <span className="guide-card-number">STATUS</span>
              <h3>Look for Connected or Active</h3>
              <p>
                VoidFix&apos;s guide uses Connected and Active in the Host area.
                Check your current dashboard because labels can change.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">TEST</span>
              <h3>Test incoming and outgoing messages</h3>
              <p>
                With permission, test one inbound message and one allowed
                reply. Record the time and result without copying private
                message content into public notes.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">PLAN</span>
              <h3>Know what happens when it disconnects</h3>
              <p>
                We did not test reconnect behavior. Decide who checks the phone,
                power, data, WhatsApp account, and VoidFix status when messages
                stop.
              </p>
            </article>
          </div>
          <PageNextStep
            href={highLevelSetupPath}
            label="Connect the working VoidFix account to GoHighLevel"
          />
        </section>

        <section id="messaging-rules" className="anchor-target">
          <p className="eyebrow">The gateway does not grant permission</p>
          <h2>Only message people who asked to hear from you.</h2>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <div>
              <p>
                WhatsApp prohibits spam and unwanted messages. A linked-device
                gateway does not remove those rules, the law, or the chance that
                an account is limited or blocked.
              </p>
              <ul>
                <li>Get the person&apos;s number and a clear opt-in first.</li>
                <li>Say what kind of messages the person will receive.</li>
                <li>Make it easy to opt out and stop when asked.</li>
                <li>Follow the rules where you and the recipient are located.</li>
                <li>Do not use this as the only way to send emergency messages.</li>
              </ul>
            </div>
          </div>
          <p className="supporting-link-row">
            <span>Read the current rules:</span>
            <ExternalSourceLink href="https://whatsappbusiness.com/policy/">
              WhatsApp Business Messaging Policy
            </ExternalSourceLink>
            <ExternalSourceLink href="https://www.whatsapp.com/legal/messaging-guidelines">
              WhatsApp Messaging Guidelines
            </ExternalSourceLink>
          </p>
        </section>

        <section id="problems-and-secrets" className="anchor-target">
          <p className="eyebrow">Stop before guessing</p>
          <h2>Protect the account when a screen or status looks wrong.</h2>
          <div className="answer-split-grid">
            <article>
              <span className="guide-card-number">DO</span>
              <h3>Check the VoidFix guide</h3>
              <p>
                Dashboard labels can move. Confirm the account, device status,
                phone connection, and current VoidFix instructions. Use a fresh
                private code if the shown code is no longer accepted.
              </p>
            </article>
            <article>
              <span className="guide-card-number">DO NOT</span>
              <h3>Share the QR code for help</h3>
              <p>
                Do not post a QR code, password, phone number, customer message,
                account ID, or session link in a forum or public screenshot.
                Rotate any secret that was exposed.
              </p>
            </article>
          </div>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <p>
              Use a clean test account for notes and screenshots. A screenshot
              of a Connected label is not proof of delivery, policy fit, or
              long-term uptime.
            </p>
          </div>
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and test limits</p>
          <h2>Guides used for this setup.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/whatsapp-device-connection">
                  VoidFix WhatsApp device connection guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://scribehow.com/o/aPVt4GmYRV2kilMIKOBJFA/viewer/WhatsApp_Connection_or_VoidFix_Gateway__WtCxdum-S3WXSynJ22wUsg">
                  Supplied VoidFix WhatsApp Scribe walkthrough
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/whatsapp-pricing">
                  VoidFix WhatsApp pricing
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/terms-and-conditions">
                  VoidFix terms and conditions
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://www.whatsapp.com/legal/business-terms">
                  WhatsApp Business Terms
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://whatsappbusiness.com/policy/">
                  WhatsApp Business Messaging Policy
                </ExternalSourceLink>
              </li>
            </ul>
            <p>
              Sources checked August 26, 2026. We did not personally test
              connecting, reconnecting, delivery, support, uptime, or security.
              Check each current screen and policy before connecting a business
              account.
            </p>
          </div>
          <PageNextStep
            href={voidfixGuidePath}
            label="Compare VoidFix WhatsApp and SMS"
          />
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>VoidFix WhatsApp connection questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">After the status check</p>
            <h2>Connect GoHighLevel only after WhatsApp works.</h2>
            <p className="pilot-final-copy">
              Use the correct sub-account, review access, protect the API key,
              and test one allowed incoming message and reply.
            </p>
          </div>
          <Link className="button button-accent" href={highLevelSetupPath}>
            Read the GoHighLevel setup
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
