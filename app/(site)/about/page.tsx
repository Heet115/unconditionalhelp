"use client"

import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FavouriteIcon,
  HeartHandshakeIcon,
  ClipboardCheckIcon,
  UserGroup03Icon,
} from "@hugeicons/core-free-icons"
import { TRUST } from "@/lib/constants"

const VALUES = [
  {
    title: "Unconditional Love",
    description: "Serving every life, animal or human, without expectations, bias, or strings attached.",
    icon: FavouriteIcon,
    bg: "bg-rose-500/[0.03]",
    border: "border-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "Direct Action",
    description: "We don't wait for things to improve. We physically distribute meals, plant trees, and rescue animals ourselves.",
    icon: HeartHandshakeIcon,
    bg: "bg-primary/[0.03]",
    border: "border-primary/10",
    text: "text-primary",
  },
  {
    title: "100% Transparency",
    description: "Every single rupee donated is logged and documented. We provide real-time updates and public progress reports.",
    icon: ClipboardCheckIcon,
    bg: "bg-sky-500/[0.03]",
    border: "border-sky-500/10",
    text: "text-sky-600 dark:text-sky-400",
  },
  {
    title: "Community Growth",
    description: "Fostering collaboration, equality, and volunteerism to build a self-sustaining ecosystem of kindness.",
    icon: UserGroup03Icon,
    bg: "bg-amber-500/[0.03]",
    border: "border-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
  },
]

const TIMELINE = [
  {
    year: "2018",
    title: "Where It All Began",
    description: "Founded on September 5th, 2018 by Vivek Parmar with a single promise: to serve those who cannot ask for help.",
  },
  {
    year: "2020",
    title: "COVID-19 Relief Response",
    description: "Distributed emergency food kits and daily warm meals to migrant workers and daily wagers throughout lockdown.",
  },
  {
    year: "2022",
    title: "Expanding to Animal & Nature Welfare",
    description: "Launched dedicated animal feeding routes and organized large-scale local tree plantation campaigns in Bhavnagar.",
  },
  {
    year: "2026",
    title: "A Growing Family of Kindness",
    description: "Over 10,000+ meals served, 5,000+ trees planted, and a active community of 200+ passionate volunteers.",
  },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)] bg-[size:14px_24px]" />

      {/* Floating design circles */}
      <div className="absolute top-40 -left-20 size-[350px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute top-[600px] -right-20 size-[400px] rounded-full bg-primary/[0.02] blur-3xl" />

      <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <HugeiconsIcon icon={FavouriteIcon} className="size-3.5" />
              Our Story
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Serving with{" "}
              <span className="relative inline-block text-primary">
                Unconditional
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
              </span>{" "}
              Love
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Since 2018, {TRUST.name} has been dedicated to restoring dignity,
              planting hope, and assisting those in need without asking for
              anything in return.
            </p>
          </motion.div>
        </div>

        {/* Founder section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 overflow-hidden rounded-3xl border border-border/60 bg-muted/20 p-8 md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-sm">
                {/* SVG Avatar Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent" />
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  className="size-24 animate-pulse text-primary/30"
                />
                <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-border/60 bg-background/80 p-3 text-center backdrop-blur-md">
                  <h3 className="font-bold text-foreground">{TRUST.founder}</h3>
                  <p className="text-xs text-muted-foreground">
                    Founder & Trustee
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center md:col-span-7">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                Founder&apos;s Vision
              </span>
              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                &ldquo;Secret For Better Life&rdquo;
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {TRUST.name} was born out of a simple understanding: a better
                life is not found in what we accumulate, but in what we
                unconditionally give. We believe in serving humanity with
                empathy and action, reaching out to underprivileged families,
                stray animals, and our environment with equal devotion.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Our operations run entirely on volunteer support and community
                contributions, maintaining complete financial transparency to
                ensure that every resource goes directly to creating actual
                impact.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              The foundational pillars that guide every meal we serve, tree we
              plant, and life we touch.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col rounded-2xl border ${val.border} ${val.bg} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
              >
                <div
                  className={`inline-flex size-10 items-center justify-center rounded-xl border border-border/80 bg-background ${val.text} shadow-sm`}
                >
                  <HugeiconsIcon icon={val.icon} className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {val.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-28">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Journey
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              How we&apos;ve grown from a small spark of hope into a community
              pillar.
            </p>
          </div>

          <div className="relative mt-16 before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-border/60 sm:before:left-1/2">
            {TIMELINE.map((item, idx) => (
              <div
                key={item.year}
                className={`relative mb-12 flex flex-col sm:flex-row ${idx % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
              >
                {/* Connector dot */}
                <div className="absolute left-4 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm sm:left-1/2" />

                {/* Content card */}
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="ml-8 w-[calc(100%-2rem)] rounded-2xl border border-border/60 bg-muted/10 p-6 shadow-sm sm:ml-0 sm:w-[calc(50%-2rem)]"
                >
                  <span className="inline-block font-heading text-2xl font-bold text-primary">
                    {item.year}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
