import { AlertTriangle, BrainCog, Lightbulb, ShieldCheck } from 'lucide-react'
import type { BiasFinding } from '@/lib/analysis-schema'
import { cn } from '@/lib/utils'

const SEVERITY_STYLES: Record<
  BiasFinding['severity'],
  { badge: string; label: string }
> = {
  low: {
    badge: 'border-success/30 bg-success/10 text-success',
    label: 'Low impact',
  },
  medium: {
    badge: 'border-warning/30 bg-warning/10 text-warning',
    label: 'Medium impact',
  },
  high: {
    badge: 'border-destructive/30 bg-destructive/10 text-destructive',
    label: 'High impact',
  },
}

export function BiasDetector({ biases }: { biases: BiasFinding[] }) {
  if (!biases.length) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-success/30 bg-success/5 p-6 backdrop-blur-xl">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-semibold">No significant biases detected</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Your stated reasoning appears grounded in your own goals and
            priorities rather than external pressure or cognitive shortcuts.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {biases.map((bias) => {
        const severity = SEVERITY_STYLES[bias.severity]
        return (
          <article
            key={bias.name}
            className="flex flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <BrainCog className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-semibold">{bias.name}</h3>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium',
                  severity.badge,
                )}
              >
                {severity.label}
              </span>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <p className="leading-relaxed text-foreground/90">
                {bias.explanation}
              </p>

              <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-background/40 p-3">
                <AlertTriangle
                  className="mt-0.5 size-4 shrink-0 text-warning"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Potential Impact
                  </p>
                  <p className="mt-0.5 leading-relaxed text-muted-foreground">
                    {bias.impact}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3">
                <Lightbulb
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Recommendation
                  </p>
                  <p className="mt-0.5 leading-relaxed text-muted-foreground">
                    {bias.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
