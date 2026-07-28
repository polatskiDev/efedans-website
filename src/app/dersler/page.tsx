import type { Metadata } from "next";
import { PageHeader, Section, Prose, Card } from "@/components/ui";
import { getMarkdownDoc, getJson } from "@/lib/content";

export const metadata: Metadata = {
  title: "Derslerimiz",
  description:
    "EfeDans Zeybek Kulübü eğitim ve atölye programı, eğitmenler ve dansçılar.",
};

interface Team {
  instructors: string[];
  dancers: string[];
}

export default function DerslerPage() {
  const lessons = getMarkdownDoc("pages", "dersler");
  const team = getJson<Team>("team.json");

  return (
    <>
      <PageHeader
        eyebrow="Eğitim"
        title={lessons.frontmatter.title as string}
        description={lessons.frontmatter.description as string}
      />
      <Section>
        <Prose html={lessons.html} />
      </Section>
      <Section className="bg-cream-200/60">
        <div className="grid gap-8 sm:grid-cols-2">
          <Card>
            <h2 className="font-display text-lg font-semibold text-brand-800">
              Eğitmenler
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-brand-900/80">
              {team.instructors.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-display text-lg font-semibold text-brand-800">
              Dansçılar
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-1 text-sm text-brand-900/80 sm:grid-cols-2">
              {team.dancers.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
