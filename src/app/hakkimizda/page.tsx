import type { Metadata } from "next";
import Image from "next/image";
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
  const editor = getMarkdownDoc("pages", "editor");

  return (
    <>
      <PageHeader
        eyebrow="Kulüp Hakkında"
        title={about.frontmatter.title as string}
        description={about.frontmatter.description as string}
      />
      <Section>
        <figure className="overflow-hidden rounded-2xl border border-brand-200/60 bg-cream-50 shadow-sm">
          <Image
            src="/images/uploads/hakkinda.jpeg"
            alt="EfeDans Zeybek Kulübü üyeleri"
            width={1600}
            height={1000}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 960px"
            className="h-auto w-full object-cover"
            priority
          />
        </figure>
        <div className="mt-8">
          <Prose html={about.html} />
        </div>
      </Section>
      <Section className="bg-cream-200/60">
        <h2 className="font-display text-2xl font-bold text-brand-800">
          {identity.frontmatter.title as string}
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <figure className="overflow-hidden rounded-2xl border border-brand-200/70 bg-cream-50 shadow-sm">
            <Image
              src="/images/uploads/IMG_3747.jpeg"
              alt="EfeDans sahne anı"
              width={1200}
              height={1500}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
              className="h-full w-full object-cover"
            />
          </figure>
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
      <Section>
        <h2 className="font-display text-2xl font-bold text-brand-800">
          Editörümüz
        </h2>
        <div className="mt-6">
          <Prose html={editor.html} />
        </div>
      </Section>
    </>
  );
}
