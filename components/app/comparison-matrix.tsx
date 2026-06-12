import type { Scenario } from '@/lib/decision-data'
import { rankOptions } from '@/lib/decision-data'

function scoreColor(score: number) {
  if (score >= 85) return 'text-success'
  if (score >= 70) return 'text-foreground'
  return 'text-muted-foreground'
}

export function ComparisonMatrix({ scenario }: { scenario: Scenario }) {
  const totals = Object.fromEntries(
    rankOptions(scenario).map((r) => [r.option.id, r.score]),
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <caption className="sr-only">
            Trade-off comparison scores across {scenario.options.length} options
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="p-4 text-left font-medium text-muted-foreground"
              >
                Criteria
              </th>
              {scenario.options.map((option) => {
                const highlight = option.id === scenario.recommendedId
                return (
                  <th
                    key={option.id}
                    scope="col"
                    className={`p-4 text-left ${highlight ? 'bg-primary/8' : ''}`}
                  >
                    <span className="block font-semibold">{option.name}</span>
                    <span className="block text-xs font-normal text-muted-foreground">
                      {option.subtitle}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {scenario.criteria.map((row) => (
              <tr key={row.key} className="border-b border-border/60">
                <th
                  scope="row"
                  className="p-4 text-left font-normal text-muted-foreground"
                >
                  {row.label}
                </th>
                {scenario.options.map((option) => {
                  const highlight = option.id === scenario.recommendedId
                  const score = option.scores[row.key] ?? 0
                  return (
                    <td
                      key={option.id}
                      className={`p-4 font-mono ${highlight ? 'bg-primary/8' : ''} ${scoreColor(score)}`}
                    >
                      {score}
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr>
              <th scope="row" className="p-4 text-left font-semibold">
                Weighted AI Score
              </th>
              {scenario.options.map((option) => {
                const highlight = option.id === scenario.recommendedId
                return (
                  <td
                    key={option.id}
                    className={`p-4 font-mono font-semibold ${
                      highlight ? 'bg-primary/8 text-primary' : 'text-foreground'
                    }`}
                  >
                    {totals[option.id]}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function WeightedMatrix({ scenario }: { scenario: Scenario }) {
  const ranked = rankOptions(scenario)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      {/* Criteria weights */}
      <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Criteria Weights
        </h3>
        <ul className="flex flex-col gap-4">
          {scenario.criteria.map((c) => (
            <li key={c.key}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span>{c.label}</span>
                <span className="font-mono text-muted-foreground">
                  {Math.round(c.weight * 100)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${c.weight * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Final ranking */}
      <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Final Ranking
        </h3>
        <ol className="flex flex-col gap-3">
          {ranked.map((r, i) => {
            const isTop = i === 0
            return (
              <li
                key={r.option.id}
                className={`flex items-center gap-4 rounded-xl border p-4 ${
                  isTop
                    ? 'border-primary/40 bg-primary/8'
                    : 'border-border/60 bg-background/40'
                }`}
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold ${
                    isTop
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{r.option.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {r.option.subtitle}
                  </p>
                </div>
                <span
                  className={`font-mono text-lg font-semibold ${
                    isTop ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {r.score}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
