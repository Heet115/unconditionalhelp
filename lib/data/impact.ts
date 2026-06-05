import { supabase } from "@/lib/supabase"

export type ImpactStory = {
  id: string
  created_at: string
  slug: string
  title: string
  category: string
  before_description: string
  after_description: string
  before_image: string
  after_image: string
  testimonial_quote: string | null
  testimonial_author: string | null
  impact_stat_number: string | null
  impact_stat_label: string | null
  is_published: boolean
}

export async function getImpactStories(): Promise<ImpactStory[]> {
  const { data, error } = await supabase
    .from("impact_stories")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching impact stories:", error)
    return []
  }

  return data as ImpactStory[]
}
