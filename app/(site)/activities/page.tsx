import { Metadata } from "next"
import { getActivities } from "@/lib/data/activities"
import { ActivitiesClient } from "@/components/activities-client"

export const metadata: Metadata = {
  title: "Latest Activities",
  description:
    "Read about our recent social work, drives, and community events.",
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ActivitiesPage() {
  const activities = await getActivities()

  return <ActivitiesClient activities={activities} />
}
