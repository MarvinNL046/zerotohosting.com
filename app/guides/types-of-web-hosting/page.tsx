import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { formatPageDate, publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "Types of web hosting: a practical decision guide",
  description:
    "Learn what shared hosting, managed WordPress, static hosting, app platforms, and VPS hosting do. See which type may fit your site.",
  path: publicPageFrontmatter.hostingTypesGuide.path,
});

const toc = [
  ["start-with-the-platform", "Start with your software"],
  ["hosting-types-compared", "Compare hosting types"],
  ["hosted-platforms", "Hosted platforms"],
  ["managed-and-general-hosting", "Shared and managed hosting"],
  ["wordpress-hosting", "WordPress hosting"],
  ["static-and-edge-hosting", "Static and edge hosting"],
  ["managed-application-platforms", "Managed app platforms"],
  ["vps-and-cloud-virtual-machines", "VPS and cloud servers"],
  ["management-responsibility", "Who manages the server"],
  ["measure-before-you-move", "Measure before moving"],
  ["specialist-architectures", "Cases that need an expert"],
] as const;

const comparisonRows = [
  ["Hosted platform", "A website tool and hosting in one service", "The hosting company", "Sites or stores that work within the tool's rules", "The tool cannot support software, data exports, server locations, or connections you need"],
  ["Shared / managed web hosting", "A standard server setup that the hosting company runs", "The hosting company", "Content sites and other common websites", "You need special software, stronger separation, or a different server setup"],
  ["Managed WordPress", "Hosting and tools made for WordPress", "The hosting company, while you still care for parts of the site", "WordPress sites that want WordPress help and tools", "Measured limits keep causing trouble, or you need software outside WordPress"],
  ["Static / edge hosting", "Fast delivery of files built before a visitor asks for them", "The hosting company", "Static sites, app pages that visitors see, and small pieces of supported server code", "You need a server that stays on, software the platform cannot run, or a job that saves its own data."],
  ["Managed app platform", "A place to run custom code without managing the server system", "The hosting company", "Apps that follow the platform's rules", "Your app needs software, network access, a long-running job, storage, or higher limits that the platform does not offer."],
  ["VPS / cloud server", "Direct control of a separate virtual server", "You, unless the plan clearly includes management", "Custom software with a person who can manage the server", "Nobody can keep the server updated, secure, backed up, and online."],
] as const;

const faqs = [
  ["What is the main difference between shared hosting and a VPS?", "With shared hosting, the hosting company controls the server and does most server work. A virtual private server (VPS) gives you a separate virtual server. You will usually need to update it, secure it, watch it, back it up, and restore it after a problem. The main difference is control and responsibility. A VPS is not always faster."],
  ["Is managed WordPress the same as shared hosting?", "They can use similar server systems, but the plans offer different things. Managed WordPress often adds WordPress help, updates, caching, test copies, backups, or special rules. Check what the hosting company will manage and which limits apply. Do not trust the plan name by itself."],
  ["What does cloud hosting mean?", "Cloud hosting is a broad name, not one exact type of service. It may mean a virtual server, a managed app platform, a service spread across many computers, or simply a service from a cloud company. Ask what the hosting company manages, what is kept separate, and what happens when use grows or something fails."],
  ["How much traffic requires a VPS?", "There is no visitor number that works for every site. A site with simple, saved pages uses less server work than a busy store or app. Database work, media, jobs that run in the background, plan limits, and sudden traffic peaks also matter. Use real measurements and the hosting company's written limits."],
] as const;

export default function HostingTypesGuidePage() {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/guides/types-of-web-hosting/", label: "Types of web hosting" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <header className="guide-hero page-shell">
        <Breadcrumb items={[{ label: "Guides" }, { label: "Types of web hosting" }]} />
        <p className="eyebrow">
          Hosting guide / updated{" "}
          <time dateTime={publicPageFrontmatter.hostingTypesGuide.lastModified}>
            {formatPageDate(publicPageFrontmatter.hostingTypesGuide.lastModified)}
          </time>
        </p>
        <h1>Web hosting types, explained simply.</h1>
        <p className="lede">
          Web hosting puts your website or app online. Labels like shared,
          managed, cloud, VPS (virtual server), and WordPress do not all mean the same thing.
          Some tell you what software can run. Others tell you who cares for
          the server or how its power is shared. Look at each part on its own.
        </p>
        <div className="button-row">
          <Link className="button button-primary" href="/tools/hosting-type-chooser/">
            Help me choose a hosting type <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <div className="guide-layout page-shell">
        <aside className="guide-toc">
          <h2>On this page</h2>
          <ol>
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`}>{label}</a></li>
            ))}
          </ol>
        </aside>

        <article className="guide-body">
          <section id="start-with-the-platform" className="anchor-target">
            <p className="eyebrow">The main idea</p>
            <h2>Start with the software your site needs, not the plan name.</h2>
            <p>
              Hosting is the service that keeps a site or app online. It must
              support your software first. You may use a website builder,
              WordPress, files built before a visit, another content management
              system (CMS), or a custom app. Once you know this, you can remove
              many plans that will not work. Then you can compare companies and
              prices. After that, compare server size.
            </p>
            <div className="decision-note">
              <Layers3 size={22} aria-hidden="true" />
              <div>
                <strong>Ask three separate questions.</strong>
                <span>What must your site run? Who will manage the server? How much power do your tests show you need?</span>
              </div>
            </div>
            <p>
              “Managed” tells you who does server work. “WordPress” tells you
              which app the host supports. “Shared” means that several customers
              use parts of the same server. One plan can have all three labels.
              This is why comparing only the labels can be confusing.
            </p>
          </section>

          <section id="hosting-types-compared" className="anchor-target">
            <p className="eyebrow">Quick view</p>
            <h2>Compare common hosting types.</h2>
            <p>
              Use this table to see who does the work and where each option stops.
              Plans differ, so read the hosting company&apos;s latest details before you buy.
            </p>
            <div className="comparison-scroll" role="region" aria-label="Hosting types comparison" tabIndex={0}>
              <table className="comparison-table">
                <thead><tr><th>Hosting type</th><th>What you get</th><th>Who runs the server</th><th>Good place to start</th><th>Look again when</th></tr></thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="hosted-platforms" className="anchor-target">
            <p className="eyebrow">Type 01</p>
            <h2>Hosted platforms: the website tool and hosting come together.</h2>
            <p>
              Website builders and online store tools often include hosting.
              The tool must support your design and content. Check each connection
              and feature you need. Make sure you can also move your data. If it can
              do all of this, you do not need to buy separate hosting too.
            </p>
            <div className="type-card">
              <h3>Check what the platform can do</h3>
              <dl>
                <div><dt>The hosting company usually manages</dt><dd>Servers, file delivery, and updates to its platform</dd></div>
                <div><dt>You still manage</dt><dd>Your content, user access, settings, and use of data</dd></div>
                <div><dt>Check</dt><dd>Can you move your data? Check the domain and storage first. Then check data limits, the server location, outside connections and backups.</dd></div>
                <div><dt>Avoid</dt><dd>Buying another host before you find a clear gap in the platform</dd></div>
              </dl>
            </div>
          </section>

          <section id="managed-and-general-hosting" className="anchor-target">
            <p className="eyebrow">Type 02</p>
            <h2>Shared and managed hosting: the host runs the server for you.</h2>
            <p>
              This can work well for common websites and content systems. It fits
              sites that do not need full server control, special network services,
              or a program that must stay running. Shared hosting is not always bad.
              The word “unlimited” also does not tell you every limit. Check the
              processing power, memory, number of running tasks, storage, database,
              amount of data sent, and rules about how much you can use.
            </p>
            <div className="decision-note">
              <CheckCircle2 size={22} aria-hidden="true" />
              <div><strong>Shared hosting can be a good place to start.</strong><span>This is true when you have no proven limit and need no special server control. You still need to watch the site and know how to restore it.</span></div>
            </div>
            <h3>When to look at another option</h3>
            <ul>
              <li>the host cannot run software, jobs that stay active in the background, special network connections, or storage features that you need;</li>
              <li>repeated checks show that you keep hitting a written plan limit;</li>
              <li>being offline would cause enough harm that you need better separation, recovery, or support.</li>
            </ul>
          </section>

          <section id="wordpress-hosting" className="anchor-target">
            <p className="eyebrow">Type 03</p>
            <h2>WordPress hosting: check the help and tools, not just the label.</h2>
            <p>
              WordPress needs matching server software and a database. A general
              host can provide both. A managed WordPress plan may also offer
              WordPress support, saved page copies (caching), test copies,
              and backups. It
              may have stricter rules too. The plan name alone does not tell you
              its power or which work the hosting company will do.
            </p>
            <div className="type-card">
              <h3>Questions to ask</h3>
              <dl>
                <div><dt>Plan limits</dt><dd>What limits apply to processing power, memory, running tasks, databases, storage, and the amount of data sent?</dd></div>
                <div><dt>Updates</dt><dd>Who updates WordPress, plugins, themes, server software, and the main system software (the operating system)?</dd></div>
                <div><dt>Recovery</dt><dd>Are backups automatic, kept long enough, and easy to restore in a tested way?</dd></div>
                <div><dt>Work tools</dt><dd>Do you get a safe test copy, cache controls, records of what happened (logs), and the way to publish changes that you need?</dd></div>
              </dl>
            </div>
            <p>
              If tests show that your WordPress site keeps hitting a limit,
              compare managed plans with higher limits or plans with separate
              server power. A site that only feels slow is not enough proof.
              Find the cause first.
            </p>
          </section>

          <section id="static-and-edge-hosting" className="anchor-target">
            <p className="eyebrow">Type 04</p>
            <h2>Static and edge hosting: send ready-made files instead of running a full server.</h2>
            <p>
              A static site prepares its page files before a visitor asks for
              them. Those files can include page structure (HTML), design rules,
              code that runs in the browser, and images. Edge hosting sends
              those files from a location close to the visitor. Some platforms
              can also run small pieces of server code, called functions. This
              means less server work for you, but not every app can work this way.
            </p>
            <ul>
              <li><strong>Often a good fit:</strong> help pages, business sites, portfolios, public app pages, and content that can be built before a visitor asks for it.</li>
              <li><strong>Check with care:</strong> server code, sign-in, function limits, build time, forms, databases, and how saved pages get updated.</li>
              <li><strong>Choose another type:</strong> an always-running job, special server software, or a process that keeps its own data needs an app or server setup.</li>
            </ul>
          </section>

          <section id="managed-application-platforms" className="anchor-target">
            <p className="eyebrow">Type 05</p>
            <h2>Managed app platforms: run your code while the host cares for the server.</h2>
            <p>
              These platforms take your app or a container, which is a package
              with the app and the software it needs. The hosting company handles much
              of the server setup and publishing work. This can help when you need
              custom code but do not want to update and protect a server yourself.
            </p>
            <p>
              Check which software and tasks the platform supports. Check which
              network connections it allows and which ways of storing data it
              offers. Also check server locations and what happens when the app
              needs more power. You also need records of what happened and
              backups. Ask what happens during a failure. If the platform cannot
              meet one must-have need, a managed virtual server may be the next
              option. A server you manage may be another option.
            </p>
          </section>

          <section id="vps-and-cloud-virtual-machines" className="anchor-target">
            <p className="eyebrow">Type 06</p>
            <h2>VPS and cloud servers: more control also means more work.</h2>
            <p>
              A virtual private server (VPS) is a separate virtual computer.
              You can install software, keep programs running, choose allowed
              network connections, and change the server setup. Unless the plan
              includes server management, your team must install security updates,
              control access, watch the server, and make backups. Your team must
              also fix problems and restore the server after a failure.
            </p>
            <div className="decision-note">
              <AlertTriangle size={22} aria-hidden="true" />
              <div><strong>Full server control does not make a site faster by itself.</strong><span>Choose it for a feature you truly need, and only when someone can manage it over time.</span></div>
            </div>
            <p>
              A cloud server is still a server. A cloud service may let you create
              a server quickly. You still need to set it up, protect it, watch it,
              and know how to restore it.
            </p>
          </section>

          <section id="management-responsibility" className="anchor-target">
            <p className="eyebrow">Who does the work</p>
            <h2>Managed or self-managed is a choice about people and time.</h2>
            <p>
              “Managed” does not mean the same thing on every plan. Ask who
              updates each part, watches for problems, and answers during an
              emergency. Also ask who makes backups, tests whether they can be
              restored, and helps with the app. A hosting company may manage the
              server but not your app code.
            </p>
            <h3>Managing the server yourself can work when</h3>
            <ul>
              <li>a named person or team owns regular security work and emergencies;</li>
              <li>you can rebuild the setup from clear steps instead of old manual fixes;</li>
              <li>you test alerts and backups, plus restores and full rebuilds;</li>
              <li>a feature you truly need is worth the extra work and cost.</li>
            </ul>
          </section>

          <section id="measure-before-you-move" className="anchor-target">
            <p className="eyebrow">Check what is really slow</p>
            <h2>A slow website does not always need bigger hosting.</h2>
            <p>
              Slow pages can come from app code, database work, missing saved copies,
              outside services, distance, large files, browser scripts, or a hosting
              limit. Test normal visits and check the hosting company&apos;s limits before you
              change the hosting.
            </p>
            <ol>
              <li>Write down which user step is slow and when you can make it happen again.</li>
              <li>Check how much time is spent in the browser, network, server, app, and database.</li>
              <li>Check usage charts, logs, errors and slowdowns. Read the written plan limits.</li>
              <li>Fix the cause you found. Then run the same test again.</li>
              <li>Change server power or design only when the results point there.</li>
            </ol>
          </section>

          <section id="specialist-architectures" className="anchor-target">
            <p className="eyebrow">When this guide is not enough</p>
            <h2>Ask an expert if your site has strict data rules or must stay online.</h2>
            <p>
              A simple tool cannot tell you that a setup meets special laws or
              contracts. An expert must check where data stays, who can use it,
              and how long it is kept. They must also check which companies
              handle it, what proof is needed, and how recovery must work. Write
              down every need. Then ask the expert who controls each part. Ask
              which parts could fail together before you buy.
            </p>
            <div className="callout">
              <h3>Do not trust a “compliant hosting” badge by itself.</h3>
              <p>The real result also depends on where its servers are and where its data travels. People and settings matter too. Contracts and backups matter too. So does the work done each day.</p>
            </div>
          </section>

          <section aria-labelledby="guide-faq-heading">
            <p className="eyebrow">Common questions</p>
            <h2 id="guide-faq-heading">Common web hosting questions.</h2>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span aria-hidden="true">+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <div className="callout">
              <p className="eyebrow">Try it with your project</p>
              <h2>Get a hosting type or a clear next step.</h2>
              <p>The chooser uses these three questions. It also tells you what could change the answer.</p>
              <Link className="button button-primary" href="/tools/hosting-type-chooser/">Open the Hosting Type Chooser <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
