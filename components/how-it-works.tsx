import {
  Award,
  FileUp,
  HeartHandshake,
  ScanText,
  Scale,
} from 'lucide-react'

const steps = [
  {
    icon: FileUp,
    title: 'Upload Documents',
    description: 'Drop in offers, resumes, or career options.',
  },
  {
    icon: ScanText,
    title: 'Extract Information',
    description: 'AI parses every relevant detail automatically.',
  },
  {
    icon: HeartHandshake,
    title: 'Understand Priorities',
    description: 'Tell us what matters — growth, salary, balance.',
  },
  {
    icon: Scale,
    title: 'Analyze Trade-Offs',
    description: 'Each option is scored across weighted criteria.',
  },
  {
    icon: Award,
    title: 'Get Recommendation',
    description: 'Receive a clear answer with transparent reasoning.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[140px]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="how-it-works-heading"
            className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            From documents to decision in five steps
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            A structured process designed to remove bias and surface the
            reasoning behind every recommendation.
          </p>
        </div>

        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
          {/* Connector line */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-0 md:top-6 md:h-px md:w-full"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-4 md:flex-col">
              <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-background text-primary shadow-[0_0_24px_-6px_oklch(0.62_0.19_255_/_0.4)]">
                <step.icon className="size-5" aria-hidden="true" />
              </div>
              <div className="md:mt-4">
                <p className="font-mono text-xs text-primary">
                  {`Step ${index + 1}`}
                </p>
                <h3 className="mt-1 text-sm font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
