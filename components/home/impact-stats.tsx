"use client"

import { motion } from "motion/react"
import { useInView } from "@/hooks/use-in-view"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Badge } from "@/components/ui/badge"
import { IMPACT_STATS } from "@/lib/constants"

export function ImpactStats() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-muted/40 py-20 md:py-28"
    >
      {/* Decorative elements */}
      <div className="absolute -top-16 left-1/4 size-[280px] rounded-full bg-primary/[0.05]" />
      <div className="absolute -right-20 bottom-10 size-[200px] rounded-full bg-primary/[0.04]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--primary) 0.6px, transparent 0.6px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5 text-xs"
          >
            Our Impact
          </Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-5 max-w-lg text-center font-heading text-3xl tracking-tight text-foreground sm:text-4xl"
        >
          Numbers that{" "}
          <span className="relative text-primary">
            speak
            <svg
              viewBox="0 0 100 12"
              fill="none"
              className="absolute -bottom-1 left-0 w-full text-primary/25"
            >
              <path
                d="M2 9C25 3 55 2 98 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          for themselves
        </motion.h2>

        {/* Stats grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IMPACT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
              className="group flex flex-col items-center gap-2 rounded-3xl border border-border/60 bg-background p-8 text-center transition-all duration-300 hover:border-primary/20 hover:shadow-md"
            >
              <p className="font-heading text-5xl text-foreground sm:text-6xl">
                <NumberTicker
                  value={stat.value}
                  className="font-heading text-foreground"
                />
                <span className="text-primary">{stat.suffix}</span>
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
