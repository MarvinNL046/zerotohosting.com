import type { ComponentPropsWithoutRef } from "react";
import {
  AFFILIATE_LINK_REL,
  getAffiliateDestination,
  type AffiliateDestinationId,
} from "../lib/affiliate-links";

type PaidAffiliateLinkProps = Readonly<
  Omit<ComponentPropsWithoutRef<"a">, "href" | "rel" | "target"> & {
    destination: AffiliateDestinationId;
  }
>;

export function PaidAffiliateLink({
  destination,
  children,
  ...anchorProps
}: PaidAffiliateLinkProps) {
  const affiliate = getAffiliateDestination(destination);

  return (
    <span className="paid-affiliate-link">
      <a
        {...anchorProps}
        href={affiliate.href}
        target="_blank"
        rel={AFFILIATE_LINK_REL}
        data-affiliate-provider={affiliate.provider}
        data-affiliate-product={affiliate.product}
      >
        {children}
      </a>
      <span className="paid-affiliate-disclosure">
        Affiliate link — we may earn a commission.
      </span>
    </span>
  );
}
