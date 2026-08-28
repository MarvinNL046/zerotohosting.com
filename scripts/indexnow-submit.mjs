import fs from "node:fs/promises";

const HOST = "zerotohosting.com";
const KEY = "005a4fef226988853271079c29665750";
const SITE_URL = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const BUILT_SITEMAP = new URL(
  "../.next/server/app/sitemap.xml.body",
  import.meta.url,
);

const forced = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");
const automaticProductionRun =
  process.argv.includes("--vercel-production") &&
  process.env.VERCEL_ENV === "production";

if (!forced && !dryRun && !automaticProductionRun) {
  console.log(
    "[indexnow] skipped: this is not a production deploy (use --force for a manual live submission)",
  );
  process.exit(0);
}

function decodeXmlText(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function sitemapEntries(xml) {
  return [...xml.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/gi)]
    .map((match) => {
      const block = match[1];
      const location = block.match(/<loc>\s*([^<]+?)\s*<\/loc>/i)?.[1];
      const lastModified = block.match(
        /<lastmod>\s*([^<]+?)\s*<\/lastmod>/i,
      )?.[1];

      return location
        ? {
            url: decodeXmlText(location.trim()),
            lastModified: lastModified?.trim(),
          }
        : undefined;
    })
    .filter(Boolean);
}

function sameHostEntries(entries) {
  return entries.filter((entry) => {
    try {
      const url = new URL(entry.url);
      return url.protocol === "https:" && url.host === HOST;
    } catch {
      return false;
    }
  });
}

function newestChangedGroup(entries) {
  const datedEntries = entries.filter((entry) => entry.lastModified);
  if (!datedEntries.length) return entries;

  const newestDate = datedEntries
    .map((entry) => entry.lastModified)
    .sort()
    .at(-1);

  return entries.filter((entry) => entry.lastModified === newestDate);
}

async function fetchXml(url) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: { "User-Agent": "ZeroToHosting-IndexNow/1.0" },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}: HTTP ${response.status}`);
  }

  return response.text();
}

async function liveSitemapXml() {
  const candidates = [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap-index.xml`];
  let lastError;

  for (const sitemap of candidates) {
    try {
      return await fetchXml(sitemap);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function submit(urlList) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "ZeroToHosting-IndexNow/1.0",
    },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (![200, 202].includes(response.status)) {
    throw new Error(
      `IndexNow rejected the submission: HTTP ${response.status} ${await response.text()}`,
    );
  }

  return response.status;
}

async function main() {
  const keyFile = new URL(`../public/${KEY}.txt`, import.meta.url);
  const configuredKey = (await fs.readFile(keyFile, "utf8")).trim();

  if (configuredKey !== KEY) {
    throw new Error("IndexNow key file does not match the configured key");
  }

  const xml = forced
    ? await liveSitemapXml()
    : await fs.readFile(BUILT_SITEMAP, "utf8");
  const allEntries = sameHostEntries(sitemapEntries(xml));
  const selectedEntries = forced ? allEntries : newestChangedGroup(allEntries);
  const urlList = [...new Set(selectedEntries.map((entry) => entry.url))];

  if (!urlList.length) {
    throw new Error("No valid same-host URLs found in the sitemap");
  }

  if (urlList.length > 10_000) {
    throw new Error("The IndexNow URL list is larger than 10,000 URLs");
  }

  if (dryRun) {
    console.log(
      `[indexnow] check passed: ${urlList.length} changed URL(s), key ${KEY_LOCATION}`,
    );
    for (const url of urlList) console.log(`[indexnow] ${url}`);
    return;
  }

  const status = await submit(urlList);
  console.log(
    `[indexnow] submitted ${urlList.length} URL(s) for ${HOST} (HTTP ${status})`,
  );
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  if (forced || dryRun) {
    console.error(`[indexnow] failed: ${message}`);
    process.exitCode = 1;
  } else {
    console.warn(
      `[indexnow] warning: ${message}. The production deploy will continue; retry with npm run indexnow.`,
    );
  }
}
