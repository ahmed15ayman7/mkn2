export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { InquiriesTable } from "@/components/admin/inquiries-table";
import { serializeInquiry } from "@/lib/admin/serialize";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const newCount = inquiries.filter((i) => i.status === "NEW").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Inquiries</h1>
        <p className="mt-2 text-primary/70">
          Contact form submissions
          {newCount > 0 ? ` · ${newCount} new` : ""}.
        </p>
      </div>
      <InquiriesTable inquiries={inquiries.map(serializeInquiry)} />
    </div>
  );
}
