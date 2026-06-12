'use client'

import { useRef, useState } from 'react'
import { FileText, UploadCloud, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type UploadedFile = {
  id: string
  name: string
  size: string
  file?: File
}

const SAMPLE_FILES: UploadedFile[] = [
  { id: 's1', name: 'Offer_AI_Engineer.pdf', size: '248 KB' },
  { id: 's2', name: 'Offer_MNC_FullTime.pdf', size: '192 KB' },
  { id: 's3', name: 'Resume_2026.docx', size: '86 KB' },
]

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function DecisionUpload({
  files,
  onChange,
}: {
  files: UploadedFile[]
  onChange: (files: UploadedFile[]) => void
}) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) {
      // Demo fallback: add a sample file when no real file is provided
      const next = SAMPLE_FILES.find((s) => !files.some((f) => f.name === s.name))
      if (next) onChange([...files, next])
      return
    }
    const incoming: UploadedFile[] = Array.from(list).map((f, i) => ({
      id: `${Date.now()}-${i}`,
      name: f.name,
      size: formatSize(f.size),
      file: f,
    }))
    onChange([...files, ...incoming])
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload documents"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors',
          dragging
            ? 'border-primary bg-primary/10'
            : 'border-border bg-card/40 hover:border-primary/50 hover:bg-card/60',
        )}
      >
        <span className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <UploadCloud className="size-6" aria-hidden="true" />
        </span>
        <p className="text-sm font-medium">
          Drag &amp; drop files, or{' '}
          <span className="text-primary">browse</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supports PDF, DOCX, and TXT
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FileText className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onChange(files.filter((f) => f.id !== file.id))
                }
                className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={`Remove ${file.name}`}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
