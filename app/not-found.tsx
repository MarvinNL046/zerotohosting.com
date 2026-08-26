import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-hero">
        <div className="result-empty-icon"><Compass size={25} aria-hidden="true" /></div>
        <p className="eyebrow">404 / page not found</p>
        <h1>We could not find this page.</h1>
        <p className="lede">
          The page may have moved. The page address may also be wrong or
          incomplete.
        </p>
        <div className="button-row">
          <Link className="button button-primary" href="/">
            <ArrowLeft size={17} aria-hidden="true" /> Back to ZeroToHosting
          </Link>
          <Link className="button button-quiet" href="/tools/hosting-type-chooser/">
            Open the hosting chooser
          </Link>
        </div>
      </header>
    </main>
  );
}
