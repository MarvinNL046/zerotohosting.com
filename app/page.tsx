import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Calculator,
  Check,
  Compass,
  FileSearch,
  Gauge,
  Layers3,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { HomeJsonLd } from "@/components/json-ld";
import { HostingStackVisual } from "@/components/hosting-stack-visual";
import { createPageMetadata } from "@/lib/metadata";
import { publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "Choose a web hosting type that may fit",
  description:
    "Not sure what hosting you need? Get a hosting type that may fit, or learn what you must decide first.",
  path: publicPageFrontmatter.home.path,
});

const decisionAxes = [
  {
    number: "01",
    icon: Layers3,
    title: "What your site runs on",
    description:
      "First choose how you will build the site: a site builder, WordPress, ready-made files, another website editor, or a custom app.",
    prompt: "What does your site need to run?",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Who cares for the server",
    description:
      "Choose whether your team or the hosting company will update, watch, back up, and fix the server.",
    prompt: "Who will care for the server?",
  },
  {
    number: "03",
    icon: Gauge,
    title: "Signs you may need more power",
    description:
      "A slow page does not always mean you need a bigger plan. Find the cause before you pay for more.",
    prompt: "What do your tests show?",
  },
];

const routes = [
  ["Hosting included with a site builder", "Your website builder already hosts the site, so you may not need a second hosting plan."],
  ["Shared or managed web hosting", "These plans can leave most server work to the hosting company. Check the exact tasks in the plan."],
  ["Managed WordPress hosting", "These plans may add WordPress help and tools. Check exactly what the plan includes."],
  ["Static hosting", "The host sends ready-made site files without keeping a full server running."],
  ["Managed app platform", "This can run a custom app while the service handles some server work. Check the exact split."],
  ["VPS (a rented virtual server) or cloud server", "These plans give more server control. Check whether the plan includes server care or leaves it to your team."],
] as const;

const tickerItems = [
  "WHAT YOU RUN",
  "WHO MANAGES IT",
  "SIGNS YOU MAY NEED MORE POWER",
  "A CLEAR RESULT",
] as const;

const faqs = [
  {
    question: "What type of hosting do I need for a new website?",
    answer:
      "Start with the tool you will use to build the site. A website builder may include hosting. WordPress needs hosting that can run WordPress. A static site can use simple static hosting. Then decide who will care for the server and how much power you need.",
  },
  {
    question: "Is shared hosting always the beginner option?",
    answer:
      "No. Shared hosting can work for a normal website that needs no special server access. A website builder or static host can also work when it meets every need.",
  },
  {
    question: "Do I need a VPS (a virtual server) when my site feels slow?",
    answer:
      "Not yet. A page can be slow because of code, a database, outside scripts, large images, or visitor location. Test where the delay starts. Also check your host's limits before you take on a server that your team must manage.",
  },
  {
    question: "Does the chooser recommend providers or plans?",
    answer:
      "No. It suggests a hosting type or tells you what to decide first. It gives reasons and checks, but does not rank companies. Prices or ratings do not change its results. Affiliate payments do not change them either.",
  },
];

export default function HomePage() {
  return (
    <main id="main-content">
      <HomeJsonLd />

      <section className="home-hero">
        <div className="hero-grid page-shell">
          <div className="hero-copy">
            <p className="eyebrow">Choose a hosting type before a company</p>
            <h1>Not sure which web hosting you need?</h1>
            <p className="hero-lede">
              Answer simple questions about your website. We will show a hosting type
              that may fit, or tell you what to decide first. We do not rank hosting
              companies.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/tools/hosting-type-chooser/">
                Help me choose hosting <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="button button-quiet" href="/guides/types-of-web-hosting/">
                Learn the hosting types
              </Link>
            </div>
            <ul className="trust-list" aria-label="What this tool does">
              <li><Check size={15} aria-hidden="true" /> No company rankings</li>
              <li><Check size={15} aria-hidden="true" /> Affiliate links are clearly labeled</li>
              <li><Check size={15} aria-hidden="true" /> “Not sure” stays “not sure”</li>
            </ul>
          </div>
          <HostingStackVisual />
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy}>
              {tickerItems.map((item) => (
                <span className="ticker-item" key={item}>
                  <span>{item}</span>
                  <i>•</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="content-section page-shell decision-section" aria-labelledby="decision-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Start with your website</p>
            <h2 id="decision-heading">Three things decide your hosting type.</h2>
          </div>
          <p>
            Hosting plan names can be confusing. These three simple questions help
            you narrow down the choice.
          </p>
        </div>
        <div className="axis-grid">
          {decisionAxes.map((axis) => {
            const Icon = axis.icon;
            return (
              <article className="axis-card" key={axis.number}>
                <div className="axis-card-top">
                  <span>{axis.number}</span>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3>{axis.title}</h3>
                <p>{axis.description}</p>
                <small>{axis.prompt}</small>
              </article>
            );
          })}
        </div>
      </section>

      <section className="tool-showcase" aria-labelledby="tool-heading">
        <div className="page-shell tool-showcase-grid">
          <div className="tool-copy">
            <p className="eyebrow light-eyebrow">Free decision tool</p>
            <h2 id="tool-heading">Answer eight questions. Get a clear starting point.</h2>
            <p>
              You do not need an account. We do not ask you to guess your traffic or
              budget. We use facts that can change the type of hosting you need.
            </p>
            <ul className="check-list light-list">
              <li><Check size={17} aria-hidden="true" /> A hosting type or clear next step</li>
              <li><Check size={17} aria-hidden="true" /> Simple reasons and checks</li>
              <li><Check size={17} aria-hidden="true" /> A backup option and signs to check again</li>
            </ul>
            <Link className="button button-accent" href="/tools/hosting-type-chooser/">
              Start the chooser <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="tool-terminal" role="group" aria-label="Example result from the tool">
            <div className="terminal-header">
              <span>HOSTING TYPE PREVIEW</span>
              <span className="status-dot">ready</span>
            </div>
            <div className="terminal-body">
              <p className="terminal-label">Example only</p>
              <h3>Static hosting</h3>
              <p>
                This site uses ready-made files. It does not need a program that
                stays running on a server.
              </p>
              <div className="terminal-rule" />
              <dl>
                <div><dt>Server care</dt><dd>Handled by the hosting company</dd></div>
                <div><dt>More power</dt><dd>Only after tests show a need</dd></div>
                <div><dt>How sure?</dt><dd><span className="confidence-pill">High</span></dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section page-shell" aria-labelledby="routes-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Common hosting choices</p>
            <h2 id="routes-heading">Six choices for different needs.</h2>
          </div>
          <Link className="text-link" href="/guides/types-of-web-hosting/">
            Learn about every type <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="route-list">
          {routes.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section page-shell topic-hub-section" aria-labelledby="topic-hubs-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Go one level deeper</p>
            <h2 id="topic-hubs-heading">Costs for websites. Hosting for AI agents.</h2>
          </div>
          <p>
            Use the website path when you are building pages. Use the agent path
            when software must stay running and do work.
          </p>
        </div>
        <div className="topic-hub-grid">
          <article className="topic-hub-card">
            <span className="topic-hub-icon"><Calculator size={24} aria-hidden="true" /></span>
            <p className="eyebrow">Website costs</p>
            <h3>See the full bill before checkout.</h3>
            <p>Separate the first year from renewal. Then add your own numbers.</p>
            <Link className="topic-hub-primary" href="/guides/how-much-does-web-hosting-cost/">
              Start with the cost guide <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p className="topic-hub-more">Then explore</p>
            <ul aria-label="More website cost pages">
              <li><Link href="/guides/website-builder-vs-web-hosting/">Website builder vs web hosting</Link></li>
              <li><Link href="/tools/website-cost-calculator/">Website cost calculator</Link></li>
            </ul>
          </article>
          <article className="topic-hub-card topic-hub-card-dark">
            <span className="topic-hub-icon"><Bot size={24} aria-hidden="true" /></span>
            <p className="eyebrow light-eyebrow">AI agent hosting</p>
            <h3>Learn where your AI agent can run.</h3>
            <p>Then compare what the hosting company does and what you must do.</p>
            <Link className="topic-hub-primary" href="/guides/ai-agent-hosting/">
              Start with the hosting guide <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p className="topic-hub-more">Then explore</p>
            <ul aria-label="More AI agent hosting pages">
              <li><Link href="/guides/hermes-agent-vs-openclaw/">Hermes Agent vs OpenClaw</Link></li>
              <li><Link href="/guides/best-vps-for-openclaw/">Best VPS for OpenClaw</Link></li>
              <li><Link href="/guides/whatsapp-ai-agent/">Connect an AI agent to WhatsApp</Link></li>
            </ul>
          </article>
        </div>
      </section>

      <section className="evidence-band" aria-labelledby="evidence-heading">
        <div className="page-shell evidence-grid">
          <div>
            <p className="eyebrow">How we keep the advice honest</p>
            <h2 id="evidence-heading">We show our reasons and limits.</h2>
          </div>
          <div className="evidence-points">
            <article>
              <FileSearch size={22} aria-hidden="true" />
              <h3>Sources for facts that can change</h3>
              <p>We use the company’s current guides or terms and show when we checked them.</p>
            </article>
            <article>
              <ShieldCheck size={22} aria-hidden="true" />
              <h3>We stop when facts are missing</h3>
              <p>If key facts are missing or your needs are complex, we tell you to get more help.</p>
            </article>
            <article>
              <Compass size={22} aria-hidden="true" />
              <h3>We tell you when to check again</h3>
              <p>Every result tells you when to check your choice again.</p>
            </article>
          </div>
          <Link className="button button-quiet" href="/methodology/">
            See how the tool works <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="content-section page-shell faq-section" aria-labelledby="faq-heading">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Straight answers</p>
            <h2 id="faq-heading">Common hosting questions.</h2>
          </div>
          <p>Start with a short answer. Read the guide when you want more detail.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div>
            <p className="eyebrow light-eyebrow">Ready when you are</p>
            <h2>Find a good place to start.</h2>
          </div>
          <Link className="button button-accent" href="/tools/hosting-type-chooser/">
            Help me choose hosting <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
