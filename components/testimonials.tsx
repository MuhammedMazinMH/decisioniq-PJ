import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Ananya Sharma',
    role: 'Final-Year CS Student',
    avatar: '/images/avatar-student.png',
    quote:
      'I had three internship offers and zero clarity. DecisionIQ scored each one against what I actually cared about and showed me why. I stopped second-guessing within a day.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Software Engineer',
    avatar: '/images/avatar-engineer.png',
    quote:
      'The trade-off analysis between a startup equity package and a big-tech offer was incredibly thorough. Seeing the reasoning step by step made the recommendation easy to trust.',
    rating: 5,
  },
  {
    name: 'Priya Raghavan',
    role: 'Career Switch Professional',
    avatar: '/images/avatar-professional.png',
    quote:
      'Switching from finance to data science felt like a leap of faith. DecisionIQ quantified the risks I was only feeling and gave me a confident, evidence-backed path forward.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section
      className="relative py-20 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="testimonials-heading"
            className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Decisions made with confidence
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Students and professionals use DecisionIQ at the moments that
            matter most.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-border bg-card/60 p-6"
            >
              <div
                className="mb-4 flex gap-0.5"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-primary text-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {`"${testimonial.quote}"`}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Image
                  src={testimonial.avatar || '/placeholder.svg'}
                  alt={`Portrait of ${testimonial.name}`}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
