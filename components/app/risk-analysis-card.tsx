import { AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react'
import type { DecisionOption } from '@/lib/decision-data'

export function RiskAnalysisCard({
  option,
  recommended,
}: {
  option: DecisionOption
  recommended?: boolean
}) {
  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 backdrop-blur-xl ${
        recommended
          ? 'border-primary/30 bg-primary/5'
          : 'border-border bg-card/60'
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold">{option.name}</h3>
          <p className="text-xs text-muted-foreground">{option.subtitle}</p>
        </div>
        {recommended && (
          <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary">
            Recommended
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-success">
            <CheckCircle2 className="size-3.5" aria-hidden="true" />
            Advantages
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-foreground/90">
            {option.advantages.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-destructive">
            <AlertTriangle className="size-3.5" aria-hidden="true" />
            Risks
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-foreground/90">
            {option.risks.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-destructive" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <HelpCircle className="size-3.5" aria-hidden="true" />
            Concerns
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {option.concerns.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
