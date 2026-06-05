import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Calendar01Icon,
  ArrowLeft01Icon,
  Share01Icon,
  WhatsappIcon,
  Facebook01Icon,
  TwitterIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { getActivityBySlug } from "@/lib/data/activities"
import { Button } from "@/components/ui/button"

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const activity = await getActivityBySlug(resolvedParams.slug)

  if (!activity) {
    return {
      title: "Activity Not Found",
    }
  }

  return {
    title: activity.title,
    description: activity.description,
    openGraph: {
      images: [{ url: activity.cover_image }],
    },
  }
}

export default async function ActivityPage({ params }: Props) {
  const resolvedParams = await params
  const activity = await getActivityBySlug(resolvedParams.slug)

  if (!activity) {
    notFound()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)] bg-[size:14px_24px]" />

      {/* Decorative Circles */}
      <div className="absolute top-40 -left-20 size-[300px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute top-[800px] -right-20 size-[450px] rounded-full bg-primary/[0.02] blur-3xl" />

      <article className="relative container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/activities"
            className="group inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-5 py-2.5 text-sm font-semibold text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:text-primary hover:shadow-md"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            All Activities
          </Link>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-sm hover:border-blue-500/50 hover:text-blue-500"
            >
              <HugeiconsIcon icon={Facebook01Icon} size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-sm hover:border-sky-500/50 hover:text-sky-500"
            >
              <HugeiconsIcon icon={TwitterIcon} size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-sm hover:border-green-500/50 hover:text-green-500"
            >
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <header className="mb-12 text-center md:text-left">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase shadow-sm">
              {activity.category}
            </span>
            <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              <HugeiconsIcon icon={Calendar01Icon} size={16} />
              <time dateTime={activity.created_at}>
                {new Date(activity.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {activity.title}
          </h1>

          <p className="max-w-4xl text-xl leading-relaxed font-medium text-muted-foreground md:text-2xl">
            {activity.description}
          </p>
        </header>

        {/* Massive Cover Image */}
        <div className="group relative mb-16 aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] border border-border/40 bg-muted shadow-2xl">
          <Image
            src={activity.cover_image}
            alt={activity.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          {/* Main Content Column */}
          <div className="max-w-none">
            <div className="prose prose-lg md:prose-xl prose-green dark:prose-invert mb-16 max-w-none rounded-[2.5rem] border border-border/50 bg-background/40 p-8 shadow-sm backdrop-blur-xl sm:p-12">
              <div className="font-serif leading-relaxed whitespace-pre-wrap text-foreground first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:font-extrabold first-letter:text-primary">
                {activity.content}
              </div>
            </div>

            {/* Gallery */}
            {activity.gallery_images && activity.gallery_images.length > 0 && (
              <section className="mb-20">
                <div className="mb-10 flex items-center gap-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                    Event Gallery
                  </h2>
                  <div className="h-[2px] flex-1 rounded-full bg-border/40"></div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {activity.gallery_images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-border/40 bg-muted shadow-sm transition-all duration-500 hover:shadow-xl"
                    >
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* YouTube Video Embed */}
            {activity.youtube_video_id && (
              <section className="mb-16">
                <div className="mb-10 flex items-center gap-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                    Video Highlight
                  </h2>
                  <div className="h-[2px] flex-1 rounded-full bg-border/40"></div>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-border/40 bg-muted shadow-2xl transition-shadow duration-500 hover:shadow-primary/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${activity.youtube_video_id}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 h-full w-full border-0"
                  ></iframe>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden space-y-8 lg:block">
            <div className="sticky top-24 rounded-[2rem] border border-border/50 bg-background/50 p-8 shadow-sm backdrop-blur-xl">
              <h3 className="mb-4 text-lg font-bold">Share this story</h3>
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="h-12 justify-start gap-3 rounded-xl hover:border-blue-500 hover:bg-blue-500/5 hover:text-blue-500"
                >
                  <HugeiconsIcon icon={Facebook01Icon} size={20} />
                  Share on Facebook
                </Button>
                <Button
                  variant="outline"
                  className="h-12 justify-start gap-3 rounded-xl hover:border-sky-500 hover:bg-sky-500/5 hover:text-sky-500"
                >
                  <HugeiconsIcon icon={TwitterIcon} size={20} />
                  Share on Twitter
                </Button>
                <Button
                  variant="outline"
                  className="h-12 justify-start gap-3 rounded-xl hover:border-green-500 hover:bg-green-500/5 hover:text-green-500"
                >
                  <HugeiconsIcon icon={WhatsappIcon} size={20} />
                  Share on WhatsApp
                </Button>
                <Button
                  variant="secondary"
                  className="mt-2 h-12 justify-start gap-3 rounded-xl"
                >
                  <HugeiconsIcon icon={Share01Icon} size={20} />
                  Copy Link
                </Button>
              </div>

              <hr className="my-8 border-border/50" />

              <h3 className="mb-4 text-lg font-bold">Get Involved</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Inspired by this activity? You can help us create more impact.
              </p>
              <Button asChild className="h-12 w-full rounded-xl shadow-md">
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="mt-3 h-12 w-full rounded-xl bg-background hover:bg-muted"
              >
                <Link href="/volunteer">Become a Volunteer</Link>
              </Button>
            </div>
          </aside>
        </div>
      </article>
    </div>
  )
}
