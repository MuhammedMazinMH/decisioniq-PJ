import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Scale,
  Sparkles,
  Target,
} from 'lucide-react'

const options = [
  { name: 'AI Engineer Internship', score: 92, tone: 'primary' as const },
  { name: 'Data Scientist Role', score: 84, tone: 'accent' as const },
  { name: 'MS in Computer Science', score: 76, tone: 'muted' as const },
]

const timeline = [
  { icon: FileSearch, label: 'Documents parsed', detail: '3 files · 2.1s' },
  { icon: Target, label: 'Priorities mapped', detail: 'Growth > Salary' },
  { icon: Scale, label: 'Trade-offs scored', detail: '6 criteria weighted' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 h-[320px] w-[420px] rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            AI-Powered Decision Coach
          </span>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Make Better Career Decisions With AI
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Upload offer letters, resumes, certifications, or career options.
            DecisionIQ analyzes trade-offs, evaluates opportunities, and
            recommends the best path with transparent reasoning.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              render={<Link href="/decision" />}
              nativeButton={false}
              size="lg"
              className="gap-2"
            >
              Analyze My Decision
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Trusted by 12,000+ students and professionals
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="relative" aria-label="DecisionIQ analysis dashboard preview">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl"
          />
          <div className="relative rounded-2xl border border-border bg-card/80 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Decision Analysis</p>
                <p className="text-xs text-muted-foreground">
                  Which opportunity should I take?
                </p>
              </div>
              <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
                Analyzed
              </span>
            </div>

            {/* Option scores */}
            <div className="flex flex-col gap-3">
              {options.map((option) => (
                <div
                  key={option.name}
                  className="rounded-xl border border-border/60 bg-background/50 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium">{option.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {option.score}/100
                    </span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={option.score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${option.name} score`}
                  >
                    <div
                      className={
                        option.tone === 'primary'
                          ? 'h-full rounded-full bg-primary'
                          : option.tone === 'accent'
                            ? 'h-full rounded-full bg-accent'
                            : 'h-full rounded-full bg-muted-foreground/50'
                      }
                      style={{ width: `${option.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-xs font-medium">
                  Recommended: AI Engineer Internship
                </p>
                <span className="ml-auto font-mono text-xs text-primary">
                  89% confident
                </span>
              </div>
            </div>

            {/* Reasoning timeline */}
            <div className="mt-4 flex flex-col gap-2.5 border-t border-border/60 pt-4">
              {timeline.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <item.icon className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-xs">{item.label}</span>
                  <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
