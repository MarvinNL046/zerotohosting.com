import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MobileNavigation } from "@/components/mobile-navigation";
import { primaryNavigation, siteConfig } from "@/lib/site";

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label={`${siteConfig.name} home`}>
          <BrandMark />
          <span className="brand-wordmark">
            <strong>Zero</strong>ToHosting
          </span>
        </Link>

        <nav className="desktop-navigation" aria-label="Main navigation">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/tools/hosting-type-chooser/">
          Find a hosting type that may fit <ArrowUpRight size={15} aria-hidden="true" />
        </Link>

        <MobileNavigation />
      </div>
    </header>
  );
}
