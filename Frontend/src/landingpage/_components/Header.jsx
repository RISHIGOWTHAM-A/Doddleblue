import { useState } from 'react'

const links = [
  { label: 'Our sweets', href: '#sweets' },
  { label: 'Our story', href: '#story' },
  { label: 'Gifting', href: '#gifting' },
]

function Header({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative z-20 border-b border-ochre/25 bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <button
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          className="flex size-10 items-center justify-center rounded-full text-maroon md:hidden"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" strokeWidth="1.7" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeWidth="1.7" />
            )}
          </svg>
        </button>

        <a className="absolute left-1/2 -translate-x-1/2 text-center md:static md:translate-x-0" href="#top">
          <span className="block font-serif text-2xl font-semibold leading-none tracking-tight text-maroon sm:text-3xl">
            Vangoo
          </span>
          <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.3em] text-ochre sm:text-[10px]">
            Sweets &amp; Stories
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a
              className="text-sm font-medium text-maroon/80 transition hover:text-maroon"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          aria-label={`Shopping bag, ${cartCount} items`}
          className="flex size-10 items-center justify-center rounded-full border border-ochre/40 text-maroon transition hover:bg-maroon hover:text-cream"
          href="/login"
          onClick={(event) => {
            event.preventDefault()
            window.location.href = '/login'
          }}
        >
          <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 8h14l1 12H4L5 8Z" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute ml-8 -mt-8 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-maroon">
              {cartCount}
            </span>
          )}
        </a>
      </div>

      {menuOpen && (
        <nav className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-ochre/25 bg-cream px-6 py-3 shadow-lg md:hidden" aria-label="Mobile navigation">
          {links.map((link) => (
            <a
              className="rounded-lg px-3 py-3 font-medium text-maroon hover:bg-maroon/5"
              href={link.href}
              key={link.label}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Header
