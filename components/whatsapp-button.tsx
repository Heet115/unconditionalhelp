"use client"

import { TRUST } from "@/lib/constants"
import { HugeiconsIcon } from "@hugeicons/react"
import { WhatsappIcon } from "@hugeicons/core-free-icons"

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${TRUST.whatsapp}?text=${encodeURIComponent("Hello! I'd like to know more about Unconditional Help Bhavnagar.")}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-float-btn"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <HugeiconsIcon icon={WhatsappIcon} className="size-6" />

      {/* Tooltip */}
      <span className="pointer-events-none absolute right-full mr-3 rounded-md bg-foreground px-2.5 py-1 text-xs whitespace-nowrap text-background opacity-0 transition-opacity group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  )
}
