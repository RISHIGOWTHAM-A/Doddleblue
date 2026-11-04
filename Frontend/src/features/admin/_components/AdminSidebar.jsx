import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut, Package, PanelLeft, ShoppingBag, Tag, Users } from 'lucide-react'
import { apiFetch, clearSession, getStoredUser } from '../../../api/apiClient'
import brandLogo from '../../../assets/brand-logo.png'

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Tag },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/customers', label: 'Customers', icon: Users },
]

const AdminSidebar = () => {
  const navigate = useNavigate()
  const user = getStoredUser()
  const [collapsed, setCollapsed] = useState(false)
  const logout = () => {
    apiFetch('/auth/logout', { method: 'POST' }).catch(() => {})
    clearSession()
    navigate('/login')
  }
  return (
    <aside className={`sticky top-0 flex h-svh shrink-0 flex-col bg-maroon text-cream transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      <div className={`flex items-center gap-3 border-b border-white/10 px-5 py-5 ${collapsed ? 'justify-center px-0' : ''}`}>
        <img src={brandLogo} alt="" className="size-10 shrink-0 rounded-lg border border-gold/50 object-cover" />
        {!collapsed && (
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold">ROYAL SWEETS</span>
            <span className="block text-[9px] tracking-[0.3em] text-gold">ADMIN PANEL</span>
          </span>
        )}
      </div>
      <button onClick={() => setCollapsed((c) => !c)} aria-label="Toggle sidebar"
        className="absolute -right-3 top-7 z-10 flex size-7 items-center justify-center rounded-lg border border-gold/50 bg-maroon-dark text-gold shadow transition hover:scale-110 hover:bg-gold hover:text-maroon-dark">
        <PanelLeft className={`size-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
      </button>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} title={label} className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-gold text-maroon-dark' : 'text-cream/80 hover:bg-white/10'} ${collapsed ? 'justify-center px-0' : ''}`}>
            <Icon className="size-4 shrink-0" /> {!collapsed && label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        {collapsed ? (
          <div className="flex flex-col items-center gap-3 pb-2">
            <span title={user?.name} className="flex size-9 items-center justify-center rounded-full bg-gold font-serif text-sm font-bold text-maroon-dark">{user?.name?.[0]}</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-1 pb-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-gold font-serif text-sm font-bold text-maroon-dark">{user?.name?.[0]}</span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{user?.name}</span>
              <span className="block truncate text-[10px] uppercase tracking-wider text-gold">Administrator</span>
            </span>
          </div>
        )}
        <button onClick={logout} title="Logout" className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream/80 transition hover:bg-white/10 ${collapsed ? 'justify-center px-0' : ''}`}>
          <LogOut className="size-4 shrink-0" /> {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  )
}
export default AdminSidebar
