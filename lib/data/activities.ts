import { supabase } from "@/lib/supabase"

export type Activity = {
  id: string
  created_at: string
  slug: string
  title: string
  category: string
  description: string
  content: string
  cover_image: string
  gallery_images: string[]
  youtube_video_id: string | null
  is_published: boolean
}

export async function getActivities(): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching activities:", error)
    return []
  }

  return data as Activity[]
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (error) {
    console.error(`Error fetching activity with slug ${slug}:`, error)
    return null
  }

  return data as Activity
}
