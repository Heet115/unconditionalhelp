import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics02Icon,
  Calendar01Icon,
  DatabaseSyncIcon,
  Image01Icon,
  UserShield02Icon,
} from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const FOUNDATION_ITEMS = [
  {
    title: "Admin auth",
    description: "Email/password login, logout, protected routes.",
    icon: UserShield02Icon,
    status: "Ready",
  },
  {
    title: "Dashboard shell",
    description: "Responsive sidebar, mobile drawer, top bar.",
    icon: Analytics02Icon,
    status: "Ready",
  },
  {
    title: "Database schema",
    description: "Tables, RLS, grants, and storage policies.",
    icon: DatabaseSyncIcon,
    status: "Part 2",
  },
  {
    title: "Media upload",
    description: "Cover images, galleries, previews, and storage paths.",
    icon: Image01Icon,
    status: "Part 3",
  },
  {
    title: "Activities CRUD",
    description: "Create, edit, publish, and manage activity posts.",
    icon: Calendar01Icon,
    status: "Part 4",
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-3xl border border-border/60 bg-background p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Badge variant="secondary" className="rounded-full">
              Part 1 foundation
            </Badge>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Admin dashboard is protected
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The secure admin shell is ready. The next part will add the
              Supabase tables, RLS policies, and storage security that power the
              real modules.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">View public site</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {FOUNDATION_ITEMS.map((item) => (
          <Card
            key={item.title}
            className="rounded-3xl border border-border/60 bg-background shadow-sm"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <HugeiconsIcon icon={item.icon} className="size-5" />
                </div>
                <Badge
                  variant={item.status === "Ready" ? "default" : "secondary"}
                  className="rounded-full"
                >
                  {item.status}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className={
                    item.status === "Ready"
                      ? "h-full w-full rounded-full bg-primary"
                      : "h-full w-1/3 rounded-full bg-primary/40"
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
