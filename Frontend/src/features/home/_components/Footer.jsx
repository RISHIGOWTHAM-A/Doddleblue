import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => (
  <footer className="mt-16 border-t border-gold/30 bg-maroon text-cream">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
      <div>
        <p className="font-serif text-xl font-semibold">ROYAL SWEETS</p>
        <p className="mt-1 text-[10px] tracking-[0.3em] text-gold">EST. 1985</p>
        <p className="mt-4 max-w-xs text-sm leading-6 text-cream/70">Handcrafted Indian sweets made with pure ghee, saffron and tradition — delivered fresh to your door.</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Shop</p>
        <ul className="mt-4 space-y-2 text-sm text-cream/80">
          {[['/products', 'All Sweets'], ['/categories', 'Categories'], ['/home', 'Home']].map(([to, l]) => (
            <li key={to}><Link to={to} className="transition hover:text-gold">{l}</Link></li>))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Company</p>
        <ul className="mt-4 space-y-2 text-sm text-cream/80">
          {[['/about', 'About Us'], ['/contact', 'Contact']].map(([to, l]) => (
            <li key={to}><Link to={to} className="transition hover:text-gold">{l}</Link></li>))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact</p>
        <ul className="mt-4 space-y-3 text-sm text-cream/80">
          <li className="flex items-center gap-2"><MapPin className="size-4 shrink-0 text-gold" /> Madurai, Tamil Nadu</li>
          <li className="flex items-center gap-2"><Phone className="size-4 shrink-0 text-gold" /> +91 98765 43210</li>
          <li className="flex items-center gap-2"><Mail className="size-4 shrink-0 text-gold" /> hello@royalsweets.in</li>
        </ul>
      </div>
    </div>
    <p className="border-t border-white/10 py-4 text-center text-xs text-cream/50">© {new Date().getFullYear()} Royal Sweets. Crafted with love & ghee.</p>
  </footer>
)
export default Footer
