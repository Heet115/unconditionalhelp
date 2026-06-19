import type { AdminSession } from "@/lib/admin/auth"
export {
  MEDIA_FOLDERS,
  isMediaFolder,
  type MediaFolder,
} from "@/lib/admin/media-constants"
import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/database.types"

export type AdminProfile = Tables<"admin_profiles">
export type MediaAsset = Tables<"media_assets">

export function canEditAdminContent(profile: AdminProfile | null) {
  return (
    profile?.is_active === true &&
    (profile.role === "owner" || profile.role === "editor")
  )
}

export async function getAdminProfile(admin: AdminSession) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("user_id", admin.id)
    .maybeSingle()

  if (error) {
    console.error("Error fetching admin profile:", error)
    return null
  }

  return data
}

export async function getMediaAssets(limit = 60) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching media assets:", error)
    return []
  }

  return data
}

export async function getAdminDashboardCounts() {
  const supabase = await createClient()

  const [
    mediaAssets,
    activities,
    events,
    contacts,
    volunteers,
    donations,
  ] = await Promise.all([
    supabase.from("media_assets").select("id", { count: "exact", head: true }),
    supabase.from("activities").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("volunteer_applications")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("donations").select("id", { count: "exact", head: true }),
  ])

  return {
    mediaAssets: mediaAssets.count ?? 0,
    activities: activities.count ?? 0,
    events: events.count ?? 0,
    newContacts: contacts.count ?? 0,
    newVolunteers: volunteers.count ?? 0,
    donations: donations.count ?? 0,
  }
}
