export const AFFILIATE_LINK_REL =
  "sponsored nofollow noopener noreferrer" as const;

export const affiliateDestinations = Object.freeze({
  voidfixWhatsappGateway: Object.freeze({
    provider: "VoidFix",
    product: "WhatsApp Gateway",
    href: "https://wa.voidfix.com/?ref=B35F206A",
  }),
  voidfixSmsGateway: Object.freeze({
    provider: "VoidFix",
    product: "SMS Gateway",
    href: "https://sms.voidfix.com/register.php?ref=MARVIN1042",
  }),
} as const);

export type AffiliateDestinationId = keyof typeof affiliateDestinations;

export function getAffiliateDestination(id: AffiliateDestinationId) {
  return affiliateDestinations[id];
}
