import "./globals.css";

/**
 * Global fallback 404 for requests that match no locale group. Self-contained
 * html/body because there is no shared root layout (multiple root layouts live
 * in the (zh) and (en) route groups).
 */
export default function NotFound() {
  return (
    <html lang="zh-CN">
      <body>
        <div className="site-shell">
          <main id="main">
            <section className="page-hero not-found">
              <p className="eyebrow">404</p>
              <h1>页面不存在 · Page not found</h1>
              <p className="page-lead">您访问的页面可能已移动或不存在。The page may have moved or no longer exists.</p>
              <p className="section-more">
                {/* Plain anchors: this fallback renders its own document shell
                    outside the locale route groups. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a className="button button-dark" href="/">返回首页</a>{" "}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a className="button button-line" href="/en/">Back to home</a>
              </p>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
