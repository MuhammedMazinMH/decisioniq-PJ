import {
  FileSearch,
  GitCompareArrows,
  Gauge,
  Route,
  Scale,
  ShieldAlert,
} from 'lucide-react'

const features = [
  {
    icon: FileSearch,
    title: 'Document Understanding',
    description:
      'Parses offer letters, resumes, and certifications to extract salaries, roles, benefits, and growth signals automatically.',
  },
  {
    icon: Scale,
    title: 'AI Trade-Off Analysis',
    description:
      'Weighs every dimension of your decision — compensation, learning, flexibility — against your stated priorities.',
  },
  {
    icon: Route,
    title: 'Career Path Comparison',
    description:
      'Projects each option forward, comparing long-term trajectories instead of just the immediate offer on the table.',
  },
  {
    icon: ShieldAlert,
    title: 'Risk Assessment',
    description:
      'Surfaces hidden risks like market volatility, role ambiguity, and skill stagnation before you commit.',
  },
  {
    icon: Gauge,
    title: 'Confidence Scoring',
    description:
      'Every recommendation includes a calibrated confidence score so you know exactly how strong the evidence is.',
  },
  {
    icon: GitCompareArrows,
    title: 'Personalized Recommendations',
    description:
      'Tailored to your goals, constraints, and risk tolerance — not generic career advice from a template.',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-20 py-20 md:py-28"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Everything you need to decide with confidence
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            A complete reasoning engine for career decisions, built on
            transparent AI you can interrogate.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-[0_8px_40px_-12px_oklch(0.62_0.19_255_/_0.25)]"
            >
              <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
