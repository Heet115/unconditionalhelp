"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FavouriteIcon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { NAV_LINKS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

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
        <nav className="relative flex h-12 items-center justify-between rounded-full border border-border/60 bg-background/80 px-2 shadow-lg shadow-black/[0.03] backdrop-blur-2xl sm:h-14 sm:px-3">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute size-20 rounded-full bg-primary/[0.06]" />
          </div>

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
          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList className="flex items-center gap-0.5 rounded-full bg-muted/60 px-1.5 py-1">
              {NAV_LINKS.filter((l) => l.label !== "Donate").map((link) => {
                if ("items" in link) {
                  const isActiveGroup = link.items.some((sub) =>
                    pathname.startsWith(sub.href)
                  )
                  return (
                    <NavigationMenuItem key={link.label}>
                      <NavigationMenuTrigger
                        className={cn(
                          "h-auto rounded-full bg-transparent px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 hover:bg-background/40 hover:text-foreground data-[state=open]:bg-background/40",
                          isActiveGroup
                            ? "bg-background font-semibold text-primary shadow-sm"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="flex min-w-42 flex-col gap-1 rounded-2xl border border-border/60 bg-background/95 p-2 shadow-xl backdrop-blur-xl group-data-[viewport=false]/navigation-menu:bg-background/95">
                        <ul className="flex flex-col gap-1 w-full">
                          {link.items.map((subItem) => {
                            const active = pathname.startsWith(subItem.href)
                            return (
                              <li key={subItem.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className={cn(
                                      "block w-full cursor-pointer rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200 outline-none hover:bg-accent hover:text-accent-foreground",
                                      active
                                        ? "bg-primary/10 font-semibold text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                    )}
                                  >
                                    {subItem.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            )
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                }

                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href)
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200",
                          active
                            ? "bg-background font-semibold text-primary shadow-sm"
                            : "text-muted-foreground hover:bg-background/40 hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

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
              ? "max-h-[700px] opacity-100"
              : "max-h-0 border-transparent opacity-0"
          )}
        >
          <div className="flex flex-col gap-0.5 p-3">
            {NAV_LINKS.map((link) => {
              if ("items" in link) {
                return (
                  <div key={link.label} className="flex flex-col gap-0.5">
                    <div className="mt-1 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-muted-foreground/60 uppercase">
                      {link.label}
                    </div>
                    {link.items.map((subItem) => {
                      const active = pathname.startsWith(subItem.href)
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "ml-2 rounded-xl border-l-2 px-4 py-3 text-sm font-medium transition-colors duration-150",
                            active
                              ? "border-primary bg-primary/5 font-semibold text-primary"
                              : "border-transparent text-foreground hover:bg-accent"
                          )}
                        >
                          {subItem.label}
                        </Link>
                      )
                    })}
                  </div>
                )
              }

              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-150",
                    active
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-foreground hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
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
