import { Metadata } from "next"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  StarIcon,
  FavouriteIcon,
  Plant03Icon,
  QuoteUpIcon,
} from "@hugeicons/core-free-icons"
import { getImpactStories } from "@/lib/data/impact"
import { BeforeAfterSlider } from "@/components/before-after-slider"

export const metadata: Metadata = {
  title: "Our Impact & Success Stories",
  description:
    "Explore the real-world transformations and success stories driven by our initiatives.",
}

export const revalidate = 60

export default async function ImpactPage() {
  const stories = await getImpactStories()

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)] bg-[size:14px_24px]" />

      {/* Decorative Circles */}
      <div className="absolute top-40 -left-20 size-[300px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute top-[800px] -right-20 size-[450px] rounded-full bg-primary/[0.02] blur-3xl" />

      <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <HugeiconsIcon icon={FavouriteIcon} className="size-3.5" />
            Creating Change
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Our{" "}
            <span className="relative inline-block text-primary">
              Impact
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
            Witness the real-world transformations powered by your support.
            Slide across the images to see the undeniable difference we&apos;ve
            made together.
          </p>
        </div>

        {/* Stories List */}
        <div className="mx-auto max-w-5xl space-y-24">
          {stories.length === 0 ? (
            <div className="rounded-[2rem] border border-border/50 bg-muted/30 py-24 text-center shadow-inner">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-border/50 bg-background text-muted-foreground shadow-sm">
                <HugeiconsIcon icon={StarIcon} size={28} />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                No Impact Stories Yet
              </h3>
              <p className="mx-auto max-w-md text-muted-foreground">
                Check back soon to witness our upcoming transformations.
              </p>
            </div>
          ) : (
            stories.map((story) => (
              <article key={story.id} className="relative">
                {/* Header for Story */}
                <header className="mb-8 text-center md:text-left">
                  <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-widest text-primary uppercase shadow-sm">
                    {story.category}
                  </span>
                  <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
                    {story.title}
                  </h2>
                </header>

                {/* The Interactive Slider */}
                <BeforeAfterSlider
                  beforeImage={story.before_image}
                  afterImage={story.after_image}
                />

                {/* Descriptions Split */}
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6 md:p-8">
                    <div className="absolute top-0 left-0 h-full w-1.5 rounded-l-3xl bg-rose-500/50"></div>
                    <h4 className="mb-3 text-sm font-bold tracking-wider text-rose-600 uppercase">
                      Before
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {story.before_description}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8">
                    <div className="absolute top-0 left-0 h-full w-1.5 rounded-l-3xl bg-emerald-500/50"></div>
                    <h4 className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
                      After
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {story.after_description}
                    </p>
                  </div>
                </div>

                {/* Impact Stat & Testimonial Row */}
                {(story.impact_stat_number || story.testimonial_quote) && (
                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {story.impact_stat_number && (
                      <div className="flex flex-col items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 p-8 text-center md:col-span-1">
                        <HugeiconsIcon
                          icon={Plant03Icon}
                          size={32}
                          className="mb-4 text-primary"
                        />
                        <span className="mb-2 text-4xl font-extrabold text-foreground lg:text-5xl">
                          {story.impact_stat_number}
                        </span>
                        <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                          {story.impact_stat_label}
                        </span>
                      </div>
                    )}

                    {story.testimonial_quote && (
                      <div
                        className={`flex flex-col justify-center rounded-3xl border border-border/50 bg-muted/30 p-8 ${story.impact_stat_number ? "md:col-span-2" : "md:col-span-3"}`}
                      >
                        <HugeiconsIcon
                          icon={QuoteUpIcon}
                          size={28}
                          className="mb-4 text-primary/40"
                        />
                        <blockquote className="mb-6 text-lg leading-relaxed font-medium text-foreground italic md:text-xl">
                          &quot;{story.testimonial_quote}&quot;
                        </blockquote>
                        <div className="text-sm font-bold tracking-wide text-primary uppercase">
                          — {story.testimonial_author}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <hr className="mt-24 border-border/40" />
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
