import { useState } from 'react'
import { Link } from 'react-router-dom'
import brandLogo from '../../../assets/brand-logo.png'

const links = [
  { label: 'Our Sweets', href: '#sweets' },
  { label: 'Our Story', href: '#story' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gifting', href: '#gifting' },
]

const Header = ({ cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={brandLogo}
            alt="Royal Sweets logo"
            className="w-10 h-10 rounded-xl shadow-sm shadow-maroon/20"
          />
          <span className="leading-tight">
            <span className="block font-serif text-xl font-semibold tracking-wide text-maroon">
              ROYAL SWEETS
            </span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.35em] text-gold">
              Est. 1985
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition hover:text-maroon"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            aria-label={`Shopping bag, ${cartCount} items`}
            className="relative flex size-10 items-center justify-center rounded-full border border-gold/50 text-maroon transition hover:bg-maroon hover:text-cream"
          >
            <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 8h14l1 12H4L5 8Z" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" strokeWidth="1.5" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-maroon">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="hidden rounded-full bg-maroon px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-maroon-dark sm:block"
          >
            Sign In
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-full text-maroon lg:hidden"
          >
            <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" strokeWidth="1.7" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeWidth="1.7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-gold/30 bg-cream px-6 py-3 shadow-lg lg:hidden"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-maroon hover:bg-maroon/5"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 font-medium text-maroon hover:bg-maroon/5"
          >
            Sign in
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
