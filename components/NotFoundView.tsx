import type { Locale } from "@/lib/site";
import { t } from "@/lib/i18n";
import { pathFor } from "@/lib/routes";
import { PageShell } from "@/components/PageShell";

export function NotFoundView({ locale }: { locale: Locale }) {
  const ui = t(locale);
  return (
    <PageShell locale={locale} routeKey="home">
      <section className="page-hero not-found">
        <p className="eyebrow">404</p>
        <h1>{ui.notFoundTitle}</h1>
        <p className="page-lead">{ui.notFoundBody}</p>
        <p className="section-more">
          <a className="button button-dark" href={pathFor(locale, "home")}>
            {ui.backHome}
          </a>
        </p>
      </section>
    </PageShell>
  );
}
