import type { Metadata } from "next";
import { PageHeader, Section, Card } from "@/components/ui";
import { ContactForm } from "@/components/forms/contact-form";
import { RegistrationForm } from "@/components/forms/registration-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "EfeDans Zeybek Kulübü ile iletişime geçin veya ders/atölye kaydınızı oluşturun.",
};

export default function IletisimPage() {
  return (
    <>
      <PageHeader
        eyebrow="İletişim"
        title="Bize Ulaşın"
        description="Sorularınız için mesaj bırakın ya da ders/atölye kaydınızı hemen başlatın."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <Card>
            <h2 className="font-display text-lg font-semibold text-brand-800">
              İletişim Bilgileri
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-brand-900/80">
              <li>{siteConfig.contact.address}</li>
              <li>
                <a className="hover:text-brand-600" href={`tel:${siteConfig.contact.phoneHref}`}>
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a className="hover:text-brand-600" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-brand-600"
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {siteConfig.social.instagramHandle}
                </a>
              </li>
            </ul>
          </Card>

          <Card className="lg:col-span-2">
            <h2 className="font-display text-lg font-semibold text-brand-800">
              Mesaj Gönder
            </h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-cream-200/60">
        <Card className="mx-auto max-w-2xl">
          <h2 className="font-display text-lg font-semibold text-brand-800">
            Ders / Atölye Kayıt Talebi
          </h2>
          <p className="mt-1 text-sm text-brand-900/70">
            Özel ders, grup dersi veya atölye çalışmalarımız için ön kayıt
            oluşturun; ekibimiz sizinle iletişime geçsin.
          </p>
          <div className="mt-4">
            <RegistrationForm />
          </div>
        </Card>
      </Section>
    </>
  );
}
