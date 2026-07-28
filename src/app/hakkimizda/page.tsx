import type { Metadata } from "next";
import { PageHeader, Section, Prose } from "@/components/ui";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kulüp Hakkında",
  description:
    "EfeDans Zeybek Kulübü'nün kuruluş amacı, misyonu, vizyonu ve görsel kimliği.",
};

export default function HakkimizdaPage() {
  const about = getMarkdownDoc("pages", "hakkimizda");
  const identity = getMarkdownDoc("pages", "gorsel-kimlik");
  const manifesto = getMarkdownDoc("pages", "manifesto");

  return (
    <>
      <PageHeader
        eyebrow="Kulüp Hakkında"
        title={about.frontmatter.title as string}
        description={about.frontmatter.description as string}
      />
      <Section>
        <Prose html={about.html} />
      </Section>
      <Section className="bg-cream-200/60">
        <h2 className="font-display text-2xl font-bold text-brand-800">
          {identity.frontmatter.title as string}
        </h2>
        <div className="mt-6">
          <Prose html={identity.html} />
        </div>
      </Section>
      <Section>
        <h2 className="font-display text-2xl font-bold text-brand-800">
          Manifestomuz
        </h2>
        <div className="mt-6">
          <Prose html={manifesto.html} />
        </div>
      </Section>
    </>
  );
}
