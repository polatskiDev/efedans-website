import type { Metadata } from "next";
import { PageHeader, Section, Prose } from "@/components/ui";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "EfeDans Zeybek Kulübü gizlilik politikası ve KVKK aydınlatma metni.",
};

export default function GizlilikPolitikasiPage() {
  const doc = getMarkdownDoc("pages", "gizlilik-politikasi");

  return (
    <>
      <PageHeader
        eyebrow="Yasal"
        title={doc.frontmatter.title as string}
        description={doc.frontmatter.description as string}
      />
      <Section>
        <Prose html={doc.html} />
      </Section>
    </>
  );
}
