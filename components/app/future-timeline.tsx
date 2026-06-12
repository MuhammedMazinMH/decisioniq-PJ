import { TrendingUp } from 'lucide-react'
import type { DecisionOption } from '@/lib/decision-data'

export function FutureTimeline({
  option,
  recommended,
}: {
  option: DecisionOption
  recommended?: boolean
}) {
  return (
    <article
      className={`rounded-2xl border p-6 backdrop-blur-xl ${
        recommended ? 'border-primary/30 bg-primary/5' : 'border-border bg-card/60'
      }`}
    >
      <div className="mb-5 flex items-center gap-2">
        <span
          className={`flex size-8 items-center justify-center rounded-lg ${
            recommended
              ? 'bg-primary/15 text-primary'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          <TrendingUp className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-semibold leading-tight">{option.name}</h3>
          <p className="text-xs text-muted-foreground">{option.subtitle}</p>
        </div>
      </div>

      <ol className="relative flex flex-col gap-5 border-l border-border/70 pl-5">
        {option.outcomes.map((o) => (
          <li key={o.year} className="relative">
            <span
              className={`absolute -left-[26px] top-0.5 flex size-3 items-center justify-center rounded-full ring-4 ring-background ${
                recommended ? 'bg-primary' : 'bg-accent'
              }`}
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {o.year}
            </p>
            <p className="mt-0.5 text-sm font-medium">{o.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              {o.detail}
            </p>
          </li>
        ))}
      </ol>
    </article>
  )
}
