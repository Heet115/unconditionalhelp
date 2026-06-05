import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Humanitarian Services | Unconditional Help Bhavnagar",
  description:
    "Explore our core services including free food distribution, educational support, tree plantation, animal feeding, and emergency relief in Bhavnagar.",
  keywords: [
    "Food distribution Bhavnagar",
    "Educational support India",
    "Tree plantation campaign",
    "Animal welfare stray dogs",
    "Charity work Gujarat",
  ],
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
