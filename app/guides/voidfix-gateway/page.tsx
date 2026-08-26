import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

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

const aiHostingPath = "/guides/ai-agent-hosting/";
const whatsappHubPath = "/guides/whatsapp-ai-agent/";
const whatsappSetupPath = "/guides/connect-whatsapp-to-voidfix/";
const highLevelSetupPath = "/guides/connect-voidfix-to-gohighlevel/";
const smsSetupPath = "/guides/set-up-voidfix-sms/";

export const metadata = createPageMetadata({
  title: "VoidFix Gateway Explained: WhatsApp, SMS and Tradeoffs",
  description:
    "Learn how the VoidFix WhatsApp and SMS options work, what each one needs, current provider prices, and which limits to check before signing up.",
  path: publicPageFrontmatter.voidfixGatewayGuide.path,
});

const toc = [
  ["quick-answer", "Quick answer"],
  ["two-routes", "The two options"],
  ["side-by-side", "WhatsApp vs SMS"],
  ["prices", "Prices and extra costs"],
  ["tradeoffs", "Important tradeoffs"],
  ["privacy-and-security", "Privacy and security"],
  ["setup-guides", "Setup guides"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const comparisonRows = [
  [
    "Connection",
    "A WhatsApp account linked by a QR code",
    "An Android phone and SIM",
  ],
  [
    "Phone requirement",
    "VoidFix's guide says the linked phone must stay online",
    "Each paid setup needs its own Android phone and SIM",
  ],
  [
    "Uses Meta's official API?",
    "No. This is a linked-device setup",
    "Not a WhatsApp connection",
  ],
  [
    "Rules still apply",
    "WhatsApp rules, consent, opt-out requests, and local law",
    "Consent, opt-out requests, carrier and SIM terms, and local law",
  ],
  [
    "What ZeroToHosting checked",
    "We read VoidFix's setup pages. We did not send a live message.",
    "We read VoidFix's setup pages. We did not test a carrier or send a live message.",
  ],
] as const;

const faqs = [
  {
    question: "What is VoidFix Gateway?",
    answer:
      "VoidFix sells two different messaging options. Its WhatsApp setup links an existing WhatsApp account by QR code. Its SMS setup uses an Android phone and SIM.",
  },
  {
    question: "Is VoidFix the official WhatsApp Business API?",
    answer:
      "VoidFix shows a QR-code link to an existing WhatsApp account. Meta's WhatsApp Business API uses a different account and setup process, so this guide does not treat VoidFix as that API.",
  },
  {
    question: "Does ZeroToHosting recommend VoidFix?",
    answer:
      "No. We explain the setup, listed prices, and questions to ask. We have not personally tested delivery, reliability, support, or security.",
  },
  {
    question: "Does VoidFix SMS remove all A2P rules?",
    answer:
      "No. VoidFix says its real-SIM setup does not need A2P or 10DLC, two US registration systems for some business texts. You still need permission and must follow carrier rules, SIM terms, and local laws.",
  },
  {
    question: "Can I use VoidFix for emergency messages?",
    answer:
      "Do not use this setup as the only way to send emergency or safety-critical messages. Services and device connections can stop working.",
  },
] as const;

export default function VoidfixGatewayGuidePage() {
  const page = publicPageFrontmatter.voidfixGatewayGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: aiHostingPath, label: "AI agent hosting" },
    { href: whatsappHubPath, label: "WhatsApp AI agent" },
    { href: page.path, label: "VoidFix Gateway" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: aiHostingPath, label: "AI agent hosting" },
          { href: whatsappHubPath, label: "WhatsApp AI agent" },
          { label: "VoidFix Gateway" },
        ]}
        eyebrow={
          <>
            Updated{" "}
            <time dateTime={page.lastModified}>
              {formatPageDate(page.lastModified)}
            </time>
          </>
        }
        title="What Is VoidFix Gateway?"
        lede={
          <p>
            VoidFix offers two separate messaging products. One links a
            WhatsApp account with a QR code. The other sends SMS through an
            Android phone and SIM. They use different hardware and accounts, so
            the checks are different too.
          </p>
        }
        actions={[
          { href: "#side-by-side", label: "Compare the two options" },
        ]}
        trustItems={[
          "See what VoidFix says and what we have not tested",
          "We did not test delivery or uptime",
          "WhatsApp and SMS need different setups",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="quick-answer" className="anchor-target">
          <p className="eyebrow">The short version</p>
          <h2>VoidFix is a messaging connection, not web hosting.</h2>
          <p>
            A messaging gateway passes messages between a phone or messaging
            account and another tool. It does not host your website or AI agent.
            You may use it beside an agent or a tool that stores customer
            details, but those are separate parts of the setup.
          </p>
          <div className="answer-split-grid">
            <article>
              <span className="guide-card-number">WHATSAPP</span>
              <h3>Linked-device setup</h3>
              <p>
                VoidFix&apos;s guide creates a QR code. You scan it from
                WhatsApp&apos;s Linked Devices screen. This is different from
                Meta&apos;s WhatsApp Business API setup process.
              </p>
              <Link className="text-link" href={whatsappSetupPath}>
                Read the WhatsApp setup guide
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <span className="guide-card-number">SMS</span>
              <h3>Android phone and SIM setup</h3>
              <p>
                VoidFix&apos;s current plan page says each paid SMS setup needs
                an Android phone and SIM. The phone, SIM plan, and carrier are
                separate from the VoidFix platform plan.
              </p>
              <Link className="text-link" href={smsSetupPath}>
                Read the SMS setup guide
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          </div>

        </section>

        <section id="two-routes" className="anchor-target">
          <p className="eyebrow">Do not mix the products</p>
          <h2>The WhatsApp and SMS setups need different things.</h2>
          <div className="editorial-card-grid">
            <article className="editorial-card">
              <span className="guide-card-number">01</span>
              <h3>WhatsApp starts with an existing account</h3>
              <p>
                VoidFix&apos;s documentation shows a QR-code setup through
                Linked Devices. Its guide says the phone must stay online for
                the connection to remain active. Return to the Host area and
                look for a Connected or Active status.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">02</span>
              <h3>SMS starts with real phone hardware</h3>
              <p>
                Each paid setup needs an Android phone, a SIM, and a carrier
                plan. Coverage, carrier rules, phone permissions, and sending
                limits can change the result. VoidFix does not promise that
                every country or carrier will work. Test the exact one you need.
              </p>
            </article>
            <article className="editorial-card">
              <span className="guide-card-number">03</span>
              <h3>Both options leave work with the sender</h3>
              <p>
                You remain responsible for permission, message content, stop
                requests, local law, and WhatsApp or carrier rules. A gateway
                does not move that responsibility to ZeroToHosting or VoidFix.
              </p>
            </article>
          </div>
        </section>

        <section id="side-by-side" className="anchor-target">
          <p className="eyebrow">At a glance</p>
          <h2>Compare the connection before you compare the price.</h2>
          <div
            className="comparison-scroll"
            role="region"
            aria-label="VoidFix WhatsApp and SMS option comparison"
            tabIndex={0}
          >
            <table className="comparison-table three-column-table">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">VoidFix WhatsApp</th>
                  <th scope="col">VoidFix SMS</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([question, whatsapp, sms]) => (
                  <tr key={question}>
                    <th scope="row">{question}</th>
                    <td>{whatsapp}</td>
                    <td>{sms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-limit-note">
            Last checked August 26, 2026. We read the setup and price pages, but
            we did not test carriers, delivery, support, uptime, or security.
          </p>
        </section>

        <section id="prices" className="anchor-target">
          <p className="eyebrow">Prices checked August 26, 2026</p>
          <h2>The platform fee is not the whole cost.</h2>
          <div className="answer-split-grid product-answer-grid">
            <article>
              <span className="guide-card-number">WHATSAPP</span>
              <h3>Prices listed by VoidFix</h3>
              <p>
                Checked August 26, 2026: VoidFix lists Starter at $19 per month
                for one account, Growth at $79 for five accounts, and Business
                at $149 for ten accounts.
              </p>
              <ExternalSourceLink href="https://gateway.voidfix.com/whatsapp-pricing">
                Check current WhatsApp pricing
              </ExternalSourceLink>
            </article>
            <article>
              <span className="guide-card-number">SMS</span>
              <h3>Prices listed by VoidFix</h3>
              <p>
                Checked August 26, 2026: VoidFix lists Lite at $49 per month for
                up to five devices, Starter at $99 for up to twenty, and
                Professional at $199 for up to fifty.
              </p>
              <ExternalSourceLink href="https://gateway.voidfix.com/sms-pricing">
                Check current SMS pricing
              </ExternalSourceLink>
            </article>
          </div>
          <p>
            Plan features can change, as can taxes and trial terms. Check the
            live checkout before buying. SMS users may also need phones and
            SIMs. Carrier plans, data and optional add-ons may cost extra.
            VoidFix&apos;s current terms say plans renew each month until you
            cancel. They also say paid plans are usually not refundable. Local
            law may give you more rights.
          </p>
          <PageNextStep
            href="#setup-guides"
            label="Open the setup guide for your option"
            prefix="After you choose an option"
          />
        </section>

        <section id="tradeoffs" className="anchor-target">
          <p className="eyebrow">Questions to ask before you buy</p>
          <h2>A feature list does not show how well a service will work.</h2>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <div>
              <p>
                We did not test message delivery, reconnecting, support, uptime,
                or large campaigns. VoidFix&apos;s public pages do not answer every
                question about carriers, countries, sending limits, or how
                private data is handled.
              </p>
              <ul>
                <li>
                  VoidFix markets messaging automation, but its general terms
                  also restrict automated system use such as scripts that send
                  messages. Ask VoidFix which built-in actions are allowed.
                </li>
                <li>
                  VoidFix says its SMS setup does not need A2P or 10DLC
                  registration, two US business-text registration systems. That
                  does not mean there are no rules.
                </li>
                <li>
                  A linked-device setup can still fail or be limited. It is not
                  the same as Meta&apos;s Business Platform.
                </li>
                <li>
                  Do not use either setup as the only way to send emergency or
                  safety-critical messages.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="privacy-and-security" className="anchor-target">
          <p className="eyebrow">Protect accounts and people</p>
          <h2>Ask where messages and account data go.</h2>
          <p>
            VoidFix says it may collect account, device, network, and
            app-permission data. Its public pages do not clearly say whether
            message text, files, or logs are stored, which other companies
            handle the data, or how deletion works for each option. Do not use
            sensitive data until your organization has checked these points.
          </p>
          <ol className="decision-question-list">
            <li>
              <span>01</span>
              <p>
                <strong>Keep secrets private.</strong> Never publish QR codes,
                API keys, tokens, passwords, phone numbers, or customer
                messages.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Use a clean test account.</strong> Mask account and
                location details in notes or images. Rotate any exposed secret.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>Start with permission.</strong> Only contact people who
                agreed to receive that kind of message. Make opting out easy.
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                <strong>Check the rules for both places.</strong> Laws can depend
                on where you are and where the recipient is.
              </p>
            </li>
          </ol>
          <div className="method-panel">
            <p>
              <strong>Affiliate links:</strong> We may earn a commission if you buy
              through a link below. This does not change our advice. We have not
              tested delivery, uptime, support, or security, so check whether the
              service fits your needs before paying.
            </p>
            <div className="button-row">
              <PaidAffiliateLink
                className="button button-primary"
                destination="voidfixWhatsappGateway"
              >
                Open the VoidFix WhatsApp signup
              </PaidAffiliateLink>
              <PaidAffiliateLink
                className="button button-quiet"
                destination="voidfixSmsGateway"
              >
                Open the VoidFix SMS signup
              </PaidAffiliateLink>
            </div>
          </div>
        </section>

        <section id="setup-guides" className="anchor-target">
          <p className="eyebrow">Your next step</p>
          <h2>Open the guide that matches your channel.</h2>
          <div className="answer-split-grid product-answer-grid">
            <article>
              <span className="guide-card-number">WHATSAPP</span>
              <h3>Link a WhatsApp account</h3>
              <p>
                Follow the customer-link and QR steps. Keep every QR code and
                account detail private.
              </p>
              <Link className="text-link" href={whatsappSetupPath}>
                Open the WhatsApp setup
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <span className="guide-card-number">SMS</span>
              <h3>Connect an Android phone</h3>
              <p>
                Install the app and connect one Android device. Then review
                permissions and run a test with that phone and SIM.
              </p>
              <Link className="text-link" href={smsSetupPath}>
                Open the SMS setup
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
          <PageNextStep
            href={highLevelSetupPath}
            label="Connect a working VoidFix WhatsApp account to GoHighLevel"
            prefix="Already connected to WhatsApp?"
          />
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and test limits</p>
          <h2>What we checked—and what we did not test.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/whatsapp-device-connection">
                  VoidFix WhatsApp device connection guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/whatsapp-pricing">
                  VoidFix WhatsApp pricing
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/sms-pricing">
                  VoidFix SMS pricing
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/terms-and-conditions">
                  VoidFix terms and conditions
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/privacy-policy">
                  VoidFix privacy policy
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://whatsappbusiness.com/policy/">
                  WhatsApp Business Messaging Policy
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://www.whatsapp.com/legal/meta-terms-whatsapp-business">
                  Meta Terms for WhatsApp Business
                </ExternalSourceLink>
              </li>
            </ul>
            <p>
              We did not personally test account setup, carriers, delivery,
              support, uptime, or security. Check the latest product pages and
              rules before choosing.
            </p>
          </div>
          <PageNextStep
            href={whatsappHubPath}
            label="Compare three ways to connect a WhatsApp AI agent"
          />
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>VoidFix Gateway questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Choose the option first</p>
            <h2>WhatsApp and SMS do not solve the same job.</h2>
            <p className="pilot-final-copy">
              Read the setup guide for the service you need. Check the hardware
              and account before paying. Also read the messaging rules and
              privacy policy.
            </p>
          </div>
          <Link className="button button-accent" href="#setup-guides">
            Open the matching setup
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
