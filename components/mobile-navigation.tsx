"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/lib/site";

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <details className="mobile-navigation" key={pathname}>
      <summary>
        <Menu className="menu-open" size={22} aria-hidden="true" />
        <X className="menu-close" size={22} aria-hidden="true" />
        <span className="sr-only">Open or close navigation menu</span>
      </summary>
      <nav aria-label="Main navigation">
        {primaryNavigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link className="button button-primary" href="/tools/hosting-type-chooser/">
          Find a hosting type that may fit
        </Link>
      </nav>
    </details>
  );
}
