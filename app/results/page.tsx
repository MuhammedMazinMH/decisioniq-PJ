import Link from 'next/link'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { PageShell } from '@/components/app/page-shell'
import { RecommendationCard } from '@/components/app/recommendation-card'
import {
  ComparisonMatrix,
  WeightedMatrix,
} from '@/components/app/comparison-matrix'
import { RiskAnalysisCard } from '@/components/app/risk-analysis-card'
import { FutureTimeline } from '@/components/app/future-timeline'
import { ReasoningTimeline } from '@/components/app/reasoning-timeline'
import { Button } from '@/components/ui/button'
import { getScenario } from '@/lib/decision-data'

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

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string }>
}) {
  const { scenario: scenarioId } = await searchParams
  const scenario = getScenario(scenarioId)
  const recommended = scenario.options.find(
    (o) => o.id === scenario.recommendedId,
  )

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

        {/* Risk analysis */}
        <section aria-labelledby="risk-heading">
          <SectionTitle
            index="03"
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
            index="04"
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
            index="05"
            title="AI Reasoning Trace"
            description="The complete reasoning path behind this recommendation."
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
