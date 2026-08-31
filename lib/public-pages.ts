import type { MetadataRoute } from "next";
import { absoluteUrl } from "./site";

type SitemapEntry = MetadataRoute.Sitemap[number];

export type IsoDate = `${number}-${number}-${number}`;
export type PublicPagePath = "/" | `/${string}/`;

export type PublicPageFrontmatter = Readonly<{
  path: PublicPagePath;
  lastModified: IsoDate;
  changeFrequency: NonNullable<SitemapEntry["changeFrequency"]>;
  priority: number;
}>;

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const CHANGE_FREQUENCIES = new Set<PublicPageFrontmatter["changeFrequency"]>([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
]);

function assertValidFrontmatter(
  page: PublicPageFrontmatter,
): asserts page is PublicPageFrontmatter {
  const route = typeof page?.path === "string" ? page.path : "unknown route";
  const date = page?.lastModified;

  if (
    typeof date !== "string" ||
    !ISO_DATE_PATTERN.test(date) ||
    Number.isNaN(Date.parse(`${date}T00:00:00.000Z`)) ||
    new Date(`${date}T00:00:00.000Z`).toISOString().slice(0, 10) !== date
  ) {
    throw new Error(
      `Invalid lastModified for ${route}. Use a real date in YYYY-MM-DD format.`,
    );
  }

  if (
    typeof page.path !== "string" ||
    (page.path !== "/" &&
      (!page.path.startsWith("/") ||
        !page.path.endsWith("/") ||
        page.path.includes("?") ||
        page.path.includes("#")))
  ) {
    throw new Error(
      `Invalid public page path: ${route}. Use / or a path with a trailing slash.`,
    );
  }

  if (!CHANGE_FREQUENCIES.has(page.changeFrequency)) {
    throw new Error(`Invalid changeFrequency for ${route}.`);
  }

  if (
    typeof page.priority !== "number" ||
    !Number.isFinite(page.priority) ||
    page.priority < 0 ||
    page.priority > 1
  ) {
    throw new Error(`Invalid sitemap priority for ${route}. Use a number from 0 to 1.`);
  }
}

function definePublicPage<const T extends PublicPageFrontmatter>(
  page: T,
): Readonly<T> {
  assertValidFrontmatter(page);
  return Object.freeze({ ...page });
}

export const publicPageFrontmatter = {
  home: definePublicPage({
    path: "/",
    lastModified: "2026-08-28",
    changeFrequency: "weekly",
    priority: 1,
  }),
  toolsHub: definePublicPage({
    path: "/tools/",
    lastModified: "2026-08-31",
    changeFrequency: "weekly",
    priority: 0.85,
  }),
  hostingChooser: definePublicPage({
    path: "/tools/hosting-type-chooser/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.9,
  }),
  hostingTypesGuide: definePublicPage({
    path: "/guides/types-of-web-hosting/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.8,
  }),
  firstWebsiteHostingTool: definePublicPage({
    path: "/tools/best-web-hosting-for-beginners/",
    lastModified: "2026-08-31",
    changeFrequency: "monthly",
    priority: 0.7,
  }),
  smallBusinessHostingTool: definePublicPage({
    path: "/tools/best-web-hosting-for-small-business/",
    lastModified: "2026-08-31",
    changeFrequency: "monthly",
    priority: 0.74,
  }),
  artistHostingTool: definePublicPage({
    path: "/tools/best-web-hosting-for-artists/",
    lastModified: "2026-08-31",
    changeFrequency: "monthly",
    priority: 0.68,
  }),
  webHostingCostGuide: definePublicPage({
    path: "/guides/how-much-does-web-hosting-cost/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.8,
  }),
  websiteBuilderVsHostingGuide: definePublicPage({
    path: "/guides/website-builder-vs-web-hosting/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.75,
  }),
  websiteCostCalculator: definePublicPage({
    path: "/tools/website-cost-calculator/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.9,
  }),
  aiAgentHostingGuide: definePublicPage({
    path: "/guides/ai-agent-hosting/",
    lastModified: "2026-08-28",
    changeFrequency: "monthly",
    priority: 0.8,
  }),
  hermesVsOpenClawGuide: definePublicPage({
    path: "/guides/hermes-agent-vs-openclaw/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.75,
  }),
  bestVpsForOpenClawTool: definePublicPage({
    path: "/tools/best-vps-for-openclaw/",
    lastModified: "2026-08-31",
    changeFrequency: "monthly",
    priority: 0.74,
  }),
  bestVpsForHermesTool: definePublicPage({
    path: "/tools/best-vps-for-hermes-agent/",
    lastModified: "2026-08-31",
    changeFrequency: "monthly",
    priority: 0.7,
  }),
  bestN8nHostingTool: definePublicPage({
    path: "/tools/best-n8n-hosting/",
    lastModified: "2026-08-31",
    changeFrequency: "monthly",
    priority: 0.72,
  }),
  whatsappAiAgentGuide: definePublicPage({
    path: "/guides/whatsapp-ai-agent/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.78,
  }),
  openClawWhatsappGuide: definePublicPage({
    path: "/guides/openclaw-whatsapp/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.76,
  }),
  hermesAgentWhatsappGuide: definePublicPage({
    path: "/guides/hermes-agent-whatsapp/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.72,
  }),
  smsVsWhatsappGuide: definePublicPage({
    path: "/guides/sms-vs-whatsapp/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.66,
  }),
  voidfixGatewayGuide: definePublicPage({
    path: "/guides/voidfix-gateway/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.62,
  }),
  connectWhatsappToVoidfixGuide: definePublicPage({
    path: "/guides/connect-whatsapp-to-voidfix/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.6,
  }),
  connectVoidfixToGohighlevelGuide: definePublicPage({
    path: "/guides/connect-voidfix-to-gohighlevel/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.58,
  }),
  setUpVoidfixSmsGuide: definePublicPage({
    path: "/guides/set-up-voidfix-sms/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.58,
  }),
  methodology: definePublicPage({
    path: "/methodology/",
    lastModified: "2026-08-26",
    changeFrequency: "monthly",
    priority: 0.6,
  }),
  about: definePublicPage({
    path: "/about/",
    lastModified: "2026-08-26",
    changeFrequency: "yearly",
    priority: 0.5,
  }),
  affiliateDisclosure: definePublicPage({
    path: "/affiliate-disclosure/",
    lastModified: "2026-08-26",
    changeFrequency: "yearly",
    priority: 0.4,
  }),
  privacy: definePublicPage({
    path: "/privacy/",
    lastModified: "2026-08-26",
    changeFrequency: "yearly",
    priority: 0.3,
  }),
  terms: definePublicPage({
    path: "/terms/",
    lastModified: "2026-08-26",
    changeFrequency: "yearly",
    priority: 0.3,
  }),
  contact: definePublicPage({
    path: "/contact/",
    lastModified: "2026-08-26",
    changeFrequency: "yearly",
    priority: 0.4,
  }),
} as const;

export const publicPages: readonly PublicPageFrontmatter[] = Object.freeze(
  Object.values(publicPageFrontmatter),
);

export function formatPageDate(date: IsoDate): string {
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function buildPublicSitemap(
  pages: readonly PublicPageFrontmatter[] = publicPages,
): MetadataRoute.Sitemap {
  const seenPaths = new Set<string>();

  return pages.map((page) => {
    assertValidFrontmatter(page);

    if (seenPaths.has(page.path)) {
      throw new Error(`Duplicate public page path in sitemap: ${page.path}`);
    }

    seenPaths.add(page.path);

    return {
      url: absoluteUrl(page.path),
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    };
  });
}
