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
import { SERVICES } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const SERVICE_ICONS: Record<string, typeof ServingFoodIcon> = {
  food: ServingFoodIcon,
  education: GlobalEducationIcon,
  clothes: TShirtIcon,
  environment: Plant03Icon,
  animal: ChessPawnIcon,
  emergency: Fire02Icon,
  community: UserGroup03Icon,
}

const SERVICE_DETAILS: Record<
  string,
  { status: string; details: string[]; color: string }
> = {
  food: {
    status: "Daily Operations",
    color:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    details: [
      "Daily fresh food distribution to wagers & shelter homes.",
      "Emergency food packet distribution during monsoon/winter.",
      "Nutrient-dense meals specifically prepared for children and elderly.",
    ],
  },
  education: {
    status: "Ongoing Support",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    details: [
      "Free books, school bags, and stationery kits at start of term.",
      "Tuition fees coverage for top performing students from low-income homes.",
      "Career counseling workshops and basic computer literacy drives.",
    ],
  },
  clothes: {
    status: "Seasonal Campaigns",
    color:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    details: [
      "Blanket distribution drives ahead of severe winter months.",
      "New clothes distribution to underprivileged families during festivals.",
      "Clean clothing collection, sorting, and donation campaigns.",
    ],
  },
  environment: {
    status: "Active Campaigns",
    color:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    details: [
      "Massive tree plantation drives in school campuses and public zones.",
      "Tree protection guard installations to ensure high survival rate.",
      "Awareness seminars in local communities regarding single-use plastics.",
    ],
  },
  animal: {
    status: "Daily Operations",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    details: [
      "Daily feeding runs for stray dogs, cattle, and street birds.",
      "Rescue of injured birds during kite festivals and summers.",
      "Water pot distributions for birds and small animals during peak heat waves.",
    ],
  },
  emergency: {
    status: "On-Call Support",
    color:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    details: [
      "Medical aid coordination and medicine supplies for urgent cases.",
      "Disaster relief support (supplies, clothes, shelters) during heavy floods.",
      "Immediate assistance for stranded families and senior citizens.",
    ],
  },
  community: {
    status: "Monthly Projects",
    color:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    details: [
      "Hygiene and sanitation awareness drives in low-income clusters.",
      "Fostering civic engagement and leadership values through youth volunteering.",
      "Conducting blood donation drives in collaboration with local blood banks.",
    ],
  },
}

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)] bg-size-[14px_24px]" />

      {/* Decorative Circles */}
      <div className="absolute top-40 -left-20 size-[300px] rounded-full bg-primary/3 blur-3xl" />
      <div className="absolute top-[800px] -right-20 size-[450px] rounded-full bg-primary/2 blur-3xl" />

      <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="gap-1.5 rounded-full border-0 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
              <HugeiconsIcon icon={Plant03Icon} className="size-3.5" />
              What We Do
            </Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Our Area of{" "}
              <span className="relative inline-block text-primary">
                Services
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
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              We focus on unconditional relief across multiple verticals to
              create a holistic ecosystem of support and care in Bhavnagar.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => {
            const icon = SERVICE_ICONS[service.icon]
            const detailsObj = SERVICE_DETAILS[service.icon] || {
              status: "Active",
              color: "bg-primary/10 text-primary border-primary/20",
              details: ["General assistance campaigns and volunteer matching."],
            }

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative flex flex-col rounded-3xl border border-border/60 bg-muted/10 p-6 shadow-sm transition-all duration-300 hover:border-primary/25 hover:bg-muted/20 hover:shadow-md"
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-border bg-background text-primary shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/30">
                    {icon && <HugeiconsIcon icon={icon} className="size-5" />}
                  </div>
                  <Badge
                    variant="outline"
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${detailsObj.color}`}
                  >
                    {detailsObj.status}
                  </Badge>
                </div>

                <h3 className="mt-6 text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <Separator className="my-5" />

                {/* Sub activities */}
                <ul className="flex-1 space-y-2.5">
                  {detailsObj.details.map((detail, index) => (
                    <li
                      key={index}
                      className="flex items-start text-xs leading-relaxed text-muted-foreground"
                    >
                      <span className="mr-2 font-bold text-primary">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-primary/10 bg-primary/2 p-8 text-center md:p-12"
        >
          <div className="absolute top-0 right-0 size-[200px] rounded-full bg-primary/2 blur-2xl" />
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Want to support a specific service?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            You can make a general contribution or request us to allocate your
            donation towards a specific cause like Animal Welfare or Education.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full shadow-md">
              <Link href="/donate" className="inline-flex items-center gap-1">
                Make a Donation
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full bg-background"
            >
              <Link href="/volunteer">Volunteer With Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
