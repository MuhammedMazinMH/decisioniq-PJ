'use client'

import { useEffect, useState } from 'react'
import {
  CheckCircle2,
  CloudUpload,
  FileText,
  Loader2,
  ScanSearch,
} from 'lucide-react'

type UploadState = 'idle' | 'uploading' | 'processing' | 'analyzed'

const states: UploadState[] = ['idle', 'uploading', 'processing', 'analyzed']

const stateContent: Record<
  UploadState,
  { title: string; description: string }
> = {
  idle: {
    title: 'Drag & drop your documents',
    description: 'or click to browse — PDF, DOCX, resumes, offer letters',
  },
  uploading: {
    title: 'Uploading offer-letter.pdf',
    description: 'Securely transferring your document…',
  },
  processing: {
    title: 'Processing documents',
    description: 'Extracting salary, role, benefits, and growth signals…',
  },
  analyzed: {
    title: 'Analysis complete',
    description: '3 documents understood — ready for trade-off analysis',
  },
}

const fileTypes = ['PDF', 'DOCX', 'Resume', 'Offer Letter']

export function UploadSection() {
  const [state, setState] = useState<UploadState>('idle')

  useEffect(() => {
    const interval = setInterval(() => {
      setState((current) => {
        const next = (states.indexOf(current) + 1) % states.length
        return states[next]
      })
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-20 md:py-28" aria-labelledby="upload-heading">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="upload-heading"
            className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Start with your documents
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            DecisionIQ reads your real documents — not generic questionnaires —
            so every recommendation is grounded in your actual options.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div
            className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-colors duration-500 md:p-14 ${
              state === 'analyzed'
                ? 'border-success/50 bg-success/5'
                : state === 'idle'
                  ? 'border-border bg-card/50'
                  : 'border-primary/50 bg-primary/5'
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex flex-col items-center gap-4">
              <span
                className={`flex size-14 items-center justify-center rounded-2xl transition-colors duration-500 ${
                  state === 'analyzed'
                    ? 'bg-success/15 text-success'
                    : 'bg-primary/15 text-primary'
                }`}
              >
                {state === 'idle' && (
                  <CloudUpload className="size-7" aria-hidden="true" />
                )}
                {state === 'uploading' && (
                  <Loader2 className="size-7 animate-spin" aria-hidden="true" />
                )}
                {state === 'processing' && (
                  <ScanSearch className="size-7 animate-pulse" aria-hidden="true" />
                )}
                {state === 'analyzed' && (
                  <CheckCircle2 className="size-7" aria-hidden="true" />
                )}
              </span>

              <div>
                <p className="text-lg font-medium">{stateContent[state].title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stateContent[state].description}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center gap-2" aria-hidden="true">
                {states.map((s, i) => (
                  <span
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      states.indexOf(state) >= i
                        ? state === 'analyzed'
                          ? 'w-8 bg-success'
                          : 'w-8 bg-primary'
                        : 'w-4 bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {fileTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
              >
                <FileText className="size-3.5" aria-hidden="true" />
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
