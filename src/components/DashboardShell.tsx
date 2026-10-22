// import { ReactNode } from 'react'

// interface DashboardShellProps {
//   pageTitle: string
//   pageSubtitle: string
//   userEmail: string
//   onLogout: () => void
//   activeNav: 'dashboard' | 'quotes'
//   children: ReactNode
// }

// function DashboardShell({
//   pageTitle,
//   pageSubtitle,
//   userEmail,
//   onLogout,
//   activeNav,
//   children,
// }: DashboardShellProps): React.ReactElement {
//   return (
//     <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
//       <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
//         <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-3">
//             <img src="/logo.png" alt="Ridera logo" className="h-9 w-auto" />
//             <div>
//               <p className="text-sm font-semibold text-slate-900 dark:text-white">{pageTitle}</p>
//               <p className="text-xs text-slate-500 dark:text-slate-300">{pageSubtitle}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <p className="hidden text-sm text-slate-600 dark:text-slate-300 sm:block">{userEmail}</p>
//             <button
//               type="button"
//               onClick={onLogout}
//               className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
//             >
//               Log out
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
//         <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
//           <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Navigation</p>
//           <nav className="space-y-2">
//             <a
//               href="/dashboard"
//               className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
//                 activeNav === 'dashboard'
//                   ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
//                   : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
//               }`}
//             >
//               Dashboard
//             </a>
//             <a
//               href="/dashboard"
//               className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
//                 activeNav === 'quotes'
//                   ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
//                   : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
//               }`}
//             >
//               Recent Quotes
//             </a>
//           </nav>
//         </aside>

//         <section>{children}</section>
//       </div>

//       <footer className="border-t border-slate-200 bg-white/95 px-4 py-4 dark:border-slate-700 dark:bg-slate-900/95 sm:px-6 lg:px-8">
//         <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-300">
//           <p>Ridera Dashboard</p>
//           <p>Built for quote operations</p>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default DashboardShell

import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'

interface DashboardShellProps {
  pageTitle: string
  pageSubtitle: string
  userEmail: string
  onLogout: () => void
  activeNav?: 'dashboard' | 'quotes' | 'social-links' | 'phone-numbers'
  children: ReactNode
}

const NAV_ITEMS: { key: 'dashboard' | 'quotes' | 'social-links' | 'phone-numbers'; label: string; href: string; icon: ReactNode }[] = [
   
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  // {
  //   key: 'quotes',
  //   label: 'Recent Quotes',
  //   href: '/dashboard',
  //   icon: (
  //     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  //       <path
  //         d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 12.5v-9z"
  //         stroke="currentColor"
  //         strokeWidth="1.4"
  //         fill="none"
  //       />
  //       <path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  //     </svg>
  //   ),
  // },
   {
      key: 'phone-numbers',
      label: 'Phone Numbers',
      href: '/dashboard/phone-numbers',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3.5 2A1.5 1.5 0 002 3.5v9A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0012.5 2h-9zm0 1h9A.5.5 0 0113 3.5v9a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-9A.5.5 0 013.5 3zM8 5a1 1 0 100 2 1 1 0 000-2zm0 3a3 3 0 00-3 3 .5.5 0 00.5.5h5a.5.5 0 00.5-.5 3 3 0 00-3-3z" fill="currentColor" />
        </svg>
      ),
    },
  {
    key: 'social-links',
    label: 'Social Links',
    href: '/dashboard/social-links',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M6.2 9.8L9.8 6.2M5 11.2H3.8A1.8 1.8 0 012 9.4V8.2A1.8 1.8 0 013.8 6.4H5M11 4.8h1.2A1.8 1.8 0 0114 6.6v1.2a1.8 1.8 0 01-1.8 1.8H11"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

function UserAvatar({ email }: { email: string }) {
  const initials = email
    .split('@')[0]
    .split(/[._-]/)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('')
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-white shadow-inner select-none"
    >
      {initials || '?'}
    </span>
  )
}

function DashboardShell({
  pageTitle,
  pageSubtitle,
  userEmail,
  onLogout,
  activeNav,
  children,
}: DashboardShellProps): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0d1117] dark:text-slate-100">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-[#161b22]/90">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* Left: logo + title */}
          <div className="flex min-w-0 items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            <img src="/drive-download-20260304T223405Z-3-001/logo.png" alt="Ridera" className="h-16 w-auto shrink-0" />

            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-[13px] font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                {pageTitle}
              </p>
              <p className="truncate text-[11px] leading-tight text-slate-400 dark:text-slate-500">{pageSubtitle}</p>
            </div>
          </div>

          {/* Right: user + logout */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2.5 sm:flex">
              <UserAvatar email={userEmail} />
              <span className="max-w-[180px] truncate text-[13px] text-slate-600 dark:text-slate-300">{userEmail}</span>
            </div>
            <div className="hidden h-5 w-px bg-slate-200 dark:bg-slate-700 sm:block" aria-hidden="true" />
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path
                  d="M5 11H2.5A1.5 1.5 0 011 9.5v-6A1.5 1.5 0 012.5 2H5M9 9.5l3-3-3-3M12 6.5H5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile sidebar overlay ──────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative flex w-64 flex-col border-r border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-[#161b22]">
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <SidebarNav activeNav={activeNav} onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-[#161b22]">
            <SidebarNav activeNav={activeNav} />
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0">{children}</main>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="fixed bottom-0 w-full border-t border-slate-200/80 bg-white/80 py-4 dark:border-slate-800 dark:bg-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 text-[11px] text-slate-400 sm:px-6 lg:px-8 dark:text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Ridera Dashboard
          </span>
          <span>Built for quote operations</span>
        </div>
      </footer>
    </div>
  )
}

/* ── Sidebar nav (shared by desktop + mobile) ────────────────────── */
function SidebarNav({
  activeNav,
  onNavigate,
}: {
  activeNav: 'dashboard' | 'quotes' | 'social-links'
  onNavigate?: () => void
}) {
  return (
    <nav aria-label="Main navigation">
      <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
        Menu
      </p>
      <ul className="space-y-0.5">
        {NAV_ITEMS.map(({ key, label, href, icon }) => {
          const isActive = activeNav === key
          return (
            <li key={key}>
              <Link
                to={href}
                onClick={onNavigate}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150',
                  isActive
                    ? 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100',
                ].join(' ')}
              >
                <span
                  className={[
                    'transition-colors',
                    isActive ? 'text-sky-500' : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300',
                  ].join(' ')}
                >
                  {icon}
                </span>
                {label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden="true" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default DashboardShell
