export const Divider = ({ light = false }) => (
  <div className="flex items-center justify-center gap-3">
    <span className={`h-px w-14 ${light ? 'bg-gold/70' : 'bg-gold'}`} />
    <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
    <span className={`h-px w-14 ${light ? 'bg-gold/70' : 'bg-gold'}`} />
  </div>
)

export const CornerFlourish = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`absolute w-24 h-24 text-gold/50 pointer-events-none ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
  >
    <path d="M98 2 C60 10 30 25 15 60" />
    <path d="M98 2 C85 30 70 45 40 55" opacity="0.6" />
    <path d="M98 2 C50 5 20 30 8 80" opacity="0.4" />
    <ellipse cx="28" cy="52" rx="7" ry="3" transform="rotate(-40 28 52)" />
    <ellipse cx="48" cy="32" rx="7" ry="3" transform="rotate(-55 48 32)" />
    <ellipse cx="68" cy="20" rx="7" ry="3" transform="rotate(-65 68 20)" />
    <circle cx="15" cy="72" r="2.5" />
    <circle cx="8" cy="88" r="1.5" />
    <circle cx="85" cy="8" r="2" />
  </svg>
)

export const SectionHeading = ({ eyebrow, title, sub, light = false }) => (
  <div className="text-center max-w-2xl mx-auto">
    <p className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase">
      {eyebrow}
    </p>
    <h2
      className={`font-serif text-3xl sm:text-4xl mt-3 ${light ? 'text-cream' : 'text-maroon'}`}
    >
      {title}
    </h2>
    <div className="my-5">
      <Divider light={light} />
    </div>
    {sub && (
      <p className={`${light ? 'text-cream/70' : 'text-ink/60'} text-sm sm:text-base leading-relaxed`}>
        {sub}
      </p>
    )}
  </div>
)
