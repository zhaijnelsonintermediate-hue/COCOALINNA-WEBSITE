/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import redirectsConfig from "../data/redirects.json";
import { SEO_FILES } from "../lib/seo-files";

// Legacy-URL 301 map (single source: data/redirects.json). Normalises a
// trailing slash so "/product" and "/product/" both match.
const REDIRECTS = new Map<string, { to: string; status: number }>();
for (const r of redirectsConfig.redirects) {
  REDIRECTS.set(r.from.replace(/\/$/, ""), { to: r.to, status: r.status });
}

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Permanent redirects for legacy URLs (before any rendering).
    const redirect = REDIRECTS.get(url.pathname.replace(/\/$/, ""));
    if (redirect) {
      return Response.redirect(new URL(redirect.to, url.origin).toString(), redirect.status);
    }

    // File-style SEO endpoints, served here so trailingSlash:true does not
    // 308-redirect these dotted paths.
    const seo = SEO_FILES[url.pathname];
    if (seo) {
      const { body, contentType } = seo();
      return new Response(body, { headers: { "content-type": contentType } });
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
