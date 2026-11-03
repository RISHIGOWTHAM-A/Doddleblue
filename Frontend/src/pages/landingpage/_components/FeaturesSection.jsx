import Reveal from './Reveal'
import { SectionHeading } from './Decor'

const features = [
  {
    title: 'Pure Desi Ghee',
    detail: 'Every batch slow-cooked in A2 ghee — never oil, never shortcuts.',
    icon: (
      <path d="M12 3c3 4.5 6 7.5 6 11a6 6 0 1 1-12 0c0-3.5 3-6.5 6-11Z" />
    ),
  },
  {
    title: 'Made Fresh Daily',
    detail: 'Small batches every morning. What you get was made this week.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
  {
    title: 'No Preservatives',
    detail: 'Real ingredients only. If it can\'t sit on your shelf, it can\'t sit on ours.',
    icon: (
      <>
        <path d="M5 21c8 0 14-6 14-14V5h-2C9 5 5 9 5 16v5Z" />
        <path d="M5 21c0-7 4-11 10-12" />
      </>
    ),
  },
  {
    title: 'Festive Gifting',
    detail: 'Royal gold-foil boxes for weddings, Diwali and every sweet occasion.',
    icon: (
      <>
        <rect x="4" y="9" width="16" height="11" rx="1.5" />
        <path d="M4 13h16M12 9v11M12 9c-2.5 0-4.5-1.5-4.5-3.5S9 2.5 12 9Zm0 0c2.5 0 4.5-1.5 4.5-3.5S15 2.5 12 9Z" />
      </>
    ),
  },
]

const FeaturesSection = () => (
  <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12" id="promise">
    <Reveal>
      <SectionHeading
        eyebrow="The Royal Promise"
        title="Why families keep coming back"
      />
    </Reveal>

    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f, i) => (
        <Reveal key={f.title} delay={i * 100}>
          <div className="group h-full rounded-2xl border border-gold/30 bg-white/50 p-7 text-center transition duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-maroon/10">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/50 bg-cream text-maroon transition group-hover:bg-maroon group-hover:text-gold">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {f.icon}
              </svg>
            </div>
            <h3 className="mt-5 font-serif text-xl text-maroon">{f.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">{f.detail}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
)

export default FeaturesSection
