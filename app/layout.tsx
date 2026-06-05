import type { Metadata } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TRUST } from "@/lib/constants"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://unconditionalhelp.org"
  ),
  title: {
    default: `${TRUST.name} — ${TRUST.tagline}`,
    template: `%s | ${TRUST.name}`,
  },
  description: TRUST.description,
  keywords: [
    "NGO Bhavnagar",
    "charity Gujarat",
    "food distribution",
    "volunteer Bhavnagar",
    "donate India",
    "Unconditional Help",
    "tree plantation",
    "animal welfare",
  ],
  authors: [{ name: TRUST.founder }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: TRUST.name,
    title: `${TRUST.name} — ${TRUST.tagline}`,
    description: TRUST.description,
    images: [
      { url: "/hero-bg.png", width: 1200, height: 630, alt: TRUST.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TRUST.name} — ${TRUST.tagline}`,
    description: TRUST.description,
    images: ["/hero-bg.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: TRUST.name,
              description: TRUST.description,
              foundingDate: "2018-09-05",
              founder: { "@type": "Person", name: TRUST.founder },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bhavnagar",
                addressRegion: "Gujarat",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: `+${TRUST.whatsapp}`,
                contactType: "customer service",
                availableLanguage: ["English", "Gujarati"],
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
