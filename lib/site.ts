export type SiteLink = Readonly<{
  href: string;
  label: string;
}>;

export type FooterNavigationGroup = Readonly<{
  title: string;
  links: readonly SiteLink[];
}>;

export const siteConfig = {
  name: "ZeroToHosting",
  shortName: "ZeroToHosting",
  url: "https://zerotohosting.com",
  description:
    "Simple tools and guides that help you find a type of web hosting that may fit, without ranking companies.",
  locale: "en_US",
} as const;

export const primaryNavigation: readonly SiteLink[] = [
  { href: "/tools/hosting-type-chooser/", label: "Choose hosting" },
  { href: "/guides/types-of-web-hosting/", label: "Hosting types" },
  { href: "/guides/how-much-does-web-hosting-cost/", label: "Website costs" },
  { href: "/guides/ai-agent-hosting/", label: "AI agents" },
  { href: "/methodology/", label: "How we work" },
];

export const footerNavigation: readonly FooterNavigationGroup[] = [
  {
    title: "Explore",
    links: [
      { href: "/tools/hosting-type-chooser/", label: "Choose hosting" },
      { href: "/guides/types-of-web-hosting/", label: "Types of web hosting" },
      {
        href: "/guides/best-hosting-type-for-a-first-website/",
        label: "First website hosting",
      },
      {
        href: "/guides/website-builder-vs-web-hosting/",
        label: "Builder vs web hosting",
      },
      {
        href: "/guides/how-much-does-web-hosting-cost/",
        label: "Web hosting cost",
      },
      {
        href: "/tools/website-cost-calculator/",
        label: "Website cost calculator",
      },
    ],
  },
  {
    title: "AI agents",
    links: [
      { href: "/guides/ai-agent-hosting/", label: "AI agent hosting" },
      {
        href: "/guides/whatsapp-ai-agent/",
        label: "WhatsApp AI agents",
      },
      {
        href: "/guides/hermes-agent-vs-openclaw/",
        label: "Hermes Agent vs OpenClaw",
      },
      {
        href: "/guides/best-vps-for-openclaw/",
        label: "Best VPS for OpenClaw",
      },
    ],
  },
  {
    title: "ZeroToHosting",
    links: [
      { href: "/methodology/", label: "How we work" },
      { href: "/about/", label: "About" },
      { href: "/contact/", label: "Contact" },
    ],
  },
  {
    title: "Site rules",
    links: [
      { href: "/affiliate-disclosure/", label: "Affiliate links" },
      { href: "/privacy/", label: "Privacy" },
      { href: "/terms/", label: "Terms" },
    ],
  },
];

export function absoluteUrl(path: string = "/"): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (path === "/" || path === "") {
    return siteConfig.url;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
