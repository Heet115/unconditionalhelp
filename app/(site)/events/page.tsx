import { Metadata } from "next"
import Image from "next/image"
import {
  Calendar01Icon,
  Location01Icon,
  Time02Icon,
  Notification01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { getUpcomingEvents } from "@/lib/data/events"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "Discover and join our upcoming community programs, donation drives, and seminars.",
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function EventsPage() {
  const events = await getUpcomingEvents()

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)] bg-size-[14px_24px]" />

      {/* Decorative Circles */}
      <div className="absolute top-40 -left-20 size-[300px] rounded-full bg-primary/3 blur-3xl" />
      <div className="absolute top-[800px] -right-20 size-[450px] rounded-full bg-primary/2 blur-3xl" />

      <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <FadeIn className="mb-16 text-center">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-0 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
          >
            <HugeiconsIcon icon={Notification01Icon} className="size-3.5" />
            Get Involved
          </Badge>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Upcoming{" "}
            <span className="relative inline-block text-primary">
              Events
              <svg
                className="absolute -bottom-2 left-0 h-2 w-full text-primary/30"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,5 Q50,10 100,5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Join our mission on the ground. Browse our schedule for upcoming
            community programs, health camps, and volunteer drives.
          </p>
        </FadeIn>

        {/* Events List */}
        <FadeIn delay={0.2} className="mx-auto max-w-5xl">
          {events.length === 0 ? (
            <div className="rounded-[2rem] border border-border/50 bg-muted/30 py-24 text-center shadow-inner">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-border/50 bg-background text-muted-foreground shadow-sm">
                <HugeiconsIcon icon={Calendar01Icon} size={28} />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                No Upcoming Events
              </h3>
              <p className="mx-auto max-w-md text-muted-foreground">
                We are currently planning our next big initiatives. Check back
                soon or follow us on social media for updates!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event) => {
                const eventDate = new Date(event.date)
                const month = eventDate.toLocaleString("default", {
                  month: "short",
                })
                const day = eventDate.getDate()

                return (
                  <div
                    key={event.id}
                    className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-muted/15 p-4 transition-all duration-500 hover:border-primary/20 hover:bg-muted/20 hover:shadow-xl sm:p-6 md:flex-row"
                  >
                    {/* Image Column */}
                    <div className="relative mb-6 aspect-video w-full shrink-0 overflow-hidden rounded-[1.5rem] border border-border/10 bg-muted shadow-sm md:mr-8 md:mb-0 md:aspect-4/3 md:w-72">
                      <Image
                        src={event.cover_image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      {/* Calendar Badge Overlay */}
                      <div className="absolute top-4 left-4 min-w-14 rounded-2xl border border-border/50 bg-background/95 p-2 text-center shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                        <span className="block text-[10px] font-bold tracking-wider text-primary uppercase">
                          {month}
                        </span>
                        <span className="mt-0.5 block text-2xl leading-none font-extrabold text-foreground">
                          {day}
                        </span>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-1 flex-col justify-center">
                      <h3 className="mb-4 text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                        {event.title}
                      </h3>

                      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
                          <HugeiconsIcon
                            icon={Calendar01Icon}
                            size={16}
                            className="text-primary"
                          />
                          <time dateTime={event.date}>
                            {eventDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
                          <HugeiconsIcon
                            icon={Time02Icon}
                            size={16}
                            className="text-primary"
                          />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
                          <HugeiconsIcon
                            icon={Location01Icon}
                            size={16}
                            className="text-primary"
                          />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="line-clamp-3 leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  )
}
