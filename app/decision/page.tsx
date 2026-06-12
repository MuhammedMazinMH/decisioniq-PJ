'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, GripVertical, Sparkles } from 'lucide-react'
import { PageHeading, PageShell } from '@/components/app/page-shell'
import {
  DecisionUpload,
  type UploadedFile,
} from '@/components/app/decision-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { DECISION_TYPES, PRIORITIES } from '@/lib/decision-data'

function SectionCard({
  step,
  title,
  description,
  children,
}: {
  step: number
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl md:p-8">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-xs font-semibold text-primary">
          {step}
        </span>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

export default function DecisionPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [type, setType] = useState('')
  const [priorities, setPriorities] = useState<string[]>([])
  const [context, setContext] = useState('')

  function togglePriority(p: string) {
    setPriorities((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    )
  }

  function startAnalysis() {
    router.push('/analysis')
  }

  return (
    <PageShell>
      <PageHeading
        eyebrow="New Decision"
        title="Set up your decision"
        description="Give DecisionIQ the context it needs. The more detail you provide, the sharper the trade-off analysis and recommendation."
      />

      <div className="flex flex-col gap-6">
        <SectionCard
          step={1}
          title="Decision Title"
          description="What are you trying to decide?"
        >
          <Label htmlFor="decision-title" className="sr-only">
            Decision title
          </Label>
          <Input
            id="decision-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Which internship should I choose?"
            className="h-11"
          />
        </SectionCard>

        <SectionCard
          step={2}
          title="Document Upload"
          description="Add offer letters, resumes, or certifications."
        >
          <DecisionUpload files={files} onChange={setFiles} />
        </SectionCard>

        <SectionCard
          step={3}
          title="Decision Type"
          description="Pick the category that best fits."
        >
          <Label htmlFor="decision-type" className="sr-only">
            Decision type
          </Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="decision-type" className="h-11 w-full sm:max-w-sm">
              <SelectValue placeholder="Select a decision type" />
            </SelectTrigger>
            <SelectContent>
              {DECISION_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SectionCard>

        <SectionCard
          step={4}
          title="Priority Selection"
          description="Tap to rank what matters most — order reflects importance."
        >
          <div className="flex flex-wrap gap-2.5">
            {PRIORITIES.map((p) => {
              const rank = priorities.indexOf(p)
              const selected = rank !== -1
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePriority(p)}
                  aria-pressed={selected}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors',
                    selected
                      ? 'border-primary/40 bg-primary/10 text-foreground'
                      : 'border-border bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground',
                  )}
                >
                  {selected && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary font-mono text-[11px] font-semibold text-primary-foreground">
                      {rank + 1}
                    </span>
                  )}
                  {p}
                </button>
              )
            })}
          </div>
          {priorities.length > 0 && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <GripVertical className="size-3.5" aria-hidden="true" />
              {priorities.length} priorit{priorities.length === 1 ? 'y' : 'ies'}{' '}
              ranked — these drive the weighted matrix.
            </p>
          )}
        </SectionCard>

        <SectionCard
          step={5}
          title="Additional Context"
          description="Anything else the AI should weigh in?"
        >
          <Label htmlFor="decision-context" className="sr-only">
            Additional context
          </Label>
          <Textarea
            id="decision-context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g. I value long-term growth over starting salary, prefer hybrid work, and want strong mentorship..."
            className="min-h-32 resize-y"
          />
        </SectionCard>

        <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            DecisionIQ will reason through every trade-off transparently.
          </p>
          <Button size="lg" className="w-full gap-2 sm:w-auto" onClick={startAnalysis}>
            Start Analysis
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
