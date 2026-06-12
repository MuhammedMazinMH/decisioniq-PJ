import { Eye, Landmark, Lock, ShieldCheck } from 'lucide-react'

const items = [
  {
    icon: Lock,
    title: 'Secure document analysis',
    description:
      'Documents are encrypted in transit and at rest, and deleted on request.',
  },
  {
    icon: Eye,
    title: 'Transparent AI reasoning',
    description:
      'Every score and recommendation comes with a fully inspectable rationale.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-first design',
    description:
      'Your data is never used to train models or shared with third parties.',
  },
  {
    icon: Landmark,
    title: 'Enterprise-grade architecture',
    description:
      'Built on hardened, audited infrastructure trusted by global teams.',
  },
]

export function TrustSection() {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="trust-heading">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="rounded-3xl border border-border bg-card/40 p-8 md:p-12">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              id="trust-heading"
              className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
            >
              Built for trust from day one
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Career documents are deeply personal. We treat them that way.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <item.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
