import { Award, Sparkles } from 'lucide-react'

const criteria = [
  { label: 'Salary', scores: [72, 88, 80] },
  { label: 'Learning', scores: [95, 70, 78] },
  { label: 'Career Growth', scores: [92, 68, 75] },
  { label: 'Flexibility', scores: [85, 60, 88] },
  { label: 'Brand Value', scores: [70, 94, 65] },
  { label: 'Future Opportunities', scores: [93, 76, 72] },
]

const options = [
  { name: 'Option A', sub: 'AI Engineer Internship', highlight: true },
  { name: 'Option B', sub: 'MNC Full-Time Offer', highlight: false },
  { name: 'Option C', sub: 'Remote Startup Role', highlight: false },
]

function scoreColor(score: number) {
  if (score >= 85) return 'text-success'
  if (score >= 70) return 'text-foreground'
  return 'text-muted-foreground'
}

export function ComparisonDashboard() {
  const totals = options.map((_, i) =>
    Math.round(
      criteria.reduce((sum, c) => sum + c.scores[i], 0) / criteria.length,
    ),
  )

  return (
    <section
      className="relative py-20 md:py-28"
      aria-labelledby="comparison-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="comparison-heading"
            className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Every option, scored side by side
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            AI-generated scores across the dimensions that matter most to you,
            weighted by your priorities.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Comparison table */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <caption className="sr-only">
                  AI-generated comparison scores for three career options
                </caption>
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="p-4 text-left font-medium text-muted-foreground">
                      Criteria
                    </th>
                    {options.map((option) => (
                      <th
                        key={option.name}
                        scope="col"
                        className={`p-4 text-left ${option.highlight ? 'bg-primary/8' : ''}`}
                      >
                        <span className="block font-semibold">{option.name}</span>
                        <span className="block text-xs font-normal text-muted-foreground">
                          {option.sub}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((row) => (
                    <tr key={row.label} className="border-b border-border/60">
                      <th scope="row" className="p-4 text-left font-normal text-muted-foreground">
                        {row.label}
                      </th>
                      {row.scores.map((score, i) => (
                        <td
                          key={options[i].name}
                          className={`p-4 font-mono ${options[i].highlight ? 'bg-primary/8' : ''} ${scoreColor(score)}`}
                        >
                          {score}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className="p-4 text-left font-semibold">
                      AI Score
                    </th>
                    {totals.map((total, i) => (
                      <td
                        key={options[i].name}
                        className={`p-4 font-mono font-semibold ${
                          options[i].highlight
                            ? 'bg-primary/8 text-primary'
                            : 'text-foreground'
                        }`}
                      >
                        {total}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Final recommendation card */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-primary/12 blur-2xl"
            />
            <article className="relative rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Award className="size-5" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Final Recommendation
                </p>
              </div>

              <h3 className="text-xl font-semibold">AI Engineer Internship</h3>

              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-mono font-semibold text-primary">89%</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={89}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Recommendation confidence"
                >
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: '89%' }}
                  />
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-border/60 bg-background/50 p-4">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  AI Reasoning
                </div>
                <p className="text-sm leading-relaxed">
                  Strongest long-term growth potential despite lower short-term
                  compensation. Learning velocity and future opportunities
                  outweigh the salary gap given your stated priorities.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
