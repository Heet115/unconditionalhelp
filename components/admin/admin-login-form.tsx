"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { Login03Icon } from "@hugeicons/core-free-icons"

import {
  type AdminLoginState,
  loginAdmin,
} from "@/app/admin/login/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="h-11 w-full rounded-xl"
    >
      <HugeiconsIcon icon={Login03Icon} className="size-4" />
      {pending ? "Signing in..." : "Sign in"}
    </Button>
  )
}

export function AdminLoginForm({
  initialError,
  nextPath,
}: {
  initialError?: string
  nextPath?: string
}) {
  const initialState: AdminLoginState = { error: initialError }
  const [state, formAction] = useActionState(loginAdmin, initialState)

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={nextPath ?? "/admin"} />

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          required
          className="h-11 rounded-xl border-border/60 bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
          className="h-11 rounded-xl border-border/60 bg-background"
        />
      </div>

      <SubmitButton />
    </form>
  )
}
