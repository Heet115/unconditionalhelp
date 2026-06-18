"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { isAdminEmail } from "@/lib/admin/allowlist"
import { createClient } from "@/lib/supabase/server"

export type AdminLoginState = {
  error?: string
}

function getSafeNextPath(value: FormDataEntryValue | null) {
  const path = typeof value === "string" ? value : "/admin"

  if (!path.startsWith("/admin") || path.startsWith("/admin/login")) {
    return "/admin"
  }

  return path
}

export async function loginAdmin(
  _previousState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
  const password = String(formData.get("password") ?? "")
  const nextPath = getSafeNextPath(formData.get("next"))

  if (!email || !password) {
    return { error: "Enter your admin email and password." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: "Invalid email or password." }
  }

  if (!isAdminEmail(data.user.email)) {
    await supabase.auth.signOut()
    return { error: "This account is not allowed to access the dashboard." }
  }

  revalidatePath("/admin", "layout")
  redirect(nextPath)
}

export async function logoutAdmin() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/admin", "layout")
  redirect("/admin/login")
}
