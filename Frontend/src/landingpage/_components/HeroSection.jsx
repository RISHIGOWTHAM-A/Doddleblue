function HeroSection() {
  return (
    <section className="relative overflow-hidden" id="top">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-12 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ochre">
            <span className="h-px w-8 bg-ochre" />
            A sweeter kind of tradition
          </p>
          <h1 className="font-serif text-[3.4rem] leading-[1.02] tracking-[-0.045em] text-maroon sm:text-6xl lg:text-[4.5rem]">
            Made slowly.
            <br />
            <span className="italic">Loved deeply.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-maroon/70 sm:text-lg sm:leading-8">
            The mithai you remember, made with the care it deserves. A little old-world magic, in every bite.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              className="inline-flex items-center gap-3 rounded-full bg-maroon px-7 py-3.5 text-sm font-medium text-cream transition hover:bg-[#6e160f]"
              href="#sweets"
            >
              Find your favourite
              <span aria-hidden="true">→</span>
            </a>
            <a className="text-sm font-medium text-maroon underline decoration-ochre underline-offset-4" href="#story">
              Our little story
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <div className="flex text-sm tracking-wider text-gold" aria-label="Rated 4.9 out of 5 stars">★★★★★</div>
            <span className="text-xs text-maroon/65">Loved by 2,000+ sweet tooths</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[610px] lg:max-w-none">
          <div className="absolute -left-7 top-8 size-24 rounded-full border border-ochre/40 sm:-left-10 sm:size-32" />
          <div className="absolute -bottom-5 -right-4 z-10 flex size-24 flex-col items-center justify-center rounded-full bg-gold text-center text-[10px] font-semibold uppercase leading-4 tracking-[0.12em] text-maroon sm:size-28">
            Since
            <span className="font-serif text-2xl leading-7">1988</span>
            made with love
          </div>
          <div className="relative aspect-[1.14/1] overflow-hidden rounded-t-[48%] rounded-b-[2rem] border-[7px] border-cream shadow-[0_24px_70px_rgba(87,39,19,0.12)] sm:rounded-t-[48%] sm:border-[10px]">
            <img
              alt="A festive spread of traditional Indian sweets, including laddoo and kaju katli"
              className="size-full object-cover"
              fetchPriority="high"
              src="/src/assets/hero.png"
            />
          </div>
          <div className="absolute bottom-8 left-4 rounded-2xl border border-ochre/20 bg-cream/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:bottom-10 sm:left-0 sm:px-5">
            <p className="font-serif text-lg text-maroon">A box full of joy</p>
            <p className="mt-0.5 text-xs text-maroon/65">For your table, or theirs.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
