'use client'

import Link from 'next/link'
import { ArrowLeft, Compass, RotateCcw, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/app/page-shell'
import { RecommendationCard } from '@/components/app/recommendation-card'
import {
  ComparisonMatrix,
  WeightedMatrix,
} from '@/components/app/comparison-matrix'
import { RiskAnalysisCard } from '@/components/app/risk-analysis-card'
import { FutureTimeline } from '@/components/app/future-timeline'
import { ReasoningTimeline } from '@/components/app/reasoning-timeline'
import { BiasDetector } from '@/components/app/bias-detector'
import { Button } from '@/components/ui/button'
import { getScenario, type Scenario } from '@/lib/decision-data'
import { useDecision } from '@/lib/decision-store'
import type { AnalysisResult } from '@/lib/analysis-schema'

function SectionTitle({
  index,
  title,
  description,
}: {
  index: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-6">
      <p className="mb-1 font-mono text-xs text-primary">{index}</p>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-1.5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}

/** Adapt a live AI AnalysisResult into the Scenario shape the UI renders. */
function toScenario(result: AnalysisResult, decisionType: string): Scenario {
  const recommendedId = result.options.some((o) => o.id === result.recommendedId)
    ? result.recommendedId
    : result.options[0]?.id ?? ''
  return {
    id: 'live',
    title: result.title,
    type: decisionType || 'AI Analysis',
    date: new Date().toISOString().slice(0, 10),
    tagline: result.tagline,
    criteria: result.criteria,
    options: result.options,
    recommendedId,
    confidence: Math.round(result.confidence),
    summary: result.summary,
    reasoning: result.reasoning,
    biases: result.biases,
  }
}

export function ResultsContent({ scenarioId }: { scenarioId?: string }) {
  const store = useDecision()

  // Live AI result takes precedence unless a demo scenario is explicitly requested.
  const live = !scenarioId && store.result ? store.result : null
  const scenario = live
    ? toScenario(live, store.input?.decisionType ?? '')
    : getScenario(scenarioId)

  const recommended = scenario.options.find(
    (o) => o.id === scenario.recommendedId,
  )
  const biases = scenario.biases ?? []

  return (
    <PageShell>
      {/* Top bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/history"
            className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All decisions
          </Link>
          <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            {scenario.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{scenario.tagline}</p>
        </div>
        <Button
          render={<Link href="/decision" />}
          nativeButton={false}
          variant="outline"
          className="gap-2 bg-transparent"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          New Analysis
        </Button>
      </div>

      <div className="flex flex-col gap-14">
        {/* Recommendation */}
        <section aria-labelledby="rec-heading">
          <h2 id="rec-heading" className="sr-only">
            Recommendation
          </h2>
          <RecommendationCard scenario={scenario} />

          {live && (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl">
                <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Key Drivers
                </p>
                <ul className="flex flex-col gap-2">
                  {live.keyDrivers.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                    >
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl">
                <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Compass className="size-3.5" aria-hidden="true" />
                  Alternative Consideration
                </p>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {live.alternatives}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Trade-off analysis */}
        <section aria-labelledby="tradeoff-heading">
          <SectionTitle
            index="01"
            title="Trade-Off Analysis"
            description="Every option scored side by side across the criteria that matter to you."
          />
          <ComparisonMatrix scenario={scenario} />
        </section>

        {/* Weighted matrix */}
        <section aria-labelledby="matrix-heading">
          <SectionTitle
            index="02"
            title="Weighted Decision Matrix"
            description="Criteria weights applied to each option to produce the final ranking."
          />
          <WeightedMatrix scenario={scenario} />
        </section>

        {/* Bias detection */}
        <section aria-labelledby="bias-heading">
          <SectionTitle
            index="03"
            title="Decision Bias Detector"
            description="Your own reasoning, analyzed for cognitive biases that could skew this decision."
          />
          <BiasDetector biases={biases} />
        </section>

        {/* Risk analysis */}
        <section aria-labelledby="risk-heading">
          <SectionTitle
            index="04"
            title="Risk Analysis"
            description="Advantages, risks, and concerns surfaced for every option."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenario.options.map((option) => (
              <RiskAnalysisCard
                key={option.id}
                option={option}
                recommended={option.id === scenario.recommendedId}
              />
            ))}
          </div>
        </section>

        {/* Future outcome simulator */}
        <section aria-labelledby="future-heading">
          <SectionTitle
            index="05"
            title="Future Outcome Simulator"
            description="Projected three-year trajectories for each path."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenario.options.map((option) => (
              <FutureTimeline
                key={option.id}
                option={option}
                recommended={option.id === scenario.recommendedId}
              />
            ))}
          </div>
        </section>

        {/* Reasoning trace */}
        <section aria-labelledby="trace-heading">
          <SectionTitle
            index="06"
            title="Decision Intelligence Trace"
            description="Transparent reasoning path showing how DecisionIQ arrived at its recommendation."
          />
          <ReasoningTimeline nodes={scenario.reasoning} />
        </section>

        {/* Footer CTA */}
        <div className="rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur-xl">
          <h2 className="text-xl font-semibold">
            Recommended: {recommended?.name}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {scenario.summary}
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              render={<Link href="/decision" />}
              nativeButton={false}
              className="gap-2"
            >
              Run another decision
            </Button>
            <Button
              render={<Link href="/demo" />}
              nativeButton={false}
              variant="outline"
              className="bg-transparent"
            >
              Explore demo scenarios
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
