import { ArrowDown } from 'lucide-react'
import type { ReasoningNode } from '@/lib/decision-data'

export function ReasoningTimeline({ nodes }: { nodes: ReasoningNode[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl md:p-8">
      <ol className="flex flex-col items-stretch gap-0">
        {nodes.map((node, i) => (
          <li key={node.step} className="flex flex-col items-center">
            <div className="flex w-full items-start gap-4 rounded-xl border border-border/60 bg-background/40 p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{node.step}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {node.detail}
                </p>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <ArrowDown
                className="my-1.5 size-4 text-muted-foreground/50"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
