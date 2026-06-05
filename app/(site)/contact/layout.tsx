import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us & Office Location | Unconditional Help Bhavnagar",
  description: "Get in touch with us via WhatsApp, phone, email, or visit our operations zone in Bhavnagar, Gujarat. We welcome feedback and physical donations.",
  keywords: ["Contact NGO", "WhatsApp number Bhavnagar", "Email trust", "Office location", "Drop off donations"],
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
