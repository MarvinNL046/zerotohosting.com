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

export const metadata = createPageMetadata({
  title: "How to Set Up VoidFix SMS on an Android Phone",
  description:
    "Set up VoidFix SMS on Android: install the app linked from VoidFix's own guide, add a device, scan its private QR code, start the service, and test one allowed message.",
  path: publicPageFrontmatter.setUpVoidfixSmsGuide.path,
});

const toc = [
  ["quick-answer", "Quick answer"],
  ["what-you-need", "What you need"],
  ["setup-steps", "Setup steps"],
  ["prices-and-costs", "Plan and costs"],
  ["no-a2p", "What no A2P means"],
  ["test-and-opt-out", "Test and opt out"],
  ["privacy-and-security", "Privacy and security"],
  ["sources-and-limits", "Sources and limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const setupSteps = [
  {
    title: "Open VoidFix's device guide on the phone",
    text: "Use VoidFix's current Device Connection page. Download the Android app only from the link in that guide. Do not use a copied download link.",
  },
  {
    title: "Install the downloaded Android app",
    text: "Find the downloaded app file, open it, and read each Android warning before installing. Stop if the file did not come from the VoidFix guide you opened.",
  },
  {
    title: "Open the VoidFix Gateway app",
    text: "Start the installed app. Keep the phone and SIM for this setup under the named owner's control.",
  },
  {
    title: "Add a device in the dashboard",
    text: "Sign in to the VoidFix SMS dashboard, open Devices & SIMs, and choose Add Device. Check the account before creating the device entry.",
  },
  {
    title: "Scan the private device QR code",
    text: "Use the Android app to scan the QR code shown for the new device. Treat the code like a login secret.",
  },
  {
    title: "Review the Android permissions",
    text: "VoidFix's guide includes a phone-permissions step. Read every request and continue only when your organization accepts it.",
  },
  {
    title: "Start the phone service",
    text: "Use the current VoidFix app screen to start the phone service. App labels can change, so follow the live device guide.",
  },
  {
    title: "Check the device and phone number",
    text: "Return to Devices & SIMs and confirm that the device appears with the correct phone number. If the number is missing, edit the device entry and add it carefully.",
  },
  {
    title: "Test the messages you plan to send",
    text: "Use the phone, SIM, country, and carrier you plan to use. Send one permitted message in each direction. Check that both arrive.",
  },
  {
    title: "Make sure people can stop messages",
    text: "Make the stop method clear and stop messages when the test contact asks. Do this before adding another service or a larger contact list.",
  },
] as const;

const faqs = [
  {
    question: "What do I need for VoidFix SMS?",
    answer:
      "VoidFix's current plan page says each paid SMS setup needs an Android phone and SIM. You also need a carrier plan, coverage, permission from recipients, and a VoidFix plan with enough device capacity.",
  },
  {
    question: "Does VoidFix SMS need A2P or 10DLC registration?",
    answer:
      "VoidFix says this setup does not need A2P or 10DLC, two US registration systems for some business texts. Other rules still apply.",
  },
  {
    question: "Can VoidFix SMS work with every carrier?",
    answer:
      "VoidFix's public pages do not promise that every country, carrier, or sending amount will work. Test the exact phone, SIM, carrier, and country you need.",
  },
  {
    question: "Does the VoidFix price include the phone and SIM plan?",
    answer:
      "Do not assume it does. The Android phone, SIM and carrier plan can cost extra. Data and taxes may also be separate. The same is true for optional add-ons.",
  },
  {
    question: "Did ZeroToHosting test VoidFix SMS delivery?",
    answer:
      "No. We used the listed guides, but we did not personally test installation, carriers, delivery, support, uptime, or security.",
  },
] as const;

export default function SetUpVoidfixSmsGuidePage() {
  const page = publicPageFrontmatter.setUpVoidfixSmsGuide;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: whatsappHubPath, label: "WhatsApp AI agent" },
    { href: voidfixGuidePath, label: "VoidFix Gateway" },
    { href: page.path, label: "Set up VoidFix SMS" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: whatsappHubPath, label: "WhatsApp AI agent" },
          { href: voidfixGuidePath, label: "VoidFix Gateway" },
          { label: "Set up VoidFix SMS" },
        ]}
        eyebrow={
          <>
            Android and SIM setup guide / checked{" "}
            <time dateTime={page.lastModified}>
              {formatPageDate(page.lastModified)}
            </time>
          </>
        }
        title="How to Set Up VoidFix SMS on an Android Phone"
        lede={
          <p>
            VoidFix&apos;s SMS setup uses a real Android phone and SIM. The
            phone sends through its carrier, while VoidFix supplies the
            messaging platform. Install the app from VoidFix&apos;s current device
            guide, add the phone, scan its private QR code, start the service,
            and test one permitted message before adding more devices.
          </p>
        }
        actions={[
          { href: "#setup-steps", label: "See the setup steps" },
        ]}
        trustItems={[
          "You need an Android phone, SIM, and VoidFix's device guide",
          "We did not test carriers or delivery",
          "Text-message rules still apply",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="quick-answer" className="anchor-target">
          <p className="eyebrow">How the setup works</p>
          <h2>The Android phone sends the message.</h2>
          <div className="agent-flow" aria-label="VoidFix SMS setup">
            <div>
              <span>TOOL</span>
              <strong>VoidFix dashboard</strong>
              <small>Starts and tracks messages</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>DEVICE</span>
              <strong>Android phone and SIM</strong>
              <small>Required for each setup</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>NETWORK</span>
              <strong>Mobile carrier</strong>
              <small>Its coverage and rules still matter</small>
            </div>
          </div>
          <p>
            This is not the same as buying SMS from a normal web host. It also
            does not remove the carrier, SIM, consent, opt-out, or local-law
            rules that apply to the sender.
          </p>
        </section>

        <section id="what-you-need" className="anchor-target">
          <p className="eyebrow">Prepare five parts</p>
          <h2>Count every device and every separate cost.</h2>
          <div className="editorial-card-grid">
            {[
              ["01", "Android phone", "A supported phone for each paid SMS setup."],
              ["02", "SIM and carrier plan", "A SIM with the coverage and texting terms you need."],
              ["03", "VoidFix plan", "A current plan with room for the number of devices."],
              ["04", "Permitted test contact", "A person who agreed to receive the test message."],
              ["05", "Named owner", "Someone who checks the phone, SIM, account, opt-outs, and failures."],
            ].map(([number, title, text]) => (
              <article className="editorial-card" key={title}>
                <span className="guide-card-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="method-panel">
            <p>
              <strong>Affiliate link:</strong> We may earn a commission if you buy
              through this link. This does not change our advice. Remember that
              phones, SIMs, carrier plans, and messaging rules are separate. We
              have not tested product quality.
            </p>
            <div className="button-row">
              <PaidAffiliateLink
                className="button button-primary"
                destination="voidfixSmsGateway"
              >
                Open the VoidFix SMS signup
              </PaidAffiliateLink>
            </div>
          </div>
        </section>

        <section id="setup-steps" className="anchor-target">
          <p className="eyebrow">Ten careful steps</p>
          <h2>Start with one phone and one permitted message.</h2>
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
            <span>Use VoidFix&apos;s device guide:</span>
            <ExternalSourceLink href="https://gateway.voidfix.com/device-connection">
              VoidFix Android device connection guide
            </ExternalSourceLink>
          </p>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <p>
              Use only the download link in VoidFix&apos;s own guide. Read every
              Android warning. Stop if you do not understand where the app came
              from or what access it asks for. ZeroToHosting has not checked the
              app file for security.
            </p>
          </div>
        </section>

        <section id="prices-and-costs" className="anchor-target">
          <p className="eyebrow">Count the full setup</p>
          <h2>The VoidFix plan is only one line of the bill.</h2>
          <div className="answer-formula agent-cost-formula" aria-label="VoidFix SMS cost parts">
            <span>VoidFix plan</span>
            <i>+</i>
            <span>Android phone</span>
            <i>+</i>
            <span>SIM and carrier</span>
            <i>+</i>
            <span>Data and add-ons</span>
            <strong>= full setup cost</strong>
          </div>
          <p>
            Choose a plan with enough device capacity. Features and trial terms
            can change. Taxes may change too, so check the current checkout
            before buying. See all listed prices and compare WhatsApp with SMS
            in our VoidFix guide.
          </p>
          <ExternalSourceLink href="https://gateway.voidfix.com/sms-pricing">
            Check current VoidFix SMS pricing
          </ExternalSourceLink>
          <PageNextStep
            href={voidfixGuidePath}
            label="Compare VoidFix prices and products"
          />
        </section>

        <section id="no-a2p" className="anchor-target">
          <p className="eyebrow">What A2P means here</p>
          <h2>‘No A2P registration’ does not mean ‘no rules.’</h2>
          <p>
            A2P and 10DLC are US registration systems for some business texts.
            VoidFix says its real-SIM setup does not need them. You still need
            permission to send messages and must follow carrier rules and the
            law.
          </p>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <div>
              <p>You still need to check:</p>
              <ul>
                <li>clear permission for the type of message;</li>
                <li>an easy opt-out and a working stop process;</li>
                <li>the SIM and carrier plan terms;</li>
                <li>the rules in the sender&apos;s and recipient&apos;s locations;</li>
                <li>the real delivery result for the carrier and country you plan to use.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="test-and-opt-out" className="anchor-target">
          <p className="eyebrow">Test the real job</p>
          <h2>A connected device does not mean messages will arrive.</h2>
          <ol className="decision-question-list">
            <li>
              <span>01</span>
              <p>
                <strong>Use the real carrier and country.</strong> Public pages
                do not prove every combination works.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Test only with permission.</strong> The contact should
                know what you are testing and why.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>Test each needed direction.</strong> Check incoming and
                outgoing SMS. If you need media messages, test that exact media
                type too. We have not tested those results.
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                <strong>Test the stop process.</strong> Remove the contact from
                future sends when that person opts out.
              </p>
            </li>
          </ol>
          <p className="table-limit-note">
            Do not use this setup as the only way to send emergency or
            safety-critical messages. The device or carrier can fail. The
            platform service can also be interrupted.
          </p>
        </section>

        <section id="privacy-and-security" className="anchor-target">
          <p className="eyebrow">The phone can hold private data</p>
          <h2>Check Android access before connecting a real account.</h2>
          <p>
            VoidFix&apos;s privacy policy says its Android app may access SMS
            and storage. It also lists account and device data that it may
            collect. It may collect network data too. Its public pages do not
            clearly say how message text and files are stored or deleted. They
            also do not say how logs are stored or deleted.
          </p>
          <div className="answer-split-grid">
            <article>
              <span className="guide-card-number">PRIVATE</span>
              <h3>Hide account and message data</h3>
              <p>
                Do not publish phone numbers, contact lists, messages, device
                IDs, tokens, passwords, or permanent connection links.
              </p>
            </article>
            <article>
              <span className="guide-card-number">CHECK</span>
              <h3>Ask how the data moves</h3>
              <p>
                Before using sensitive business data, ask what happens to
                message content and details such as its time and sender. Ask
                whether logs exist and which other companies handle the data.
                Confirm storage locations. Find out who can access or delete
                data and how backup copies work.
              </p>
            </article>
          </div>
          <ExternalSourceLink href="https://gateway.voidfix.com/privacy-policy">
            Read the current VoidFix privacy policy
          </ExternalSourceLink>
        </section>

        <section id="sources-and-limits" className="anchor-target">
          <p className="eyebrow">Sources and test limits</p>
          <h2>Sources checked August 26, 2026.</h2>
          <div className="method-panel source-ledger-panel">
            <ul>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/device-connection">
                  VoidFix Android device connection guide
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/sms-pricing">
                  VoidFix SMS pricing and device requirements
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/privacy-policy">
                  VoidFix privacy policy
                </ExternalSourceLink>
              </li>
              <li>
                <ExternalSourceLink href="https://gateway.voidfix.com/terms-and-conditions">
                  VoidFix terms and conditions
                </ExternalSourceLink>
              </li>
            </ul>
            <p>
              We did not personally test the Android app, carriers, delivery,
              stop requests, support, uptime, privacy, or security. VoidFix&apos;s
              guide provides the setup steps and app download, but screens and
              permissions can change. Test the exact country, carrier, incoming
              message, and outgoing message you need.
            </p>
          </div>
          <PageNextStep
            href={voidfixGuidePath}
            label="Compare VoidFix WhatsApp and SMS"
          />
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>VoidFix SMS setup questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Start with one phone</p>
            <h2>Connect one Android device, then test a real message.</h2>
            <p className="pilot-final-copy">
              Follow the ten setup steps with a permitted test contact before
              adding more devices or another integration.
            </p>
          </div>
          <Link className="button button-accent" href="#setup-steps">
            See the setup steps
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
