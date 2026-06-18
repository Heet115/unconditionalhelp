"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics02Icon,
  Calendar01Icon,
  CharityIcon,
  FavouriteIcon,
  Home07Icon,
  Image01Icon,
  LogoutCircle01Icon,
  MailIcon,
  Menu03Icon,
  Pdf02Icon,
  Setting06Icon,
  UserGroup03Icon,
} from "@hugeicons/core-free-icons"

import { logoutAdmin } from "@/app/admin/login/actions"
import type { AdminSession } from "@/lib/admin/auth"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: Home07Icon },
  { label: "Activities", icon: Analytics02Icon, comingSoon: true },
  { label: "Events", icon: Calendar01Icon, comingSoon: true },
  { label: "Gallery", icon: Image01Icon, comingSoon: true },
  { label: "Contacts", icon: MailIcon, comingSoon: true },
  { label: "Volunteers", icon: UserGroup03Icon, comingSoon: true },
  { label: "Donations", icon: CharityIcon, comingSoon: true },
  { label: "Reports", icon: Pdf02Icon, comingSoon: true },
  { label: "Settings", icon: Setting06Icon, comingSoon: true },
]

function AdminBrand() {
  return (
    <Link
      href="/admin"
      className="flex items-center gap-3 rounded-2xl px-2 py-1.5 transition-colors hover:bg-muted/60"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <HugeiconsIcon icon={FavouriteIcon} className="size-4" />
      </span>
      <span>
        <span className="block text-sm font-bold text-foreground">
          UH Admin
        </span>
        <span className="block text-xs text-muted-foreground">
          Operations desk
        </span>
      </span>
    </Link>
  )
}

function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1" aria-label="Admin navigation">
      {NAV_ITEMS.map((item) => {
        const active = item.href === pathname

        if (!item.href) {
          return (
            <div
              key={item.label}
              aria-disabled="true"
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground/70"
            >
              <HugeiconsIcon icon={item.icon} className="size-4" />
              <span className="flex-1">{item.label}</span>
              <Badge variant="secondary" className="h-5 rounded-full text-[10px]">
                Soon
              </Badge>
            </div>
          )
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-current={active ? "page" : undefined}
          >
            <HugeiconsIcon icon={item.icon} className="size-4" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function AdminSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-border/60 bg-background/80 px-4 py-5 lg:block">
      <AdminBrand />
      <Separator className="my-5" />
      <AdminNav />
    </aside>
  )
}

function AdminMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="lg:hidden"
          aria-label="Open admin navigation"
        >
          <HugeiconsIcon icon={Menu03Icon} className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 border-r border-border/60 p-5">
        <SheetHeader className="sr-only">
          <SheetTitle>Admin navigation</SheetTitle>
          <SheetDescription>Navigate between admin modules</SheetDescription>
        </SheetHeader>
        <AdminBrand />
        <Separator className="my-5" />
        <AdminNav onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

export function AdminShell({
  admin,
  children,
}: {
  admin: AdminSession
  children: ReactNode
}) {
  return (
    <div className="min-h-svh bg-muted/30 text-foreground">
      <div className="flex min-h-svh">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <AdminMobileNav />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Admin Dashboard
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    Manage public content and incoming submissions.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-xs font-semibold text-foreground">
                    {admin.email}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Admin access
                  </p>
                </div>
                <form action={logoutAdmin}>
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <HugeiconsIcon
                      icon={LogoutCircle01Icon}
                      className="size-4"
                    />
                    Sign out
                  </Button>
                </form>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
