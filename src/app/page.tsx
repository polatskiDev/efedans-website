import Image from "next/image";
import Link from "next/link";
import { Section, Container, Card } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";
import { getJson } from "@/lib/content";

interface TimelineStage {
  title: string;
  detail: string;
  feeling: string;
}

export default function HomePage() {
  const stages = getJson<TimelineStage[]>("dramatik-harita.json");

  return (
    <>
      <section className="bg-brand-800 text-cream-50">
        <Container className="flex flex-col items-start gap-6 py-24 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-olive-200">
            Kültür · Sanat · Halk Dansları
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            {siteConfig.motto}
          </h1>
          <p className="max-w-2xl text-lg text-brand-100">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/hakkimizda"
              className="rounded-md bg-olive-500 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-olive-400"
            >
              Kulübü Tanı
            </Link>
            <Link
              href="/iletisim"
              className="rounded-md border border-cream-50/40 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-brand-700"
            >
              Bize Ulaşın
            </Link>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
              Neden EfeDans?
            </h2>
            <p className="mt-4 max-w-3xl text-brand-900/80">
              EfeDans, zeybeği sadece bir dans olarak değil, bir karakter ve
              sahne anlatısı olarak sunar. Her performansında yalnızca
              figürleri değil; zeybeğin taşıdığı ruhu, cesareti, asaleti,
              özgürlüğü, onuru ve dayanışma değerlerini doğru biçimde aktarmayı
              hedefler.
            </p>
            <blockquote className="mt-6 max-w-3xl border-l-4 border-olive-400 pl-4 italic text-olive-800">
              Neden EfeDans? Çünkü biz zeybeği sadece bir ritim olarak değil,
              bir karakter; bir oyun olarak değil, bir ruh olarak sahneye
              taşıyoruz.
            </blockquote>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-brand-200/70 bg-cream-50 shadow-sm">
            <Image
              src="/images/uploads/IMG_3744.jpeg"
              alt="EfeDans zeybek performansı"
              width={1400}
              height={1000}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </Section>

      <Section className="bg-cream-200/60">
        <h2 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
          Zeybeğin Dramatik Yolculuğu
        </h2>
        <p className="mt-2 max-w-2xl text-brand-900/70">
          Her EfeDans koreografisi, zeybeğin içinde barındırdığı evrensel
          duygusal katmanları seyirciye eksiksiz aktarmak üzere tasarlanır.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage, index) => (
            <Card key={stage.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-olive-600">
                {index + 1}. Aşama
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-brand-800">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm text-brand-900/70">{stage.detail}</p>
              <p className="mt-3 text-sm italic text-olive-700">
                “{stage.feeling}”
              </p>
            </Card>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-brand-800">
              Kulüpten Haberdar Olun
            </h2>
            <p className="mt-2 text-sm text-brand-900/70">
              Sezon takvimi, gösteriler ve atölyeler hakkında güncel bilgi
              için repertuvarımıza ve etkinliklerimize göz atın.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/repertuvar"
                className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-brand-500"
              >
                Repertuvarı İncele
              </Link>
              <Link
                href="/etkinlikler"
                className="rounded-md border border-brand-300 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
              >
                Etkinlik Takvimi
              </Link>
            </div>
          </Card>
          <Card>
            <h2 className="font-display text-xl font-semibold text-brand-800">
              İletişim
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-brand-900/80">
              <li>{siteConfig.contact.address}</li>
              <li>
                <a
                  className="hover:text-brand-600"
                  href={`tel:${siteConfig.contact.phoneHref}`}
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-brand-600"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
