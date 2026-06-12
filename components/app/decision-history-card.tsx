import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { ConfidenceMeter } from '@/components/app/confidence-meter'
import { formatDate, type HistoryEntry } from '@/lib/decision-data'

export function DecisionHistoryCard({ entry }: { entry: HistoryEntry }) {
  return (
    <Link
      href={`/results?scenario=${entry.id}`}
      className="group relative flex items-center gap-5 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-card"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border/60 bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {entry.type}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="size-3" aria-hidden="true" />
            {formatDate(entry.date)}
          </span>
        </div>
        <h3 className="truncate text-base font-semibold">{entry.title}</h3>
        <p className="mt-1 truncate text-sm text-muted-foreground">
          Recommended:{' '}
          <span className="text-foreground">{entry.recommendation}</span>
        </p>
      </div>

      <ConfidenceMeter value={entry.confidence} size="sm" className="shrink-0" />

      <ArrowUpRight
        className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        aria-hidden="true"
      />
    </Link>
  )
}
