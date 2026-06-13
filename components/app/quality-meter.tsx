import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export function QualityMeter({
  value,
  size = 'md',
  className,
}: {
  value: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const dims = size === 'lg' ? 132 : size === 'sm' ? 76 : 104
  const stroke = size === 'lg' ? 10 : size === 'sm' ? 7 : 8
  const radius = (dims - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div
        className="relative inline-flex items-center justify-center"
        role="img"
        aria-label={`Decision quality score ${value} percent`}
      >
        <svg width={dims} height={dims} className="-rotate-90">
          <circle
            cx={dims / 2}
            cy={dims / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="stroke-muted"
          />
          <circle
            cx={dims / 2}
            cy={dims / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="stroke-accent transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span
            className={cn(
              'font-mono font-semibold text-accent',
              size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl',
            )}
          >
            {value}%
          </span>
          {size !== 'sm' && (
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              quality
            </span>
          )}
        </div>
      </div>
      {size === 'lg' && (
        <div className="group relative">
          <Info className="size-4 cursor-help text-muted-foreground transition-colors hover:text-foreground" />
          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg border border-border bg-card/95 px-3 py-2 text-xs leading-relaxed text-muted-foreground opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
            Decision Quality Score evaluates whether sufficient context, priorities, trade-off analysis, risks, and future projections were considered.
          </div>
        </div>
      )}
    </div>
  )
}
