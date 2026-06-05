export default function Loading() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-4">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[30%] -right-32 size-[400px] rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute top-[60%] -left-16 size-[300px] rounded-full bg-primary/2 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
        <div className="relative flex size-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-muted/50" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-r-transparent border-b-transparent" />
        </div>
        <p className="animate-pulse text-sm font-semibold tracking-widest text-muted-foreground/80 uppercase">
          Loading Data...
        </p>
      </div>
    </div>
  )
}
