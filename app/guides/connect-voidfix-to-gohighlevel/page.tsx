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
const whatsappSetupPath = "/guides/connect-whatsapp-to-voidfix/";

export const metadata = createPageMetadata({
  title: "How to Connect VoidFix WhatsApp to GoHighLevel",
  description:
    "Connect a working VoidFix WhatsApp device to a GoHighLevel sub-account, check access, protect the API key, and test permitted messages.",
  path: publicPageFrontmatter.connectVoidfixToGohighlevelGuide.path,
});

const toc = [
  ["quick-answer", "Quick answer"],
  ["before-you-start", "Before you start"],
  ["connection-steps", "Connection steps"],
  ["test-the-route", "Test the connection"],
  ["access-and-security", "Access and security"],
  ["messaging-rules", "Messaging rules"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const connectionSteps = [
  {
    title: "Confirm WhatsApp is connected in VoidFix",
    text: "Do not start with GoHighLevel. First check that the correct WhatsApp device shows as connected in VoidFix.",
  },
  {
    title: "Open the VoidFix HighLevel connection page",
    text: "Open the HighLevel connection page in your dashboard. Do not save or publish a connection link made for your account.",
  },
  {
    title: "Choose Connect to HighLevel",
    text: "This button starts the HighLevel sign-in and access check. A changed dashboard may use a different label.",
  },
  {
    title: "Sign in to the correct HighLevel account",
    text: "Check the agency and user before you continue. Do not use a shared login when your team can use named users instead.",
  },
  {
    title: "Choose the correct sub-account",
    text: "Read the sub-account name carefully. Connecting the wrong location can send messages or contact data to the wrong place.",
  },
  {
    title: "Check the requested access",
    text: "Read the account and each requested type of access before approving. Only grant the access that the connection needs.",
  },
  {
    title: "Enter the required VoidFix details",
    text: "VoidFix's guide calls for an API key plus default inbound and outbound numbers. Keep the key hidden and check both numbers before saving.",
  },
  {
    title: "Select VoidFix as the phone service in HighLevel",
    text: "Open Settings, Phone Numbers, and Advanced Settings, then choose VoidFix. Follow the menu names shown in your account because they can change.",
  },
  {
    title: "Test one message in each direction you plan to use",
    text: "Use a test number that agreed to receive messages. Check one incoming message and one allowed reply. A finished sign-in does not show that messages work.",
  },
] as const;

const faqs = [
  {
    question: "Can I connect VoidFix to a GoHighLevel sub-account?",
    answer:
      "Sign in to HighLevel, choose the correct sub-account, enter the required VoidFix details, and choose VoidFix as the phone service.",
  },
  {
    question: "Must WhatsApp be connected before GoHighLevel?",
    answer:
      "Yes. VoidFix's current guide says to confirm the WhatsApp device connection first.",
  },
  {
    question: "Is VoidFix a native GoHighLevel or Meta integration?",
    answer:
      "VoidFix calls this a third-party HighLevel connection. Its WhatsApp setup links a phone with a QR code. Do not treat it as a built-in HighLevel or Meta connection unless those companies confirm it.",
  },
  {
    question: "Does a successful login prove messages work?",
    answer:
      "No. Test one opted-in inbound message and one permitted outbound reply. Record the direction and result without exposing private content.",
  },
  {
    question: "Can I show my VoidFix API key in a screenshot?",
    answer:
      "No. Treat API keys, QR codes, tokens, passwords, phone numbers, account IDs, and permanent connection links as secrets.",
  },
] as const;

export default function ConnectVoidfixToGohighlevelGuidePage() {
  const page = publicPageFrontmatter.connectVoidfixToGohighlevelGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: whatsappHubPath, label: "WhatsApp AI agent" },
    { href: voidfixGuidePath, label: "VoidFix Gateway" },
    { href: page.path, label: "Connect VoidFix to GoHighLevel" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: whatsappHubPath, label: "WhatsApp AI agent" },
          { href: voidfixGuidePath, label: "VoidFix Gateway" },
          { label: "VoidFix and GoHighLevel" },
        ]}
        eyebrow={
          <>
            Third-party connection guide / checked{" "}
            <time dateTime={page.lastModified}>
              {formatPageDate(page.lastModified)}
            </time>
          </>
        }
        title="How to Connect VoidFix WhatsApp to GoHighLevel (GHL)"
        lede={
          <p>
            Start with a working WhatsApp connection in VoidFix. Then allow the
            connection to the correct GoHighLevel sub-account, which is a
            separate customer workspace. Enter the required VoidFix
            details, and test a permitted message in both directions. VoidFix
            describes this as a third-party connection. Do not treat it as built
            into HighLevel or Meta unless those companies confirm it.
          </p>
        }
        actions={[
          { href: "#connection-steps", label: "See the connection steps" },
        ]}
        trustItems={[
          "Working VoidFix device required first",
          "We did not test two-way message delivery",
          "An API key is a secret code that lets software connect; keep it private",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="quick-answer" className="anchor-target">
          <p className="eyebrow">How the connection works</p>
          <h2>VoidFix sits between WhatsApp and the HighLevel sub-account.</h2>
          <div className="agent-flow" aria-label="VoidFix WhatsApp and GoHighLevel connection flow">
            <div>
              <span>CHANNEL</span>
              <strong>WhatsApp phone</strong>
              <small>Linked to VoidFix first</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>SERVICE</span>
              <strong>VoidFix</strong>
              <small>Third-party connection</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>CRM</span>
              <strong>HighLevel sub-account</strong>
              <small>Check the selected location</small>
            </div>
          </div>
          <p>
            HighLevel stores customer records in this setup. This kind of tool
            is often called a CRM. VoidFix documents the external
            connection. WhatsApp&apos;s rules still apply to the message, and
            each service can have its own account and privacy rules. Access
            rules can differ too.
          </p>
        </section>

        <section id="before-you-start" className="anchor-target">
          <p className="eyebrow">Four things to prepare</p>
          <h2>Prepare the correct device, account, phone numbers, and test contact.</h2>
          <ol className="decision-question-list">
            <li>
              <span>01</span>
              <p>
                <strong>A connected VoidFix WhatsApp device.</strong> Fix this
                first if the device is not connected.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>The correct HighLevel sub-account.</strong> Write down
                the correct location before opening the sign-in and access
                screen.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>The numbers for incoming and outgoing messages.</strong>{" "}
                Check every digit before saving. VoidFix calls these the default
                inbound and outbound numbers.
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                <strong>An opted-in test contact.</strong> Use a contact that
                agreed to the test and knows how to opt out.
              </p>
            </li>
          </ol>

          <div className="method-panel">
            <p>
              <strong>Affiliate link:</strong> Use this signup link only if you do not
              have VoidFix yet. We may earn a commission if you buy through it.
              This does not change our advice, and we have not tested product
              quality.
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
          <p className="eyebrow">Nine careful steps</p>
          <h2>Connect the correct sub-account, then test that messages work.</h2>
          <ol className="buying-check-grid openclaw-buying-grid">
            {connectionSteps.map((step, index) => (
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
            <span>VoidFix setup guide:</span>
            <ExternalSourceLink href="https://gateway.voidfix.com/ghl-whatsapp-documentation">
              Read the current VoidFix HighLevel guide
            </ExternalSourceLink>
          </p>
        </section>

        <section id="test-the-route" className="anchor-target">
          <p className="eyebrow">Login is not delivery</p>
          <h2>Test the exact message directions you plan to use.</h2>
          <div className="editorial-card-grid">
            <article className="editorial-card">
              <span className="guide-card-number">01</span>
              <h3>Check the account</h3>
              <p>
                Confirm the correct HighLevel sub-account, WhatsApp number, and
                VoidFix connection before sending anything.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">02</span>
              <h3>Test inbound</h3>
              <p>
                Ask the opted-in test contact to send one message. Record when
                it arrived and where it appeared.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">03</span>
              <h3>Test an allowed reply</h3>
              <p>
                Send one permitted reply from the correct HighLevel sub-account.
                Check the recipient and result before adding any automated
                steps.
              </p>
            </article>
          </div>
          <p className="table-limit-note">
            ZeroToHosting did not run this hands-on test. A finished sign-in,
            saved form, or connected label is not proof of two-way delivery.
          </p>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <p>
              VoidFix advertises automation, but its general terms also restrict
              automated system use, including scripts that send messages. Before
              adding automated sends, ask VoidFix in writing which built-in
              HighLevel workflows are allowed.
            </p>
          </div>
          <p className="supporting-link-row">
            <span>Check the current contract wording:</span>
            <ExternalSourceLink href="https://gateway.voidfix.com/terms-and-conditions">
              VoidFix terms and conditions
            </ExternalSourceLink>
          </p>
        </section>

        <section id="access-and-security" className="anchor-target">
          <p className="eyebrow">Protect every service</p>
          <h2>One connection can touch several accounts.</h2>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <div>
              <p>
                Check the account and requested access before you approve the
                connection. HighLevel recommends giving only the types of
                account access that are needed. Ask VoidFix about any
                permission you do not understand.
              </p>
              <ul>
                <li>Never show a real VoidFix API key.</li>
                <li>Hide phone numbers, account IDs, and sub-account names.</li>
                <li>Do not publish a permanent connection URL.</li>
                <li>Rotate any key or token that was exposed.</li>
                <li>Remove access when the connection is no longer needed.</li>
              </ul>
            </div>
          </div>
          <p className="supporting-link-row">
            <span>Learn how HighLevel account access works:</span>
            <ExternalSourceLink href="https://marketplace.gohighlevel.com/docs/Authorization/OAuth2.0/">
              HighLevel OAuth documentation
            </ExternalSourceLink>
            <ExternalSourceLink href="https://help.gohighlevel.com/support/solutions/articles/155000004585">
              HighLevel sign-in and account access guide
            </ExternalSourceLink>
          </p>
        </section>

        <section id="messaging-rules" className="anchor-target">
          <p className="eyebrow">The sender stays responsible</p>
          <h2>HighLevel automation does not give you permission to message someone.</h2>
          <div className="answer-split-grid">
            <article>
              <span className="guide-card-number">BEFORE</span>
              <h3>Record the opt-in</h3>
              <p>
                Only message people who gave you their number and asked to
                receive that type of WhatsApp message. Keep a clear record of
                what they agreed to.
              </p>
            </article>
            <article>
              <span className="guide-card-number">AFTER</span>
              <h3>Honor every opt-out</h3>
              <p>
                Make opting out clear. Stop when someone asks, whether the
                request comes through WhatsApp or another way.
              </p>
            </article>
          </div>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <p>
              Follow WhatsApp&apos;s current rules and the laws in the places
              where you and the recipient are located. Do not use this
              connection as the only way to send emergency or safety-critical
              messages.
            </p>
          </div>
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and test limits</p>
          <h2>Sources checked August 26, 2026.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/ghl-whatsapp-documentation">
                  VoidFix HighLevel WhatsApp documentation
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/whatsapp-device-connection">
                  VoidFix WhatsApp device connection guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://marketplace.gohighlevel.com/docs/Authorization/OAuth2.0/">
                  HighLevel OAuth documentation
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://help.gohighlevel.com/support/solutions/articles/155000004585">
                  HighLevel external connections
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://whatsappbusiness.com/policy/">
                  WhatsApp Business Messaging Policy
                </ExternalSourceLink>
              </li>
            </ul>
            <p>
              We did not personally test sign-in, two-way messages,
              reconnecting, support, uptime, privacy, or security. Check the
              current VoidFix and HighLevel screens before connecting a real
              sub-account.
            </p>
          </div>
          <PageNextStep
            href={whatsappSetupPath}
            label="Check the linked-device WhatsApp setup"
          />
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>VoidFix and GoHighLevel questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Finish the connection</p>
            <h2>Connect the right sub-account, then test both directions.</h2>
            <p className="pilot-final-copy">
              Start with a working WhatsApp connection. Then follow the nine
              steps and make sure one allowed incoming message and reply both
              work.
            </p>
          </div>
          <Link className="button button-accent" href="#connection-steps">
            See the connection steps
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
