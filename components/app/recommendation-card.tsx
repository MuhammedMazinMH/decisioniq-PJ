import { Award, Sparkles } from 'lucide-react'
import { ConfidenceMeter } from '@/components/app/confidence-meter'
import { QualityMeter } from '@/components/app/quality-meter'
import type { Scenario } from '@/lib/decision-data'

function getDecisionStrength(confidence: number): string {
  if (confidence >= 75) return 'Strong Recommendation'
  if (confidence >= 60) return 'Moderate Recommendation'
  return 'Weak Recommendation'
}

export function RecommendationCard({ scenario }: { scenario: Scenario }) {
  const recommended = scenario.options.find(
    (o) => o.id === scenario.recommendedId,
  )
  
  // Calculate quality score based on decision completeness
  // Higher when more options, more criteria, and reasoning steps provided
  const optionCount = scenario.options.length
  const criteriaCount = scenario.criteria.length
  const reasoningCount = scenario.reasoning.length
  const biasCount = scenario.biases?.length ?? 0
  
  const qualityScore = Math.round(
    Math.min(
      100,
      50 +
        (optionCount * 8) +
        (criteriaCount * 5) +
        (reasoningCount * 2) +
        (biasCount > 0 ? 10 : 5)
    )
  )

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-3xl bg-primary/12 blur-2xl"
      />
      <article className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/80 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
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

              <div className="mt-4 inline-block rounded-lg border border-primary/40 bg-primary/8 px-4 py-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {getDecisionStrength(scenario.confidence)}
                </p>
              </div>

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

            <div className="flex shrink-0 gap-6 md:flex-col md:pl-6">
              <div className="flex flex-col items-center">
                <ConfidenceMeter value={scenario.confidence} size="lg" />
                <span className="text-xs text-muted-foreground">Confidence Score</span>
              </div>
              <div className="flex flex-col items-center">
                <QualityMeter value={qualityScore} size="lg" />
                <span className="text-xs text-muted-foreground">Quality Score</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
