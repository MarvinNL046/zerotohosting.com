# VoidFix messaging cluster — phase 1 plan

Date: 2026-08-26  
Status: implemented as an eight-page pre-launch cluster; indexing remains blocked

> SEO validation update, August 26, 2026: Ahrefs and live SERPs changed the
> architecture. The general `/guides/messaging-gateways/` concept is no longer
> the SEO hub. The approved hub is `/guides/whatsapp-ai-agent/`. Native
> OpenClaw and Hermes WhatsApp guides sit above the smaller VoidFix utility
> cluster. See `docs/whatsapp-ai-voidfix-keyword-map.md` for the final route,
> title, intent, merge, and hold decisions.

> Historical note: the remaining proposal records how the research started.
> Where it conflicts with the validation update or the keyword map, the keyword
> map and the implemented routes are authoritative.

## Decision summary

This becomes a subcluster of the existing AI agent hosting topic:

```text
Hosting
└── Always-on AI agent
    └── Messaging channel
        ├── WhatsApp through VoidFix
        ├── SMS through VoidFix
        └── GoHighLevel connection
```

An **AI Agent Gateway** and a **messaging gateway** are not the same thing:

- An AI Agent Gateway keeps agent sessions, tools, and model connections together.
- A messaging gateway carries WhatsApp or SMS messages to another tool, CRM, or agent.

The first hub should own both the general definition and the bridge to AI agents. A separate “messaging gateways for AI agents” page should be created only if Ahrefs and the search results show a clearly different intent.

Do not add VoidFix, WhatsApp, SMS, GoHighLevel, or Messaging to the top navigation yet. Do not create a third homepage niche. After the hub and at least two strong child pages exist, add one “Messaging gateways” link to the existing AI-agent footer group and one quiet link inside the homepage AI-agent card.

## Proposed cluster

```text
/guides/ai-agent-hosting/
└── /guides/messaging-gateways/
    ├── /guides/voidfix-gateway/
    ├── /guides/connect-whatsapp-to-voidfix/
    │   └── /guides/connect-voidfix-to-gohighlevel/
    ├── /guides/set-up-voidfix-sms/
    └── /guides/whatsapp-gateway-vs-sms-gateway/  [research-gated]
```

Later candidates, not part of the first release:

- `/guides/voidfix-troubleshooting/`
- `/guides/messaging-gateways-for-ai-agents/`
- `/tools/messaging-gateway-cost-calculator/`
- separate VoidFix WhatsApp and SMS commercial pages, but only if the search intents are demonstrably different

Do not create “VoidFix review,” “best WhatsApp gateway,” or “best SMS gateway” pages before independent testing and fair comparison evidence exist.

## Page roles and publication gates

All keyword volume, KD, traffic potential, and SERP difficulty values are still unknown. The following titles and URLs are working proposals until research is complete.

| Order | Working page | Search intent owner | Affiliate use | Must exist before publication |
|---:|---|---|---|---|
| 1 | **Messaging Gateways Explained: WhatsApp, SMS, and AI Tools** — `/guides/messaging-gateways/` | General definition, channel choices, difference from an Agent Gateway | Preferably none; keep the hub neutral | Official channel and policy sources, original architecture diagram, clear responsibility model |
| 2 | **VoidFix Gateway Explained: WhatsApp, SMS, Costs, and Checks** — `/guides/voidfix-gateway/` | Branded product research and commercial comparison inside one provider | Both product links, after a visible disclosure | Current VoidFix docs, pricing, terms, privacy, affiliate terms, and exact product-route distinction |
| 3 | **How to Connect WhatsApp to VoidFix Gateway** — `/guides/connect-whatsapp-to-voidfix/` | WhatsApp setup, connection, linked device, QR questions | WhatsApp signup link for visitors without an account | Official docs, supplied Scribe, an independently repeated test, safe English screenshots |
| 4 | **How to Connect VoidFix to a GoHighLevel Sub-Account** — `/guides/connect-voidfix-to-gohighlevel/` | GHL, GoHighLevel, sub-account, integration setup | WhatsApp signup link only for visitors without VoidFix | WhatsApp connection prerequisite, official VoidFix and relevant GHL docs, dummy sub-account test |
| 5 | **How to Set Up VoidFix SMS with an Android Phone** — `/guides/set-up-voidfix-sms/` | Android, SIM, SMS device, VoidFix SMS setup | SMS signup link | Official installation guide, Android/SIM test, permissions list, real test message, carrier and local-rule warning |
| 6 | **WhatsApp Gateway vs SMS Gateway: Which Fits Your Job?** — `/guides/whatsapp-gateway-vs-sms-gateway/` | Channel comparison and choice | Both product links, clearly labeled | Same comparison criteria for both routes, current costs, policy limits, no unsupported winner |

### Page 1: messaging gateway hub

Job:

- explain the term in plain English;
- show where the messaging service sits;
- stop readers from confusing it with OpenClaw or Hermes Gateway;
- route visitors to WhatsApp, SMS, GHL, or the AI agent hosting guide.

Recommended diagram:

```text
Person
  → WhatsApp or SMS
  → Messaging gateway
  → CRM, automation, or agent app
  → optional AI Agent Gateway
  → model and tools
```

The hub should not become a disguised VoidFix sales page. It can mention VoidFix as one documented example and link to the product explainer.

### Page 2: VoidFix product explainer

Job:

- explain that VoidFix has different WhatsApp and SMS routes;
- describe the documented setup, device needs, cost model, and unknowns;
- help the visitor choose which detailed tutorial to read;
- provide the main commercial bridge.

Do not call it a review until ZeroToHosting has independently used both routes and recorded the test.

The current safe wording is:

- WhatsApp: “a device-linked WhatsApp connection documented by VoidFix”;
- SMS: “an Android-phone and SIM-based SMS route documented by VoidFix.”

### Page 3: WhatsApp connection tutorial

Core flow to verify:

1. Create an account or sign in.
2. Open the host/account area.
3. Add a WhatsApp account or create the customer connection link.
4. Enter the requested name in the connection flow.
5. Generate the QR code.
6. On the phone, open WhatsApp’s linked-device screen.
7. Scan the QR code.
8. Return to VoidFix and confirm the Connected or Active status.
9. Send one permitted test message to a number controlled by the tester.

The supplied Scribe is a research source, not copy:

- https://scribehow.com/o/aPVt4GmYRV2kilMIKOBJFA/viewer/WhatsApp_Connection_or_VoidFix_Gateway__WtCxdum-S3WXSynJ22wUsg
- https://gateway.voidfix.com/whatsapp-device-connection

### Page 4: GoHighLevel tutorial

The WhatsApp device must be connected first. The GHL page must link back to the WhatsApp tutorial as a prerequisite.

Core flow to verify:

1. Confirm the WhatsApp route is connected.
2. Open GHL Integration in VoidFix.
3. Choose Connect GHL Sub-account.
4. Sign in to GoHighLevel in the opened authorization flow.
5. Select the correct dummy sub-account.
6. Complete the requested authorization.
7. Retrieve the VoidFix API key only if the current route still requires it.
8. Add inbound and outbound numbers when required.
9. In GHL Phone Numbers and Advanced Settings, choose the documented VoidFix option.
10. Test one inbound and one outbound message with controlled test data.

Sources:

- https://scribehow.com/o/aPVt4GmYRV2kilMIKOBJFA/viewer/Connect_GHL_Sub-account_or_VoidFix_Gateway__iRQ0vlkSR2iBIIlE6qmiBw
- https://gateway.voidfix.com/ghl-whatsapp-documentation

### Page 5: SMS setup tutorial

This page is blocked until the dashboard guide is found and the route is tested. Research must confirm:

- supported Android versions;
- app installation source;
- permissions;
- phone and SIM requirements;
- whether the phone must stay online;
- device and SIM limits;
- inbound and outbound message behavior;
- MMS behavior;
- carrier, plan, and local legal limits;
- the difference between “unlimited credits” and real device/carrier capacity.

### Page 6: channel comparison

Use the same questions for both routes:

- What device or account is required?
- What must stay online?
- Who receives the message?
- What identifiers does the recipient see?
- What does the provider charge for?
- Which separate phone, SIM, carrier, Meta, or platform costs may still apply?
- How does opt-in and opt-out work?
- What personal data is processed?
- What can cause a session, device, SIM, or account to stop working?
- What has ZeroToHosting tested?

No universal winner.

## Search-intent separation

Each intent gets one owner:

- General “what is a messaging gateway” → hub.
- Bare “VoidFix” and pricing/product research → product explainer.
- “connect,” “setup,” “linked device,” or “QR” → WhatsApp tutorial.
- “GHL,” “GoHighLevel,” or “sub-account” → GHL tutorial.
- “Android,” “SIM,” or “SMS setup” → SMS tutorial.
- “vs,” “or,” or “which” → comparison.
- “not working,” “disconnected,” or “error” → one future troubleshooting page.
- “calculator,” “cost,” or “estimate” → future calculator.
- “AI agent” → the hub at first; split only after research proves a separate SERP.

## Internal links

- AI Agent Hosting → short definition of the two gateway meanings → Messaging Gateways hub.
- Messaging Gateways hub → AI Agent Hosting, VoidFix explainer, tutorials, and later comparison.
- VoidFix explainer → WhatsApp tutorial, GHL tutorial, SMS tutorial, and later comparison.
- GHL tutorial → WhatsApp tutorial as a prerequisite.
- WhatsApp and SMS tutorials → product explainer and troubleshooting.
- Comparison → the matching setup tutorial.
- Future calculator → comparison and product explainer.

Do not add VoidFix links to website-cost pages, builder-versus-hosting, or the hosting chooser. Do not place affiliate calls to action inside the Best VPS provider comparison.

Breadcrumb pattern:

```text
Home > AI agent hosting > Messaging gateways > Current page
```

## Design and screenshot system

Keep the existing ZeroToHosting white, navy, teal, coral, and editorial card system.

Each tutorial should use:

- a direct hero answer;
- a “Before you start” checklist;
- a numbered vertical step rail;
- one action and one checkpoint per step;
- English screenshots in a consistent browser frame;
- a zoomed crop where a control is small;
- a short troubleshooting section;
- a dated sources-and-limits panel;
- one next-step action.

Do not copy Scribe text or screenshots into the page. Rewrite the facts in original plain English. Prefer screenshots captured from a clean test account in the user-authorized VoidFix dashboard.

Before capturing:

- switch the UI to English;
- use a demo account, test device, and dummy GHL sub-account;
- remove real contacts and message history;
- hide QR codes, API keys, session tokens, email addresses, phone numbers, location IDs, account IDs, and customer data;
- never show a usable login, connection, customer, or permanent linking URL.

Every image needs:

- descriptive alt text;
- source and capture date;
- “UI example; not a performance or compliance test”;
- a final visual check on desktop and mobile.

Dashboard guides that may be useful:

- WhatsApp connection;
- GHL connection;
- API keys and webhooks;
- common connection problems;
- session reconnection;
- safe account and device management.

Treat “avoid ban,” warmup, spintax, detection, and bulk-outreach material as policy-risk content. Do not turn it into instructions for bypassing platform controls. Any useful part must be rewritten around permission, policy compliance, rate limits, and account safety.

## Affiliate implementation plan

Reference links supplied by the operator:

- WhatsApp: https://wa.voidfix.com/?ref=B35F206A
- SMS: https://sms.voidfix.com/register.php?ref=MARVIN1042

These links were live-checked on 2026-08-26. The WhatsApp page reads the `ref` value into its registration flow. The SMS registration route stores the supplied referral code for its signup flow.

Before either link ships:

1. Add one typed affiliate-link registry instead of scattering raw URLs through pages.
2. Add a dedicated `AffiliateLink` component.
3. Use `rel="sponsored nofollow noopener noreferrer"`.
4. Put a visible disclosure before the first paid link.
5. Label each paid call to action locally.
6. Keep source and documentation links clean and free of referral codes.
7. Add automated tests for the exact destinations, relationship attributes, and visible disclosures.

Suggested page disclosure:

> This page contains paid VoidFix links. If you sign up or buy through one, ZeroToHosting may receive a commission. VoidFix sets the price.

Suggested local label:

> Paid link — we may earn a commission.

Do not place a paid link in every step. Recommended placement:

- Product explainer: one after the short answer and one final call to action.
- WhatsApp tutorial: one “Need an account?” call to action before the steps and one final call to action.
- GHL tutorial: one small call to action only for readers without a VoidFix account.
- SMS tutorial: the same pattern as WhatsApp.
- Neutral hub: no paid link in the first release.

## Site-wide changes required before monetization

The following current statements will become false and must be updated:

- homepage: “No affiliate links in version 1”;
- footer: the same statement;
- methodology: current version has no affiliate links;
- affiliate disclosure metadata, H1, current-status section, and future-only wording;
- privacy statements saying there are no affiliate links or affiliate tracking;
- README release boundary.

The smaller claim can remain:

> Paid links are clearly labeled. They do not change the Hosting Type Chooser.

The affiliate disclosure must name VoidFix, explain that compensation may repeat while a referred account remains active, and state that payment is not proof of quality, safety, compatibility, or value.

Privacy must explain that a visitor leaves ZeroToHosting, that a referral code is included in the destination URL, and that VoidFix’s own privacy and cookie rules apply on its domains.

Terms must explain that:

- ZeroToHosting may receive compensation;
- the purchase and subscription are between the visitor and VoidFix;
- a paid link is not a guarantee;
- current price, trial, renewal, cancellation, and refund terms must be checked at VoidFix.

Public indexing remains blocked until operator/controller details, contact routes, privacy details, target countries, and legal review are complete.

## Claim rules

Claims that may be used only with direct attribution and a review date:

- VoidFix documents a device-linked WhatsApp route.
- VoidFix documents a GoHighLevel route.
- VoidFix says its SMS product uses an Android phone and SIM.
- Current provider-stated plan features and prices.
- Current affiliate-program terms.

Do not present these as established facts without independent proof:

- “save 80%”;
- “unlimited” without every device, carrier, fair-use, and plan limit;
- “no A2P” as a universal legal or compliance promise;
- “prevents SIM blocking” or “avoids detection”;
- “safe,” “compliant,” “reliable,” “uninterrupted,” or “ban-proof”;
- speed, delivery, uptime, or support quality;
- official Meta/WhatsApp API or official platform-partner status;
- native OpenClaw or Hermes compatibility;
- “best,” a rating, or a product score.

Every setup or comparison page must tell readers:

- get valid permission before sending marketing messages;
- respect opt-out requests;
- check local law, WhatsApp rules, carrier terms, and the SIM plan;
- “no A2P” does not mean “no rules”;
- protect API keys, QR codes, and sessions;
- do not use it for emergency or critical messages.

## Phase 2 research workflow

### 1. Ahrefs

Use the already logged-in Ahrefs session. Start with Google US because the supplied list is in the US database, then compare important terms in Worldwide and UK English.

Research groups:

1. VoidFix branded queries.
2. VoidFix WhatsApp setup and problem queries.
3. VoidFix SMS, Android, and SIM queries.
4. GoHighLevel and GHL WhatsApp integration queries.
5. Generic WhatsApp gateway and SMS gateway comparisons.
6. AI-agent messaging queries.
7. Cost/calculator queries.

Export or record:

- keyword;
- country/database;
- volume;
- KD;
- traffic potential;
- CPC;
- clicks or CPS when available;
- parent topic;
- SERP features;
- current top-ranking URLs;
- update date.

Do not remove zero-volume branded or setup terms automatically. They may have very high purchase intent. KD is a filter, not the decision. Manually inspect the search results.

### 2. SERP review

For each candidate owner query:

- inspect the top ten;
- label official docs, videos, forums, provider pages, tools, and affiliate pages;
- record the dominant intent;
- check whether two proposed pages would compete with the same results;
- record content gaps, dates, screenshots, and missing warnings.

Merge pages when the results substantially overlap. Split only when the intent and ranking pages differ.

### 3. VoidFix dashboard inventory

Use the user-authorized logged-in dashboard read-only first:

- list available help guides;
- identify exact current UI labels;
- record prerequisites and step order;
- identify which routes require account, device, API key, webhook, or GHL authorization;
- create a safe screenshot shot list;
- flag any action that changes account state before performing it.

Do not send messages, connect accounts, create API keys, create permanent customer links, or change GHL settings without explicit approval for that action.

### 4. Hands-on verification

Use controlled test data only:

- clean VoidFix account;
- test WhatsApp number/device;
- test Android/SIM for SMS;
- dummy GoHighLevel sub-account;
- tester-owned recipient numbers.

Record:

- plan and account type;
- device and OS;
- UI language;
- exact date;
- steps;
- errors;
- successful checkpoints;
- what was not tested.

A successful setup does not prove deliverability, long-term reliability, compliance, or support quality.

### 5. Evidence ledger

Create one row per checkable statement:

- proposed wording;
- exact primary source;
- status: verified, provider-stated, observed, inferred, unknown, or unsupported;
- checked date;
- permitted wording;
- required limitation.

### 6. Research deliverables

Phase 2 ends with:

- keyword and SERP map;
- final page keep/merge/drop decision;
- evidence ledger;
- screenshot and test plan;
- source archive with dates;
- content briefs for approved pages;
- a written list of legal and account actions still requiring the operator.

No final article copy should be written before these deliverables are accepted.

## Build and verification order after research

1. Update site-wide affiliate, privacy, methodology, terms, footer, and homepage claims.
2. Add the affiliate registry, component, disclosure component, and automated tests.
3. Build the neutral hub.
4. Build the VoidFix explainer.
5. Build and test the WhatsApp tutorial.
6. Build and test the GHL tutorial.
7. Build the SMS tutorial only after its proof gate passes.
8. Build comparison, troubleshooting, AI-specific, or calculator pages only when research supports them.
9. Run the sales-copy critic loop on the same final candidate.
10. Run lint, types, unit tests, browser tests, production build, mobile checks, screenshot checks, and affiliate-link checks.
11. Keep `SITE_INDEXABLE` disabled until every launch blocker is resolved.
