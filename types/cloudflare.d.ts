/**
 * Minimal ambient shims for the Cloudflare Workers runtime types used by the
 * starter's `db/index.ts` and `worker/index.ts`. The real types are provided by
 * the Workers platform at build/deploy time; these declarations only keep a
 * plain `tsc --noEmit` green without pulling in `@cloudflare/workers-types`.
 */
declare module "cloudflare:workers" {
  export const env: Record<string, unknown> & { DB?: unknown };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fetcher = { fetch: (input: Request | string, init?: RequestInit) => Promise<Response> };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type D1Database = any;
