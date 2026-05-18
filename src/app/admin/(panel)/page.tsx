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
  const [userCount, pendingCount, projectCount] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { active: false } }),
    prisma.project.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="mt-2 text-primary/70">
          Add and edit projects for the public site. All page designs and text
          are fixed — only project listings are managed here.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Projects" value={projectCount} href="/admin/projects" />
        <StatCard title="Admin users" value={userCount} href="/admin/users" />
        <StatCard
          title="Pending activation"
          value={pendingCount}
          href="/admin/users"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Site pages (fixed design)</CardTitle>
          <CardDescription>
            Preview the public site — content is not editable in admin.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 text-sm">
          <Link href="/en" className="text-primary underline" target="_blank">
            Home (EN)
          </Link>
          <Link href="/ar" className="text-primary underline" target="_blank">
            Home (AR)
          </Link>
          <Link
            href="/en/about"
            className="text-primary underline"
            target="_blank"
          >
            About
          </Link>
          <Link
            href="/en/projects"
            className="text-primary underline"
            target="_blank"
          >
            Projects
          </Link>
          <Link
            href="/en/contact"
            className="text-primary underline"
            target="_blank"
          >
            Contact
          </Link>
          <Link
            href="/en/projects/sea-point"
            className="text-primary underline"
            target="_blank"
          >
            Sea Point
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
