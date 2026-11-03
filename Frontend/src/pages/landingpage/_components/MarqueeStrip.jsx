const SWEETS = [
  'Motichoor Ladoo',
  'Kaju Katli',
  'Jalebi',
  'Gulab Jamun',
  'Mysore Pak',
  'Rasgulla',
  'Soan Papdi',
  'Kalakand',
  'Besan Ladoo',
  'Kesar Peda',
]

const MarqueeStrip = () => (
  <div className="overflow-hidden border-y border-gold/40 bg-gold/15 py-3">
    <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
      {[...SWEETS, ...SWEETS].map((name, i) => (
        <span
          key={i}
          className="flex items-center gap-10 font-serif text-sm uppercase tracking-[0.25em] text-maroon"
        >
          {name}
          <span className="text-gold text-xs">◆</span>
        </span>
      ))}
    </div>
  </div>
)

export default MarqueeStrip
