import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FavouriteIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons"
import { NAV_LINKS, TRUST, SOCIAL_LINKS } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

const SOCIAL_ICON_MAP: Record<string, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  twitter: NewTwitterIcon,
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-muted/40 pt-13">
      {/* Curved top wave */}
      <div className="absolute -top-px right-0 left-0 z-10">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
          className="block h-12 w-full rotate-180 sm:h-16 md:h-20"
        >
          <path
            d="M0 80V40C240 10 480 0 720 10s480 30 720 10v60H0Z"
            className="fill-background"
          />
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-16 -right-16 size-[250px] rounded-full bg-primary/[0.04]" />
      <div className="absolute -bottom-20 -left-20 size-[300px] rounded-full bg-primary/[0.05]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--primary) 0.6px, transparent 0.6px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  size={14}
                  strokeWidth={2.5}
                />
              </div>
              <span className="font-heading text-base tracking-tight text-foreground">
                UH Bhavnagar
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {TRUST.tagline}. Serving humanity selflessly since{" "}
              {TRUST.founded.split(" ").pop()}.
            </p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {SOCIAL_ICON_MAP[social.icon] && (
                    <HugeiconsIcon
                      icon={SOCIAL_ICON_MAP[social.icon]}
                      size={16}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase">
              Navigate
            </p>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Reach Us */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase">
              Reach Us
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <p>{TRUST.location}</p>
              <a
                href={`tel:+91${TRUST.phone}`}
                className="transition-colors hover:text-primary"
              >
                +91 {TRUST.phone}
              </a>
              <a
                href={`mailto:${TRUST.email}`}
                className="break-all transition-colors hover:text-primary"
              >
                {TRUST.email}
              </a>
            </div>
          </div>

          {/* Get Involved */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase">
              Get Involved
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/15 transition-colors hover:bg-primary/90"
              >
                Donate Now
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground/60">
            © {currentYear} {TRUST.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Founded by{" "}
            <span className="text-muted-foreground">{TRUST.founder}</span> ·{" "}
            {TRUST.founded}
          </p>
        </div>
      </div>
    </footer>
  )
}
