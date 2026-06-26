'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function BrowseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function LearnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function CommunityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

interface Tab {
  href: string
  maori: string
  english: string
  exact: boolean
  matchPrefix?: string
  Icon: () => React.ReactElement
}

const TABS: Tab[] = [
  { href: '/',           maori: 'Whare',    english: 'Home',      exact: true,  Icon: HomeIcon },
  { href: '/browse',     maori: 'Pukapuka', english: 'Browse',    exact: false, Icon: BrowseIcon },
  { href: '/browse',     maori: 'Ako',      english: 'Learn',     exact: false, matchPrefix: '/word', Icon: LearnIcon },
  { href: '/contribute', maori: 'Hapori',   english: 'Community', exact: false, Icon: CommunityIcon },
  { href: '/about',      maori: 'Tangata',  english: 'Profile',   exact: false, Icon: ProfileIcon },
]

export default function MobileNav() {
  const pathname = usePathname()

  function isActive(tab: Tab): boolean {
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
              <tab.Icon />
              <span className="text-[9px] font-semibold tracking-wide leading-none">{tab.maori}</span>
              <span className="text-[8px] leading-none opacity-60">{tab.english}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
