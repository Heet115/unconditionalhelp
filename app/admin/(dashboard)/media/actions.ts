"use server"

import { randomUUID } from "node:crypto"
import { revalidatePath } from "next/cache"

import { requireAdmin } from "@/lib/admin/auth"
import {
  ALLOWED_MEDIA_MIME_TYPES,
  isMediaFolder,
  MAX_MEDIA_FILE_SIZE,
  type MediaFolder,
} from "@/lib/admin/media-constants"
import { createClient } from "@/lib/supabase/server"

const ALLOWED_MIME_TYPES = new Set<string>(ALLOWED_MEDIA_MIME_TYPES)

export type MediaActionState = {
  status: "idle" | "success" | "error"
  message: string
  publicUrl?: string
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

function sanitizeFileName(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "media"
  )
}

function getExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase()

  if (extension && /^[a-z0-9]+$/.test(extension)) {
    return extension
  }

  if (file.type === "image/jpeg") return "jpg"
  if (file.type === "image/png") return "png"
  if (file.type === "image/webp") return "webp"
  if (file.type === "image/gif") return "gif"
  if (file.type === "application/pdf") return "pdf"

  return "bin"
}

function getUploadFolder(formData: FormData): MediaFolder | null {
  const folder = getString(formData, "folder")
  return isMediaFolder(folder) ? folder : null
}

export async function uploadMediaAsset(
  _previousState: MediaActionState,
  formData: FormData
): Promise<MediaActionState> {
  const admin = await requireAdmin()
  const supabase = await createClient()
  const folder = getUploadFolder(formData)
  const file = formData.get("file")
  const altText = getString(formData, "altText")
  const caption = getString(formData, "caption")

  if (!folder) {
    return { status: "error", message: "Choose a valid media folder." }
  }

  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Choose a file to upload." }
  }

  if (file.size > MAX_MEDIA_FILE_SIZE) {
    return { status: "error", message: "Files must be 10 MB or smaller." }
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return {
      status: "error",
      message: "Upload a JPG, PNG, WebP, GIF, or PDF file.",
    }
  }

  const extension = getExtension(file)
  const fileSlug = sanitizeFileName(file.name)
  const path = `${folder}/${Date.now()}-${randomUUID()}-${fileSlug}.${extension}`

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    })

  if (uploadError) {
    return {
      status: "error",
      message: uploadError.message,
    }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path)

  const { error: insertError } = await supabase.from("media_assets").insert({
    bucket_id: "media",
    path,
    public_url: publicUrl,
    folder,
    file_name: file.name,
    mime_type: file.type,
    size_bytes: file.size,
    alt_text: altText || null,
    caption: caption || null,
    uploaded_by: admin.id,
  })

  if (insertError) {
    await supabase.storage.from("media").remove([path])

    return {
      status: "error",
      message: insertError.message,
    }
  }

  revalidatePath("/admin")
  revalidatePath("/admin/media")

  return {
    status: "success",
    message: "Media uploaded.",
    publicUrl,
  }
}

export async function deleteMediaAsset(
  _previousState: MediaActionState,
  formData: FormData
): Promise<MediaActionState> {
  await requireAdmin()

  const id = getString(formData, "id")
  const path = getString(formData, "path")

  if (!id || !path) {
    return { status: "error", message: "Media asset was missing details." }
  }

  const supabase = await createClient()
  const { error: storageError } = await supabase.storage
    .from("media")
    .remove([path])

  if (storageError) {
    return {
      status: "error",
      message: storageError.message,
    }
  }

  const { error: deleteError } = await supabase
    .from("media_assets")
    .delete()
    .eq("id", id)
    .eq("path", path)

  if (deleteError) {
    return {
      status: "error",
      message: deleteError.message,
    }
  }

  revalidatePath("/admin")
  revalidatePath("/admin/media")

  return {
    status: "success",
    message: "Media deleted.",
  }
}
