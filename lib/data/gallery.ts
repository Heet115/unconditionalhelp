import { supabase } from "@/lib/supabase"

export type GalleryItem = {
  id: string | number
  created_at?: string
  category: string
  title: string
  date: string
  location: string
  icon: string
  description: string
  gradient: string
  border: string
  accent: string
  is_published?: boolean
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching gallery items:", error)
    return []
  }

  return data as GalleryItem[]
}
