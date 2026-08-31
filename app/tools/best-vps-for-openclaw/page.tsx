import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

import {
  EditorialFaqList,
  EditorialGuideHero,
  EditorialGuideLayout,
  ExternalSourceLink,
} from "@/components/editorial-guide";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";
import awsLightsailSetup from "@/public/images/guides/best-vps-for-openclaw/aws-lightsail-openclaw-setup-2026-08-25.png";
import digitalOceanSetup from "@/public/images/guides/best-vps-for-openclaw/digitalocean-openclaw-setup-2026-08-25.png";
import hostingerSetup from "@/public/images/guides/best-vps-for-openclaw/hostinger-openclaw-setup-2026-08-25.png";

const aiHostingPath = "/guides/ai-agent-hosting/";

export const metadata = createPageMetadata({
  title: "Best VPS for OpenClaw: 5 hosting options",
  description:
    "Compare five VPS and managed OpenClaw hosting routes. Check setup work, updates, backups, access, and who cares for the server.",
  path: publicPageFrontmatter.bestVpsForOpenClawTool.path,
});

const toc = [
  ["short-answer", "Short answer"],
  ["what-best-means", "What best means"],
  ["openclaw-requirements", "OpenClaw requirements"],
  ["five-routes", "Five setup options"],
  ["setup-screenshots", "Setup screenshots"],
  ["decision-table", "Decision table"],
  ["before-you-pay", "Before you pay"],
  ["method-and-sources", "Sources and test limits"],
  ["frequently-asked-questions", "FAQ"],
] as const;

const providerRoutes = [
  {
    name: "Akamai Connected Cloud / Linode",
    route: "Quick Deploy App",
    answer:
      "Akamai documents a limited OpenClaw user and a web dashboard opened through an encrypted connection with a second password.",
    work:
      "Akamai says it does not manage software or system updates for Quick Deploy Apps.",
    fit:
      "A setup to check when you already use Linode's web control panel and accept routine server care.",
    href: "https://www.akamai.com/cloud/marketplace-docs/guides/openclaw",
  },
  {
    name: "Amazon Lightsail",
    route: "OpenClaw blueprint (ready-made setup)",
    answer:
      "AWS documents a ready-made OpenClaw setup and a step that links the browser to the agent. Its guide also covers protected web access and server snapshots. It uses Amazon Bedrock, an AWS service that connects OpenClaw to an AI model.",
    work:
      "The guide still gives you an update command for SSH, a typed command window that connects securely to the server. Check updates for the server's main system too.",
    fit:
      "A setup to check when you already know AWS, its Bedrock AI service, and its user-access settings.",
    href: "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-quick-start-guide-openclaw.html",
  },
  {
    name: "DigitalOcean",
    route: "Ready-made 1-Click setup or your own VPS",
    answer:
      "DigitalOcean calls its rented virtual server a Droplet. Its ready-made setup includes a separate work area, a step that links the dashboard, and an update command.",
    work:
      "OpenClaw's own DigitalOcean guide says to check ready-made server setups in the app store and the firewall rules that block unwanted connections. Check who made the setup, which OpenClaw version it has, and how it updates.",
    fit:
      "A setup to check when you prefer DigitalOcean and will check which ready-made setup you are using.",
    href: "https://docs.digitalocean.com/products/marketplace/catalog/openclaw/",
  },
  {
    name: "Hostinger",
    route: "Managed 1-Click or self-managed VPS",
    answer:
      "OpenClaw's official Hostinger guide documents a managed path and a VPS path. The VPS guide uses a web control screen called Docker Manager to show activity and restart the app. It also shows how to update it.",
    work:
      "The managed path says Hostinger handles the server platform, the Docker app package, and automatic updates. On the VPS path, you still own any server work that is not listed as managed.",
    fit:
      "A setup to check when reducing setup work matters or when you already use Hostinger.",
    href: "https://docs.openclaw.ai/install/hostinger",
  },
  {
    name: "Vultr",
    route: "Ready-made app",
    answer:
      "Vultr documents a ready-made app. It gives web login details and includes Code Server, a code editor that opens in a browser.",
    work:
      "Its guide does not clearly say who keeps OpenClaw and the operating system updated. Treat that job as unknown until Vultr confirms it.",
    fit:
      "A setup to check when browser-based file and configuration access is useful.",
    href: "https://docs.vultr.com/how-to-use-vultrs-openclaw-marketplace-application",
  },
] as const;

type SetupScreenshot = Readonly<{
  provider: string;
  image: StaticImageData;
  alt: string;
  href: string;
  note: string;
}>;

const setupScreenshots: readonly SetupScreenshot[] = [
  {
    provider: "AWS Lightsail",
    image: awsLightsailSetup,
    alt: "AWS Lightsail guide showing the first OpenClaw setup step and its Amazon Bedrock note.",
    href: "https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-quick-start-guide-openclaw.html",
    note: "The guide shows a ready-made OpenClaw path, Amazon's Bedrock AI service, a browser-linking step, and optional server snapshots.",
  },
  {
    provider: "DigitalOcean",
    image: digitalOceanSetup,
    alt: "DigitalOcean OpenClaw page showing its one-click setup section.",
    href: "https://docs.digitalocean.com/products/marketplace/catalog/openclaw/",
    note: "The provider page shows a 1-Click image and a separate automated setup option.",
  },
  {
    provider: "Hostinger",
    image: hostingerSetup,
    alt: "Hostinger guide showing OpenClaw setup steps in Docker Manager.",
    href: "https://www.hostinger.com/support/how-to-install-openclaw-on-hostinger-vps/",
    note: "The support page shows the Docker Manager catalog setup for an existing VPS.",
  },
] as const;

const faqs = [
  {
    question: "Which OpenClaw VPS is easiest?",
    answer:
      "We did not test which setup is easiest. A managed setup removes more listed server work, but you must still check access protection and updates. Check the backups too.",
  },
  {
    question: "How much RAM should OpenClaw have?",
    answer:
      "RAM is the server’s working memory. OpenClaw lists 1 GB as the absolute minimum and 2 GB or more for extra room. A ready-made setup may need more when it includes extra services or browser tools.",
  },
  {
    question: "Can OpenClaw run on a 1 GB VPS?",
    answer:
      "OpenClaw lists 1 GB as the absolute minimum. That does not promise smooth browser tasks or work across several chat apps.",
  },
  {
    question: "Does the VPS include an AI model?",
    answer:
      "It depends on the setup. AWS documents Bedrock, its AI model service, as the default. Some other setups ask for a secret key that connects to an outside AI service.",
  },
  {
    question: "Should the OpenClaw dashboard be public?",
    answer:
      "OpenClaw's own guidance prefers a private address. Open it through a protected private connection. If you make it public, you must add the right access protection.",
  },
  {
    question: "Are ready-made app-store setups always current?",
    answer:
      "Do not assume a ready-made app-store setup is current. Check who made it, which version it has, how it updates, and which network connections it allows.",
  },
  {
    question: "Did you test these VPS providers?",
    answer:
      "No. This page compares setup instructions. We did not test real speed, uptime, support, or limits under heavy use.",
  },
] as const;

export default function BestVpsForOpenClawPage() {
  const page = publicPageFrontmatter.bestVpsForOpenClawTool;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: publicPageFrontmatter.toolsHub.path, label: "Tools" },
    { href: page.path, label: "Best VPS for OpenClaw" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EditorialGuideHero
        breadcrumbs={[
          { href: publicPageFrontmatter.toolsHub.path, label: "Tools" },
          { label: "Best VPS for OpenClaw" },
        ]}
        eyebrow={
          <>
            Updated{" "}
            <time dateTime={page.lastModified}>{formatPageDate(page.lastModified)}</time>
          </>
        }
        title="What is the best VPS for OpenClaw?"
        lede={
          <p>
            OpenClaw hosting can be a managed setup or a VPS, which is a virtual
            server you rent. No single route fits every OpenClaw setup. A ready-made setup can remove several install steps. A
            self-managed VPS gives you more control, but you must update OpenClaw,
            protect access, and make backups. Choose a setup with work you can
            handle. Do not look only at the first price.
          </p>
        }
        actions={[
          { href: "#five-routes", label: "Compare the five setups" },
          { href: aiHostingPath, label: "Start with AI agent hosting", quiet: true },
        ]}
        trustItems={[
          "Providers are in alphabetical order",
          "We did not rent or speed-test these servers",
          "Prices are left out because they change",
        ]}
      />

      <EditorialGuideLayout toc={toc}>
        <section id="short-answer" className="anchor-target">
          <p className="eyebrow">The useful answer</p>
          <h2>Choose who will manage the server before you choose a company.</h2>
          <div className="avoid-panel compact-advice-panel">
            <CheckCircle2 size={24} aria-hidden="true" />
            <p>
              If server work is new to you, choose a setup that handles jobs you
              cannot do yet. If you can manage a server, a self-managed VPS gives
              you more control. We did not test which setup feels easiest, and
              neither choice is a tested winner in every setup.
            </p>
          </div>
        </section>

        <section id="what-best-means" className="anchor-target">
          <p className="eyebrow">Six decision points</p>
          <h2>The best choice depends on what you need it to do.</h2>
          <div className="editorial-card-grid best-criteria-grid">
            {[
              ["Setup work", "How many install and dashboard-linking steps are left for you?"],
              ["Private access", "How will you keep strangers out of the dashboard?"],
              ["Updates", "Who updates OpenClaw and the operating system?"],
              ["Backups", "Can you save and restore the settings and work files?"],
              ["AI service", "Which outside AI service and secret key does the setup expect?"],
              ["Moving out", "Can you take your settings and work files to another server later?"],
            ].map(([title, text], index) => (
              <article className="editorial-card" key={title}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="openclaw-requirements" className="anchor-target">
          <p className="eyebrow">Start with OpenClaw itself</p>
          <h2>Treat the minimum as a starting point.</h2>
          <p>
            A vCPU is a virtual processor. RAM is working memory, and disk is
            storage. OpenClaw&apos;s current FAQ gives 1 vCPU, 1 GB RAM, and about 500 MB of
            disk as an absolute minimum. It points to 1–2 vCPU and 2 GB or more
            RAM for extra room. A provider setup can ask for more when it adds
            extra services, separate work areas, dashboards, or browser tools.
          </p>
          <div className="avoid-panel compact-advice-panel">
            <AlertTriangle size={24} aria-hidden="true" />
            <p>
              A minimum can mean “the software starts.” It does not prove that
              your channels, browser tasks, and tools will feel fast.
            </p>
          </div>
        </section>

        <section id="five-routes" className="anchor-target">
          <p className="eyebrow">Alphabetical, not ranked</p>
          <h2>Five hosting companies show how to set up OpenClaw.</h2>
          <p>
            We checked these setup guides on August 25, 2026. We did not test
            the servers for speed, support, or uptime.
          </p>
          <div className="provider-route-list">
            {providerRoutes.map((provider, index) => (
              <article className="provider-route-card" key={provider.name}>
                <header>
                  <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{provider.name}</h3><p>{provider.route}</p></div>
                </header>
                <dl>
                  <div><dt>Setup shown</dt><dd>{provider.answer}</dd></div>
                  <div><dt>What you still need to check</dt><dd>{provider.work}</dd></div>
                  <div><dt>May fit when</dt><dd>{provider.fit}</dd></div>
                </dl>
                <ExternalSourceLink href={provider.href}>Read the current setup guide</ExternalSourceLink>
                <p className="provider-card-limit">
                  Official documentation checked August 25, 2026. This card is
                  not a speed, support, or uptime test.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="setup-screenshots" className="anchor-target">
          <p className="eyebrow">See the setup pages</p>
          <h2>See three OpenClaw setup pages.</h2>
          <p>
            These screenshots were saved on August 25, 2026, so the pages may
            look different now. They show where setup starts, not how fast or
            reliable each host is.
          </p>
          <div className="provider-evidence-list">
            {setupScreenshots.map((source, index) => (
              <article className="provider-evidence-card" key={source.provider}>
                <header className="provider-evidence-header">
                  <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{source.provider} setup page</h3>
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
                    Setup page saved August 25, 2026. This is an example, not our
                    speed, support, or uptime test.
                  </figcaption>
                </figure>
                <div className="provider-evidence-copy">
                  <h4>What this page shows</h4>
                  <p>{source.note}</p>
                  <p className="provider-source-link">
                    <span>View the current page:</span>
                    <ExternalSourceLink href={source.href}>Open the setup guide</ExternalSourceLink>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="decision-table" className="anchor-target">
          <p className="eyebrow">Quick guide</p>
          <h2>Start with the setup that fits what you already use.</h2>
          <div className="comparison-scroll" role="region" aria-label="OpenClaw VPS setup comparison" tabIndex={0}>
            <table className="comparison-table">
              <thead><tr><th scope="col">If this matters most</th><th scope="col">Setup to look at first</th></tr></thead>
              <tbody>
                <tr><th scope="row">The host says it manages the server and automatic updates</th><td>Hostinger managed 1-Click</td></tr>
                <tr><th scope="row">Amazon Bedrock is already part of your setup</th><td>AWS Lightsail</td></tr>
                <tr><th scope="row">You prefer DigitalOcean VPSs</th><td>DigitalOcean, after checking the ready-made setup</td></tr>
                <tr><th scope="row">A browser-based code editor matters</th><td>Vultr</td></tr>
                <tr><th scope="row">You already use Linode&apos;s web control panel and accept maintenance</th><td>Akamai Connected Cloud</td></tr>
                <tr><th scope="row">You want full control</th><td>A self-managed VPS using the official OpenClaw installer</td></tr>
              </tbody>
            </table>
          </div>
          <p className="table-limit-note">
            These starting points come from each company’s setup guide. We did
            not rank or test the hosts.
          </p>
        </section>

        <section id="before-you-pay" className="anchor-target">
          <p className="eyebrow">Nine checks</p>
          <h2>Write down the missing answers before checkout.</h2>
          <ol className="buying-check-grid openclaw-buying-grid">
            {[
              "Who updates OpenClaw?",
              "Who updates the operating system?",
              "How is dashboard access protected?",
              "Is a backup included, and can you restore it?",
              "Which OpenClaw version is installed?",
              "Is the model included or billed separately?",
              "Is there enough RAM for your tools?",
              "Can you move the saved settings and work files later?",
              "What is the current renewal cost?",
            ].map((check, index) => (
              <li key={check}>
                <span className="guide-card-number">{String(index + 1).padStart(2, "0")}</span>
                <p><strong>{check}</strong></p>
              </li>
            ))}
          </ol>
        </section>

        <section id="method-and-sources" className="anchor-target">
          <p className="eyebrow">Sources and test limits</p>
          <h2>Read the current setup guides before you choose.</h2>
          <div className="method-panel source-ledger-panel">
            <p>
              We checked these pages on August 25, 2026. We compared setup,
              access, updates, backups, and AI services. We did not test speed,
              uptime, support, account security, or busy workloads. The companies
              are listed in alphabetical order.
            </p>
            <ul>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/vps">OpenClaw Linux server guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/help/faq-first-run">OpenClaw first-run FAQ</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/install/hostinger">OpenClaw Hostinger guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.openclaw.ai/install/digitalocean">OpenClaw DigitalOcean guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.digitalocean.com/products/marketplace/catalog/openclaw/">DigitalOcean catalog guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.vultr.com/how-to-use-vultrs-openclaw-marketplace-application">Vultr Marketplace guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-quick-start-guide-openclaw.html">AWS Lightsail guide</ExternalSourceLink></li>
              <li><ExternalSourceLink href="https://www.akamai.com/cloud/marketplace-docs/guides/openclaw">Akamai Quick Deploy guide</ExternalSourceLink></li>
            </ul>
          </div>
        </section>

        <section id="frequently-asked-questions" className="anchor-target">
          <p className="eyebrow">Straight answers</p>
          <h2>OpenClaw VPS questions.</h2>
          <EditorialFaqList faqs={faqs} />
        </section>
      </EditorialGuideLayout>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Your next check</p>
            <h2>Which setup leaves you with work you can handle?</h2>
            <p className="pilot-final-copy">
              Read each setup guide. Write down who handles updates. Also note
              who protects access and makes backups.
            </p>
          </div>
          <Link className="button button-accent" href="#five-routes">
            Compare the five setups <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
