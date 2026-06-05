"use client"

import { useEffect } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert02Icon,
  RefreshIcon,
  Home01Icon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-4 pt-24 pb-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 size-[480px] rounded-full bg-destructive/4" />
        <div className="absolute top-[45%] -right-16 size-[200px] rounded-full bg-destructive/3" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--destructive)) 0.6px, transparent 0.6px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute right-0 bottom-0 left-0 h-1/3 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-8 flex size-24 items-center justify-center rounded-3xl border border-destructive/20 bg-background/50 text-destructive shadow-xl backdrop-blur-xl"
        >
          <HugeiconsIcon icon={Alert02Icon} className="size-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
        >
          Oops! Something went wrong
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 mb-10 text-base leading-relaxed text-muted-foreground"
        >
          We encountered an unexpected error while trying to process your
          request. Our team has been notified. Please try again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            onClick={reset}
            size="lg"
            className="h-12 gap-2 rounded-full px-6 shadow-lg shadow-primary/20"
          >
            <HugeiconsIcon icon={RefreshIcon} className="size-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 gap-2 rounded-full px-6"
            asChild
          >
            <Link href="/">
              <HugeiconsIcon icon={Home01Icon} className="size-4" />
              Go Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
