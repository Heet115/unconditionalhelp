"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FavouriteIcon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { NAV_LINKS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-4 right-4 left-4 z-50 mx-auto max-w-5xl transition-all duration-500",
          scrolled && "top-3 right-3 left-3"
        )}
      >
        <nav className="relative flex h-12 items-center justify-between overflow-hidden rounded-full border border-border/60 bg-background/80 px-2 shadow-lg shadow-black/[0.03] backdrop-blur-2xl sm:h-14 sm:px-3">
          <div className="pointer-events-none absolute -top-4 -right-4 size-20 rounded-full bg-primary/[0.06]" />

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-full py-1.5 pr-4 pl-3 transition-colors hover:bg-accent"
          >
            <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <HugeiconsIcon icon={FavouriteIcon} size={14} strokeWidth={2.5} />
            </div>
            <span className="font-heading text-sm tracking-tight text-foreground sm:text-base">
              UH Bhavnagar
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-0.5 rounded-full bg-muted/60 px-1.5 py-1 lg:flex">
            {NAV_LINKS.filter((l) => l.label !== "Donate").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-all hover:bg-background hover:text-foreground hover:shadow-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden rounded-full px-5 shadow-sm shadow-primary/15 sm:inline-flex"
            >
              <Link href="/donate">Donate</Link>
            </Button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-accent lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <HugeiconsIcon
                icon={mobileOpen ? Cancel01Icon : Menu01Icon}
                size={18}
                color="currentColor"
              />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          className={cn(
            "mt-2 overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-lg backdrop-blur-2xl transition-all duration-300 lg:hidden",
            mobileOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 border-transparent opacity-0"
          )}
        >
          <div className="flex flex-col gap-0.5 p-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              <Button asChild size="lg" className="w-full rounded-xl">
                <Link href="/donate" onClick={() => setMobileOpen(false)}>
                  Donate Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
