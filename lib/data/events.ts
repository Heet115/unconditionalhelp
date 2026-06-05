import { supabase } from "@/lib/supabase"

export type EventItem = {
  id: string
  created_at: string
  updated_at: string
  slug: string
  title: string
  date: string
  time: string
  location: string
  description: string
  cover_image: string
  is_published: boolean
}

export async function getUpcomingEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    // For upcoming events, we generally want events whose date is >= today
    // But for a simple demo, we will just order by date ascending
    .order("date", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return data as EventItem[]
}
