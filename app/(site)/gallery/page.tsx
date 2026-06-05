import { Metadata } from "next"
import { getGalleryItems } from "@/lib/data/gallery"
import { GalleryClient } from "@/components/gallery-client"

export const metadata: Metadata = {
  title: "Activity Gallery",
  description:
    "Explore visual moments capturing our ground efforts, community drives, and the direct impact made by our volunteers.",
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return <GalleryClient items={items} />
}
