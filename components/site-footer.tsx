import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNavigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-intro">
          <p className="footer-kicker">ZeroToHosting / hosting made simpler</p>
          <h2>Choose the type of hosting before the company.</h2>
          <p>
            A small set of tools to help you choose hosting. The chooser does not
            rank companies, and it is honest about what is still unknown.
          </p>
          <Link className="text-link light-link" href="/tools/hosting-type-chooser/">
            Try the hosting chooser <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="footer-links">
          {footerNavigation.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-note">
        <p>
          Some pages may use clearly labeled affiliate links. We may earn a commission
          after a sign-up or purchase. Payment does not change the chooser&apos;s results.
        </p>
        <p>© 2026 {siteConfig.name}</p>
      </div>
    </footer>
  );
}
