import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  AFFILIATE_LINK_REL,
  affiliateDestinations,
  getAffiliateDestination,
} from "./affiliate-links";

function findSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return findSourceFiles(path);
    }

    return /\.(?:ts|tsx)$/.test(entry.name) ? [path] : [];
  });
}

describe("affiliate destination registry", () => {
  it("keeps the approved VoidFix destinations in one typed registry", () => {
    expect(Object.keys(affiliateDestinations)).toEqual([
      "voidfixWhatsappGateway",
      "voidfixSmsGateway",
    ]);
    expect(affiliateDestinations.voidfixWhatsappGateway.provider).toBe("VoidFix");
    expect(affiliateDestinations.voidfixWhatsappGateway.product).toBe(
      "WhatsApp Gateway",
    );
    expect(affiliateDestinations.voidfixSmsGateway.provider).toBe("VoidFix");
    expect(affiliateDestinations.voidfixSmsGateway.product).toBe("SMS Gateway");
    expect(getAffiliateDestination("voidfixWhatsappGateway")).toBe(
      affiliateDestinations.voidfixWhatsappGateway,
    );
  });

  it("uses HTTPS destinations and the required paid-link relationship", () => {
    for (const destination of Object.values(affiliateDestinations)) {
      expect(new URL(destination.href).protocol).toBe("https:");
      expect(Object.isFrozen(destination)).toBe(true);
    }

    expect(Object.isFrozen(affiliateDestinations)).toBe(true);
    expect(AFFILIATE_LINK_REL).toBe(
      "sponsored nofollow noopener noreferrer",
    );
  });

  it("does not hard-code referral URLs in pages or components", () => {
    const sourceFiles = ["app", "components"].flatMap((directory) =>
      findSourceFiles(join(process.cwd(), directory)),
    );
    const referralUrls = Object.values(affiliateDestinations).map(
      (destination) => destination.href,
    );

    for (const file of sourceFiles) {
      const source = readFileSync(file, "utf8");

      for (const referralUrl of referralUrls) {
        expect(source, `${referralUrl} must stay in lib/affiliate-links.ts`).not.toContain(
          referralUrl,
        );
      }
    }
  });
});
