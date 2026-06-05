"use client"

import { useState, useTransition } from "react"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FavouriteIcon,
  ArrowRight01Icon,
  WhatsappIcon,
  MailIcon,
  MapPinIcon,
  MapsLocationIcon,
} from "@hugeicons/core-free-icons"
import { TRUST } from "@/lib/constants"
import { submitContactForm } from "@/app/actions"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ContactPage() {
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Required Fields Missing", {
        description: "Please fill in all required fields.",
      })
      return
    }

    startTransition(async () => {
      const result = await submitContactForm(formData)
      if (result.success) {
        toast.success("Message Sent!", {
          description: result.message || "Thank you! Your message has been sent successfully.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        toast.error("Sending Failed", {
          description: result.error || "Something went wrong. Please try again later.",
        })
      }
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)] bg-[size:14px_24px]" />

      {/* Decorative Orbs */}
      <div className="absolute top-40 -left-20 size-[320px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute top-[600px] -right-20 size-[400px] rounded-full bg-primary/[0.02] blur-3xl" />

      <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <HugeiconsIcon icon={FavouriteIcon} className="size-3.5" />
              Get In Touch
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Contact{"  "}
              <span className="relative inline-block text-primary">
                Us
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
              Have questions, feedback, or want to drop off physical donations?
              Reach out using any channel or send us a quick message below.
            </p>
          </motion.div>
        </div>

        {/* Contact Split */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between gap-6 lg:col-span-5"
          >
            {/* Quick Contacts */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-3xl border border-border/60 bg-muted/10 p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background text-primary shadow-sm">
                  <HugeiconsIcon icon={WhatsappIcon} className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    WhatsApp & Call
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Direct communication for inquiries, volunteer coordinates,
                    and donation confirmations.
                  </p>
                  <a
                    href={`https://wa.me/${TRUST.whatsapp}?text=Hello%20Unconditional%20Help%20Bhavnagar`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Chat on WhatsApp (+{TRUST.phone})
                    <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-border/60 bg-muted/10 p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background text-primary shadow-sm">
                  <HugeiconsIcon icon={MailIcon} className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Email Support
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Send us partnerships, media requests, or formal donation
                    receipt inquiries.
                  </p>
                  <a
                    href={`mailto:${TRUST.email}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    {TRUST.email}
                    <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-border/60 bg-muted/10 p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background text-primary shadow-sm">
                  <HugeiconsIcon icon={MapPinIcon} className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Office Location
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Bhavnagar, Gujarat, India.
                  </p>
                  <span className="mt-3 inline-block text-[11px] font-semibold tracking-wider text-primary uppercase">
                    {TRUST.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Custom styled map placeholder */}
            <div className="relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-3xl border border-border/60 bg-muted/20 p-4 text-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.03] via-transparent to-transparent" />
              <div className="mb-2 rounded-2xl border border-border/60 bg-background p-3 text-primary shadow-sm">
                <HugeiconsIcon
                  icon={MapsLocationIcon}
                  className="size-6 text-primary"
                />
              </div>
              <h4 className="text-xs font-bold text-foreground">
                Bhavnagar Operations Zone
              </h4>
              <p className="mt-1 max-w-xs text-[10px] leading-relaxed text-muted-foreground">
                Active street feeding & plantation circuits centered around
                Bhavnagar district.
              </p>
            </div>
          </motion.div>

          {/* Right: Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center rounded-3xl border border-border/60 bg-muted/10 p-6 sm:p-8 lg:col-span-7"
          >
            <h2 className="text-xl font-bold text-foreground">
              Send us a Message
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Have a suggestion or query? Drop a message and we&apos;ll reply as
              soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">


              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="name"
                  className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                >
                  Full Name <span className="text-primary">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="h-11 rounded-xl border border-border/60 bg-background focus:border-primary/40 focus:ring-primary/40"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="email"
                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                  >
                    Email Address <span className="text-primary">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-11 rounded-xl border border-border/60 bg-background focus:border-primary/40 focus:ring-primary/40"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                  >
                    Phone / WhatsApp (Optional)
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="h-11 rounded-xl border border-border/60 bg-background focus:border-primary/40 focus:ring-primary/40"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="message"
                  className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                >
                  Your Message <span className="text-primary">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="resize-none rounded-xl border border-border/60 bg-background focus:border-primary/40 focus:ring-primary/40"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="h-12 w-full cursor-pointer rounded-full bg-primary font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary/95 hover:shadow-lg focus:outline-none disabled:opacity-50"
              >
                {isPending ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
