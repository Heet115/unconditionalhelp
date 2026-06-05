"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TRUST } from "@/lib/constants"

export function HeroSection() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 size-[480px] rounded-full bg-primary/[0.07]" />
        <div className="absolute top-[45%] -left-16 size-[200px] rounded-full bg-primary/[0.05]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--primary) 0.6px, transparent 0.6px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute right-0 bottom-0 left-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center px-5 pt-20 text-center sm:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5 text-xs"
          >
            <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-primary" />
            Serving Since {TRUST.founded.split(" ").pop()} · Bhavnagar, Gujarat
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 font-heading text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Unconditional
          <br />
          Help{" "}
          <span className="relative text-primary">
            Bhavnagar
            <svg
              viewBox="0 0 286 18"
              fill="none"
              className="absolute -bottom-2 left-0 w-full text-primary/30 sm:-bottom-3"
            >
              <path
                d="M2 15C72 5 144 2 284 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 font-heading text-lg text-muted-foreground italic sm:text-xl"
        >
          &ldquo;{TRUST.tagline}&rdquo;
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Empowering communities through food, education, environmental care,
          and animal welfare. Every act of service ripples outward.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 mb-12 flex flex-wrap justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-8 shadow-lg shadow-primary/20"
          >
            <Link href="/donate">
              Donate Now
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full px-8"
          >
            <Link href="/volunteer">Join as Volunteer</Link>
          </Button>
        </motion.div>
      </div>

      {/* Curved bottom divider */}
      <div className="absolute right-0 bottom-0 left-0 z-10">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
          className="block h-12 w-full sm:h-16 md:h-20"
        >
          <path
            d="M0 80V40C240 10 480 0 720 10s480 30 720 10v60H0Z"
            className="fill-muted/40"
          />
        </svg>
      </div>
    </section>
  )
}
