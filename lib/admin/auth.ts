import { redirect } from "next/navigation"

import { isAdminEmail } from "@/lib/admin/allowlist"
import { createClient } from "@/lib/supabase/server"

export type AdminSession = {
  id: string
  email: string
}

function toAdminSession(claims: Record<string, unknown> | null | undefined) {
  const email = typeof claims?.email === "string" ? claims.email : null
  const id = typeof claims?.sub === "string" ? claims.sub : null

  if (!email || !id || !isAdminEmail(email)) {
    return null
  }

  return { id, email }
}

export async function getOptionalAdmin() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims) {
    return null
  }

  return toAdminSession(data.claims as Record<string, unknown>)
}

export async function requireAdmin() {
  const admin = await getOptionalAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  return admin
}
