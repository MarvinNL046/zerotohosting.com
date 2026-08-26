# ZeroToHosting

Provider-neutral web hosting decision tools and practical guides. The current
build contains the Hosting Type Chooser, the Types of Web Hosting guide, and
the evidence-led first-website hosting guide. It also has a website-cost
cluster (cost guide, builder-versus-hosting guide, and calculator) and an AI
agent cluster (hosting hub, Hermes-versus-OpenClaw guide, and five-route
OpenClaw VPS guide). An eight-page messaging subcluster covers WhatsApp AI
agents, native OpenClaw and Hermes routes, SMS versus WhatsApp, and the
documented VoidFix WhatsApp, SMS, and GoHighLevel setup paths. Methodology,
identity, contact, disclosure, privacy, and terms pages explain the site's
boundaries.

## Local development

```bash
npm install
npm run dev
```

Quality gates:

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
```

`test:e2e` builds the production application and runs Chromium journeys for
desktop, mobile, server-rendered results, and a no-JavaScript chooser flow.

## Affiliate links

Affiliate destinations live only in `lib/affiliate-links.ts`. Public pages must
use `PaidAffiliateLink` instead of copying a referral URL into page code. The
component opens the other website safely, adds
`rel="sponsored nofollow noopener noreferrer"`, and prints this label next to
the link: “Affiliate link — we may earn a commission.”

The registry currently contains the user-approved VoidFix WhatsApp Gateway and
VoidFix SMS Gateway destinations. A normal evidence or source link must use a
clean URL without an affiliate code. Affiliate payment is not an input to the
Hosting Type Chooser and cannot change its result.

## Copy standard

All public copy must be clear to an average 12-year-old reader. Write in plain
US English at about grade 6 or 7. Use short sentences and common words. Explain
any hosting term the first time it appears. Keep needed safety, legal, and
technical limits; make them easier to understand instead of removing them.

Before shipping new copy:

- read every heading, button, form option, error, and generated result;
- replace jargon with a common word or add a short definition;
- split sentences that carry more than one main idea;
- keep “not sure” answers and other limits honest;
- test mobile layouts after wording changes.

## Page dates and the sitemap

Every public page has its own `lastModified` date in
`lib/public-pages.ts`. The sitemap and each visible “Updated” label use that
same date. This keeps the date stable when the site is rebuilt.

Change a page date only when that page changes in a useful way. Examples are a
change to its main text, structured data, or important links. Do not replace a
page date with `new Date()` or the build time. A new deployment by itself is not
a page update.

## Indexing and go-live gate

The site is deliberately `noindex` and returns `Disallow: /` unless
`SITE_INDEXABLE=true` is present in the build environment. Do not enable that
flag until all of the following are confirmed:

- the operator/controller legal name, address, and required registration details;
- a tested public contact address for general, correction, and privacy requests;
- the production hosting, CDN, security, and logging providers;
- the legal basis, recipients, retention criteria, transfer position, user rights,
  and complaint route required by the production privacy notice;
- final legal review for the intended countries and operating entity;
- explicit approval to deploy, connect the domain, and enable indexing.

Release 1 contains no paid provider rankings. Some pages may contain clearly
labeled affiliate links. Guides use dated screenshots from official English
pages only as reading or setup examples. A screenshot does not prove current
pricing, speed, uptime, support quality, or a provider ranking. Deployment, DNS,
Search Console, and new affiliate applications are intentionally outside this
branch.
