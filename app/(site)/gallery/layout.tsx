import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Activity Gallery & Impact | Unconditional Help Bhavnagar",
  description: "See visual moments capturing our ground efforts, community donation drives, tree plantations, and stray animal welfare activities.",
  keywords: ["NGO photos", "Charity gallery Bhavnagar", "Food drive images", "Volunteer activities Gujarat", "Social impact pictures"],
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
