'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Plus, Search } from 'lucide-react'
import { PageHeading, PageShell } from '@/components/app/page-shell'
import { DecisionHistoryCard } from '@/components/app/decision-history-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DECISION_TYPES, HISTORY } from '@/lib/decision-data'

type SortKey = 'recent' | 'oldest' | 'confidence'

const TYPE_ITEMS: Record<string, string> = {
  all: 'All types',
  ...Object.fromEntries(DECISION_TYPES.map((t) => [t, t])),
}

const SORT_ITEMS: Record<SortKey, string> = {
  recent: 'Most recent',
  oldest: 'Oldest first',
  confidence: 'Highest confidence',
}

export default function HistoryPage() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sort, setSort] = useState<SortKey>('recent')

  const entries = useMemo(() => {
    let list = HISTORY.filter((e) => {
      const matchesQuery =
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.recommendation.toLowerCase().includes(query.toLowerCase())
      const matchesType = typeFilter === 'all' || e.type === typeFilter
      return matchesQuery && matchesType
    })
    list = [...list].sort((a, b) => {
      if (sort === 'confidence') return b.confidence - a.confidence
      if (sort === 'oldest') return a.date.localeCompare(b.date)
      return b.date.localeCompare(a.date)
    })
    return list
  }, [query, typeFilter, sort])

  return (
    <PageShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeading
          eyebrow="History"
          title="Your decision history"
          description="Revisit past analyses, compare confidence scores, and reopen any recommendation."
        />
        <Button
          render={<Link href="/decision" />}
          nativeButton={false}
          className="mb-8 gap-2 sm:mb-10"
        >
          <Plus className="size-4" aria-hidden="true" />
          New Decision
        </Button>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search decisions..."
            className="h-11 pl-9"
            aria-label="Search decisions"
          />
        </div>
        <Select
          items={TYPE_ITEMS}
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as string)}
        >
          <SelectTrigger className="h-11 sm:w-56" aria-label="Filter by type">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {DECISION_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          items={SORT_ITEMS}
          value={sort}
          onValueChange={(v) => setSort(v as SortKey)}
        >
          <SelectTrigger className="h-11 sm:w-44" aria-label="Sort decisions">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most recent</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="confidence">Highest confidence</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      {entries.length > 0 ? (
        <div className="grid gap-4">
          {entries.map((entry) => (
            <DecisionHistoryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No decisions match your search.
          </p>
        </div>
      )}
    </PageShell>
  )
}
