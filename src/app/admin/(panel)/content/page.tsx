export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { ContentManager } from "@/components/admin/content-manager";

export default async function AdminContentPage() {
  const items = await prisma.globalContent.findMany({
    orderBy: { key: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Global content</h1>
        <p className="mt-2 text-primary/70">
          Reusable bilingual text blocks keyed for the CMS.
        </p>
      </div>
      <ContentManager items={items} />
    </div>
  );
}
