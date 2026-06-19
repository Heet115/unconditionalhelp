import type { Metadata } from "next"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DatabaseSyncIcon,
  File01Icon,
  Image01Icon,
} from "@hugeicons/core-free-icons"

import { requireAdmin } from "@/lib/admin/auth"
import {
  canEditAdminContent,
  getAdminProfile,
  getMediaAssets,
  type MediaAsset,
} from "@/lib/admin/media"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  CopyUrlButton,
  DeleteMediaAssetForm,
  OpenAssetButton,
} from "@/components/admin/media-asset-actions"
import { MediaUploadForm } from "@/components/admin/media-upload-form"

export const metadata: Metadata = {
  title: "Media Library | Admin Dashboard",
  description: "Upload and manage public media assets.",
}

function formatFileSize(sizeBytes: number | null) {
  if (!sizeBytes) return "Unknown size"

  const units = ["B", "KB", "MB", "GB"]
  let size = sizeBytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex += 1
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function getAssetLabel(asset: MediaAsset) {
  return asset.alt_text || asset.file_name || asset.path
}

function MediaPreview({ asset }: { asset: MediaAsset }) {
  const isImage = asset.mime_type?.startsWith("image/")

  if (isImage) {
    return (
      <div
        role="img"
        aria-label={getAssetLabel(asset)}
        className="aspect-[4/3] rounded-3xl bg-muted bg-cover bg-center"
        style={{ backgroundImage: `url("${asset.public_url}")` }}
      />
    )
  }

  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-3xl bg-muted text-muted-foreground">
      <HugeiconsIcon icon={File01Icon} className="size-10" aria-hidden />
      <span className="sr-only">{getAssetLabel(asset)}</span>
    </div>
  )
}

function MediaAssetCard({ asset }: { asset: MediaAsset }) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="truncate text-sm">
          {asset.file_name || asset.path}
        </CardTitle>
        <CardDescription className="truncate">
          {asset.folder || "media-library"} / {formatFileSize(asset.size_bytes)}
        </CardDescription>
        <CardAction>
          <Badge variant="secondary" className="rounded-full">
            {asset.mime_type?.split("/")[1]?.toUpperCase() || "FILE"}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <MediaPreview asset={asset} />

        {asset.caption && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {asset.caption}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            Public URL
          </label>
          <Input value={asset.public_url} readOnly aria-label="Public URL" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <CopyUrlButton url={asset.public_url} />
          <OpenAssetButton url={asset.public_url} />
          <DeleteMediaAssetForm id={asset.id} path={asset.path} />
        </div>

        <p className="text-xs text-muted-foreground">
          Uploaded {formatDate(asset.created_at)}
        </p>
      </CardContent>
    </Card>
  )
}

export default async function AdminMediaPage() {
  const admin = await requireAdmin()
  const [profile, assets] = await Promise.all([
    getAdminProfile(admin),
    getMediaAssets(),
  ])
  const canUpload = canEditAdminContent(profile)

  const disabledReason = profile
    ? "Your DB admin role is read-only. Ask an owner to change it to editor or owner."
    : "Your email can open the dashboard, but Supabase RLS needs an active admin_profiles row before uploads are allowed."

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-background p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <Badge variant="secondary" className="rounded-full">
            Part 3
          </Badge>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Media library
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Upload images and PDFs once, then reuse their public URLs for cover
            images, gallery images, reports, donation QR codes, and site
            settings.
          </p>
        </div>

        <div className="flex min-w-fit items-center gap-3 rounded-3xl bg-muted px-4 py-3">
          <HugeiconsIcon
            icon={DatabaseSyncIcon}
            className="size-5 text-muted-foreground"
            aria-hidden
          />
          <div>
            <p className="text-xs text-muted-foreground">DB role</p>
            <p className="text-sm font-semibold text-foreground">
              {profile?.is_active ? profile.role : "Not active"}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Upload media</CardTitle>
            <CardDescription>
              Files are stored in the public Supabase Storage bucket and
              recorded in media assets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MediaUploadForm
              disabled={!canUpload}
              disabledReason={!canUpload ? disabledReason : undefined}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent assets</CardTitle>
            <CardDescription>
              Copy these URLs into content forms as cover or gallery images.
            </CardDescription>
            <CardAction>
              <Badge variant="secondary" className="rounded-full">
                {assets.length} files
              </Badge>
            </CardAction>
          </CardHeader>
          <Separator />
          <CardContent>
            {assets.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {assets.map((asset) => (
                  <MediaAssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-3xl bg-muted px-6 text-center">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-background text-muted-foreground">
                  <HugeiconsIcon icon={Image01Icon} className="size-6" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">
                    No media uploaded yet
                  </p>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Upload the first cover image or PDF to start building the
                    public content library.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
