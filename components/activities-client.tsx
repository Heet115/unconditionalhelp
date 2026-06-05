"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import type { Activity } from "@/lib/data/activities"

export function ActivitiesClient({ activities }: { activities: Activity[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  // Dynamically get unique categories from activities
  const CATEGORIES = ["All", ...Array.from(new Set(activities.map((a) => a.category)))]

  const filteredItems = activities.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)]" />

      {/* Decorative Circles */}
      <div className="absolute top-40 -left-20 size-[300px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute top-[800px] -right-20 size-[450px] rounded-full bg-primary/[0.02] blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <HugeiconsIcon icon={Calendar01Icon} className="size-3.5" />
              Our Impact
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Latest{" "}
              <span className="relative inline-block text-primary">
                Activities
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
              Explore our recent social initiatives, community events, and the impact we are creating together.
            </p>
          </motion.div>
        </div>

        {/* Filter buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-xs font-semibold shadow-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-primary/25"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground border border-border/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <motion.div layout className="mt-12">
          {activities.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-border/50">
              <h3 className="text-xl font-medium text-foreground mb-2">No activities found</h3>
              <p className="text-muted-foreground">Check back later for updates on our recent work.</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-muted/10 rounded-3xl border border-border/50">
              <h3 className="text-xl font-medium text-foreground mb-2">No activities in this category</h3>
              <p className="text-muted-foreground">Try selecting a different category.</p>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((activity) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={activity.id}
                  >
                    <Link
                      href={`/activities/${activity.slug}`}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-muted/15 p-5 cursor-pointer hover:border-primary/20 hover:bg-muted/20 hover:shadow-md transition-all duration-300 h-full"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted border border-border/10 flex items-center justify-center">
                        <Image
                          src={activity.cover_image}
                          alt={activity.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted-foreground backdrop-blur-md border border-border/40">
                          {activity.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="mt-4 flex flex-1 flex-col">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <HugeiconsIcon icon={Calendar01Icon} size={12} />
                          <time dateTime={activity.created_at}>
                            {new Date(activity.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        </div>

                        <h3 className="mt-2 line-clamp-2 text-lg font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                          {activity.title}
                        </h3>

                        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                          {activity.description}
                        </p>

                        <div className="mt-4 flex items-center text-xs font-bold text-primary transition-colors group-hover:text-primary/80">
                          Read More
                          <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            size={14}
                            className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
