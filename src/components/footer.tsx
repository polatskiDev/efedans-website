import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-200/60 bg-brand-800 text-cream-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-cream-50">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-sm text-brand-100">{siteConfig.motto}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-olive-200">
            İletişim
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-100">
            <li>{siteConfig.contact.address}</li>
            <li>
              <a
                className="hover:text-cream-50"
                href={`tel:${siteConfig.contact.phoneHref}`}
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a
                className="hover:text-cream-50"
                href={`mailto:${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-cream-50"
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
              >
                {siteConfig.social.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-olive-200">
            Site
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-100">
            {siteConfig.nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link className="hover:text-cream-50" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:text-cream-50" href="/gizlilik-politikasi">
                Gizlilik Politikası
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-700/60 px-4 py-4 text-center text-xs text-brand-200 sm:px-6 lg:px-8">
        © {year} {siteConfig.name}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
