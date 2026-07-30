import type { Metadata } from "next";
import { PageHeader, Section, Prose, Card } from "@/components/ui";
import { getMarkdownDoc, getJson } from "@/lib/content";
import Image from "next/image";

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
  const egitimSuresi = getMarkdownDoc("pages", "egitim-suresi");

  return (
    <>
      <PageHeader
        eyebrow="Eğitim"
        title={lessons.frontmatter.title as string}
        description={lessons.frontmatter.description as string}
      />
      <Section>
        <h2 className="font-display text-2xl font-bold text-brand-800">
          Eğitim Süresi
        </h2>
        <div className="mt-6">
          <Prose html={egitimSuresi.html} />
        </div>
      </Section>
      <Section>
        <Prose html={lessons.html} />
      </Section>
      <Section className="bg-cream-200/60">
        <figure className="mb-8 overflow-hidden rounded-2xl border border-brand-200/70 bg-cream-50 shadow-sm">
          <Image
            src="/images/uploads/IMG_3977.jpeg"
            alt="EfeDans eğitim ekibi"
            width={1400}
            height={1000}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
            className="h-auto w-full object-cover"
          />
        </figure>
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
        </div>
      </Section>
    </>
  );
}
