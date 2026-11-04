import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import brandLogo from '../../../assets/brand-logo.png'

const Footer = () => (
  <footer className="mt-16 bg-maroon text-cream">
    {/* CTA band */}
    <div className="border-b border-white/10 px-5 py-14 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">Weddings · Diwali · Every sweet occasion</p>
      <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-semibold leading-snug sm:text-4xl">
        The gift that never comes back <em className="text-gold">uneaten.</em>
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-cream/70">
        Gold-foiled royal boxes, hand-packed assortments and a handwritten note — sign in to start building yours.
      </p>
      <Link to="/products" className="mt-7 inline-block rounded-lg bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-maroon-dark transition hover:brightness-110">
        Start your gift box →
      </Link>
    </div>
    {/* Link columns */}
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
      <div>
        <div className="flex items-center gap-3">
          <img src={brandLogo} alt="" className="size-10 rounded-lg border border-gold/50 object-cover" />
          <span>
            <span className="block font-serif text-lg font-semibold">ROYAL SWEETS</span>
            <span className="block text-[9px] tracking-[0.3em] text-gold">EST. 1985</span>
          </span>
        </div>
        <p className="mt-4 max-w-xs text-sm leading-6 text-cream/70">Handcrafted Indian sweets made slowly in pure desi ghee — from our family kitchen to your table.</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Shop</p>
        <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
          {[['/products', 'All Sweets'], ['/products?category=gift-packs', 'Gift Boxes'], ['/products?featured=true', 'Festive Specials'], ['/contact', 'Bulk Orders']].map(([to, l]) => (
            <li key={l}><Link to={to} className="transition hover:text-gold">{l}</Link></li>))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Company</p>
        <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
          {[['/about', 'Our Story'], ['/products', 'Reviews'], ['/products?category=gift-packs', 'Gifting'], ['/login', 'Sign in'], ['/signup', 'Create account']].map(([to, l]) => (
            <li key={l}><Link to={to} className="transition hover:text-gold">{l}</Link></li>))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Visit Us</p>
        <ul className="mt-4 space-y-3 text-sm text-cream/80">
          <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> 12, Sweet Street, Jayanagar<br />Bengaluru 560041, India</li>
          <li className="flex items-center gap-2"><Phone className="size-4 shrink-0 text-gold" /> +91 98765 43210</li>
          <li className="flex items-center gap-2"><Mail className="size-4 shrink-0 text-gold" /> hello@royalsweets.in</li>
        </ul>
      </div>
    </div>
    <p className="border-t border-white/10 py-4 text-center text-xs text-cream/50">
      <span className="mx-3 text-gold">✦</span>© {new Date().getFullYear()} Royal Sweets · Made with care, shared with love<span className="mx-3 text-gold">✦</span>
    </p>
  </footer>
)
export default Footer
