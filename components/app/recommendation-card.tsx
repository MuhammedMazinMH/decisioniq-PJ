import { Award, Sparkles } from 'lucide-react'
import { ConfidenceMeter } from '@/components/app/confidence-meter'
import type { Scenario } from '@/lib/decision-data'

export function RecommendationCard({ scenario }: { scenario: Scenario }) {
  const recommended = scenario.options.find(
    (o) => o.id === scenario.recommendedId,
  )

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-3xl bg-primary/12 blur-2xl"
      />
      <article className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/80 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Award className="size-3.5" aria-hidden="true" />
              Recommended Option
            </div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {recommended?.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {recommended?.subtitle}
            </p>

            <div className="mt-5 rounded-xl border border-border/60 bg-background/50 p-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Sparkles className="size-3.5" aria-hidden="true" />
                AI Summary
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {scenario.summary}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-2 md:pl-6">
            <ConfidenceMeter value={scenario.confidence} size="lg" />
            <span className="text-xs text-muted-foreground">Confidence Score</span>
          </div>
        </div>
      </article>
    </div>
  )
}
