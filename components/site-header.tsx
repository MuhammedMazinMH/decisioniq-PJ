import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BrainCircuit } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Examples', href: '#examples' },
  { label: 'Reasoning', href: '#reasoning' },
]

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <BrainCircuit className="size-5" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            DecisionIQ
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            render={<Link href="/demo" />}
            nativeButton={false}
            variant="ghost"
            size="sm"
            className="hidden text-muted-foreground sm:inline-flex"
          >
            View Demo
          </Button>
          <Button
            render={<Link href="/decision" />}
            nativeButton={false}
            size="sm"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
