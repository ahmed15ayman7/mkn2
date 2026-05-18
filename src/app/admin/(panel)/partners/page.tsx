export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { PartnersManager } from "@/components/admin/partners-manager";
import { serializePartner } from "@/lib/admin/serialize";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Partners</h1>
        <p className="mt-2 text-primary/70">
          Logos and names shown on the About page and elsewhere.
        </p>
      </div>
      <PartnersManager partners={partners.map(serializePartner)} />
    </div>
  );
}
