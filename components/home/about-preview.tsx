"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, FavouriteIcon } from "@hugeicons/core-free-icons"
import { useInView } from "@/hooks/use-in-view"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TRUST } from "@/lib/constants"

const VALUES = [
  "Humanity",
  "Compassion",
  "Service",
  "Environment",
  "Animal Welfare",
]

export function AboutPreview() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-muted/40 py-20 md:py-28"
    >
      <div className="absolute -top-20 -left-20 size-[300px] rounded-full bg-primary/[0.05]" />
      <div className="absolute -right-16 bottom-0 size-[200px] rounded-full bg-primary/[0.04]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--primary) 0.6px, transparent 0.6px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
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
            About the Trust
          </Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-center font-heading text-3xl tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          A mission rooted in{" "}
          <span className="relative text-primary">
            compassion
            <svg
              viewBox="0 0 180 12"
              fill="none"
              className="absolute -bottom-1 left-0 w-full text-primary/25"
            >
              <path
                d="M2 9C40 3 90 2 178 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Left — quote card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex flex-col rounded-3xl bg-primary text-primary-foreground sm:min-h-[420px]"
          >
            <div className="absolute top-6 right-8 font-heading text-[8rem] leading-none text-primary-foreground/[0.06] select-none">
              &ldquo;
            </div>

            <div className="relative flex flex-1 flex-col justify-between p-8 sm:p-10">
              <div className="flex flex-col gap-6">
                <span className="w-fit rounded-full bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-primary-foreground/60 uppercase">
                  Est. {TRUST.founded.split(" ").pop()}
                </span>

                <blockquote className="max-w-sm font-heading text-xl leading-snug sm:text-2xl lg:text-[1.65rem]">
                  &ldquo;The best way to find yourself is to lose yourself in
                  the service of others.&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary-foreground text-primary">
                    <HugeiconsIcon icon={FavouriteIcon} size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{TRUST.founder}</p>
                    <p className="text-xs text-primary-foreground/50">
                      Founder & Trustee
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 rounded-b-3xl border-t border-primary-foreground/8 bg-primary-foreground/5 px-8 py-5 sm:px-10">
              {VALUES.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-primary-foreground/10 px-3 py-1 text-[11px] font-medium text-primary-foreground/70"
                >
                  {v}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col gap-5 rounded-3xl border border-border/60 bg-background p-8 sm:p-10"
          >
            <p className="text-base leading-[1.8] text-muted-foreground">
              Founded on{" "}
              <span className="font-medium text-foreground">
                {TRUST.founded}
              </span>
              , {TRUST.name} began with a single act of kindness — distributing
              meals to those in need on the streets of Bhavnagar.
            </p>
            <p className="text-base leading-[1.8] text-muted-foreground">
              Today, our trust runs seven service programs spanning food
              distribution, educational support, clothes drives, tree plantation
              campaigns, animal welfare, emergency relief, and community
              development.
            </p>
            <p className="text-base leading-[1.8] text-muted-foreground">
              We operate with full transparency — every donation is tracked,
              every effort documented, and every outcome shared with our
              community.
            </p>

            <Separator className="my-2" />

            <div className="flex gap-8">
              {[
                { val: "7+", label: "Years Active" },
                { val: "7", label: "Service Areas" },
                { val: "200+", label: "Volunteers" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-2xl text-foreground">
                    {s.val}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <Button asChild variant="secondary" className="mt-auto rounded-full">
              <Link href="/about">
                Read our full story
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
