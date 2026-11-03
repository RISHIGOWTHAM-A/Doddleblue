import Reveal from './Reveal'
import { SectionHeading } from './Decor'

const reviews = [
  {
    quote: 'The kaju katli tastes exactly like the one from my childhood mithai shop. Ordered twice in a month.',
    name: 'Priya Sharma',
    place: 'Bengaluru',
  },
  {
    quote: 'Sent a gift box to my parents for Diwali. Amma called just to say the laddus were "proper ghee wale".',
    name: 'Arjun Mehta',
    place: 'Hyderabad',
  },
  {
    quote: 'Fresh, not overly sweet, and the packaging felt like opening a present. This is our festive default now.',
    name: 'Kavya Reddy',
    place: 'Chennai',
  },
]

const TestimonialsSection = () => (
  <section className="bg-cream-dark/60" id="reviews">
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <Reveal>
        <SectionHeading
          eyebrow="Sweet words"
          title="Loved, one box at a time"
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 100}>
            <figure className="flex h-full flex-col rounded-2xl border border-gold/30 bg-cream p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-maroon/10">
              <span className="font-serif text-5xl leading-none text-gold">“</span>
              <blockquote className="mt-2 flex-1 font-serif text-lg italic leading-relaxed text-ink/80">
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-gold/30 pt-4">
                <span className="mb-1 block text-sm tracking-[0.15em] text-gold">★★★★★</span>
                <span className="font-semibold text-maroon">{r.name}</span>
                <span className="text-ink/55 text-sm"> · {r.place}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default TestimonialsSection
