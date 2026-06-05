import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar01Icon, ArrowLeft01Icon, Share01Icon, WhatsappIcon, Facebook01Icon, TwitterIcon } from "@hugeicons/core-free-icons"
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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)]" />

      {/* Decorative Circles */}
      <div className="absolute top-40 -left-20 size-[300px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute top-[800px] -right-20 size-[450px] rounded-full bg-primary/[0.02] blur-3xl" />

      <article className="container relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="mb-10 flex items-center justify-between">
          <Link 
            href="/activities" 
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors bg-background/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-border/50 shadow-sm hover:shadow-md"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} className="transition-transform group-hover:-translate-x-1" />
            All Activities
          </Link>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:text-blue-500 hover:border-blue-500/50">
              <HugeiconsIcon icon={Facebook01Icon} size={18} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:text-sky-500 hover:border-sky-500/50">
              <HugeiconsIcon icon={TwitterIcon} size={18} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:text-green-500 hover:border-green-500/50">
              <HugeiconsIcon icon={WhatsappIcon} size={18} />
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <header className="mb-12 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
              {activity.category}
            </span>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
              <HugeiconsIcon icon={Calendar01Icon} size={16} />
              <time dateTime={activity.created_at}>
                {new Date(activity.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6 leading-[1.1]">
            {activity.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl font-medium">
            {activity.description}
          </p>
        </header>

        {/* Massive Cover Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] bg-muted border border-border/40 mb-16 shadow-2xl group">
          <Image
            src={activity.cover_image}
            alt={activity.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
          {/* Main Content Column */}
          <div className="max-w-none">
            <div className="prose prose-lg md:prose-xl prose-green dark:prose-invert max-w-none mb-16 bg-background/40 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] border border-border/50 shadow-sm">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed font-serif first-letter:text-7xl first-letter:font-extrabold first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                {activity.content}
              </div>
            </div>

            {/* Gallery */}
            {activity.gallery_images && activity.gallery_images.length > 0 && (
              <section className="mb-20">
                <div className="flex items-center gap-6 mb-10">
                  <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Event Gallery</h2>
                  <div className="flex-1 h-[2px] bg-border/40 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {activity.gallery_images.map((image, index) => (
                    <div key={index} className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-muted border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500">
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* YouTube Video Embed */}
            {activity.youtube_video_id && (
              <section className="mb-16">
                <div className="flex items-center gap-6 mb-10">
                  <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Video Highlight</h2>
                  <div className="flex-1 h-[2px] bg-border/40 rounded-full"></div>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] bg-muted border border-border/40 shadow-2xl hover:shadow-primary/10 transition-shadow duration-500">
                  <iframe
                    src={`https://www.youtube.com/embed/${activity.youtube_video_id}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                  ></iframe>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-8">
            <div className="sticky top-24 bg-background/50 backdrop-blur-xl p-8 rounded-[2rem] border border-border/50 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Share this story</h3>
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="justify-start gap-3 rounded-xl h-12 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5">
                  <HugeiconsIcon icon={Facebook01Icon} size={20} />
                  Share on Facebook
                </Button>
                <Button variant="outline" className="justify-start gap-3 rounded-xl h-12 hover:border-sky-500 hover:text-sky-500 hover:bg-sky-500/5">
                  <HugeiconsIcon icon={TwitterIcon} size={20} />
                  Share on Twitter
                </Button>
                <Button variant="outline" className="justify-start gap-3 rounded-xl h-12 hover:border-green-500 hover:text-green-500 hover:bg-green-500/5">
                  <HugeiconsIcon icon={WhatsappIcon} size={20} />
                  Share on WhatsApp
                </Button>
                <Button variant="secondary" className="justify-start gap-3 rounded-xl h-12 mt-2">
                  <HugeiconsIcon icon={Share01Icon} size={20} />
                  Copy Link
                </Button>
              </div>

              <hr className="my-8 border-border/50" />

              <h3 className="font-bold text-lg mb-4">Get Involved</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Inspired by this activity? You can help us create more impact.
              </p>
              <Button asChild className="w-full rounded-xl h-12 shadow-md">
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-xl h-12 mt-3 bg-background hover:bg-muted">
                <Link href="/volunteer">Become a Volunteer</Link>
              </Button>
            </div>
          </aside>
        </div>

      </article>
    </div>
  )
}
