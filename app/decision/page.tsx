'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  GripVertical,
  Loader2,
  MessageSquareText,
  Sparkles,
} from 'lucide-react'
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
import { useDecision } from '@/lib/decision-store'
import type { ExtractionResult } from '@/lib/analysis-schema'

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

function ExtractionPanel({
  status,
  extraction,
}: {
  status: 'idle' | 'extracting' | 'done' | 'error'
  extraction: ExtractionResult | null
}) {
  if (status === 'idle') return null

  return (
    <div className="mt-4 flex flex-col gap-3" aria-live="polite">
      {status === 'extracting' && (
        <div className="flex items-center gap-2.5 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm">
          <Loader2
            className="size-4 animate-spin text-primary"
            aria-hidden="true"
          />
          <span>
            Extracting text and identifying key information with AI…
          </span>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-muted-foreground">
          Extraction failed. You can still continue — the analysis will use
          your typed context.
        </div>
      )}

      {status === 'done' && extraction && (
        <>
          <ul className="flex flex-col gap-2">
            {extraction.files.map((f) => (
              <li
                key={f.name}
                className="flex items-start gap-2.5 rounded-xl border border-success/30 bg-success/5 p-3"
              >
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-success"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{f.status}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {f.name} — {f.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {extraction.entities.length > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <FileSearch className="size-3.5" aria-hidden="true" />
                Extracted Information
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {extraction.entities.map((e, i) => (
                  <div
                    key={`${e.label}-${i}`}
                    className="rounded-xl border border-border/60 bg-background/40 p-3"
                  >
                    <p className="text-xs text-muted-foreground">{e.label}</p>
                    <p className="truncate text-sm font-medium">{e.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function DecisionPage() {
  const router = useRouter()
  const store = useDecision()

  const [title, setTitle] = useState('')
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [type, setType] = useState('')
  const [priorities, setPriorities] = useState<string[]>([])
  const [context, setContext] = useState('')

  const [extractStatus, setExtractStatus] = useState<
    'idle' | 'extracting' | 'done' | 'error'
  >('idle')
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null)
  const [documentText, setDocumentText] = useState('')

  const [questionStatus, setQuestionStatus] = useState<
    'idle' | 'loading' | 'done' | 'error'
  >('idle')
  const [questions, setQuestions] = useState<
    { id: string; question: string; placeholder: string }[]
  >([])
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const extractedIds = useRef(new Set<string>())

  const fetchQuestions = useCallback(
    async (
      docText: string,
      entities: ExtractionResult['entities'],
      currentTitle: string,
      currentType: string,
      currentContext: string,
    ) => {
      setQuestionStatus('loading')
      try {
        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: currentTitle,
            decisionType: currentType,
            documentText: docText,
            entities,
            context: currentContext,
          }),
        })
        if (!res.ok) throw new Error('failed')
        const data = await res.json()
        setQuestions(data.questions ?? [])
        setQuestionStatus('done')
      } catch {
        setQuestionStatus('error')
      }
    },
    [],
  )

  const runExtraction = useCallback(
    async (allFiles: UploadedFile[]) => {
      const real = allFiles.filter((f) => f.file)
      if (!real.length) return

      setExtractStatus('extracting')
      try {
        const formData = new FormData()
        for (const f of real) formData.append('files', f.file as File)

        const res = await fetch('/api/extract', { method: 'POST', body: formData })
        if (!res.ok) throw new Error('failed')
        const data = await res.json()
        setExtraction(data.extraction)
        setDocumentText(data.documentText ?? '')
        setExtractStatus('done')
        fetchQuestions(
          data.documentText ?? '',
          data.extraction?.entities ?? [],
          title,
          type,
          context,
        )
      } catch {
        setExtractStatus('error')
      }
    },
    [fetchQuestions, title, type, context],
  )

  function handleFilesChange(next: UploadedFile[]) {
    setFiles(next)
    const newReal = next.filter(
      (f) => f.file && !extractedIds.current.has(f.id),
    )
    if (newReal.length) {
      for (const f of newReal) extractedIds.current.add(f.id)
      runExtraction(next)
    }
  }

  function togglePriority(p: string) {
    setPriorities((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    )
  }

  function startAnalysis() {
    store.setInput({
      title:
        title ||
        (files.length ? 'Decision from uploaded documents' : 'Career decision'),
      decisionType: type,
      priorities,
      context,
    })
    store.setExtraction(extraction)
    store.setDocumentText(documentText)
    store.setQuestions(questions)
    store.setAnswers(
      questions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: answers[q.id] ?? '',
      })),
    )
    store.setResult(null)
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
          <DecisionUpload files={files} onChange={handleFilesChange} />
          <ExtractionPanel status={extractStatus} extraction={extraction} />
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

        <SectionCard
          step={6}
          title="AI Follow-Up Questions"
          description="Generated dynamically from your documents and context."
        >
          {questionStatus === 'idle' && (
            <div className="flex flex-col items-start gap-3">
              <p className="text-sm text-muted-foreground">
                Upload documents above to auto-generate tailored questions, or
                generate them from your title and context.
              </p>
              <Button
                variant="outline"
                className="gap-2 bg-transparent"
                disabled={!title && !context && !type}
                onClick={() => fetchQuestions(documentText, extraction?.entities ?? [], title, type, context)}
              >
                <MessageSquareText className="size-4" aria-hidden="true" />
                Generate Questions
              </Button>
            </div>
          )}

          {questionStatus === 'loading' && (
            <div className="flex items-center gap-2.5 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm">
              <Loader2
                className="size-4 animate-spin text-primary"
                aria-hidden="true"
              />
              <span>AI is generating questions tailored to your decision…</span>
            </div>
          )}

          {questionStatus === 'error' && (
            <p className="text-sm text-muted-foreground">
              Could not generate questions. You can continue without them.
            </p>
          )}

          {questionStatus === 'done' && questions.length > 0 && (
            <div className="flex flex-col gap-4">
              {questions.map((q) => (
                <div key={q.id}>
                  <Label
                    htmlFor={`q-${q.id}`}
                    className="mb-1.5 block text-sm font-medium"
                  >
                    {q.question}
                  </Label>
                  <Input
                    id={`q-${q.id}`}
                    value={answers[q.id] ?? ''}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    placeholder={q.placeholder}
                    className="h-11"
                  />
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            DecisionIQ will reason through every trade-off transparently.
          </p>
          <Button
            size="lg"
            className="w-full gap-2 sm:w-auto"
            onClick={startAnalysis}
            disabled={extractStatus === 'extracting'}
          >
            Start Analysis
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
