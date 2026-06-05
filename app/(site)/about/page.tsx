"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FavouriteIcon,
  HeartHandshakeIcon,
  ClipboardCheckIcon,
  UserGroup03Icon,
  ServingFoodIcon,
  GlobalEducationIcon,
  CharityIcon,
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

const TEAM_MEMBERS = [
  {
    name: "Vivek Parmar",
    role: "Founder & Trustee",
    bio: "Visionary founder driving the trust's core vision, managing day-to-day coordination and partnerships.",
    icon: HeartHandshakeIcon,
  },
  {
    name: "Amit Gohil",
    role: "Food Logistics Lead",
    bio: "Coordinates daily raw material sourcing, kitchen preparation, and street distribution circuits.",
    icon: ServingFoodIcon,
  },
  {
    name: "Neha Shah",
    role: "Education Campaigner",
    bio: "Manages student enrollment support, book drives, tuition centers, and underprivileged children outreach.",
    icon: GlobalEducationIcon,
  },
  {
    name: "Dr. Rajan Patel",
    role: "Advisory & Animal Welfare",
    bio: "Leads medical aid circuits for stray animals, bird feeding drives, and veterinary outreach coordination.",
    icon: UserGroup03Icon,
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

        {/* Transparency Section */}
        <div className="mt-28 rounded-3xl border border-border/60 bg-muted/10 p-8 md:p-12">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <HugeiconsIcon icon={ClipboardCheckIcon} className="size-3.5" />
              100% Financial Accountability
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Transparency Pledge
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We believe that trust is built on clarity. We account for every single rupee donated to ensure it directly benefits the lives we serve.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-background p-6 shadow-sm">
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                <HugeiconsIcon icon={CharityIcon} className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">0% Admin Fee Cut</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                All administrative and logistics costs are funded out-of-pocket by the founder and trustees. Every rupee you donate goes 100% directly to ground campaigns.
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-background p-6 shadow-sm">
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                <HugeiconsIcon icon={ClipboardCheckIcon} className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">Open Ledger Policy</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Complete invoices, purchase bills, and distribution accounts are documented. Any donor can request a detailed statement of their donation utilization at any time.
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-background p-6 shadow-sm">
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                <HugeiconsIcon icon={UserGroup03Icon} className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">Daily Proof of Work</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                We document our distributions daily with photos and video updates on our WhatsApp status and social channels, offering real-time visibility into active campaigns.
              </p>
            </div>
          </div>

          {/* Allocation Breakdown Progress Bars */}
          <div className="mt-12 rounded-2xl border border-border/50 bg-background p-6 md:p-8">
            <h3 className="text-lg font-bold text-foreground">Current Fund Allocation</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Visual breakdown of where and how all public donations are distributed across our active service areas.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-foreground">Daily Free Food Distribution</span>
                  <span className="text-primary font-bold">60%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-foreground">Environmental & Tree Plantation Drives</span>
                  <span className="text-primary font-bold">20%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "20%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-foreground">Animal Rescue & Feeding Routes</span>
                  <span className="text-primary font-bold">15%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "15%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-foreground">Student Educational Support & Tuition Kits</span>
                  <span className="text-primary font-bold">5%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "5%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Team & Volunteers */}
        <div className="mt-28">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Core Team & Key Volunteers
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Meet the passionate individuals driving the daily operations of {TRUST.name}.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-muted/10 p-6 text-center transition-all duration-300 hover:border-primary/30 hover:bg-muted/15"
              >
                {/* Team Card Top Gradient Accent */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="mx-auto flex size-20 items-center justify-center rounded-2xl border border-border/80 bg-background text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <HugeiconsIcon icon={member.icon} className="size-8 text-primary/80" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-primary/80 mt-1 uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Volunteer Force Highlight Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-primary/10 bg-primary/[0.01] p-8 text-center md:flex-row md:text-left"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground">Our 200+ Volunteer Force</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-2xl">
                UH Bhavnagar runs entirely on the spirit of volunteers. From students to local citizens, our community steps out every single day to serve meals, plant hope, and help those in need.
              </p>
            </div>
            <Link
              href="/volunteer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/10 transition-all duration-200 hover:bg-primary/95 hover:shadow-lg"
            >
              Join the Movement
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
