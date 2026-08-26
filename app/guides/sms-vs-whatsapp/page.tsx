import Link from "next/link";
import { AlertTriangle, ArrowRight, MessageCircle, Smartphone } from "lucide-react";

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

export const metadata = createPageMetadata({
  title: "SMS vs WhatsApp: Which Channel Fits Your Message?",
  description:
    "Compare SMS and WhatsApp by message type, setup, permission, opt-out, cost parts, and AI agent connection without assuming one winner.",
  path: publicPageFrontmatter.smsVsWhatsappGuide.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["main-difference", "Main difference"],
  ["side-by-side", "Side by side"],
  ["message-jobs", "Message jobs"],
  ["permission-and-opt-out", "Permission and opt-out"],
  ["cost-parts", "Cost parts"],
  ["ai-agent-connection", "AI agent connection"],
  ["decision-check", "Decision check"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const faqs = [
  {
    question: "Is SMS better than WhatsApp?",
    answer:
      "Not for every job. SMS can deliver a short text through a mobile carrier without asking the receiver to install WhatsApp. WhatsApp can support a richer two-way chat when the person uses WhatsApp and expects that conversation.",
  },
  {
    question: "Does SMS need the internet?",
    answer:
      "Normal SMS travels through the mobile network. Your sending service or app may still need internet access to submit the message to an SMS provider.",
  },
  {
    question: "Can SMS send pictures?",
    answer:
      "SMS is a text service. MMS is the related mobile messaging service used for media. Support and price can depend on the phone and carrier. Country and provider also matter.",
  },
  {
    question: "Can I send marketing messages after someone gives me a phone number?",
    answer:
      "Do not assume that a phone number is permission. Get clear consent for the kind of message you plan to send, keep a record, and follow local law and the channel's rules.",
  },
  {
    question: "How should people stop SMS messages?",
    answer:
      "Give a simple opt-out method. Follow the exact stop instructions required by your provider and country.",
  },
  {
    question: "Can an AI agent use SMS and WhatsApp?",
    answer:
      "Yes, when each channel has a supported connection that passes messages to the agent. Keep sender permissions and opt-out records separate for each channel. Do the same for logs and secrets.",
  },
] as const;

export default function SmsVsWhatsappGuidePage() {
  const page = publicPageFrontmatter.smsVsWhatsappGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: aiHostingPath, label: "AI agent hosting" },
    { href: page.path, label: "SMS vs WhatsApp" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: aiHostingPath, label: "AI agent hosting" },
          { label: "SMS vs WhatsApp" },
        ]}
        eyebrow={
          <>
            Messaging comparison / checked{" "}
            <time dateTime={page.lastModified}>
              {formatPageDate(page.lastModified)}
            </time>
          </>
        }
        title="SMS vs WhatsApp: Which Should You Use?"
        lede={
          <p>
            Use SMS when the job is a short mobile-network text and the person
            has clearly agreed to receive it. Use WhatsApp when the person uses
            WhatsApp and expects a richer two-way chat there. Neither channel
            removes consent, opt-out, carrier, platform, or local-law duties.
          </p>
        }
        actions={[
          { href: "#side-by-side", label: "Compare the channels" },
        ]}
        trustItems={[
          "Neither choice is best for every message",
          "See the setup and rules for both choices",
          "Test price and delivery for your real use",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The short answer</p>
          <h2>Choose what the message must do before you choose a service.</h2>
          <p>
            SMS and WhatsApp can both carry a business message, but they use
            different systems. SMS uses mobile-carrier text messaging. WhatsApp
            uses the WhatsApp service and account system. First decide who
            expects the message, what it contains, and how the person can stop
            it.
          </p>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <p>
              A2P means Application-to-Person: a business or app sends a text to
              someone. If a provider says ‘no A2P registration,’ it only means
              that provider says this registration is not needed for its setup.
              Carrier rules may still apply. Provider rules and the law may also
              apply.
            </p>
          </div>
        </section>

        <section id="main-difference" className="anchor-target">
          <p className="eyebrow">The main difference</p>
          <h2>SMS is a carrier text; WhatsApp is an app conversation.</h2>
          <div className="answer-split-grid product-answer-grid">
            <article>
              <Smartphone size={22} aria-hidden="true" />
              <span className="guide-card-number">SMS</span>
              <h3>A short message to a mobile number</h3>
              <p>
                SMS is the text messaging service used by mobile networks and
                phones. Plain SMS does not carry pictures or video; MMS is used
                for media where it is supported.
              </p>
            </article>
            <article>
              <MessageCircle size={22} aria-hidden="true" />
              <span className="guide-card-number">WHATSAPP</span>
              <h3>A chat inside WhatsApp</h3>
              <p>
                The person needs WhatsApp. A business can connect through
                Meta&apos;s business platform or another service. Each choice has
                its own rules.
              </p>
            </article>
          </div>
        </section>

        <section id="side-by-side" className="anchor-target">
          <p className="eyebrow">At a glance</p>
          <h2>Compare what each choice needs.</h2>
          <div
            className="comparison-scroll"
            role="region"
            aria-label="SMS and WhatsApp comparison"
            tabIndex={0}
          >
            <table className="comparison-table three-column-table">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">SMS</th>
                  <th scope="col">WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">What receives it?</th>
                  <td>A mobile number that can receive texts</td>
                  <td>A WhatsApp account using the WhatsApp service</td>
                </tr>
                <tr>
                  <th scope="row">Basic message shape</th>
                  <td>A mobile-network text message</td>
                  <td>An app-based chat message</td>
                </tr>
                <tr>
                  <th scope="row">Media</th>
                  <td>Plain SMS has no media; MMS is separate</td>
                  <td>Check the media types supported by the exact way you connect WhatsApp</td>
                </tr>
                <tr>
                  <th scope="row">Business connection</th>
                  <td>SMS provider, carrier network connection, or phone-and-SIM gateway</td>
                  <td>Cloud API, linked device, or outside gateway</td>
                </tr>
                <tr>
                  <th scope="row">Rules to check</th>
                  <td>Local law and provider policy; carrier, sender and registration rules</td>
                  <td>Local law plus WhatsApp terms, business policy, and rules for the way you connect</td>
                </tr>
                <tr>
                  <th scope="row">How people stop messages</th>
                  <td>Clear stop method; follow the provider&apos;s exact instructions</td>
                  <td>Honor every request to block, stop, or leave; make the path clear</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="message-jobs" className="anchor-target">
          <p className="eyebrow">Start with the message</p>
          <h2>Different jobs may point to different channels.</h2>
          <div className="editorial-card-grid two-column-card-grid">
            <article className="editorial-card">
              <span className="guide-card-number">SHORT ALERT</span>
              <h3>SMS may fit</h3>
              <p>
                A short appointment reminder, sign-in code, or service alert may
                fit a text message when the person asked for it. Check security
                and delivery. Also check sender and country rules for that exact
                use.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">RICH CHAT</span>
              <h3>WhatsApp may fit</h3>
              <p>
                A two-way support chat may fit WhatsApp when the person already
                uses it and expects the conversation there. Plan a way to reach
                a person when automation cannot help.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">CRITICAL MESSAGE</span>
              <h3>Do not trust one channel alone</h3>
              <p>
                A sent message is not proof that a person read or acted on it.
                For urgent or safety-critical work, use a tested backup and
                decide who takes over if the message fails.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">MARKETING</span>
              <h3>Permission comes first</h3>
              <p>
                Do not upload a contact list and start sending. Get permission
                for the message category, keep proof, identify the sender, and
                make stopping simple.
              </p>
            </article>
          </div>
        </section>

        <section id="permission-and-opt-out" className="anchor-target">
          <p className="eyebrow">Before you send</p>
          <h2>Get permission and make messages easy to stop.</h2>
          <ol className="decision-question-list safety-question-list">
            <li>
              <span>01</span>
              <p>
                <strong>Ask clearly.</strong> Name the business, channel, message
                type, and expected frequency before a person agrees.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Keep a useful record.</strong> Store what the person
                agreed to receive. Record when and where they agreed.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>Explain how to stop.</strong> Make the opt-out path easy
                to find and use. Do not hide it behind several steps.
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                <strong>Stop future sends.</strong> When someone asks to stop,
                block future messages from every list and tool. Also stop every
                automated step that can send a message.
              </p>
            </li>
            <li>
              <span>05</span>
              <p>
                <strong>Check each country.</strong> Consent and quiet hours can
                change by place and purpose. So can message rules and any
                registration or identity needs.
              </p>
            </li>
          </ol>
          <p>
            Twilio&apos;s messaging policy requires prior express consent for its
            service and a simple opt-out path. WhatsApp Business requires an
            opt-in and says businesses must honor requests to stop. These are
            provider rules, not a full legal checklist.
          </p>
        </section>

        <section id="cost-parts" className="anchor-target">
          <p className="eyebrow">Do not compare one headline price</p>
          <h2>Add the full cost for your country and the number and types of messages you plan to send.</h2>
          <div className="answer-formula agent-cost-formula" aria-label="Messaging cost parts">
            <span>Number or account</span>
            <i>+</i>
            <span>Messages</span>
            <i>+</i>
            <span>Registration</span>
            <i>+</i>
            <span>Gateway or API</span>
            <i>+</i>
            <span>Support work</span>
            <strong>= channel cost</strong>
          </div>
          <p>
            Also include failed-message handling, replies, media, logs, data
            storage, and the staff time needed for consent and support. Check the
            current provider and platform pages because prices and rules change.
          </p>
        </section>

        <section id="ai-agent-connection" className="anchor-target">
          <p className="eyebrow">When an agent replies</p>
          <h2>Do not let the AI decide who may receive messages.</h2>
          <div className="agent-flow" aria-label="Messaging channel and AI agent flow">
            <div>
              <span>CHANNEL</span>
              <strong>SMS or WhatsApp</strong>
              <small>Receives an allowed message</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>CONTROL</span>
              <strong>Gateway and policy checks</strong>
              <small>Checks who may receive messages and who asked to stop</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>AGENT</span>
              <strong>Model and limited tools</strong>
              <small>Builds an approved reply</small>
            </div>
          </div>
          <p>
            Do not ask the AI model to remember who opted out. Keep permission
            and stop requests in one system that every sending tool checks. Save
            useful error details, but never put private messages or secret keys
            in public logs.
          </p>
          <PageNextStep href={whatsappHubPath} label="Compare ways to connect a WhatsApp AI agent" />
        </section>

        <section id="decision-check" className="anchor-target">
          <p className="eyebrow">Five questions</p>
          <h2>Choose only after you can answer these.</h2>
          <ol className="decision-question-list">
            <li><span>01</span><p><strong>Where did the person agree?</strong> Keep proof of the exact channel and message type.</p></li>
            <li><span>02</span><p><strong>Does the person use this channel?</strong> A phone number does not prove WhatsApp use or message permission.</p></li>
            <li><span>03</span><p><strong>What type of message do you need?</strong> Decide whether plain text is enough or whether the conversation needs pictures, video, or other media.</p></li>
            <li><span>04</span><p><strong>How can the person stop?</strong> Test the full opt-out path before sending a campaign.</p></li>
            <li><span>05</span><p><strong>Who handles failure?</strong> Name the person who watches delivery errors and replies. They also handle complaints and policy changes.</p></li>
          </ol>
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">What supports this comparison</p>
          <h2>Read the rules behind this comparison.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li>
                <ExternalSourceLink href="https://www.twilio.com/docs/glossary/what-is-an-sms-short-message-service">
                  Twilio: what SMS is
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://www.twilio.com/en-us/legal/messaging-policy">
                  Twilio Messaging Policy
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out">
                  Twilio Advanced Opt-Out guide
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
              Sources checked August 26, 2026. We did not test delivery, open
              rate, speed, price, or carrier coverage. Rules differ by country,
              provider, sender type, and message purpose. This is general
              information, not legal advice.
            </p>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>SMS and WhatsApp questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Choose the message job first</p>
            <h2>Make the channel decision with five clear checks.</h2>
            <p className="pilot-final-copy">
              Check permission, channel use, message type, how people can stop,
              and who handles a failed message.
            </p>
          </div>
          <Link className="button button-accent" href="#decision-check">
            Review the five questions
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
