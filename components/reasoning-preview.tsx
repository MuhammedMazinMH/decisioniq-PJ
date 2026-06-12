'use client'

import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

const steps = [
  'Understanding Goals',
  'Building Evaluation Criteria',
  'Scoring Alternatives',
  'Risk Analysis',
  'Generating Recommendation',
]

export function ReasoningPreview() {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCompleted((current) => (current >= steps.length ? 0 : current + 1))
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="reasoning"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
      aria-labelledby="reasoning-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-0 h-[300px] w-[480px] rounded-full bg-primary/10 blur-[130px]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div>
          <h2
            id="reasoning-heading"
            className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Watch the AI reason — step by step
          </h2>
          <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            DecisionIQ never gives you a black-box answer. Every recommendation
            is built through a visible chain of reasoning you can inspect,
            question, and adjust.
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="size-4 text-success" aria-hidden="true" />
              Fully auditable reasoning chain
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-success" aria-hidden="true" />
              Adjust weights and re-run instantly
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-success" aria-hidden="true" />
              Explanations in plain language
            </li>
          </ul>
        </div>

        {/* Reasoning simulation */}
        <div
          className="relative rounded-2xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-xl"
          role="status"
          aria-live="polite"
          aria-label="AI reasoning progress simulation"
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-medium">AI Reasoning Engine</p>
            <span className="font-mono text-xs text-muted-foreground">
              {`${Math.min(completed, steps.length)}/${steps.length} complete`}
            </span>
          </div>

          <ol className="flex flex-col gap-3">
            {steps.map((step, index) => {
              const isDone = index < completed
              const isActive = index === completed
              return (
                <li
                  key={step}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-500 ${
                    isDone
                      ? 'border-success/30 bg-success/5'
                      : isActive
                        ? 'border-primary/40 bg-primary/5'
                        : 'border-border/60 bg-background/40 opacity-60'
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
                      <Loader2
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="font-mono text-[11px]">{index + 1}</span>
                    )}
                  </span>
                  <span className="text-sm font-medium">{step}</span>
                  {isDone && (
                    <span className="ml-auto font-mono text-[11px] text-success">
                      done
                    </span>
                  )}
                </li>
              )
            })}
          </ol>

          {/* Overall progress */}
          <div className="mt-5">
            <div
              className="h-1.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={Math.round(
                (Math.min(completed, steps.length) / steps.length) * 100,
              )}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall reasoning progress"
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{
                  width: `${(Math.min(completed, steps.length) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
