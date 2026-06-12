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
    if (!list || list.length === 0) return
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
      <label
        htmlFor="decision-file-upload"
        tabIndex={0}
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
          'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50',
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
          <span className="text-primary underline underline-offset-4">
            browse
          </span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supports PDF, DOCX, and TXT
        </p>
        <input
          ref={inputRef}
          id="decision-file-upload"
          type="file"
          multiple
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          className="sr-only"
          aria-label="Upload documents"
          onChange={(e) => {
            addFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </label>

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
