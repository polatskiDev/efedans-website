import type { Metadata } from "next";
import { PageHeader, Section, Prose, Card } from "@/components/ui";
import Image from "next/image";
import { getMarkdownDoc, getJson } from "@/lib/content";

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "EfeDans gösteri formatı, teknik gereksinimler ve proje takvimi.",
};

interface CalendarEntry {
  period: string;
  title: string;
  details: string[];
}

export default function EtkinliklerPage() {
  const doc = getMarkdownDoc("pages", "etkinlikler");
  const { entries } = getJson<{ entries: CalendarEntry[] }>("proje-takvimi.json");

  return (
    <>
      <PageHeader
        eyebrow="Etkinlikler"
        title={doc.frontmatter.title as string}
        description={doc.frontmatter.description as string}
      />
      <Section>
        <Prose html={doc.html} />
      </Section>
      <Section className="pt-0 sm:pt-2">
        <figure className="overflow-hidden rounded-2xl border border-brand-200/70 bg-cream-50 shadow-sm">
          <Image
            src="/images/uploads/IMG_3980.jpeg"
            alt="EfeDans sahne düzeni"
            width={1600}
            height={900}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
            className="h-auto w-full object-cover"
          />
        </figure>
        <p className="mt-3 text-sm text-brand-900/70">
          EfeDans sahne gösterilerinde disiplinli kurgu, teknik uyum ve estetik
          bütünlük hedeflenir.
        </p>
      </Section>
      <Section className="bg-cream-200/60">
        <h2 className="font-display text-2xl font-bold text-brand-800">
          Proje Takvimi
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {entries.map((entry) => (
            <Card key={entry.period}>
              <p className="text-xs font-semibold uppercase tracking-wide text-olive-600">
                {entry.period}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-brand-800">
                {entry.title}
              </h3>
              {entry.details.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-brand-900/80">
                  {entry.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
