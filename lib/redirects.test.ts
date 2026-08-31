import { describe, expect, it } from "vitest";

import nextConfig from "../next.config";

async function getRedirects() {
  if (!nextConfig.redirects) {
    throw new Error("Expected Next.js redirects to be configured.");
  }

  return nextConfig.redirects();
}

describe("Next.js redirects", () => {
  it("redirects every legacy best-guide URL directly to its canonical tool URL", async () => {
    const redirects = await getRedirects();
    const expectedRedirects = [
      [
        "/guides/best-web-hosting-for-small-business/",
        "/tools/best-web-hosting-for-small-business/",
      ],
      [
        "/guides/best-web-hosting-for-artists/",
        "/tools/best-web-hosting-for-artists/",
      ],
      [
        "/guides/best-hosting-type-for-a-first-website/",
        "/tools/best-web-hosting-for-beginners/",
      ],
      [
        "/guides/best-vps-for-openclaw/",
        "/tools/best-vps-for-openclaw/",
      ],
      [
        "/guides/best-vps-for-hermes-agent/",
        "/tools/best-vps-for-hermes-agent/",
      ],
      [
        "/guides/best-n8n-hosting/",
        "/tools/best-n8n-hosting/",
      ],
    ] as const;

    for (const [source, destination] of expectedRedirects) {
      expect(redirects).toContainEqual({ source, destination, statusCode: 301 });
    }
  });

  it("redirects the www host to the canonical apex host", async () => {
    const redirects = await getRedirects();

    expect(redirects).toContainEqual({
      source: "/:path*",
      has: [{ type: "host", value: "www.zerotohosting.com" }],
      destination: "https://zerotohosting.com/:path*/",
      statusCode: 301,
    });
  });
});
