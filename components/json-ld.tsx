import { absoluteUrl, siteConfig } from "@/lib/site";

type JsonLdDocument = Readonly<Record<string, unknown>>;

type JsonLdProps = Readonly<{
  data: JsonLdDocument;
  id: string;
}>;

export type BreadcrumbItem = Readonly<{
  href: string;
  label: string;
}>;

function serializeJsonLd(data: JsonLdDocument): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function HomeJsonLd() {
  const organizationId = `${siteConfig.url}/#organization`;

  return (
    <JsonLd
      id="home-structured-data"
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": organizationId,
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
          },
          {
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`,
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            inLanguage: siteConfig.locale.replace("_", "-"),
            publisher: { "@id": organizationId },
          },
        ],
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: Readonly<{ items: readonly BreadcrumbItem[] }>) {
  return (
    <JsonLd
      id="breadcrumb-structured-data"
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: absoluteUrl(item.href),
        })),
      }}
    />
  );
}

export function HostingChooserJsonLd() {
  const chooserUrl = absoluteUrl("/tools/hosting-type-chooser/");

  return (
    <JsonLd
      id="hosting-chooser-structured-data"
      data={{
        "@context": "https://schema.org",
        "@type": ["WebApplication", "SoftwareApplication"],
        "@id": `${chooserUrl}#application`,
        name: "Hosting Type Chooser",
        url: chooserUrl,
        description:
          "A simple question tool that helps you find a type of web hosting that may fit your website.",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        inLanguage: siteConfig.locale.replace("_", "-"),
        publisher: { "@id": `${siteConfig.url}/#organization` },
      }}
    />
  );
}

export function WebsiteCostCalculatorJsonLd() {
  const calculatorUrl = absoluteUrl("/tools/website-cost-calculator/");

  return (
    <JsonLd
      id="website-cost-calculator-structured-data"
      data={{
        "@context": "https://schema.org",
        "@type": ["WebApplication", "SoftwareApplication"],
        "@id": `${calculatorUrl}#application`,
        name: "Website Cost Calculator",
        url: calculatorUrl,
        description:
          "A browser-based calculator that adds a user's own first-year and later-year website costs.",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        inLanguage: siteConfig.locale.replace("_", "-"),
        publisher: { "@id": `${siteConfig.url}/#organization` },
      }}
    />
  );
}
