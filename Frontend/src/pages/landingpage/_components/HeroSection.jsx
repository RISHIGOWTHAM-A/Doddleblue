import { Link } from 'react-router-dom'
import { CornerFlourish } from './Decor'
import Reveal from './Reveal'

const HERO_IMAGE =
  'https://jyotifoodstylist.com/wp-content/uploads/2026/05/indian-swets-1410x830.png'

const HeroSection = () => (
  <section className="relative overflow-hidden bg-cream" id="top">
    <CornerFlourish className="top-0 right-0" />
    <CornerFlourish className="bottom-0 left-0 rotate-180 hidden lg:block" />

    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
      {/* Copy */}
      <Reveal className="relative z-10">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-10 bg-gold" />
          Handcrafted mithai · Since 1985
        </p>

        <h1 className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-maroon sm:text-5xl lg:text-6xl">
          A Royal Selection of
          <br />
          <span className="italic">Traditional Indian Sweets</span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
          Every ladoo, katli and jamun is made slowly in pure desi ghee — the way
          our family has done it for three generations.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#sweets"
            className="inline-flex items-center gap-3 rounded-full bg-maroon px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-maroon-dark"
          >
            Explore Sweets
            <span aria-hidden="true">→</span>
          </a>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 rounded-full border border-gold/60 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-maroon transition hover:bg-maroon hover:text-cream hover:border-maroon"
          >
            Join the Family
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <div className="flex text-sm tracking-[0.15em] text-gold" aria-label="Rated 4.9 out of 5 stars">
            ★★★★★
          </div>
          <span className="text-xs text-ink/60">Loved by 2,000+ sweet tooths across India</span>
        </div>
      </Reveal>

      {/* Arch-framed image */}
      <Reveal delay={150} className="relative mx-auto w-full max-w-xl lg:max-w-none">
        <div className="absolute -left-6 top-10 size-24 rounded-full border border-gold/40 sm:-left-10 sm:size-32" />

        {/* Floating seal */}
        <div className="animate-float absolute -bottom-6 -right-4 z-10 flex size-24 flex-col items-center justify-center rounded-full bg-gold text-center text-[9px] font-semibold uppercase leading-4 tracking-[0.15em] text-maroon shadow-lg shadow-maroon/20 sm:size-28">
          Since
          <span className="font-serif text-2xl leading-7">1985</span>
          made with love
        </div>

        {/* Arch frame */}
        <div className="relative aspect-5/4 overflow-hidden rounded-t-[10rem] rounded-b-4xl border-4 border-gold/50 bg-cream-dark shadow-[0_24px_70px_rgba(83,21,31,0.18)]">
          <img
            src={HERO_IMAGE}
            alt="A festive royal box of traditional Indian sweets"
            className="size-full object-cover"
            fetchPriority="high"
          />
        </div>

        {/* Floating card */}
        <div className="absolute bottom-8 left-4 rounded-2xl border border-gold/30 bg-cream/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:bottom-10 sm:left-0 sm:px-5">
          <p className="font-serif text-lg text-maroon">A box full of joy</p>
          <p className="mt-0.5 text-xs text-ink/60">For your table, or theirs.</p>
        </div>
      </Reveal>
    </div>
  </section>
)

export default HeroSection
