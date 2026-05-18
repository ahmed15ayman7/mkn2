export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { UsersTable } from "@/components/admin/users-table";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Admin users</h1>
        <p className="mt-2 text-primary/70">
          Activate or deactivate accounts. The first registered user is
          activated automatically.
        </p>
      </div>
      <UsersTable
        users={users.map((u) => ({
          ...u,
          createdAt: u.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
