import { Link, NavLink } from 'react-router-dom'
import { LogOut, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface NavItem {
  label: string
  to: string
}

interface NavbarProps {
  variant?: 'default' | 'minimal'
  items?: NavItem[]
  onLogout?: () => void
}

const defaultItems: NavItem[] = [
  { label: 'Campaigns', to: '/campaigns' },
  { label: 'Records', to: '/records' },
]

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="relative flex size-8 items-center justify-center rounded-full bg-teal-600">
        <span className="absolute size-5 rounded-full border-2 border-white/80" />
        <span className="absolute size-2.5 rounded-full border-2 border-white/60" />
      </span>
      <span className="text-lg font-bold tracking-wide text-gray-900 uppercase">
        VGRIP
      </span>
    </Link>
  )
}

export function Navbar({
  variant = 'default',
  items = defaultItems,
  onLogout,
}: NavbarProps) {
  const isMinimal = variant === 'minimal'

  const handleLogout = () => {
    onLogout?.()
  }

  return (
    <header className="border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          'mx-auto flex h-14 items-center px-6',
          isMinimal ? 'max-w-6xl' : 'max-w-6xl justify-between',
        )}
      >
        <Logo />

        {!isMinimal ? (
          <>
            <nav className="flex h-full items-center gap-8" aria-label="Main">
              {items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'relative flex h-full items-center text-sm font-medium transition-colors',
                      isActive
                        ? 'text-gray-900 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-teal-600'
                        : 'text-gray-500 hover:text-gray-800',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              <LogOut className="size-4" aria-hidden />
              <span>Logout</span>
              <ChevronDown className="size-3.5 text-gray-400" aria-hidden />
            </button>
          </>
        ) : null}
      </div>
    </header>
  )
}
