import Link from "next/link";
import { ArrowRight, Compass, RotateCcw } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbJsonLd, HostingChooserJsonLd } from "@/components/json-ld";
import {
  CAPACITY_EVIDENCE_OPTIONS,
  CHOOSER_OPTION_LABELS,
  COMPLIANCE_OPTIONS,
  CONFIDENCE_LABELS,
  HOSTING_CRITICALITY_OPTIONS,
  HOSTING_PLATFORM_OPTIONS,
  HOSTING_WORKLOAD_OPTIONS,
  PROJECT_STAGE_OPTIONS,
  TRI_STATE_OPTIONS,
  parseHostingChooserInput,
  recommendHosting,
} from "@/lib/hosting-chooser";
import { createPageMetadata } from "@/lib/metadata";
import { publicPageFrontmatter } from "@/lib/public-pages";

export const metadata = createPageMetadata({
  title: "Hosting Type Chooser",
  description:
    "Answer eight questions. Get a hosting type that may fit, or learn what you must decide first.",
  path: publicPageFrontmatter.hostingChooser.path,
});

type SearchParams = Record<string, string | string[] | undefined>;

type QuestionProps = {
  number: string;
  name: string;
  question: string;
  values: readonly string[];
  labels: Readonly<Record<string, string>>;
  selected?: string;
  oneColumn?: boolean;
};

function Question({
  number,
  name,
  question,
  values,
  labels,
  selected,
  oneColumn = false,
}: QuestionProps) {
  return (
    <fieldset className="question-card">
      <legend>
        <span className="question-number">Question {number} of 8</span>
        {question}
      </legend>
      <div className={`option-grid${oneColumn ? " one-column" : ""}`}>
        {values.map((value) => (
          <label className="option-label" key={value}>
            <input
              type="radio"
              name={name}
              value={value}
              defaultChecked={selected === value}
              required
            />
            <span>{labels[value]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function wasSubmitted(params: SearchParams): boolean {
  const value = params.submitted;
  return Array.isArray(value) ? value[0] === "yes" : value === "yes";
}

export default async function HostingTypeChooserPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const submitted = wasSubmitted(params);
  const input = parseHostingChooserInput(params);
  const recommendation = submitted ? recommendHosting(input) : null;
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: publicPageFrontmatter.toolsHub.path, label: "Tools" },
    { href: "/tools/hosting-type-chooser/", label: "Hosting Type Chooser" },
  ];

  return (
    <main id="main-content">
      <HostingChooserJsonLd />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <header className="chooser-hero page-shell">
        <Breadcrumb
          items={[
            { label: "Tools", href: publicPageFrontmatter.toolsHub.path },
            { label: "Hosting Type Chooser" },
          ]}
        />
        <p className="eyebrow">Hosting choice tool</p>
        <h1>Find a hosting type—or the next choice you need to make.</h1>
        <p className="lede">
          Answer eight simple questions. You will get a hosting type or a clear next
          step, with plain reasons and checks. The tool does not choose or rank a
          hosting company.
        </p>
        <ul className="chooser-meta">
          <li>No account needed</li>
          <li>You can choose ‘Not sure’</li>
          <li>No hosting company rankings</li>
          <li>Shows when an answer could change the result</li>
        </ul>
      </header>

      <div className="chooser-layout page-shell">
        <section aria-labelledby="questions-heading">
          <div className="chooser-intro">
            <p className="eyebrow">Tell us about your website</p>
            <h2 id="questions-heading">Answer with what you know today.</h2>
            <p>
              Choose “Not sure” when you do not know an answer. The tool will not
              pretend that “Not sure” means “No.” It will also tell you when a missing
              answer could change the result.
            </p>
            <div className="progress-rail" aria-hidden="true"><span /><span /><span /></div>
          </div>

          <form className="chooser-form" action="/tools/hosting-type-chooser/#hosting-result" method="get">
            <input type="hidden" name="submitted" value="yes" />
            <Question
              number="1"
              name="stage"
              question="Is this a new project or one that already exists?"
              values={PROJECT_STAGE_OPTIONS}
              labels={CHOOSER_OPTION_LABELS.stage}
              selected={submitted ? input.stage : undefined}
            />
            <Question
              number="2"
              name="platform"
              question="What will you use to build or run the website?"
              values={HOSTING_PLATFORM_OPTIONS}
              labels={CHOOSER_OPTION_LABELS.platform}
              selected={submitted ? input.platform : undefined}
            />
            <Question
              number="3"
              name="workload"
              question="What does the website need to do?"
              values={HOSTING_WORKLOAD_OPTIONS}
              labels={CHOOSER_OPTION_LABELS.workload}
              selected={submitted ? input.workload : undefined}
            />
            <Question
              number="4"
              name="customControl"
              question="Do you need special server access, custom software, or a program that must keep running?"
              values={TRI_STATE_OPTIONS}
              labels={CHOOSER_OPTION_LABELS.customControl}
              selected={submitted ? input.customControl : undefined}
              oneColumn
            />
            <Question
              number="5"
              name="opsCapability"
              question="Can your team safely update, watch, back up, and fix the server?"
              values={TRI_STATE_OPTIONS}
              labels={CHOOSER_OPTION_LABELS.opsCapability}
              selected={submitted ? input.opsCapability : undefined}
              oneColumn
            />
            <Question
              number="6"
              name="evidence"
              question="What shows that your current hosting plan is too small?"
              values={CAPACITY_EVIDENCE_OPTIONS}
              labels={CHOOSER_OPTION_LABELS.evidence}
              selected={submitted ? input.evidence : undefined}
            />
            <Question
              number="7"
              name="criticality"
              question="How much harm would a very busy period or time offline cause?"
              values={HOSTING_CRITICALITY_OPTIONS}
              labels={CHOOSER_OPTION_LABELS.criticality}
              selected={submitted ? input.criticality : undefined}
              oneColumn
            />
            <Question
              number="8"
              name="compliance"
              question="Do any rules say where your data must stay or how often your site must be online?"
              values={COMPLIANCE_OPTIONS}
              labels={CHOOSER_OPTION_LABELS.compliance}
              selected={submitted ? input.compliance : undefined}
              oneColumn
            />
            <div className="form-actions">
              <button className="button button-primary" type="submit">
                Show my result <ArrowRight size={17} aria-hidden="true" />
              </button>
              <span className="form-hint">All eight answers are required.</span>
            </div>
          </form>
          <p className="privacy-note">
            The tool puts your answers in the page address (URL). Hosting and
            security systems may record this address, so never include private or
            secret information. Read the
            <Link className="text-link" href="/privacy/"> privacy notice</Link>.
          </p>
        </section>

        <aside id="hosting-result" className="result-panel" aria-live="polite">
          {recommendation ? (
            <>
              <div className="result-header">
                <p className="eyebrow">A good place to start</p>
                <h2>{recommendation.title}</h2>
                <p>{recommendation.summary}</p>
              </div>
              <div className="result-body">
                <div className="confidence-row">
                  <span>How sure is this result?</span>
                  <span className="confidence-pill">{CONFIDENCE_LABELS[recommendation.confidence]}</span>
                </div>

                <div className="result-axis-grid" role="group" aria-label="The three parts of your result">
                  <div className="result-axis"><span>Hosting type</span><strong>{recommendation.platformRoute.label}</strong></div>
                  <div className="result-axis"><span>Who cares for it</span><strong>{recommendation.managementRoute.label}</strong></div>
                  <div className="result-axis"><span>How much power</span><strong>{recommendation.capacityRoute.label}</strong></div>
                </div>

                <section className="result-section">
                  <h3>Why this may fit</h3>
                  <ul>{recommendation.why.map((reason) => <li key={reason}>{reason}</li>)}</ul>
                </section>
                <section className="result-section">
                  <h3>What each part means</h3>
                  <ul>
                    <li><strong>Hosting type:</strong> {recommendation.platformRoute.explanation}</li>
                    <li><strong>Server work:</strong> {recommendation.managementRoute.explanation}</li>
                    <li><strong>Needed power:</strong> {recommendation.capacityRoute.explanation}</li>
                  </ul>
                </section>
                <section className="result-section">
                  <h3>Check these before you choose</h3>
                  <ul>{recommendation.mustHaves.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section className="result-section">
                  <h3>You probably do not need</h3>
                  <ul>{recommendation.probablyDontNeed.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section className="result-section">
                  <h3>Another option to think about</h3>
                  <p><strong>{recommendation.adjacentAlternative.label}.</strong> {recommendation.adjacentAlternative.reason}</p>
                </section>
                <section className="result-section">
                  <h3>Check again if any of these things change</h3>
                  <ul>{recommendation.upgradeTriggers.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <div className="result-actions">
                  <Link className="button button-primary" href={recommendation.guideAnchor.href}>
                    {recommendation.guideAnchor.label} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link className="button button-quiet" href="/tools/hosting-type-chooser/">
                    <RotateCcw size={15} aria-hidden="true" /> Start again
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="result-empty">
              <div className="result-empty-icon"><Compass size={25} aria-hidden="true" /></div>
              <p className="eyebrow">Your result</p>
              <h2>Your result will show here.</h2>
              <p>Complete all eight questions and the tool will show:</p>
              <ol>
                <li>a hosting type that may fit, or the next choice to make;</li>
                <li>who should care for the server;</li>
                <li>whether you need tests or more power;</li>
                <li>when to check the choice again.</li>
              </ol>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
