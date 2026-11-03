import { CornerFlourish, Divider } from './Decor'
import Reveal from './Reveal'

const stats = [
  { value: '40+', label: 'Years of tradition' },
  { value: '3', label: 'Generations of halwais' },
  { value: '2L+', label: 'Boxes shared' },
  { value: '100%', label: 'Pure desi ghee' },
]

const StorySection = () => (
  <section className="relative overflow-hidden bg-maroon text-cream" id="story">
    <CornerFlourish className="top-0 left-0 -scale-x-100 text-gold/40" />
    <CornerFlourish className="bottom-0 right-0 rotate-180 text-gold/40" />

    <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-24">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
          From our family to yours
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
          Some recipes aren&apos;t written down.
          <span className="italic text-gold"> They&apos;re passed around the table.</span>
        </h2>
        <div className="my-7">
          <Divider light />
        </div>
        <p className="mx-auto max-w-xl text-sm leading-7 text-cream/75 sm:text-base">
          It began in a small kitchen in 1985 with one karahi, a sack of besan,
          and a stubborn belief — that a sweet made slowly tastes like a
          celebration. Three generations later, we still make every batch the
          same way: by hand, in pure ghee, without shortcuts.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <p className="font-serif text-3xl text-gold sm:text-4xl">{s.value}</p>
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-cream/70">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default StorySection
