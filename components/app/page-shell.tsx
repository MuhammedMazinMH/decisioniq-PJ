import type { ReactNode } from 'react'
import { AppHeader } from '@/components/app/app-header'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 right-0 h-[320px] w-[420px] rounded-full bg-accent/8 blur-[120px]"
      />
      <AppHeader />
      <main className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-24 md:px-6 md:pt-28">
        {children}
      </main>
    </div>
  )
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-8 md:mb-10">
      {eyebrow && (
        <p className="mb-2 text-sm font-medium text-primary">{eyebrow}</p>
      )}
      <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
