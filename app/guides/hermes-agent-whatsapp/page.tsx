import Link from "next/link";
import { AlertTriangle, ArrowRight, Cloud, Link2 } from "lucide-react";

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
const smsComparisonPath = "/guides/sms-vs-whatsapp/";

export const metadata = createPageMetadata({
  title: "Hermes Agent WhatsApp Setup: Baileys vs Cloud API",
  description:
    "Connect Hermes Agent to WhatsApp through a linked device with Baileys or through Meta's WhatsApp Business Cloud API.",
  path: publicPageFrontmatter.hermesAgentWhatsappGuide.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["two-routes", "Two ways to connect Hermes"],
  ["choose-a-route", "Choose an option"],
  ["baileys-setup", "Baileys setup"],
  ["cloud-api-setup", "Cloud API setup"],
  ["security-and-permission", "Security and permission"],
  ["what-this-is-not", "What this is not"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const baileysSteps = [
  [
    "Prepare the device",
    "Install Node.js version 18 or newer. Also install npm, the tool that installs Node.js packages. Keep a phone with WhatsApp ready for the QR scan.",
  ],
  ["Run the Hermes wizard", "Run hermes whatsapp and choose Baileys for the WhatsApp account you prepared."],
  ["Scan the QR code", "Open Linked Devices in WhatsApp and scan the live code shown in the terminal."],
  ["Check the allowed users", "Keep the sender list small. Do not allow every sender just to make a test work."],
  ["Run the Gateway", "Start the Hermes Gateway and test with one approved phone number."],
] as const;

const cloudSteps = [
  [
    "Create the Meta app",
    "In Meta's App Dashboard, choose Create App, select Connect with customers through WhatsApp, and open WhatsApp → API Setup.",
  ],
  [
    "Run the Hermes wizard",
    "Run hermes whatsapp-cloud. The wizard asks for four private account values.",
  ],
  [
    "Create a protected public web address",
    "Point it to Hermes on port 8090, then add /whatsapp/webhook to the end.",
  ],
  [
    "Verify the webhook in Meta",
    "Open WhatsApp → Configuration, edit the Webhook, enter the callback URL and matching Verify Token, then subscribe to messages.",
  ],
  [
    "Limit who may reach the agent",
    "Add approved phone numbers to the Hermes allowlist, a fixed list of allowed senders. Test with those recipients before opening access.",
  ],
] as const;

const faqs = [
  {
    question: "Can Hermes Agent connect to WhatsApp?",
    answer:
      "Yes. Hermes documents a Baileys bridge that links a WhatsApp device and a separate adapter for Meta's official WhatsApp Business Cloud API.",
  },
  {
    question: "Is Hermes Baileys the official WhatsApp API?",
    answer:
      "No. It connects by acting as a WhatsApp Web session. Hermes says this way to connect is unofficial and warns that an account can be restricted.",
  },
  {
    question: "Does connecting Hermes through the Cloud API need a QR code?",
    answer:
      "No. It uses a Meta app, a WhatsApp Business Account, several private setup codes, and a public web address that receives messages.",
  },
  {
    question: "Do I need a public URL for Hermes WhatsApp?",
    answer:
      "Not for the Baileys linked-device setup. The Cloud API setup needs a public HTTPS URL so Meta can send incoming webhook requests to Hermes.",
  },
  {
    question: "Can I use both ways to connect Hermes to WhatsApp?",
    answer:
      "Hermes says both adapters can run at the same time when they use different phone numbers. Most setups should start with one option so ownership and message flow stay clear.",
  },
  {
    question: "Is Hermes WhatsApp the same as VoidFix?",
    answer:
      "No. The Baileys and Cloud API adapters in this guide are Hermes integrations. VoidFix is a separate messaging gateway with its own account and setup. Its data takes a separate path.",
  },
] as const;

function Command({ children }: Readonly<{ children: string }>) {
  return <code>{children}</code>;
}

export default function HermesAgentWhatsappGuidePage() {
  const page = publicPageFrontmatter.hermesAgentWhatsappGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: aiHostingPath, label: "AI agent hosting" },
    { href: whatsappHubPath, label: "WhatsApp AI agent" },
    { href: page.path, label: "Hermes Agent WhatsApp" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: aiHostingPath, label: "AI agent hosting" },
          { href: whatsappHubPath, label: "WhatsApp AI agent" },
          { label: "Hermes Agent WhatsApp" },
        ]}
        eyebrow={
          <>
            Updated{" "}
            <time dateTime={page.lastModified}>
              {formatPageDate(page.lastModified)}
            </time>
          </>
        }
        title="How to Connect Hermes Agent to WhatsApp"
        lede={
          <p>
            Hermes has two ways to connect WhatsApp. Baileys is software that
            links a WhatsApp device with a QR code. The Cloud API adapter
            connects to Meta&apos;s official WhatsApp Business platform with
            credentials, which are private account codes, and a public webhook.
            A webhook is a secure web address that receives messages. Choose an
            option before following setup steps.
          </p>
        }
        actions={[
          { href: "#choose-a-route", label: "Compare the two Hermes options" },
        ]}
        trustItems={[
          "Compare the two options without mixing their steps",
          "See which account and web address each option needs",
          "No extra messaging service is added",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The short answer</p>
          <h2>Use Baileys to link a device, or use Cloud API for Meta&apos;s business platform.</h2>
          <p>
            The Baileys option links a WhatsApp device but is not an official
            WhatsApp API. The Cloud API uses Meta&apos;s business platform and
            needs more account setup plus a public webhook. Meta also limits
            when you may send a regular reply. Neither option uses VoidFix.
          </p>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <p>
              Do not scan a QR code and then describe the result as the official
              Cloud API. That mistake hides the real account rules and the real
              setup owner.
            </p>
          </div>
        </section>

        <section id="two-routes" className="anchor-target">
          <p className="eyebrow">Two ways to connect Hermes</p>
          <h2>They reach WhatsApp in different ways.</h2>
          <div className="answer-split-grid product-answer-grid">
            <article>
              <Link2 size={22} aria-hidden="true" />
              <span className="guide-card-number">BAILEYS</span>
              <h3>Linked-device bridge</h3>
              <p>
                Hermes runs a bridge with Node.js, software that lets the bridge
                run on a computer. It acts as a WhatsApp Web session. You pair
                it with a QR code. It does not need a public webhook or Meta
                developer app.
              </p>
            </article>
            <article>
              <Cloud size={22} aria-hidden="true" />
              <span className="guide-card-number">CLOUD API</span>
              <h3>Official business platform</h3>
              <p>
                Hermes receives WhatsApp events at a public webhook and sends
                replies through the WhatsApp Business Cloud API. It needs a
                business setup and a secure public web address.
              </p>
            </article>
          </div>
        </section>

        <section id="choose-a-route" className="anchor-target">
          <p className="eyebrow">Compare the setup work</p>
          <h2>Choose based on the account and message job.</h2>
          <div
            className="comparison-scroll"
            role="region"
            aria-label="Hermes Baileys and WhatsApp Cloud API comparison"
            tabIndex={0}
          >
            <table className="comparison-table three-column-table">
              <thead>
                <tr>
                  <th scope="col">Setup part</th>
                  <th scope="col">Hermes Baileys</th>
                  <th scope="col">Hermes Cloud API</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Connection</th>
                  <td>WhatsApp Web linked device</td>
                  <td>Official WhatsApp Business API</td>
                </tr>
                <tr>
                  <th scope="row">Account setup</th>
                  <td>WhatsApp account on a phone</td>
                  <td>Meta Business, Meta app, and WhatsApp Business Account</td>
                </tr>
                <tr>
                  <th scope="row">Login</th>
                  <td>Scan a live QR code</td>
                  <td>Provide IDs, tokens, and an app secret</td>
                </tr>
                <tr>
                  <th scope="row">Secure public web address (HTTPS)</th>
                  <td>Not required by this bridge</td>
                  <td>Required for incoming webhook messages</td>
                </tr>
                <tr>
                  <th scope="row">When you can reply</th>
                  <td>This is not the Cloud API, but WhatsApp&apos;s rules still apply.</td>
                  <td>
                    Meta normally lets you write a regular reply for 24 hours
                    after the person&apos;s last message. After that, an approved
                    template is needed. Hermes says this option does not support
                    those templates yet.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Main warning</th>
                  <td>Unofficial connection; Hermes warns about account restrictions</td>
                  <td>More account setup; protect the private codes and check the webhook</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="supporting-link-row">
            <span>Read the Hermes guide:</span>
            <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/messaging/whatsapp-cloud">
              Hermes Cloud API limits
            </ExternalSourceLink>
          </p>
          <p>
            When customers will use the setup, decide who owns it, how
            permission is recorded, how people can stop messages, and where they
            can get human help.
          </p>
        </section>

        <section id="baileys-setup" className="anchor-target">
          <p className="eyebrow">Setup one</p>
          <h2>Hermes Baileys setup uses a QR code.</h2>
          <ol className="decision-question-list">
            {baileysSteps.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>
                  <strong>{title}.</strong>{" "}
                  {index === 1 ? (
                    <>
                      Run <Command>hermes whatsapp</Command> and choose Baileys
                      for the WhatsApp account you prepared.
                    </>
                  ) : (
                    text
                  )}
                </p>
              </li>
            ))}
          </ol>
          <p>
            Hermes warns that the unofficial bridge can face account
            restrictions. It can also stop working when WhatsApp changes its
            WhatsApp Web system.
          </p>
          <p className="supporting-link-row">
            <span>Read the Hermes guide:</span>
            <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/messaging/whatsapp">
              Hermes Baileys setup guide
            </ExternalSourceLink>
          </p>
        </section>

        <section id="cloud-api-setup" className="anchor-target">
          <p className="eyebrow">Setup two</p>
          <h2>Hermes Cloud API setup uses a business app and webhook.</h2>
          <ol className="decision-question-list">
            {cloudSteps.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>
                  <strong>{title}.</strong>{" "}
                  {index === 1 ? (
                    <>
                      Run <Command>hermes whatsapp-cloud</Command>. The wizard
                      asks for four private values. The Phone Number ID is the
                      internal number shown by Meta. The Access Token is a code
                      that grants access. The App Secret is the app&apos;s private
                      key. The Verify Token is a private value that must match in
                      Hermes and Meta.
                    </>
                  ) : (
                    text
                  )}
                </p>
              </li>
            ))}
          </ol>
          <p>
            The phone number ID is not the visible phone number. Read the live
            Hermes and Meta instructions before moving a test setup into real
            use.
          </p>
          <p className="supporting-link-row">
            <span>Read the Hermes guide:</span>
            <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/messaging/whatsapp-cloud">
              Hermes Cloud API setup guide
            </ExternalSourceLink>
          </p>
        </section>

        <section id="security-and-permission" className="anchor-target">
          <p className="eyebrow">Both ways to connect need controls</p>
          <h2>Protect the connection and respect the person.</h2>
          <ol className="decision-question-list safety-question-list">
            <li>
              <span>01</span>
              <p>
                <strong>Get clear opt-in permission.</strong> WhatsApp Business
                says a person must give their number and agree to later messages.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Honor every opt-out.</strong> Stop future messages when a
                person asks to block, stop, or leave.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>Keep QR codes and sessions private.</strong> A linked
                device session can give access to the WhatsApp account.
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                <strong>Keep Cloud secrets out of screenshots.</strong> Protect
                the access token, app secret, and verify token.
              </p>
            </li>
            <li>
              <span>05</span>
              <p>
                <strong>Use a small sender allowlist first.</strong> Test the
                agent&apos;s replies and tool limits before more people can use it.
              </p>
            </li>
          </ol>
          <p>
            Also follow local privacy and messaging law. WhatsApp&apos;s rules do
            not replace the laws that apply to your company or recipients.
          </p>
        </section>

        <section id="what-this-is-not" className="anchor-target">
          <p className="eyebrow">Do not mix the setup steps</p>
          <h2>VoidFix is a separate connection.</h2>
          <p>
            Baileys and Cloud API are part of the Hermes messaging setup.
            VoidFix is a separate service with its own account and support. It
            also has its own path for your data. Only add VoidFix steps when you
            are using it as a separate connection.
          </p>
          <PageNextStep href={whatsappHubPath} label="See three ways to connect WhatsApp" />
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">What supports this setup</p>
          <h2>Read these guides before you start.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
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
                <ExternalSourceLink href="https://hermes-agent.nousresearch.com/docs/user-guide/messaging">
                  Hermes messaging platform overview
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://www.whatsapp.com/legal/meta-terms-whatsapp-business">
                  Meta Terms for WhatsApp Business
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://www.whatsapp.com/legal/business-policy">
                  WhatsApp Business Messaging Policy
                </ExternalSourceLink>
              </li>
            </ul>
            <p>
              Sources checked August 26, 2026. Hermes commands, Meta setup, and
              WhatsApp policies can change. We did not test delivery, uptime,
              account limits, or business approval for this guide.
            </p>
          </div>
          <PageNextStep href={smsComparisonPath} label="Compare SMS and WhatsApp" />
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>Hermes Agent WhatsApp questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Choose a Hermes option</p>
            <h2>Linked device or official business API?</h2>
            <p className="pilot-final-copy">
              Compare the account, need for a public web address, message
              limits, and risks before opening either setup.
            </p>
          </div>
          <Link className="button button-accent" href="#choose-a-route">
            Compare the two Hermes options
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
