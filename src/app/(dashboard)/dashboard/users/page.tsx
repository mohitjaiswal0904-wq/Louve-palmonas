"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { AdminUserResponse } from "@/types";
import { Button } from "@/components/ui/button";

export default function DashboardUsersPage() {
  const client = useMemo(() => createCsrApiClient(), []);
  const [users, setUsers] = useState<AdminUserResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(
    (p: number, s: string) => {
      setLoading(true);
      adminService.listUsers(client, { page: p, limit: 20, search: s }).then((res) => {
        if (res.success && res.data) {
          setUsers(res.data.users);
          setTotal(res.data.total);
          setPage(res.data.page);
          setTotalPages(res.data.total_pages);
        }
      }).finally(() => setLoading(false));
    },
    [client],
  );

  useEffect(() => { fetchUsers(1, ""); }, [fetchUsers]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchUsers(1, search);
  }

  async function handleRoleToggle(user: AdminUserResponse) {
    const newRole = user.role === "admin" ? "customer" : "admin";
    const res = await adminService.updateUserRole(client, user.id, newRole);
    if (res.success) {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)));
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Users ({total})</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by phone or email..."
            className="h-9 rounded-md border bg-white px-3 text-sm dark:bg-zinc-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" size="sm" variant="outline">Search</Button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white dark:bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-muted-foreground">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-muted-foreground">No users found.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-4 py-3 tabular-nums">{u.id}</td>
                  <td className="px-4 py-3 font-mono text-xs">{u.phone}</td>
                  <td className="px-4 py-3">{u.profile?.display_name ?? "—"}</td>
                  <td className="px-4 py-3 text-xs">{u.email ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${u.role === "admin" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{u.status}</td>
                  <td className="px-4 py-3 text-xs tabular-nums">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => void handleRoleToggle(u)}>
                      {u.role === "admin" ? "Revoke Admin" : "Make Admin"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => fetchUsers(page - 1, search)}>Previous</Button>
            <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => fetchUsers(page + 1, search)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
