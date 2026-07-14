import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Framework default (trailingSlash: false). Canonical page URLs have NO
  // trailing slash (root is "/"); trailing-slash variants 308 → canonical.
  // This keeps static asset URLs (e.g. /company/foo.webp) working without any
  // redirect. See lib/routes.ts and docs/ROUTE-MAP.md.
};

export default nextConfig;
