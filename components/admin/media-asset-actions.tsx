"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Copy01Icon,
  Delete02Icon,
  ExternalLinkIcon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import {
  deleteMediaAsset,
  type MediaActionState,
} from "@/app/admin/(dashboard)/media/actions"
import { Button } from "@/components/ui/button"

const INITIAL_STATE: MediaActionState = {
  status: "idle",
  message: "",
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      variant="destructive"
      size="sm"
      disabled={pending}
    >
      <HugeiconsIcon icon={Delete02Icon} data-icon="inline-start" />
      {pending ? "Deleting..." : "Delete"}
    </Button>
  )
}

export function CopyUrlButton({ url }: { url: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => {
        await navigator.clipboard.writeText(url)
        toast.success("URL copied.")
      }}
    >
      <HugeiconsIcon icon={Copy01Icon} data-icon="inline-start" />
      Copy URL
    </Button>
  )
}

export function OpenAssetButton({ url }: { url: string }) {
  return (
    <Button asChild variant="outline" size="sm">
      <a href={url} target="_blank" rel="noreferrer">
        <HugeiconsIcon icon={ExternalLinkIcon} data-icon="inline-start" />
        Open
      </a>
    </Button>
  )
}

export function DeleteMediaAssetForm({
  id,
  path,
}: {
  id: string
  path: string
}) {
  const [state, formAction] = useActionState(deleteMediaAsset, INITIAL_STATE)

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message)
    }

    if (state.status === "error") {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this media asset?")) {
          event.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="path" value={path} />
      <DeleteButton />
    </form>
  )
}
