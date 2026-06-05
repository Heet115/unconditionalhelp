"use client"

import { useState, useTransition } from "react"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FavouriteIcon,
  UserGroup03Icon,
  CheckIcon,
} from "@hugeicons/core-free-icons"
import { submitVolunteerForm } from "@/app/actions"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const FOCUS_AREAS = [
  { value: "food", label: "Food Distribution" },
  { value: "education", label: "Educational Support" },
  { value: "environment", label: "Tree Plantation" },
  { value: "animal", label: "Animal Welfare" },
  { value: "clothes", label: "Clothes & Blanket Drives" },
  { value: "general", label: "General Volunteering / Help Anywhere" },
]

export default function VolunteerPage() {
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    focusArea: "general",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
    }
  }

  const handleSelectArea = (value: string) => {
    setFormData((prev) => ({ ...prev, focusArea: value }))
    if (errors.focusArea) {
      setErrors((prev) => ({ ...prev, focusArea: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required."
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required."
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-14 digits)."
    }
    if (!formData.focusArea) {
      newErrors.focusArea = "Please select an area of interest."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error("Validation Error", {
        description: "Please check the highlighted fields.",
      })
      return
    }

    startTransition(async () => {
      const result = await submitVolunteerForm(formData)
      if (result.success) {
        toast.success("Application Submitted!", {
          description: result.message || "Thank you for volunteering! We will contact you soon.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          focusArea: "general",
          message: "",
        })
      } else {
        toast.error("Submission Failed", {
          description: result.error || "Something went wrong. Please try again later.",
        })
      }
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)]" />

      {/* Decorative Orbs */}
      <div className="absolute top-40 -left-20 size-[320px] rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute top-[600px] -right-20 size-[400px] rounded-full bg-primary/[0.02] blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="gap-1.5 rounded-full bg-primary/10 border-0 px-3 py-1 text-xs font-semibold text-primary">
              <HugeiconsIcon icon={UserGroup03Icon} className="size-3.5" />
              Join Our Team
            </Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Become a{"  "}
              <span className="relative inline-block text-primary">
                Volunteer
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
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We are built on pure volunteer spirit. If you have the passion to serve, we have a place for you to create a direct impact.
            </p>
          </motion.div>
        </div>

        {/* Layout split */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left: Info & Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-3xl border border-border/60 bg-muted/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Why Volunteer With Us?</h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                    <HugeiconsIcon icon={CheckIcon} className="size-3 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Direct Hand-on Impact</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      You will be on the ground, serving hot meals, planting saplings, and feeding animals directly.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                    <HugeiconsIcon icon={CheckIcon} className="size-3 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Flexible Commitment</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      Volunteer on weekends, coordinate digital campaigns, or assist only in emergency situations.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                    <HugeiconsIcon icon={CheckIcon} className="size-3 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Kindred Community</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      Join a warm group of 200+ like-minded changemakers in Bhavnagar.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-primary/[0.01] p-6 text-center">
              <span className="inline-block p-3 rounded-2xl bg-background border border-border/60 text-primary shadow-sm">
                <HugeiconsIcon icon={FavouriteIcon} className="size-6 text-primary" />
              </span>
              <h3 className="mt-4 font-bold text-foreground">No Experience Needed</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                Only a heart full of compassion is required. We provide all necessary training and materials on-site.
              </p>
            </div>
          </motion.div>

          {/* Right: Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl border border-border/60 bg-muted/10 p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold text-foreground">Volunteer Application</h2>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Fill out the form below. Our coordinators will review it and get in touch with you shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
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
                    className={cn(
                      "h-11 rounded-xl border bg-background focus:border-primary/40 focus:ring-primary/40",
                      errors.name ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border/60"
                    )}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-destructive font-medium">{errors.name}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
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
                    className={cn(
                      "h-11 rounded-xl border bg-background focus:border-primary/40 focus:ring-primary/40",
                      errors.email ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border/60"
                    )}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-destructive font-medium">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Phone / WhatsApp Number <span className="text-primary">*</span>
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number (e.g. +91 98765 43210)"
                  className={cn(
                    "h-11 rounded-xl border bg-background focus:border-primary/40 focus:ring-primary/40",
                    errors.phone ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border/60"
                  )}
                />
                {errors.phone && (
                  <span className="text-[11px] text-destructive font-medium">{errors.phone}</span>
                )}
              </div>

              {/* Focus Area selector */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Area of Interest <span className="text-primary">*</span>
                </Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {FOCUS_AREAS.map((area) => {
                    const isSelected = formData.focusArea === area.value
                    return (
                      <div
                        key={area.value}
                        onClick={() => handleSelectArea(area.value)}
                        className={cn(
                          "flex items-center justify-between border rounded-xl p-3.5 cursor-pointer transition-all duration-200",
                          isSelected
                            ? "border-primary/40 bg-primary/[0.04] text-primary"
                            : errors.focusArea
                            ? "border-destructive bg-destructive/[0.02]"
                            : "border-border/50 bg-background hover:bg-muted/15"
                        )}
                      >
                        <span className="text-xs font-semibold">{area.label}</span>
                        <div className={cn(
                          "size-4 rounded-full border flex items-center justify-center transition-all",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : errors.focusArea
                            ? "border-destructive"
                            : "border-border"
                        )}>
                          {isSelected && <HugeiconsIcon icon={CheckIcon} className="size-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
                {errors.focusArea && (
                  <span className="text-[11px] text-destructive font-medium">{errors.focusArea}</span>
                )}
              </div>

              {/* Cover Message */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  How would you like to help?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a little bit about yourself, your availability, or any specific skills you have..."
                  className="rounded-xl border border-border/60 bg-background focus:border-primary/40 focus:ring-primary/40 resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className="w-full h-12 rounded-full shadow-md shadow-primary/20"
              >
                {isPending ? "Submitting Application..." : "Submit Application"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
