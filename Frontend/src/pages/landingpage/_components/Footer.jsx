import { Link } from 'react-router-dom'
import brandLogo from '../../../assets/brand-logo.png'
import { Divider } from './Decor'

const shopLinks = ['All Sweets', 'Gift Boxes', 'Festive Specials', 'Bulk Orders']
const companyLinks = [
  { label: 'Our Story', href: '#story' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gifting', href: '#gifting' },
]

const Footer = () => (
  <footer className="bg-maroon-dark text-cream">
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={brandLogo}
              alt="Royal Sweets logo"
              className="w-11 h-11 rounded-xl"
            />
            <span className="leading-tight">
              <span className="block font-serif text-lg font-semibold tracking-wide">
                ROYAL SWEETS
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-gold">
                Est. 1985
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-cream/65">
            Handcrafted Indian sweets made slowly in pure desi ghee — from our
            family kitchen to your table.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Shop
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            {shopLinks.map((l) => (
              <li key={l}>
                <a href="#sweets" className="transition hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/login" className="transition hover:text-gold">
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/signup" className="transition hover:text-gold">
                Create account
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Visit us
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            <li>12, Sweet Street, Jayanagar</li>
            <li>Bengaluru 560041, India</li>
            <li className="text-gold">+91 98765 43210</li>
            <li className="text-gold">hello@royalsweets.in</li>
          </ul>
        </div>
      </div>

      <div className="my-10">
        <Divider light />
      </div>

      <p className="text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Royal Sweets · Made with care, shared with love.
      </p>
    </div>
  </footer>
)

export default Footer
