import { useState, FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

interface NavLink {
  name: string
  href: string
  isHash?: boolean
}

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const toHomeSection = (hash: string) => (isHomePage ? hash : `/${hash}`)

  const navLinks: NavLink[] = [
    { name: 'Services', href: toHomeSection('#services'), isHash: true },
    { name: 'About Us', href: '/about' },
    { name: 'Earn With Ridera', href: '/earn' },
    { name: 'Community Work', href: '/community' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: toHomeSection('#contact'), isHash: true },
  ]

  return (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300 bg-white/95 shadow-sm backdrop-blur-sm dark:bg-gray-950/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-3">
          <img src="/drive-download-20260304T223405Z-3-001/logo3.png" alt="Ridera" className="w-24 scale-105 dark:hidden" />
          <img src="/drive-download-20260304T223405Z-3-001/Ridera-white-logo.png" alt="Ridera" className="w-24 scale-105 hidden dark:block" />

        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            link.isHash ? (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Phone Number (Desktop) */}
          <a href="tel:+2348136153906" className="hidden items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-primary-500 dark:text-gray-300 lg:flex">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
           08136153906
          </a>

          {/* CTA Button (Desktop) */}
          <a href={toHomeSection('#calculator')} className="hidden rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/30 lg:inline-flex">
            Get a Quote
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-6 dark:border-gray-800 dark:bg-gray-950 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-900 transition-colors hover:text-primary-500 dark:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-lg font-medium text-gray-900 transition-colors hover:text-primary-500 dark:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
              <a href="tel:+2348136153906" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                 08136153906
              </a>
              <a href={toHomeSection('#calculator')} className="inline-flex w-full justify-center rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-600">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
