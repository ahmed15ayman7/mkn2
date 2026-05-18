"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export type AdminUserRow = {
  id: string;
  name: string | null;
  email: string;
  active: boolean;
  role: string;
  createdAt: string;
};

export function UsersTable({ users }: { users: AdminUserRow[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function toggleActive(user: AdminUserRow) {
    setLoadingId(user.id);
    try {
      await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !user.active }),
      });
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-primary/10 bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-primary/10 bg-surface text-start">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-primary/5">
              <td className="px-4 py-3">{user.name ?? "—"}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">
                <span
                  className={
                    user.active
                      ? "text-green-700"
                      : "text-amber-700"
                  }
                >
                  {user.active ? "Active" : "Pending"}
                </span>
              </td>
              <td className="px-4 py-3">
                <Button
                  type="button"
                  size="sm"
                  variant={user.active ? "outline" : "default"}
                  disabled={loadingId === user.id}
                  onClick={() => toggleActive(user)}
                >
                  {user.active ? "Deactivate" : "Activate"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
