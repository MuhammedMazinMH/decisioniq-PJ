'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  FileText,
  Gauge,
  Loader2,
  Scale,
  Sparkles,
  Target,
} from 'lucide-react'
import { PageShell } from '@/components/app/page-shell'
import { Button } from '@/components/ui/button'
import { ANALYSIS_STEPS } from '@/lib/decision-data'

const extracted = [
  {
    icon: FileText,
    label: 'Documents parsed',
    value: '3 files',
    detail: 'Offer letters & resume',
  },
  {
    icon: Target,
    label: 'Priorities mapped',
    value: '6 criteria',
    detail: 'Growth & learning weighted',
  },
  {
    icon: Scale,
    label: 'Options detected',
    value: '3 options',
    detail: 'Ready for scoring',
  },
  {
    icon: Gauge,
    label: 'Confidence est.',
    value: 'High',
    detail: 'Sufficient signal found',
  },
]

const STEP_MS = 850

export default function AnalysisPage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const total = ANALYSIS_STEPS.length
  const done = current >= total

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setCurrent((c) => c + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [current, done])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => router.push('/results'), 1200)
    return () => clearTimeout(t)
  }, [done, router])

  const progress = Math.round((Math.min(current, total) / total) * 100)

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Reasoning Engine Active
        </span>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {done ? 'Analysis complete' : 'Analyzing your decision'}
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {done
            ? 'DecisionIQ has finished reasoning through every trade-off.'
            : 'DecisionIQ is reading your documents, weighing priorities, and simulating outcomes.'}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mx-auto mt-8 max-w-3xl">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall progress</span>
          <span className="font-mono text-primary">{progress}%</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Analysis progress"
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Reasoning steps */}
        <div
          className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl"
          role="status"
          aria-live="polite"
        >
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Reasoning Steps
          </h2>
          <ol className="flex flex-col gap-2.5">
            {ANALYSIS_STEPS.map((step, index) => {
              const isDone = index < current
              const isActive = index === current
              return (
                <li
                  key={step.label}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-500 ${
                    isDone
                      ? 'border-success/30 bg-success/5'
                      : isActive
                        ? 'border-primary/40 bg-primary/5'
                        : 'border-border/60 bg-background/40 opacity-55'
                  }`}
                >
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                      isDone
                        ? 'bg-success/15 text-success'
                        : isActive
                          ? 'bg-primary/15 text-primary'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isDone ? (
                      <Check className="size-4" aria-hidden="true" />
                    ) : isActive ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <span className="font-mono text-[11px]">{index + 1}</span>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                  {isDone && (
                    <span className="ml-auto font-mono text-[11px] text-success">
                      done
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </div>

        {/* Extracted information */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Extracted Information
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {extracted.map((item, i) => {
                const revealed = current > i || done
                return (
                  <div
                    key={item.label}
                    className={`rounded-xl border border-border/60 bg-background/40 p-4 transition-all duration-500 ${
                      revealed ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <item.icon className="size-4" aria-hidden="true" />
                    </span>
                    <p className="font-mono text-lg font-semibold">
                      {item.value}
                    </p>
                    <p className="text-xs font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {done && (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center backdrop-blur-xl">
              <p className="text-sm text-muted-foreground">
                Redirecting to your results…
              </p>
              <Button
                render={<a href="/results" />}
                nativeButton={false}
                className="mt-3 w-full gap-2"
              >
                View Results
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}
