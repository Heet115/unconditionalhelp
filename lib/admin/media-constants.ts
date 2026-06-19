export const MEDIA_FOLDERS = [
  "activities",
  "events",
  "gallery",
  "reports",
  "settings",
  "media-library",
] as const

export const MAX_MEDIA_FILE_SIZE = 10 * 1024 * 1024
export const MAX_MEDIA_FILE_SIZE_LABEL = "10 MB"
export const ALLOWED_MEDIA_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
] as const
export const MEDIA_ACCEPT = ALLOWED_MEDIA_MIME_TYPES.join(",")
export const MEDIA_FILE_TYPE_LABEL = "JPG, PNG, WebP, GIF, or PDF"

export type MediaFolder = (typeof MEDIA_FOLDERS)[number]

export function isMediaFolder(value: string): value is MediaFolder {
  return MEDIA_FOLDERS.includes(value as MediaFolder)
}
