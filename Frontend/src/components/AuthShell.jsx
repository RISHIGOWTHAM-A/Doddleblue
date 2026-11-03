import brandLogo from '../assets/brand-logo.png'

const CornerFlourish = ({ className }) => (
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

const Divider = () => (
  <div className="flex items-center justify-center gap-3">
    <span className="h-px w-14 bg-gold" />
    <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
    <span className="h-px w-14 bg-gold" />
  </div>
)

const AuthShell = ({ title, subtitle, children, footer, panelImage }) => {
  return (
    <div className="min-h-svh lg:h-svh flex flex-col lg:flex-row bg-cream">
      {/* Left — brand panel (fixed viewport height, never scrolls) */}
      <aside className="hidden lg:block lg:w-[45%] relative shrink-0 overflow-hidden bg-maroon">
        <img
          src={panelImage}
          alt="A royal selection of traditional Indian sweets"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-maroon/50 via-transparent to-maroon/20 pointer-events-none" />
      </aside>

      {/* Right — form panel (scrolls internally when content overflows) */}
      <main className="flex-1 relative min-h-svh lg:min-h-0 lg:h-full lg:overflow-y-auto">
        <CornerFlourish className="top-0 right-0" />
        <CornerFlourish className="bottom-0 left-0 rotate-180" />

        <div className="relative z-10 min-h-full flex items-center justify-center px-6 sm:px-12 py-10">
          <div className="w-full max-w-sm">
            <div className="text-center">
              <img
                src={brandLogo}
                alt="Royal Sweets logo"
                className="w-14 h-14 mx-auto rounded-2xl shadow-md shadow-maroon/20"
              />
              <p className="font-serif text-maroon text-xl tracking-[0.2em] mt-2">
                ROYAL SWEETS
              </p>
              <p className="text-gold text-[10px] tracking-[0.4em] mt-0.5">
                EST. 1985
              </p>
            </div>

            <h1 className="font-serif text-maroon text-3xl sm:text-4xl text-center mt-6">
              {title}
            </h1>
            <p className="text-ink/70 text-sm text-center mt-2">{subtitle}</p>

            <div className="my-6">
              <Divider />
            </div>

            {children}

            {footer && (
              <p className="text-center text-sm text-ink/70 mt-6">{footer}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuthShell
