import { Metadata } from "next"
import Image from "next/image"
import { Calendar01Icon, Location01Icon, Time02Icon, Notification01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { getUpcomingEvents } from "@/lib/data/events"

export const metadata: Metadata = {
  title: "Upcoming Events",
  description: "Discover and join our upcoming community programs, donation drives, and seminars.",
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function EventsPage() {
  const events = await getUpcomingEvents()

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)]" />

      {/* Decorative Circles */}
      <div className="absolute top-40 -left-20 size-[300px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute top-[800px] -right-20 size-[450px] rounded-full bg-primary/[0.02] blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <HugeiconsIcon icon={Notification01Icon} className="size-3.5" />
            Get Involved
          </span>
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
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Join our mission on the ground. Browse our schedule for upcoming community programs, health camps, and volunteer drives.
          </p>
        </div>

        {/* Events List */}
        <div className="mx-auto max-w-5xl">
          {events.length === 0 ? (
            <div className="text-center py-24 bg-muted/30 rounded-[2rem] border border-border/50 shadow-inner">
              <div className="mx-auto size-16 bg-background rounded-full flex items-center justify-center border border-border/50 mb-4 shadow-sm text-muted-foreground">
                <HugeiconsIcon icon={Calendar01Icon} size={28} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No Upcoming Events</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We are currently planning our next big initiatives. Check back soon or follow us on social media for updates!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event) => {
                const eventDate = new Date(event.date)
                const month = eventDate.toLocaleString('default', { month: 'short' })
                const day = eventDate.getDate()

                return (
                  <div 
                    key={event.id}
                    className="group relative flex flex-col md:flex-row overflow-hidden rounded-[2rem] border border-border/60 bg-muted/15 p-4 sm:p-6 hover:border-primary/20 hover:bg-muted/20 hover:shadow-xl transition-all duration-500"
                  >
                    {/* Image Column */}
                    <div className="relative aspect-[16/9] md:aspect-[4/3] w-full md:w-72 shrink-0 overflow-hidden rounded-[1.5rem] bg-muted border border-border/10 mb-6 md:mb-0 md:mr-8 shadow-sm">
                      <Image
                        src={event.cover_image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      {/* Calendar Badge Overlay */}
                      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md rounded-2xl p-2 min-w-[3.5rem] text-center border border-border/50 shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                        <span className="block text-[10px] font-bold uppercase text-primary tracking-wider">{month}</span>
                        <span className="block text-2xl font-extrabold text-foreground leading-none mt-0.5">{day}</span>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-1 flex-col justify-center">
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mb-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-3 py-1.5 rounded-full border border-border/40 shadow-sm">
                          <HugeiconsIcon icon={Calendar01Icon} size={16} className="text-primary" />
                          <time dateTime={event.date}>
                            {eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </time>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-3 py-1.5 rounded-full border border-border/40 shadow-sm">
                          <HugeiconsIcon icon={Time02Icon} size={16} className="text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-3 py-1.5 rounded-full border border-border/40 shadow-sm">
                          <HugeiconsIcon icon={Location01Icon} size={16} className="text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
