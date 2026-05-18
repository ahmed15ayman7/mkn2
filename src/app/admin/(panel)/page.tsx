export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const [userCount, pendingCount, inquiryCount] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { active: false } }),
    prisma.inquiry.count({ where: { status: "NEW" } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="mt-2 text-primary/70">
          Manage MKN content, users, and inquiries.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Admin users" value={userCount} href="/admin/users" />
        <StatCard
          title="Pending activation"
          value={pendingCount}
          href="/admin/users"
        />
        <StatCard title="New inquiries" value={inquiryCount} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Quick links</CardTitle>
          <CardDescription>Public site (opens in new tab)</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 text-sm">
          <Link href="/en" className="text-primary underline" target="_blank">
            English site
          </Link>
          <Link href="/ar" className="text-primary underline" target="_blank">
            Arabic site
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}


function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: number;
  href?: string;
}) {
  const inner = (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl tabular-nums">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
  if (href) {
    return (
      <Link href={href} className="transition hover:opacity-90">
        {inner}
      </Link>
    );
  }
  return inner;
}
