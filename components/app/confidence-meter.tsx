import { cn } from '@/lib/utils'

export function ConfidenceMeter({
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
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      role="img"
      aria-label={`Confidence score ${value} percent`}
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
          className="stroke-primary transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className={cn(
            'font-mono font-semibold text-primary',
            size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl',
          )}
        >
          {value}%
        </span>
        {size !== 'sm' && (
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            confident
          </span>
        )}
      </div>
    </div>
  )
}
