import Image, { type StaticImageData } from "next/image";
import { ExternalLink } from "lucide-react";

export type ProviderProof = Readonly<{
  name: string;
  image: StaticImageData;
  alt: string;
  caption: string;
  observations: readonly string[];
  href: string;
  ctaLabel: string;
}>;

type ProviderProofListProps = Readonly<{
  providers: readonly ProviderProof[];
}>;

export function ProviderProofList({ providers }: ProviderProofListProps) {
  return (
    <div className="provider-evidence-list">
      {providers.map((provider, index) => (
        <article className="provider-evidence-card" key={provider.name}>
          <header className="provider-evidence-header">
            <span className="guide-card-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{provider.name}</h3>
          </header>

          <figure>
            <div className="provider-screenshot-frame">
              <Image
                src={provider.image}
                alt={provider.alt}
                sizes="(max-width: 760px) calc(100vw - 56px), (max-width: 1180px) calc(100vw - 330px), 850px"
              />
            </div>
            <figcaption>{provider.caption}</figcaption>
          </figure>

          <div className="provider-evidence-copy">
            <h4>What you can check here</h4>
            <ul>
              {provider.observations.map((observation) => (
                <li key={observation}>{observation}</li>
              ))}
            </ul>

            <div className="provider-proof-action">
              <a
                className="button button-primary"
                href={provider.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {provider.ctaLabel}
                <ExternalLink size={16} aria-hidden="true" />
              </a>
              <span>Provider link — not an affiliate link.</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
