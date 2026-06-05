"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ServingFoodIcon,
  Plant03Icon,
  ChessPawnIcon,
  TShirtIcon,
  FavouriteIcon,
  Image01Icon,
} from "@hugeicons/core-free-icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"
import type { GalleryItem } from "@/lib/data/gallery"

const ICON_MAP: Record<string, typeof ServingFoodIcon> = {
  ServingFoodIcon,
  Plant03Icon,
  ChessPawnIcon,
  TShirtIcon,
  FavouriteIcon,
}

export function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null)

  const CATEGORIES = ["All", ...Array.from(new Set(items.map((i) => i.category)))]

  const filteredItems = items.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)]" />

      {/* Background Orbs */}
      <div className="absolute top-40 -left-20 size-[320px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute top-[800px] -right-20 size-[400px] rounded-full bg-primary/[0.02] blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <FadeIn>
            <Badge variant="outline" className="gap-1.5 rounded-full bg-primary/10 border-0 px-3 py-1 text-xs font-semibold text-primary">
              <HugeiconsIcon icon={FavouriteIcon} className="size-3.5" />
              Our Campaign Impact
            </Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Activity{" "}
              <span className="relative inline-block text-primary">
                Gallery
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
              Explore visual moments capturing our ground efforts, community drives, and the direct impact made by our volunteers.
            </p>
          </FadeIn>
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

        {/* Gallery Grid */}
        <motion.div layout className="mt-12">
          {items.length === 0 ? (
            <div className="text-center py-24 bg-muted/30 rounded-[2rem] border border-border/50 shadow-inner">
              <div className="mx-auto size-16 bg-background rounded-full flex items-center justify-center border border-border/50 mb-4 shadow-sm text-muted-foreground">
                <HugeiconsIcon icon={Image01Icon} size={28} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No Gallery Items Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We are still compiling our visual moments. Check back soon for updates!
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-muted/10 rounded-3xl border border-border/50">
              <h3 className="text-xl font-medium text-foreground mb-2">No items in this category</h3>
              <p className="text-muted-foreground">Try selecting a different category.</p>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => {
                  const Icon = ICON_MAP[item.icon] || FavouriteIcon
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      className={`group relative overflow-hidden rounded-3xl border border-border/60 bg-muted/15 p-5 cursor-pointer hover:border-primary/20 hover:bg-muted/20 hover:shadow-md transition-all duration-300`}
                    >
                      {/* Media card representation */}
                      <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient || 'from-primary/10 to-primary/20'} border ${item.border || 'border-border/10'} flex items-center justify-center`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1.2px,transparent_1.2px)] bg-[size:16px_16px]" />
                        <div className={`p-4 rounded-full bg-background border border-border/60 shadow-sm ${item.accent || 'text-primary'} transition-transform duration-300 group-hover:scale-110`}>
                          <HugeiconsIcon icon={Icon} className="size-8" />
                        </div>
                        <span className="absolute bottom-3 left-3 rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold tracking-wide uppercase text-muted-foreground border border-border/40">
                          {item.category}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>{item.date}</span>
                          <span>{item.location}</span>
                        </div>
                        <h3 className="mt-2 text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <Dialog open={!!activeItem} onOpenChange={(open) => !open && setActiveItem(null)}>
            <DialogContent className="max-w-2xl overflow-hidden rounded-3xl border-border/50 bg-background/95 p-0 backdrop-blur-xl sm:rounded-[2.5rem]">
              <DialogHeader className="sr-only">
                <DialogTitle>{activeItem.title}</DialogTitle>
                <DialogDescription>{activeItem.description}</DialogDescription>
              </DialogHeader>

              {/* Large Media Representation */}
              <div className={`relative aspect-video w-full bg-gradient-to-br ${activeItem.gradient || 'from-primary/10 to-primary/20'} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1.2px,transparent_1.2px)] bg-[size:16px_16px]" />
                <div className={`p-6 rounded-full bg-background/50 backdrop-blur-md border border-background/20 shadow-xl ${activeItem.accent || 'text-primary'}`}>
                  {(() => {
                    const ModalIcon = ICON_MAP[activeItem.icon] || FavouriteIcon
                    return <HugeiconsIcon icon={ModalIcon} className="size-16 drop-shadow-md" />
                  })()}
                </div>
              </div>

              {/* Content area */}
              <div className="p-8 sm:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="rounded-full bg-muted px-3 text-[10px] font-bold text-muted-foreground uppercase border-border/40 shadow-sm">
                    {activeItem.category}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {activeItem.date}
                  </span>
                </div>

                <h2 className="mb-4 text-2xl font-extrabold text-foreground sm:text-3xl">
                  {activeItem.title}
                </h2>
                
                <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                  {activeItem.description}
                </p>

                <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-2 text-sm text-foreground shadow-sm">
                  <HugeiconsIcon icon={FavouriteIcon} size={16} className="text-primary" />
                  Location: <span className="font-semibold">{activeItem.location}</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
