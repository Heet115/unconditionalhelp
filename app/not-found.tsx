"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-4 pt-24 pb-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 size-[480px] rounded-full bg-primary/4" />
        <div className="absolute top-[45%] -left-16 size-[200px] rounded-full bg-primary/3" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--primary) 0.6px, transparent 0.6px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute right-0 bottom-0 left-0 h-1/3 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-8 flex size-24 items-center justify-center rounded-3xl border border-border/60 bg-background/50 text-primary shadow-xl backdrop-blur-xl"
        >
          <HugeiconsIcon icon={Search01Icon} className="size-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-7xl font-extrabold tracking-tight text-primary sm:text-8xl"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-2xl font-bold text-foreground sm:text-3xl"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 mb-10 text-base leading-relaxed text-muted-foreground"
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="h-12 gap-2 rounded-full px-8 shadow-lg shadow-primary/20"
            asChild
          >
            <Link href="/">
              Return to Homepage
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
