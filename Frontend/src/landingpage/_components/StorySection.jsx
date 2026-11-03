function StorySection() {
  return (
    <section className="bg-maroon text-cream" id="story">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[1fr_auto] md:items-center lg:px-12">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">From our family to yours</p>
          <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Some recipes aren&apos;t written down. They&apos;re passed around the table.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-cream/75">
            Three generations, one well-loved kitchen, and a belief that the best sweets are the ones you share.
          </p>
        </div>
        <a
          className="inline-flex w-fit items-center gap-3 rounded-full border border-gold/60 px-6 py-3 text-sm font-medium text-cream transition hover:bg-cream hover:text-maroon"
          href="#gifting"
        >
          Get to know us <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

export default StorySection
