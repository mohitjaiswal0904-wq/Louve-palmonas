"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createCsrApiClient } from "@/lib/client";
import * as adminService from "@/services/admin.service";
import type { AdminUserResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
      adminService
        .listUsers(client, { page: p, limit: 20, search: s })
        .then((res) => {
          if (res.success && res.data) {
            setUsers(res.data.users);
            setTotal(res.data.total);
            setPage(res.data.page);
            setTotalPages(res.data.total_pages);
          }
        })
        .finally(() => setLoading(false));
    },
    [client],
  );

  useEffect(() => {
    fetchUsers(1, "");
  }, [fetchUsers]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    fetchUsers(1, search);
  }

  async function handleRoleToggle(userRow: AdminUserResponse) {
    const newRole = userRow.role === "admin" ? "customer" : "admin";
    const res = await adminService.updateUserRole(client, userRow.id, newRole);
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userRow.id ? { ...u, role: newRole } : u)),
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Users</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} user{total === 1 ? "" : "s"} · search by phone or email
          </p>
        </div>
        <form onSubmit={handleSearch} className="flex w-full flex-col gap-2 sm:flex-row sm:items-end lg:w-auto lg:min-w-[min(100%,24rem)]">
          <div className="flex-1 space-y-1.5">
            <label htmlFor="admin-user-search" className="text-xs font-medium text-muted-foreground">
              Search
            </label>
            <Input
              id="admin-user-search"
              type="search"
              placeholder="Phone or email..."
              className="h-11 md:h-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
          </div>
          <Button type="submit" variant="outline" className="min-h-11 w-full sm:w-auto">
            Search
          </Button>
        </form>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
        ) : users.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No users found.</p>
        ) : (
          users.map((u) => (
            <Card key={u.id} size="sm" className="shadow-sm">
              <CardContent className="space-y-3 pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted-foreground">ID {u.id}</p>
                    <p className="mt-1 font-mono text-sm">{u.phone}</p>
                    <p className="mt-0.5 truncate text-sm">
                      {u.profile?.display_name ?? "—"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{u.email ?? "—"}</p>
                  </div>
                  <span
                    className={`inline-flex shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      u.role === "admin"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {u.role}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {u.status} · joined {new Date(u.created_at).toLocaleDateString()}
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="min-h-10 w-full"
                  onClick={() => void handleRoleToggle(u)}
                >
                  {u.role === "admin" ? "Revoke admin" : "Make admin"}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-xl border bg-card shadow-sm md:block">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="whitespace-nowrap px-4 py-3 font-medium">ID</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Phone</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Name</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Email</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Role</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Status</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Joined</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b last:border-0 hover:bg-muted/40 dark:hover:bg-zinc-800/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums">{u.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{u.phone}</td>
                  <td className="max-w-[8rem] truncate px-4 py-3">{u.profile?.display_name ?? "—"}</td>
                  <td className="max-w-[10rem] truncate px-4 py-3 text-xs">{u.email ?? "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs">{u.status}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => void handleRoleToggle(u)}
                    >
                      {u.role === "admin" ? "Revoke admin" : "Make admin"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2 sm:justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="min-h-10 flex-1 sm:flex-none"
              disabled={page <= 1 || loading}
              onClick={() => fetchUsers(page - 1, search)}
            >
              Previous
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="min-h-10 flex-1 sm:flex-none"
              disabled={page >= totalPages || loading}
              onClick={() => fetchUsers(page + 1, search)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
