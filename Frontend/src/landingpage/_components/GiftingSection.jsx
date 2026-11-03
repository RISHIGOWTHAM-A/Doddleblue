function GiftingSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12" id="gifting">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">Make their day a little sweeter</p>
        <h2 className="mt-2 font-serif text-3xl text-maroon">A lovely gift, without a reason.</h2>
      </div>
      <a className="inline-flex w-fit items-center gap-3 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-maroon transition hover:bg-ochre" href="#sweets">
        Explore gifting <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}

export default GiftingSection
