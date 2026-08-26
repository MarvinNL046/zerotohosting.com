import { expect, test } from "@playwright/test";
import { affiliateDestinations } from "../../lib/affiliate-links";
import { publicPages } from "../../lib/public-pages";
import { absoluteUrl } from "../../lib/site";

const standardStaticAnswers = {
  stage: "A new project",
  platform: "A website built from files that are ready to show",
  workload: "Public pages that show the same content to most visitors",
  customControl: "No. Normal hosting features are enough",
  opsCapability: "No. I want a plan that includes server care",
  evidence: "No proof that the hosting plan is too small",
  criticality:
    "A short outage would be annoying but would not cause serious harm",
  compliance: "No special rules for either one",
} as const;

test("home explains the product and links to the two core experiences", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Choose a web hosting type that may fit/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Not sure which web hosting you need?",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Help me choose hosting", exact: true }).first()).toHaveAttribute(
    "href",
    "/tools/hosting-type-chooser/",
  );
  await expect(page.getByRole("link", { name: "Learn the hosting types" })).toHaveAttribute(
    "href",
    "/guides/types-of-web-hosting/",
  );
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBe(true);
});

test("mobile navigation closes after a client-side route change", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile navigation regression");

  await page.goto("/");
  const mobileNavigation = page.locator(".mobile-navigation");
  await mobileNavigation.locator("summary").click();
  await expect(mobileNavigation).toHaveAttribute("open", "");

  await mobileNavigation.getByRole("link", { name: "Choose hosting" }).click();

  await expect(page).toHaveURL(/\/tools\/hosting-type-chooser\/$/);
  await expect(page.locator(".mobile-navigation")).not.toHaveAttribute("open", "");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Find a hosting type—or the next choice you need to make.",
    }),
  ).toBeVisible();
});

test("chooser submits a complete static-site path and renders an explainable result", async ({
  page,
}) => {
  await page.goto("/tools/hosting-type-chooser/");

  for (const label of Object.values(standardStaticAnswers)) {
    await page.getByRole("radio", { name: label }).check();
  }

  await page.getByRole("button", { name: "Show my result" }).click();

  await expect(page).toHaveURL(/submitted=yes.*platform=static/);
  await expect(page.locator("#hosting-result h2")).toHaveText("Use hosting made for static websites");
  await expect(page.locator("#hosting-result .confidence-pill")).toHaveText("Very sure");
  await expect(page.getByRole("heading", { name: "Why this may fit" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Check these before you choose" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Check again if any of these things change" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Learn how static hosting works/ })).toHaveAttribute(
    "href",
    "/guides/types-of-web-hosting/#static-and-edge-hosting",
  );
});

test("chooser remains functional with client-side JavaScript disabled", async ({
  browser,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "One no-JavaScript run is sufficient");

  const context = await browser.newContext({
    baseURL: "http://localhost:3000",
    javaScriptEnabled: false,
  });
  const page = await context.newPage();

  await page.goto("/tools/hosting-type-chooser/");
  for (const label of Object.values(standardStaticAnswers)) {
    await page.getByRole("radio", { name: label }).check();
  }
  await page.getByRole("button", { name: "Show my result" }).click();

  await expect(page.locator("#hosting-result h2")).toHaveText("Use hosting made for static websites");
  await expect(page.locator("#hosting-result .confidence-pill")).toHaveText("Very sure");
  await context.close();
});

test("unknown inputs stay explicit and lower decision confidence", async ({ page }) => {
  await page.goto(
    "/tools/hosting-type-chooser/?submitted=yes&stage=unknown&platform=unknown&workload=unknown&customControl=unknown&opsCapability=unknown&evidence=unknown&criticality=unknown&compliance=unknown#hosting-result",
  );

  await expect(page.locator("#hosting-result h2")).toHaveText(
    "Choose the website or app type before choosing hosting",
  );
  await expect(page.locator("#hosting-result .confidence-pill")).toHaveText("Not very sure");
  await expect(page.locator("#hosting-result")).toContainText(
    "We did not count a missing answer as “no”",
  );
});

test("regulated or residency requirements stop at the specialist boundary", async ({ page }) => {
  await page.goto(
    "/tools/hosting-type-chooser/?submitted=yes&stage=existing&platform=wordpress&workload=membership-logins&customControl=no&opsCapability=no&evidence=none&criticality=high&compliance=regulated-or-residency#hosting-result",
  );

  await expect(page.locator("#hosting-result h2")).toHaveText(
    "Ask a specialist to review the website or app setup before you choose hosting",
  );
  await expect(page.locator("#hosting-result")).toContainText(
    "A written list of data locations",
  );
  await expect(page.getByRole("link", { name: /simple hosting advice is not enough/ })).toHaveAttribute(
    "href",
    "/guides/types-of-web-hosting/#specialist-architectures",
  );
});

test("guide anchors exist and retired commercial routes return not found", async ({ page, request }) => {
  await page.goto("/guides/types-of-web-hosting/#management-responsibility");
  await expect(page.locator("#management-responsibility")).toBeVisible();
  await expect(page.locator("#measure-before-you-move")).toContainText(
    "A slow website does not always need bigger hosting",
  );
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBe(true);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Types of web hosting: a practical decision guide | ZeroToHosting",
  );

  const retiredRoute = await request.get("/reviews/");
  expect(retiredRoute.status()).toBe(404);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const sitemapText = await sitemap.text();
  const sitemapBlocks = [
    ...sitemapText.matchAll(/<url>([\s\S]*?)<\/url>/g),
  ].map((match) => match[1]);
  const readTag = (block: string, tag: string) =>
    block.match(new RegExp(`<${tag}>([^<]+)</${tag}>`))?.[1];
  const sitemapEntries = new Map(
    sitemapBlocks.map((block) => [
      readTag(block, "loc"),
      readTag(block, "lastmod"),
    ]),
  );

  expect(sitemapBlocks).toHaveLength(publicPages.length);
  expect(sitemapEntries.size).toBe(publicPages.length);
  for (const pageFrontmatter of publicPages) {
    expect(sitemapEntries.get(absoluteUrl(pageFrontmatter.path))).toBe(
      pageFrontmatter.lastModified,
    );
  }
  expect(sitemapText).not.toContain("/reviews/");
  expect(sitemapText).not.toContain("/deals/");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Disallow: /");
});

test("the two new topic clusters render their six entry pages", async ({ page }) => {
  const routes = [
    ["/guides/how-much-does-web-hosting-cost/", "How much does web hosting cost?"],
    ["/guides/website-builder-vs-web-hosting/", "Website builder vs web hosting"],
    ["/tools/website-cost-calculator/", "Website cost calculator"],
    ["/guides/hermes-agent-vs-openclaw/", "Hermes Agent vs OpenClaw: which setup fits you?"],
    ["/guides/ai-agent-hosting/", "AI agent hosting, explained simply"],
    ["/guides/best-vps-for-openclaw/", "What is the best VPS for OpenClaw?"],
  ] as const;

  for (const [path, heading] of routes) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      .toBe(true);
  }
});

test("the WhatsApp and VoidFix cluster renders all eight routes", async ({
  page,
}) => {
  const routes = [
    ["/guides/whatsapp-ai-agent/", "How to Connect an AI Agent to WhatsApp"],
    ["/guides/openclaw-whatsapp/", "How to Connect OpenClaw to WhatsApp"],
    [
      "/guides/hermes-agent-whatsapp/",
      "How to Connect Hermes Agent to WhatsApp",
    ],
    ["/guides/sms-vs-whatsapp/", "SMS vs WhatsApp: Which Should You Use?"],
    ["/guides/voidfix-gateway/", "What Is VoidFix Gateway?"],
    [
      "/guides/connect-whatsapp-to-voidfix/",
      "How to Connect WhatsApp to VoidFix (Step by Step)",
    ],
    [
      "/guides/connect-voidfix-to-gohighlevel/",
      "How to Connect VoidFix WhatsApp to GoHighLevel (GHL)",
    ],
    [
      "/guides/set-up-voidfix-sms/",
      "How to Set Up VoidFix SMS on an Android Phone",
    ],
  ] as const;

  for (const [path, heading] of routes) {
    await page.goto(path);
    await expect(
      page.getByRole("heading", { level: 1, name: heading }),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
  }
});

test("VoidFix affiliate links stay disclosed and sponsored", async ({ page }) => {
  await page.goto("/guides/voidfix-gateway/");

  await expect(page.getByText("Affiliate links:", { exact: true })).toBeVisible();

  for (const destination of Object.values(affiliateDestinations)) {
    const paidLink = page.locator(`a[href="${destination.href}"]`);
    await expect(paidLink).toHaveCount(1);
    await expect(paidLink).toHaveAttribute(
      "rel",
      "sponsored nofollow noopener noreferrer",
    );
    await expect(
      paidLink.locator("xpath=following-sibling::*[contains(., 'Affiliate link')]")
    ).toBeVisible();
  }
});

test("website cost calculator keeps unknown amounts out of a complete-looking total", async ({
  page,
}) => {
  await page.goto("/tools/website-cost-calculator/", {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("First-year total so far", { exact: true })).toBeVisible();
  await expect(page.getByText("Later-year total so far", { exact: true })).toBeVisible();
  await expect(page.getByText(/Fill every yearly cost box/)).toBeVisible();

  await page.getByRole("spinbutton", { name: "Domain name, year 1" }).fill("12.50");
  await page.getByRole("spinbutton", { name: "Hosting or website builder, year 1" }).fill("100");
  await page.getByRole("spinbutton", { name: "Theme, template, or design" }).fill("50");

  await expect(page.getByTestId("first-year-total")).toHaveText("$162.50");
  await expect(page.getByTestId("later-year-total")).toHaveText("$0.00");
  await expect(page.getByText(/Fill every yearly cost box/)).toBeVisible();
  await expect(page.locator(".cost-change-note")).not.toContainText("less per year");

  await page.getByRole("spinbutton", { name: "Domain name, later year" }).fill("20");
  await page.getByRole("spinbutton", { name: "Hosting or website builder, later year" }).fill("140");
  const amountInputs = page.locator("#calculator input[type='number']");
  for (let index = 0; index < await amountInputs.count(); index += 1) {
    const input = amountInputs.nth(index);
    if ((await input.inputValue()) === "") {
      await input.fill("0");
    }
  }

  await expect(page.getByText("First-year total", { exact: true })).toBeVisible();
  await expect(page.getByText("Later-year total", { exact: true })).toBeVisible();
  await expect(page.getByTestId("first-year-total")).toHaveText("$162.50");
  await expect(page.getByTestId("later-year-total")).toHaveText("$160.00");
  await expect(page.getByTestId("recurring-change")).toHaveText("$47.50");
});

test("first-website guide keeps provider screenshots dated, named, and subordinate", async ({
  page,
}) => {
  await page.goto("/guides/best-hosting-type-for-a-first-website/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "What is the best hosting type for a first website?",
    }),
  ).toBeVisible();
  await expect(page.locator("time[datetime='2026-08-26']").first()).toHaveText(
    "August 26, 2026",
  );
  await expect(
    page.getByRole("link", { name: "Match my site to a hosting type" }).first(),
  ).toHaveAttribute("href", "/tools/hosting-type-chooser/");

  const screenshots = page.locator(".provider-screenshot-frame img");
  await expect(screenshots).toHaveCount(3);
  const expectedScreenshotAlts = [
    /Hostinger web-hosting page/,
    /SiteGround web-hosting page/,
    /Namecheap shared-hosting page/,
  ];
  for (let index = 0; index < 3; index += 1) {
    const screenshot = screenshots.nth(index);
    await expect(screenshot).toHaveAttribute(
      "alt",
      expectedScreenshotAlts[index],
    );
    await screenshot.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        screenshot.evaluate(
          (image) =>
            image instanceof HTMLImageElement &&
            image.complete &&
            image.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }

  await expect(
    page.getByText(
      "The images were saved on August 25, 2026. We did not buy the plans or test speed, uptime, security, or support.",
      { exact: false },
    ),
  ).toBeVisible();
  await expect(
    page.getByText("Examples are not company recommendations", { exact: true }),
  ).toBeVisible();

  const captions = page.locator(".provider-evidence-card figcaption");
  await expect(captions).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(captions.nth(index)).toContainText("August 25, 2026");
    await expect(captions.nth(index)).toContainText(
      "This is the company’s own information, not our test.",
    );
  }

  await expect(
    page.getByRole("link", {
      name: "Check the current Hostinger web-hosting page",
    }),
  ).toHaveAttribute("href", "https://www.hostinger.com/web-hosting");
  await expect(
    page.getByRole("link", {
      name: "Check the current SiteGround web-hosting page",
    }),
  ).toHaveAttribute("href", "https://www.siteground.com/web-hosting.htm");
  await expect(
    page.getByRole("link", {
      name: "Check the current Namecheap shared-hosting page",
    }),
  ).toHaveAttribute("href", "https://www.namecheap.com/hosting/shared/");

  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
});
