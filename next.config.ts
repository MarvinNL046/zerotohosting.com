import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.zerotohosting.com" }],
        destination: "https://zerotohosting.com/:path*/",
        statusCode: 301,
      },
      {
        source: "/guides/best-web-hosting-for-small-business/",
        destination: "/tools/best-web-hosting-for-small-business/",
        statusCode: 301,
      },
      {
        source: "/guides/best-web-hosting-for-artists/",
        destination: "/tools/best-web-hosting-for-artists/",
        statusCode: 301,
      },
      {
        source: "/guides/best-hosting-type-for-a-first-website/",
        destination: "/tools/best-web-hosting-for-beginners/",
        statusCode: 301,
      },
      {
        source: "/guides/best-vps-for-openclaw/",
        destination: "/tools/best-vps-for-openclaw/",
        statusCode: 301,
      },
      {
        source: "/guides/best-vps-for-hermes-agent/",
        destination: "/tools/best-vps-for-hermes-agent/",
        statusCode: 301,
      },
      {
        source: "/guides/best-n8n-hosting/",
        destination: "/tools/best-n8n-hosting/",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
