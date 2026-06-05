"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ServingFoodIcon,
  GlobalEducationIcon,
  TShirtIcon,
  Plant03Icon,
  ChessPawnIcon,
  Fire02Icon,
  UserGroup03Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { useInView } from "@/hooks/use-in-view"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SERVICES } from "@/lib/constants"

const SERVICE_ICONS: Record<string, typeof ServingFoodIcon> = {
  food: ServingFoodIcon,
  education: GlobalEducationIcon,
  clothes: TShirtIcon,
  environment: Plant03Icon,
  animal: ChessPawnIcon,
  emergency: Fire02Icon,
  community: UserGroup03Icon,
}

export function ServicesPreview() {
  const { ref, isInView } = useInView({ threshold: 0.08 })

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute top-10 -right-24 size-[350px] rounded-full bg-primary/[0.05]" />
      <div className="absolute -bottom-16 -left-16 size-[250px] rounded-full bg-primary/[0.04]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
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
            Our Services
          </Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-center font-heading text-3xl tracking-tight text-foreground sm:text-4xl"
        >
          Seven ways we{" "}
          <span className="relative text-primary">
            serve
            <svg
              viewBox="0 0 90 12"
              fill="none"
              className="absolute -bottom-1 left-0 w-full text-primary/25"
            >
              <path
                d="M2 9C20 3 50 2 88 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          the community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-lg text-center text-base text-muted-foreground"
        >
          Every program is driven by compassion and powered by dedicated
          volunteers.
        </motion.p>

        {/* Bento grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 2).map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              <Card className="group h-full rounded-3xl border-border/60 bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="flex h-full flex-col gap-4 p-7">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <HugeiconsIcon
                      icon={SERVICE_ICONS[service.icon]}
                      size={24}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-heading text-lg text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="sm:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <Card className="group h-full rounded-3xl border-border/60 bg-primary text-primary-foreground transition-all duration-300 hover:shadow-lg">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-7">
                <div className="flex flex-col gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15">
                    <HugeiconsIcon
                      icon={SERVICE_ICONS[SERVICES[2].icon]}
                      size={24}
                    />
                  </div>
                  <h3 className="font-heading text-lg">{SERVICES[2].title}</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/70">
                    {SERVICES[2].description}
                  </p>
                </div>
                <p className="text-xs text-primary-foreground/40">
                  One of our most impactful programs
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {SERVICES.slice(3).map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.06 }}
            >
              <Card className="group h-full rounded-3xl border-border/60 bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="flex h-full items-start gap-4 p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <HugeiconsIcon
                      icon={SERVICE_ICONS[service.icon]}
                      size={20}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 text-center"
        >
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/services">
              View all services
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
