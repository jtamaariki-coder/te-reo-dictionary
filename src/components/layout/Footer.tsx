import Link from 'next/link'

const EXPLORE_LINKS = [
  { href: '/browse', label: 'Browse all words' },
  { href: '/category/common', label: 'Common words' },
  { href: '/category/values', label: 'Values & concepts' },
  { href: '/category/waka-ama', label: 'Waka ama' },
]

const SITE_LINKS = [
  { href: '/about', label: 'About this project' },
  { href: '/contribute', label: 'How to contribute' },
  { href: '/submit', label: 'Submit a word' },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-display text-lg font-bold text-forest-700 dark:text-forest-300">
              Te Reo Māori Dictionary
            </p>
            <p className="mt-2 text-sm text-earth-600 dark:text-earth-400 leading-relaxed">
              A free, community-driven dictionary for te reo Māori — built for all of Aotearoa.
            </p>
            <a
              href="https://github.com/jtamaariki-coder/te-reo-dictionary"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-forest-600 dark:text-forest-400 hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-earth-500 dark:text-earth-500 mb-3">
              Explore
            </p>
            <ul className="space-y-2">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-forest-700 dark:text-forest-300 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-earth-500 dark:text-earth-500 mb-3">
              Site
            </p>
            <ul className="space-y-2">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-forest-700 dark:text-forest-300 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-earth-500 dark:text-earth-500">
          <p>
            Built with aroha for te reo Māori and all of Aotearoa.
          </p>
          <p>
            Data sourced from Te Aka and community contributions. All entries attributed.
          </p>
        </div>
      </div>
    </footer>
  )
}
