import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import brandLogo from '../../../assets/brand-logo.png'

const NAV_LINKS = [
  { to: '/home', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Header = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const navCls = ({ isActive }) =>
    `rounded-lg px-3.5 py-2 text-sm font-medium tracking-wide transition ${
      isActive ? 'bg-gold/15 text-maroon' : 'text-ink/70 hover:bg-gold/10 hover:text-maroon'
    }`

  const submitSearch = (e) => e.preventDefault()

  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-cream/95 shadow-sm shadow-maroon/5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3.5 sm:px-6">
        {/* Logo + brand — left */}
        <Link to="/home" className="flex shrink-0 items-center gap-3">
          <img src={brandLogo} alt="Royal Sweets" className="h-11 w-11 rounded-xl shadow-sm shadow-maroon/20" />
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold tracking-wide text-maroon">ROYAL SWEETS</span>
            <span className="block text-[9px] uppercase tracking-[0.35em] text-gold">Est. 1985</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={navCls}>{l.label}</NavLink>
          ))}
        </nav>

        {/* Right cluster — search, account, cart */}
        <div className="ml-auto flex items-center gap-1.5">
          <form onSubmit={submitSearch} className="relative hidden w-56 md:block lg:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sweets…"
              className="w-full rounded-lg border border-gold/40 bg-white/70 py-2 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-maroon focus:ring-2 focus:ring-maroon/15"
            />
          </form>
          <Link to="/profile" aria-label="Account" className="rounded-lg p-2.5 text-maroon transition hover:bg-gold/15">
            <User className="size-5" />
          </Link>
          <Link to="/cart" aria-label="Cart" className="rounded-lg p-2.5 text-maroon transition hover:bg-gold/15">
            <ShoppingBag className="size-5" />
          </Link>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="rounded-lg p-2.5 text-maroon transition hover:bg-gold/15 lg:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={submitSearch} className="relative px-4 pb-3 md:hidden">
        <Search className="absolute left-7 top-1/2 size-4 -translate-y-[calc(50%+6px)] text-ink/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sweets…"
          className="w-full rounded-lg border border-gold/40 bg-white/70 py-2 pl-9 pr-3 text-sm outline-none focus:border-maroon"
        />
      </form>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-gold/20 px-4 py-3 lg:hidden">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className={navCls + ' block'}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Header
