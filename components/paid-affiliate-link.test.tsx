import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PaidAffiliateLink } from "./paid-affiliate-link";
import { affiliateDestinations } from "../lib/affiliate-links";

describe("PaidAffiliateLink", () => {
  it("renders a safe external link with a nearby visible payment label", () => {
    const html = renderToStaticMarkup(
      <PaidAffiliateLink
        destination="voidfixWhatsappGateway"
        className="button"
      >
        Visit VoidFix
      </PaidAffiliateLink>,
    );

    expect(html).toContain(
      `href="${affiliateDestinations.voidfixWhatsappGateway.href}"`,
    );
    expect(html).toContain('target="_blank"');
    expect(html).toContain(
      'rel="sponsored nofollow noopener noreferrer"',
    );
    expect(html).toContain('class="button"');
    expect(html).toContain("Visit VoidFix");
    expect(html).toContain("Affiliate link — we may earn a commission.");
  });
});
