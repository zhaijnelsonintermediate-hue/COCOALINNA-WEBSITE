import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All canonical page URLs use a trailing slash (see lib/routes.ts and
  // docs/ROUTE-MAP.md). This makes the framework serve those URLs as 200
  // instead of 308-redirecting them, so canonical/sitemap URLs never redirect.
  trailingSlash: true,
};

export default nextConfig;
