import Link from 'next/link'
import {
  ArrowRight,
  BrainCircuit,
  Compass,
  GitBranch,
  Lightbulb,
  Scale,
  Target,
  TrendingUp,
} from 'lucide-react'
import { PageHeading, PageShell } from '@/components/app/page-shell'

const pillars = [
  {
    icon: BrainCircuit,
    title: 'Reasoning Engine',
    body: 'A transparent, step-by-step engine that discovers your goals, builds criteria, and reasons toward a recommendation you can audit.',
  },
  {
    icon: Scale,
    title: 'Trade-Off Intelligence',
    body: 'Structured scoring across weighted criteria turns messy, emotional decisions into a clear, comparable matrix.',
  },
  {
    icon: TrendingUp,
    title: 'Future Outcome Simulation',
    body: 'Projected multi-year trajectories help you see where each path likely leads before you commit.',
  },
]

const visionPoints = [
  'Make high-stakes decisions explainable, not intimidating',
  'Replace gut-feel guesswork with structured, auditable reasoning',
  'Give every student and professional an always-on decision coach',
]

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeading
        eyebrow="About DecisionIQ"
        title="Decision intelligence for life's biggest choices"
        description="DecisionIQ is an AI-powered platform that helps people make better career decisions through structured reasoning, trade-off analysis, risk assessment, and future outcome simulation."
      />

      {/* Problem & Solution */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl md:p-8">
          <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
            <Compass className="size-5" aria-hidden="true" />
          </span>
          <h2 className="text-xl font-semibold">The Problem</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Career decisions are high-stakes, emotional, and hard to reason about.
            People juggle offers, priorities, and uncertainty with nothing more
            than gut feeling and scattered spreadsheets — and often regret the
            outcome.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 backdrop-blur-xl md:p-8">
          <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Lightbulb className="size-5" aria-hidden="true" />
          </span>
          <h2 className="text-xl font-semibold">The Solution</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            DecisionIQ turns any decision into a transparent reasoning process.
            Upload your context, set your priorities, and get a clear
            recommendation backed by a visible chain of logic, risk analysis, and
            future simulation.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <section className="mt-14" aria-labelledby="pillars-heading">
        <h2 id="pillars-heading" className="text-2xl font-semibold tracking-tight">
          How DecisionIQ thinks
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl"
            >
              <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <p.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Reasoning flow */}
      <section className="mt-14" aria-labelledby="flow-heading">
        <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl md:p-8">
          <div className="mb-5 flex items-center gap-2 text-primary">
            <GitBranch className="size-5" aria-hidden="true" />
            <h2
              id="flow-heading"
              className="text-sm font-semibold uppercase tracking-wide"
            >
              The reasoning flow
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {[
              'Goal Discovery',
              'Criteria Creation',
              'Weight Assignment',
              'Trade-Off Evaluation',
              'Risk Assessment',
              'Future Simulation',
              'Recommendation',
            ].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-sm">
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <ArrowRight
                    className="size-4 text-muted-foreground/50"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mt-14" aria-labelledby="vision-heading">
        <div className="grid gap-8 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl md:grid-cols-[1fr_1.2fr] md:p-8">
          <div>
            <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Target className="size-5" aria-hidden="true" />
            </span>
            <h2
              id="vision-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Product Vision
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We believe everyone deserves a thoughtful, unbiased decision coach.
              DecisionIQ is building the decision intelligence layer for life's
              most important choices.
            </p>
          </div>
          <ul className="flex flex-col justify-center gap-4">
            {visionPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-4"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center backdrop-blur-xl">
        <h2 className="text-xl font-semibold">See the reasoning for yourself</h2>
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Explore a live demo scenario or analyze your own decision in minutes.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            View demo
          </Link>
          <Link
            href="/decision"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start analysis
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
