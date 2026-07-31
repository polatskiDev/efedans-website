import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const socialMediaLinks = [
    {
      name: "Instagram",
      iconSrc: "/images/social-media/instagram.png",
      href: "https://www.instagram.com/efedanszeybek",
    },
    {
      name: "Facebook",
      iconSrc: "/images/social-media/facebook.png",
      href: "https://www.facebook.com/share/1DY2skQujG/?mibextid=wwXIfr",
    },
    {
      name: "X",
      iconSrc: "/images/social-media/twitter.png",
      href: "https://x.com/efedanszeybek",
    },
    {
      name: "YouTube",
      iconSrc: "/images/social-media/youtube.png",
      href: "https://youtube.com/@efedanszeybekkulubu",
    },
    {
      name: "TikTok",
      iconSrc: "/images/social-media/tiktok.png",
      href: "https://www.tiktok.com/@efedanszeybekkulubu",
    },
    {
      name: "WhatsApp",
      iconSrc: "/images/social-media/whatsapp.png",
      href: "https://wa.me/905015738655",
    },
  ] as const;

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

          <div className="mt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-olive-200">
              Sosyal Medya
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {socialMediaLinks.map((item) => (
                <a
                  key={item.name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-600 bg-brand-700/50 transition hover:scale-105 hover:bg-brand-600/70"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${item.name} hesabina git`}
                  title={item.name}
                >
                  <Image
                    src={item.iconSrc}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
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
