import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BrainCircuit } from 'lucide-react'

const footerLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Live Demo', href: '/demo' },
  { label: 'About', href: '/about' },
  { label: 'History', href: '/history' },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border">
      {/* Final CTA */}
      <div className="relative overflow-hidden py-20 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[130px]"
        />
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center md:px-6">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Your next big decision deserves better than a coin flip
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Upload your options and get a transparent, evidence-backed
            recommendation in minutes.
          </p>
          <Button
            render={<Link href="/decision" />}
            nativeButton={false}
            size="lg"
            className="mt-8 gap-2"
          >
            Analyze My Decision
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-10 md:flex-row md:justify-between md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <BrainCircuit className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              DecisionIQ
            </span>
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-muted-foreground">
            © 2026 DecisionIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
