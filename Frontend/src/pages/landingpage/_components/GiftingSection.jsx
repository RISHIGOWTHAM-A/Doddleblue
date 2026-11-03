import { Link } from 'react-router-dom'
import { CornerFlourish } from './Decor'
import Reveal from './Reveal'

const GiftingSection = () => (
  <section className="relative overflow-hidden bg-maroon-dark" id="gifting">
    <CornerFlourish className="top-0 right-0 text-gold/40" />
    <CornerFlourish className="bottom-0 left-0 rotate-180 text-gold/40" />

    <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
          Weddings · Diwali · Every sweet occasion
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-cream sm:text-4xl">
          The gift that never comes back
          <span className="italic text-gold"> uneaten.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-cream/70 sm:text-base">
          Gold-foiled royal boxes, hand-packed assortments and a handwritten note
          — create an account to start building yours.
        </p>
        <div className="mt-9">
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-maroon transition hover:bg-cream"
          >
            Start Your Gift Box <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
)

export default GiftingSection
