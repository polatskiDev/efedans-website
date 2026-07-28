import type { Metadata } from "next";
import { PageHeader, Section, Card } from "@/components/ui";
import { getJson } from "@/lib/content";

export const metadata: Metadata = {
  title: "Repertuvar",
  description:
    "EfeDans Zeybek Kulübü'nün Ege bölgesi ağırlıklı zengin zeybek repertuvarı.",
};

interface RepertoireEntry {
  region: string;
  dances: string[];
}

export default function RepertuvarPage() {
  const { regions } = getJson<{ regions: RepertoireEntry[] }>("repertoire.json");

  return (
    <>
      <PageHeader
        eyebrow="Repertuvar"
        title="Zengin Repertuvar Matrisimiz"
        description="Her oyunu ait olduğu yörenin tavrını, karakterini ve geleneksel icra anlayışını koruyarak sahneye taşıyoruz."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((entry) => (
            <Card key={entry.region}>
              <h2 className="font-display text-lg font-semibold text-brand-800">
                {entry.region}
              </h2>
              <ul className="mt-3 space-y-1 text-sm text-brand-900/80">
                {entry.dances.map((dance) => (
                  <li key={dance}>{dance}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
