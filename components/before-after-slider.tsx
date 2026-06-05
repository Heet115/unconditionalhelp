"use client"

import { useState } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeftRightIcon } from "@hugeicons/core-free-icons"

type BeforeAfterSliderProps = {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border border-border/40 bg-muted shadow-xl select-none md:aspect-21/9">
      {/* Base Image (After) */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute right-4 bottom-4 z-10 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-xs font-bold tracking-wider text-emerald-600 uppercase shadow-sm backdrop-blur-md">
          {afterLabel}
        </div>
      </div>

      {/* Overlay Image (Before) clipped by slider */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden border-r-2 border-primary shadow-[2px_0_15px_rgba(0,0,0,0.5)]"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute bottom-4 left-4 z-10 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-xs font-bold tracking-wider text-rose-600 uppercase shadow-sm backdrop-blur-md">
          {beforeLabel}
        </div>
      </div>

      {/* Range Input for native touch/drag handling */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />

      {/* Custom Slider Handle */}
      <div
        className="pointer-events-none absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-background shadow-xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <HugeiconsIcon
          icon={ArrowLeftRightIcon}
          size={20}
          className="text-primary"
        />
      </div>
    </div>
  )
}
