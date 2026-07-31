import type { Metadata } from "next";
import { PageHeader, Section, Prose } from "@/components/ui";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Zeybek Tarihçesi",
  description:
    "Zeybek dansının tarihçesi, evrensel felsefesi ve 'Efe' kavramının anlamı.",
};

export default function TarihcePage() {
  const history = getMarkdownDoc("pages", "tarihce");
  const efe = getMarkdownDoc("pages", "efe-kime-denir");
  const figur = getMarkdownDoc("pages","figur-anlami");

  return (
    <>
      <PageHeader
        eyebrow="Kültürel Miras"
        title={history.frontmatter.title as string}
        description={history.frontmatter.description as string}
      />
      <Section>
        <Prose html={history.html} />
      </Section>
      <Section className="bg-cream-200/60">
        <h2 className="font-display text-2xl font-bold text-brand-800">
          {efe.frontmatter.title as string}
        </h2>
        <div className="mt-6">
          <Prose html={efe.html} />
        </div>
      </Section>
      <Section>
        <h2 className="font-display text-2xl font-bold text-brand-800">
          {figur.frontmatter.title as string}
        </h2>
        <div className="mt-6">
          <Prose html={figur.html} />
        </div>
      </Section>
    </>
  );
}
