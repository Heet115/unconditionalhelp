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
} from "@hugeicons/core-free-icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const CATEGORIES = ["All", "Food Distribution", "Tree Plantation", "Animal Welfare", "Clothes Distribution"] as const
type Category = (typeof CATEGORIES)[number]

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "Food Distribution",
    title: "Daily Wagers Lunch Drive",
    date: "May 28, 2026",
    location: "Kumbharwada, Bhavnagar",
    icon: ServingFoodIcon,
    description: "Distributed over 250 fresh, warm lunch plates to local daily wagers and their children.",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/25",
    accent: "text-amber-500",
  },
  {
    id: 2,
    category: "Tree Plantation",
    title: "Green Campus Campaign",
    date: "June 02, 2026",
    location: "Government School, Bhavnagar",
    icon: Plant03Icon,
    description: "Planted 50 native shade trees and installed metal tree guards to protect them.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/25",
    accent: "text-emerald-500",
  },
  {
    id: 3,
    category: "Animal Welfare",
    title: "Bird Water Pot Distribution",
    date: "May 15, 2026",
    location: "Ruva Road, Bhavnagar",
    icon: ChessPawnIcon,
    description: "Distributed 100 clay drinking water pots to residents to place on balconies for birds during summer.",
    gradient: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/25",
    accent: "text-rose-500",
  },
  {
    id: 4,
    category: "Clothes Distribution",
    title: "Winter Blanket Drive",
    date: "January 10, 2026",
    location: "Bhavnagar Railway Station area",
    icon: TShirtIcon,
    description: "Provided thick, warm blankets to 150 homeless individuals sleeping on streets during a cold wave.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/25",
    accent: "text-blue-500",
  },
  {
    id: 5,
    category: "Food Distribution",
    title: "Sunday Special Sweet Meal",
    date: "April 20, 2026",
    location: "Chitra Slum Area, Bhavnagar",
    icon: ServingFoodIcon,
    description: "Cooked and served nutritious meals along with festive sweets to 300+ families.",
    gradient: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/25",
    accent: "text-amber-600",
  },
  {
    id: 6,
    category: "Tree Plantation",
    title: "Urban Forest Drive",
    date: "May 05, 2026",
    location: "Victoria Park Outskirts, Bhavnagar",
    icon: Plant03Icon,
    description: "Organized a community drive planting 120 saplings of peepal, neem, and banyan trees.",
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/25",
    accent: "text-green-500",
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [activeItem, setActiveItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null)

  const filteredItems = GALLERY_ITEMS.filter(
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
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <HugeiconsIcon icon={FavouriteIcon} className="size-3.5" />
              Our Campaign Impact
            </span>
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

        {/* Gallery Grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
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
                <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1.2px,transparent_1.2px)] bg-[size:16px_16px]" />
                  <div className={`p-4 rounded-full bg-background border border-border/60 shadow-sm ${item.accent} transition-transform duration-300 group-hover:scale-110`}>
                    <HugeiconsIcon icon={item.icon} className="size-8" />
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
                  <h3 className="mt-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox / Modal */}
        <Dialog open={!!activeItem} onOpenChange={(open) => !open && setActiveItem(null)}>
          <DialogContent className="max-w-xl p-6 rounded-3xl border border-border bg-background shadow-2xl">
            {activeItem && (
              <>
                <DialogHeader className="sr-only">
                  <DialogTitle>{activeItem.title}</DialogTitle>
                  <DialogDescription>{activeItem.description}</DialogDescription>
                </DialogHeader>

                <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${activeItem.gradient} border ${activeItem.border} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1.2px,transparent_1.2px)] bg-[size:16px_16px]" />
                  <div className={`p-5 rounded-full bg-background border border-border shadow-md ${activeItem.accent}`}>
                    <HugeiconsIcon icon={activeItem.icon} className="size-12" />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase text-primary">
                      {activeItem.category}
                    </span>
                    <span className="text-xs text-muted-foreground">• {activeItem.date}</span>
                    <span className="text-xs text-muted-foreground">• {activeItem.location}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-foreground">{activeItem.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
