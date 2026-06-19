import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics02Icon,
  Calendar01Icon,
  CharityIcon,
  CloudUploadIcon,
  DatabaseSyncIcon,
  Image01Icon,
  MailIcon,
  UserGroup03Icon,
  UserShield02Icon,
} from "@hugeicons/core-free-icons"

import { requireAdmin } from "@/lib/admin/auth"
import {
  canEditAdminContent,
  getAdminDashboardCounts,
  getAdminProfile,
} from "@/lib/admin/media"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
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
    title: "Database security",
    description: "Tables, RLS, grants, storage, and advisors.",
    icon: DatabaseSyncIcon,
    status: "Ready",
  },
  {
    title: "Media library",
    description: "Upload, preview, copy URLs, and delete files.",
    icon: CloudUploadIcon,
    status: "Ready",
  },
  {
    title: "Activities CRUD",
    description: "Create, edit, publish, and manage activity posts.",
    icon: Calendar01Icon,
    status: "Part 4",
  },
]

const METRIC_ITEMS = [
  {
    label: "Media assets",
    key: "mediaAssets",
    icon: Image01Icon,
  },
  {
    label: "Activities",
    key: "activities",
    icon: Analytics02Icon,
  },
  {
    label: "Events",
    key: "events",
    icon: Calendar01Icon,
  },
  {
    label: "New contacts",
    key: "newContacts",
    icon: MailIcon,
  },
  {
    label: "New volunteers",
    key: "newVolunteers",
    icon: UserGroup03Icon,
  },
  {
    label: "Donations",
    key: "donations",
    icon: CharityIcon,
  },
] as const

export default async function AdminDashboardPage() {
  const admin = await requireAdmin()
  const [profile, counts] = await Promise.all([
    getAdminProfile(admin),
    getAdminDashboardCounts(),
  ])
  const canManageContent = canEditAdminContent(profile)

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <section className="rounded-3xl border border-border/60 bg-background p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Badge variant="secondary" className="rounded-full">
              Admin operations
            </Badge>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Dashboard foundation is live
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Auth, database security, typed Supabase access, and media uploads
              are ready. The next slices can now build content CRUD on top of
              real storage URLs.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/admin/media">
                <HugeiconsIcon icon={CloudUploadIcon} data-icon="inline-start" />
                Open media
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">View public site</Link>
            </Button>
          </div>
        </div>
      </section>

      {!profile && (
        <Card>
          <CardHeader>
            <CardTitle>Database admin profile needed</CardTitle>
            <CardDescription>
              Your allowlisted email can access the shell, but Supabase RLS
              needs an active row in admin_profiles before media uploads and
              private admin data are available.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {profile && !canManageContent && (
        <Card>
          <CardHeader>
            <CardTitle>Read-only admin profile</CardTitle>
            <CardDescription>
              Your current DB role is {profile.role}. Ask an owner to set it to
              editor or owner before uploading media.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {METRIC_ITEMS.map((item) => {
          const value = counts[item.key]

          return (
            <Card key={item.key} size="sm">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {item.label}
                </CardTitle>
                <CardAction>
                  <span className="flex size-9 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                    <HugeiconsIcon icon={item.icon} className="size-5" />
                  </span>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {value}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {FOUNDATION_ITEMS.map((item) => (
          <Card key={item.title} size="sm">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <HugeiconsIcon icon={item.icon} className="size-5" />
                </div>
                <Badge
                  variant={item.status === "Ready" ? "default" : "secondary"}
                  className="rounded-full"
                >
                  {item.status}
                </Badge>
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  )
}
