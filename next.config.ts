import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.hostinger.com",
      },
      {
        protocol: "https",
        hostname: "**.siteground.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudways.com",
      },
      {
        protocol: "https",
        hostname: "**.bluehost.com",
      },
      {
        protocol: "https",
        hostname: "**.a2hosting.com",
      },
      {
        protocol: "https",
        hostname: "**.dreamhost.com",
      },
      {
        protocol: "https",
        hostname: "**.hostgator.com",
      },
      {
        protocol: "https",
        hostname: "**.wpengine.com",
      },
      {
        protocol: "https",
        hostname: "**.kinsta.com",
      },
      {
        protocol: "https",
        hostname: "**.greengeeks.com",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
    ],
  },
};

export default nextConfig;
