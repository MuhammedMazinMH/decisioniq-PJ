import Link from 'next/link'
import { ArrowUpRight, PlayCircle, Sparkles } from 'lucide-react'
import { PageHeading, PageShell } from '@/components/app/page-shell'
import { ConfidenceMeter } from '@/components/app/confidence-meter'
import { SCENARIOS } from '@/lib/decision-data'

const featured = [
  'google-vs-microsoft',
  'mba-vs-job',
  'ai-vs-data-scientist',
  'startup-vs-mnc',
]

export default function DemoPage() {
  const scenarios = featured
    .map((id) => SCENARIOS.find((s) => s.id === id))
    .filter(Boolean) as typeof SCENARIOS

  return (
    <PageShell>
      <PageHeading
        eyebrow="Interactive Demo"
        title="Explore real decision scenarios"
        description="No setup required. Pick a scenario to open a fully analyzed, pre-filled results experience powered by DecisionIQ's reasoning engine."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {scenarios.map((scenario) => {
          const recommended = scenario.options.find(
            (o) => o.id === scenario.recommendedId,
          )
          return (
            <Link
              key={scenario.id}
              href={`/results?scenario=${scenario.id}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-card md:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-primary/8 blur-3xl transition-opacity group-hover:opacity-80"
              />
              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    <Sparkles className="size-3" aria-hidden="true" />
                    {scenario.type}
                  </span>
                  <h2 className="mt-3 text-lg font-semibold tracking-tight">
                    {scenario.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {scenario.tagline}
                  </p>
                </div>
                <ConfidenceMeter
                  value={scenario.confidence}
                  size="sm"
                  className="shrink-0"
                />
              </div>

              <div className="relative mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Recommends
                  </p>
                  <p className="truncate text-sm font-medium text-primary">
                    {recommended?.name}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <PlayCircle className="size-4 text-primary" aria-hidden="true" />
                  Open
                  <ArrowUpRight
                    className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center backdrop-blur-xl">
        <h2 className="text-xl font-semibold">Ready to analyze your own decision?</h2>
        <p className="mx-auto mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Upload your documents, set your priorities, and let DecisionIQ reason
          through every trade-off for you.
        </p>
        <Link
          href="/decision"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start your analysis
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </PageShell>
  )
}
