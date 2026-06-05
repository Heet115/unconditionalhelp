import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Become a Volunteer | Unconditional Help Bhavnagar",
  description: "Join our active family of 200+ volunteers in Bhavnagar. Sign up to help with food distribution, animal care, tree plantation, and more.",
  keywords: ["Join NGO Bhavnagar", "Volunteer work Gujarat", "Charity volunteers", "Community service", "Social work internship"],
}

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
