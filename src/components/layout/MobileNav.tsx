'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  {
    href: '/',
    maori: 'Whare',
    english: 'Home',
    exact: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: '/browse',
    maori: 'Pukapuka',
    english: 'Browse',
    exact: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    href: '/browse',
    maori: 'Ako',
    english: 'Learn',
    exact: false,
    matchPrefix: '/word',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    href: '/contribute',
    maori: 'Hapori',
    english: 'Community',
    exact: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: '/about',
    maori: 'Tangata',
    english: 'Profile',
    exact: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export default function MobileNav() {
  const pathname = usePathname()

  function isActive(tab: typeof TABS[number]): boolean {
    if (tab.matchPrefix && pathname.startsWith(tab.matchPrefix)) return true
    if (tab.exact) return pathname === tab.href
    return pathname === tab.href
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch h-16">
        {TABS.map((tab) => {
          const active = isActive(tab)
          return (
            <Link
              key={`${tab.href}-${tab.maori}`}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors"
              style={{ color: active ? 'var(--accent)' : 'var(--text-secondary)' }}
              aria-label={`${tab.maori} — ${tab.english}`}
              aria-current={active ? 'page' : undefined}
            >
              {tab.icon}
              <span className="text-[9px] font-semibold tracking-wide leading-none">{tab.maori}</span>
              <span className="text-[8px] leading-none opacity-60">{tab.english}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
