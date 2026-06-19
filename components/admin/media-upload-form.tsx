"use client"

import { type FormEvent, useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { CloudUploadIcon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import {
  type MediaActionState,
  uploadMediaAsset,
} from "@/app/admin/(dashboard)/media/actions"
import {
  ALLOWED_MEDIA_MIME_TYPES,
  MAX_MEDIA_FILE_SIZE,
  MAX_MEDIA_FILE_SIZE_LABEL,
  MEDIA_ACCEPT,
  MEDIA_FILE_TYPE_LABEL,
  MEDIA_FOLDERS,
} from "@/lib/admin/media-constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const allowedMediaMimeTypes = new Set<string>(ALLOWED_MEDIA_MIME_TYPES)

const INITIAL_STATE: MediaActionState = {
  status: "idle",
  message: "",
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={disabled || pending}>
      <HugeiconsIcon icon={CloudUploadIcon} data-icon="inline-start" />
      {pending ? "Uploading..." : "Upload media"}
    </Button>
  )
}

export function MediaUploadForm({
  disabled,
  disabledReason,
}: {
  disabled?: boolean
  disabledReason?: string
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(uploadMediaAsset, INITIAL_STATE)

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message)
      formRef.current?.reset()
    }

    if (state.status === "error") {
      toast.error(state.message)
    }
  }, [state])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const file = new FormData(event.currentTarget).get("file")

    if (!(file instanceof File)) {
      return
    }

    if (file.size > MAX_MEDIA_FILE_SIZE) {
      event.preventDefault()
      toast.error(`Files must be ${MAX_MEDIA_FILE_SIZE_LABEL} or smaller.`)
      return
    }

    if (!allowedMediaMimeTypes.has(file.type)) {
      event.preventDefault()
      toast.error(`Upload a ${MEDIA_FILE_TYPE_LABEL} file.`)
    }
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      {disabledReason && (
        <p className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
          {disabledReason}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="media-file">File</Label>
        <Input
          id="media-file"
          name="file"
          type="file"
          accept={MEDIA_ACCEPT}
          disabled={disabled}
          required
        />
        <p className="text-xs text-muted-foreground">
          {MEDIA_FILE_TYPE_LABEL}. Maximum size: {MAX_MEDIA_FILE_SIZE_LABEL}.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="media-folder">Folder</Label>
        <select
          id="media-folder"
          name="folder"
          defaultValue="media-library"
          disabled={disabled}
          className="h-9 w-full min-w-0 rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-base transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          {MEDIA_FOLDERS.map((folder) => (
            <option key={folder} value={folder}>
              {folder}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="media-alt">Alt text</Label>
        <Input
          id="media-alt"
          name="altText"
          type="text"
          disabled={disabled}
          placeholder="Describe the image for accessibility"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="media-caption">Caption</Label>
        <Textarea
          id="media-caption"
          name="caption"
          disabled={disabled}
          placeholder="Optional internal note"
          rows={3}
        />
      </div>

      <SubmitButton disabled={disabled} />
    </form>
  )
}
