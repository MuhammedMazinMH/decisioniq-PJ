import Link from 'next/link'
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Cloud,
  Cpu,
  GraduationCap,
  Rocket,
} from 'lucide-react'

const examples = [
  {
    icon: Briefcase,
    title: 'Which internship should I choose?',
    tag: 'Internships',
    href: '/results?scenario=internship',
  },
  {
    icon: GraduationCap,
    title: 'MBA vs Job',
    tag: 'Education',
    href: '/results?scenario=mba-vs-job',
  },
  {
    icon: Cpu,
    title: 'AI Engineer vs Data Scientist',
    tag: 'Career Path',
    href: '/results?scenario=ai-vs-data-scientist',
  },
  {
    icon: Rocket,
    title: 'Startup Offer vs MNC Offer',
    tag: 'Offers',
    href: '/results?scenario=startup-vs-mnc',
  },
  {
    icon: Cloud,
    title: 'AWS Certification vs Azure Certification',
    tag: 'Certifications',
    href: '/decision',
  },
  {
    icon: Building2,
    title: 'Higher Studies vs Work Experience',
    tag: 'Education',
    href: '/decision',
  },
]

// Template decision cards linking to demo scenarios
export function ExampleDecisions() {
  return (
    <section
      id="examples"
      className="relative scroll-mt-20 py-20 md:py-28"
      aria-labelledby="examples-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="examples-heading"
            className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Decisions people analyze every day
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Real questions, structured answers. Start from a template or bring
            your own dilemma.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Link
              key={example.title}
              href={example.href}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-all duration-300 hover:border-accent/40 hover:bg-card"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent">
                <example.icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  {example.tag}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug">
                  {example.title}
                </p>
              </div>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
