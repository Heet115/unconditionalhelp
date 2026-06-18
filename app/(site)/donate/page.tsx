"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CharityIcon,
  ClipboardCheckIcon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const BANK_DETAILS = [
  { label: "Account Name", value: "Unconditional Help Charitable Trust" },
  { label: "Account Number", value: "387900150004523" },
  { label: "IFSC Code", value: "SBIN0000334" },
  { label: "Bank Name", value: "State Bank of India" },
  { label: "Branch", value: "Bhavnagar Main Branch" },
  { label: "UPI ID", value: "unconditionalhelp@sbi" },
]

const FAQS = [
  {
    question: "How will my donation be used?",
    answer:
      "Every single rupee goes directly into purchasing raw grains, cooking supplies for food drives, tree guards and saplings for plantation drives, bird clay water pots, blankets for winter drives, or medical rescues for stray animals. We do not use donation funds for administrative salaries.",
  },
  {
    question: "Can I donate physical materials (food grains, clothes)?",
    answer:
      "Yes, absolutely! We warmly accept raw materials like rice, wheat flour, lentils, cooking oil, as well as clean, wearable clothes and blankets. Please use our Contact page or WhatsApp us to schedule a drop-off.",
  },
  {
    question: "Will I receive a receipt for my donation?",
    answer:
      "Yes. Once you make a bank transfer or UPI payment, please send a screenshot of the transaction along with your name and address to our WhatsApp or email. We will generate and share a formal receipt.",
  },
  {
    question: "Is there any minimum donation amount?",
    answer:
      "No, kindness has no minimum. Every contribution, even enough to feed a single stray animal or provide a hot meal to one person (approx. ₹30), makes a meaningful difference.",
  },
]

export default function DonatePage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => {
        setCopiedIndex(null)
      }, 2000)
    } catch {
      setCopiedIndex(null)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)] bg-size-[14px_24px]" />

      {/* Decorative Orbs */}
      <div className="absolute top-40 -left-20 size-[320px] rounded-full bg-primary/3 blur-3xl" />
      <div className="absolute top-[800px] -right-20 size-[420px] rounded-full bg-primary/2 blur-3xl" />

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
              <HugeiconsIcon icon={CharityIcon} className="size-3.5" />
              Empower Kindness
            </Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Support Our{"  "}
              <span className="relative inline-block text-primary">
                Mission
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
              Your contribution fuels our daily drives. Choose standard bank
              transfers or scan below to send donations directly and securely.
            </p>
          </motion.div>
        </div>

        {/* Donation Channels Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-12 md:items-start">
          {/* Left: Bank Details */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border/60 bg-muted/10 p-6 sm:p-8 md:col-span-7"
          >
            <h2 className="text-xl font-bold text-foreground">
              Direct Bank Transfer
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Use standard NEFT / IMPS / RTGS payment channels. Click any item
              below to copy details directly to your clipboard.
            </p>

            <div className="mt-6 space-y-4">
              {BANK_DETAILS.map((detail, idx) => (
                <button
                  key={detail.label}
                  type="button"
                  onClick={() => handleCopy(detail.value, idx)}
                  aria-label={`Copy ${detail.label}: ${detail.value}`}
                  className="group relative flex w-full cursor-pointer flex-col justify-between gap-2 rounded-2xl border border-border/50 bg-background/50 p-4 text-left transition-[background-color,border-color,box-shadow] duration-200 hover:border-primary/20 hover:bg-background/80 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:outline-none sm:flex-row sm:items-center"
                >
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                      {detail.label}
                    </span>
                    <p className="mt-0.5 font-mono text-sm font-semibold break-all text-foreground">
                      {detail.value}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      aria-live="polite"
                      className="text-xs font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      {copiedIndex === idx ? "Copied!" : "Click to Copy"}
                    </span>
                    <HugeiconsIcon
                      icon={ClipboardCheckIcon}
                      aria-hidden="true"
                      className="size-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary"
                    />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: UPI Scan */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center rounded-3xl border border-primary/10 bg-primary/1 p-6 text-center sm:p-8 md:col-span-5"
          >
            <h2 className="text-xl font-bold text-foreground">
              Scan to Pay via UPI
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Quick donation through GPay, PhonePe, Paytm, or BHIM apps.
            </p>

            {/* Premium QR placeholder container */}
            <div className="relative mt-6 flex aspect-square w-full max-w-[240px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-background p-4 shadow-inner">
              <div className="absolute inset-0 bg-linear-to-br from-primary/4 to-transparent" />
              {/* Graphic QR Simulation */}
              <div className="relative flex size-full items-center justify-center rounded-xl border-4 border-dashed border-primary/20">
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  className="size-16 animate-pulse text-primary/30"
                />
                <span className="absolute bottom-2 font-mono text-[9px] font-bold tracking-widest text-primary/60 uppercase">
                  Scan QR Code
                </span>
              </div>
            </div>

            <div className="mt-6 w-full space-y-3">
              <div className="rounded-xl border border-border/50 bg-background/50 px-4 py-2.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  UPI ID
                </span>
                <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">
                  unconditionalhelp@sbi
                </p>
              </div>

              <div className="text-[11px] leading-relaxed text-muted-foreground">
                Registered Trust:{" "}
                <span className="font-semibold text-foreground">
                  Unconditional Help Bhavnagar
                </span>
                <br />
                Registration No:{" "}
                <span className="font-mono font-semibold text-foreground">
                  E/8140/Bhavnagar
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQs */}
        <div className="mx-auto mt-24 max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Donation FAQs
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Common questions and transparent answers regarding our financial
              model.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <Accordion type="single" collapsible className="w-full border-0">
              {FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="mb-4 overflow-hidden rounded-2xl border border-border/60 bg-muted/10 transition-all duration-200 last:mb-0"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between border-b-0 p-5 text-left text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted/30 hover:no-underline sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pt-0 pb-5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
