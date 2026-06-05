"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  CharityIcon,
  ClipboardCheckIcon,
  HeartHandshakeIcon,
  Analytics02Icon,
} from "@hugeicons/core-free-icons"
import { useInView } from "@/hooks/use-in-view"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HOW_WE_WORK } from "@/lib/constants"

const STEP_ICONS: Record<string, typeof CharityIcon> = {
  charity: CharityIcon,
  clipboard: ClipboardCheckIcon,
  heartHandshake: HeartHandshakeIcon,
  analytics: Analytics02Icon,
}

export function DonationCta() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute -top-20 -right-20 size-[350px] rounded-full bg-primary/[0.05]" />
      <div className="absolute bottom-0 -left-16 size-[250px] rounded-full bg-primary/[0.04]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--primary) 0.6px, transparent 0.6px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[2rem] bg-primary"
        >
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <Badge
                variant="secondary"
                className="w-fit rounded-full border-primary-foreground/10 bg-primary-foreground/10 px-4 py-1.5 text-xs text-primary-foreground/80"
              >
                Make a Difference
              </Badge>

              <h2 className="mt-5 font-heading text-3xl tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
                Your generosity
                <br />
                changes{" "}
                <span className="relative">
                  lives
                  <svg
                    viewBox="0 0 80 12"
                    fill="none"
                    className="absolute -bottom-1 left-0 w-full text-primary-foreground/20"
                  >
                    <path
                      d="M2 9C18 3 45 2 78 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="mt-5 max-w-md text-base leading-relaxed text-primary-foreground/60">
                Every contribution, no matter how small, fuels our mission. From
                a single meal to a child&apos;s education — your support creates
                lasting impact.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-primary-foreground px-8 text-primary shadow-lg shadow-black/10 hover:bg-primary-foreground/90"
                >
                  <Link href="/donate">
                    Donate Now
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-8 text-primary-foreground shadow-sm backdrop-blur-sm hover:bg-primary-foreground/20"
                >
                  <Link href="/volunteer">Volunteer</Link>
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-center border-t border-primary-foreground/8 bg-primary-foreground/5 p-8 sm:p-12 lg:border-t-0 lg:border-l lg:p-14">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-primary-foreground/40 uppercase">
                How We works
              </p>

              <div className="mt-6 flex flex-col gap-6">
                {HOW_WE_WORK.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/10 text-primary-foreground/70">
                      <HugeiconsIcon icon={STEP_ICONS[step.icon]} size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-foreground">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-sm text-primary-foreground/50">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 text-xs text-primary-foreground/30">
                100% of donations go directly to our programs
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
