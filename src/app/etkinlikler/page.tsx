import type { Metadata } from "next";
import { PageHeader, Section, Prose, Card } from "@/components/ui";
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
