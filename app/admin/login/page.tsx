import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon, UserShield02Icon } from "@hugeicons/core-free-icons"

import { AdminLoginForm } from "@/components/admin/admin-login-form"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getOptionalAdmin } from "@/lib/admin/auth"

export const metadata: Metadata = {
  title: "Admin Login | Unconditional Help Bhavnagar",
  description: "Sign in to manage Unconditional Help Bhavnagar operations.",
}

type Props = {
  searchParams: Promise<{ error?: string; next?: string }>
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const admin = await getOptionalAdmin()

  if (admin) {
    redirect("/admin")
  }

  const params = await searchParams
  const initialError =
    params.error === "not_allowed"
      ? "This account is not allowed to access the dashboard."
      : undefined

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 size-[420px] rounded-full bg-primary/5" />
        <div className="absolute -bottom-24 -left-24 size-[320px] rounded-full bg-primary/4" />
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--primary) 0.6px, transparent 0.6px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-xl transition-colors hover:bg-muted"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <HugeiconsIcon icon={FavouriteIcon} className="size-3.5" />
            </span>
            UH Bhavnagar
          </Link>
        </div>

        <Card className="rounded-3xl border border-border/60 bg-background/80 shadow-xl backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <HugeiconsIcon icon={UserShield02Icon} className="size-6" />
            </div>
            <Badge
              variant="secondary"
              className="mx-auto rounded-full px-3 py-1 text-xs"
            >
              Admin access
            </Badge>
            <CardTitle className="mt-3 text-2xl font-bold">
              Sign in to dashboard
            </CardTitle>
            <CardDescription>
              Manage content, submissions, and trust operations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLoginForm
              initialError={initialError}
              nextPath={params.next}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
