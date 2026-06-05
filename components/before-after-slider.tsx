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
    <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-[2rem] bg-muted border border-border/40 select-none shadow-xl">
      {/* Base Image (After) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm z-10 border border-border/50 text-emerald-600">
          {afterLabel}
        </div>
      </div>

      {/* Overlay Image (Before) clipped by slider */}
      <div
        className="absolute inset-0 w-full h-full border-r-2 border-primary overflow-hidden shadow-[2px_0_15px_rgba(0,0,0,0.5)]"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm z-10 border border-border/50 text-rose-600">
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
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />

      {/* Custom Slider Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-background rounded-full border-2 border-primary shadow-xl flex items-center justify-center z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <HugeiconsIcon icon={ArrowLeftRightIcon} size={20} className="text-primary" />
      </div>
    </div>
  )
}
