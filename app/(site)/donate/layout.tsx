import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Donate & Support Our Cause | Unconditional Help Bhavnagar",
  description: "Contribute to our daily operations via standard bank transfers, UPI transactions, or by donating physical goods. 100% transparency guaranteed.",
  keywords: ["Donate to NGO", "Bank transfer charity", "UPI scan GPay", "Trust account details", "Support Bhavnagar NGO"],
}

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
