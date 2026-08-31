import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

import { Breadcrumb } from "@/components/breadcrumb";

type GuideAction = Readonly<{
  href: string;
  label: string;
  quiet?: boolean;
}>;

type GuideCrumb = Readonly<{
  href?: string;
  label: string;
}>;

export function EditorialGuideHero({
  breadcrumbs,
  eyebrow,
  title,
  lede,
  actions,
  trustItems,
}: Readonly<{
  breadcrumbs: readonly GuideCrumb[];
  eyebrow: ReactNode;
  title: string;
  lede: ReactNode;
  actions: readonly GuideAction[];
  trustItems: readonly string[];
}>) {
  const visibleBreadcrumbs =
    breadcrumbs[0]?.href === "/" ? breadcrumbs.slice(1) : breadcrumbs;

  return (
    <header className="guide-hero page-shell pilot-guide-hero editorial-guide-hero">
      <Breadcrumb items={visibleBreadcrumbs} />
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="lede">{lede}</div>
      <div className="button-row">
        {actions.map((action) => (
          <Link
            className={`button ${action.quiet ? "button-quiet" : "button-primary"}`}
            href={action.href}
            key={action.href}
          >
            {action.label}
            {!action.quiet && <ArrowRight size={17} aria-hidden="true" />}
          </Link>
        ))}
      </div>
      <ul className="trust-list" aria-label="Page limits">
        {trustItems.map((item) => (
          <li key={item}>
            <CheckCircle2 size={15} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </header>
  );
}

export function EditorialGuideLayout({
  toc,
  children,
}: Readonly<{
  toc: readonly (readonly [id: string, label: string])[];
  children: ReactNode;
}>) {
  return (
    <div className="guide-layout page-shell pilot-guide-layout">
      <nav className="guide-toc" aria-label="Page sections">
        <h2>On this page</h2>
        <ol>
          {toc.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ol>
      </nav>
      <article className="guide-body pilot-guide-body editorial-guide-body">
        {children}
      </article>
    </div>
  );
}

export function PageNextStep({
  href,
  label,
  prefix = "Next step",
}: Readonly<{ href: string; label: string; prefix?: string }>) {
  return (
    <p className="section-next-step">
      <span>{prefix}:</span>
      <Link className="text-link" href={href}>
        {label}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </p>
  );
}

export function ExternalSourceLink({
  href,
  children,
}: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <a
      className="text-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ExternalLink size={15} aria-hidden="true" />
    </a>
  );
}

export function EditorialFaqList({
  faqs,
}: Readonly<{
  faqs: readonly Readonly<{ question: string; answer: ReactNode }>[];
}>) {
  return (
    <div className="faq-list editorial-faq-list">
      {faqs.map((faq) => (
        <details key={faq.question}>
          <summary>
            {faq.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
