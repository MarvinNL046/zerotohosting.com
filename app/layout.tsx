import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://zerotohosting.com"),
  title: {
    default: "Zero To Hosting — Best Web Hosting Reviews for Beginners 2025",
    template: "%s | Zero To Hosting",
  },
  description:
    "We've tested 50+ hosting providers so you don't have to. Find the best web hosting for beginners, WordPress, eCommerce and more — with real speed tests and honest reviews.",
  keywords: [
    "best web hosting",
    "web hosting reviews",
    "cheap web hosting",
    "wordpress hosting",
    "hosting for beginners",
    "website hosting comparison",
  ],
  authors: [{ name: "Zero To Hosting" }],
  creator: "Zero To Hosting",
  publisher: "Zero To Hosting",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zerotohosting.com",
    siteName: "Zero To Hosting",
    title: "Zero To Hosting — Best Web Hosting Reviews for Beginners 2025",
    description:
      "Honest, independent hosting reviews backed by real testing. Find the perfect host for your first website.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zero To Hosting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero To Hosting — Best Web Hosting Reviews for Beginners 2025",
    description:
      "We've tested 50+ hosting providers. Here's what we found.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zero To Hosting",
  url: "https://zerotohosting.com",
  logo: "https://zerotohosting.com/logo.png",
  description: "Independent web hosting reviews and comparisons for beginners.",
  sameAs: [
    "https://twitter.com/zerotohosting",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zero To Hosting",
  url: "https://zerotohosting.com",
  description: "Best web hosting reviews and comparisons for beginners.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://zerotohosting.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
