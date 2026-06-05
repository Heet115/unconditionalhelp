import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Our Trust | Unconditional Help Bhavnagar",
  description:
    "Learn about Unconditional Help Bhavnagar, our founder Vivek Parmar, our journey since 2018, and our core values of compassion and transparency.",
  keywords: [
    "About NGO",
    "Vivek Parmar",
    "Charitable Trust Bhavnagar",
    "NGO Gujarat",
    "History since 2018",
  ],
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
