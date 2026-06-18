import type { Metadata } from "next"

import { AdminShell } from "@/components/admin/admin-shell"
import { requireAdmin } from "@/lib/admin/auth"

export const metadata: Metadata = {
  title: "Admin Dashboard | Unconditional Help Bhavnagar",
  description: "Manage Unconditional Help Bhavnagar operations.",
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await requireAdmin()

  return <AdminShell admin={admin}>{children}</AdminShell>
}
