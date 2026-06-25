import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About the Te Reo Māori Dictionary project — our kaupapa, team, and data sources.',
}

const SOURCES = [
  { name: 'Te Aka', url: 'https://maoridictionary.co.nz', type: 'Reference', notes: 'Most comprehensive existing Māori dictionary — primary reference baseline.' },
  { name: 'Kupu', url: 'https://kupu.maori.nz', type: 'Reference', notes: 'Good for common everyday words.' },
  { name: 'Te Taura Whiri i te Reo Māori', url: 'https://www.tetaurawhiri.govt.nz', type: 'Official body', notes: 'NZ Māori Language Commission — authoritative definitions.' },
  { name: 'Kura kaupapa Māori', url: null, type: 'Community', notes: 'Direct outreach — contributing words and example sentences in context.' },
  { name: 'Iwi reo rūnanga', url: null, type: 'Community', notes: 'Iwi-specific vocabulary and dialect variations.' },
  { name: 'Community submissions', url: '/submit', type: 'Crowdsourced', notes: 'Via the submit form on this site.' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-forest-800 dark:text-forest-200 mb-2">
        Ko tō tātou kaupapa
      </h1>
      <p className="text-earth-500 dark:text-earth-400 italic mb-8">Our purpose</p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-[var(--foreground)]">
        <p>
          We are building the best te reo Māori dictionary available — free, fast, and community-driven. Our goal is to surpass existing references by being more beautiful, more comprehensive over time, and deeply connected to the communities whose language this is.
        </p>
        <p>
          This is a long-term kaupapa. We started from scratch with a static site, and we will grow the data through partnerships with kura kaupapa, iwi reo rūnanga, and reo speakers across Aotearoa.
        </p>
        <p>
          This dictionary belongs to te ao Māori — built <em>with</em> the Māori language community, not just for it. Attribution and mana of contributors is important. Credit is always given where it is due.
        </p>
      </div>

      {/* Team */}
      <section className="mt-10 mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-4">
          Nā wai tēnei mahi
        </h2>
        <div className="flex flex-wrap gap-3">
          {['Jackson Tama', 'Seymore'].map((name) => (
            <span key={name} className="card px-4 py-2 text-sm font-medium text-forest-700 dark:text-forest-300">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Data sources */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-4">
          Data sources
        </h2>
        <div className="space-y-3">
          {SOURCES.map((s) => (
            <div key={s.name} className="card p-4">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  {s.url && !s.url.startsWith('/') ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-forest-700 dark:text-forest-300 hover:underline text-sm">
                      {s.name}
                    </a>
                  ) : s.url ? (
                    <Link href={s.url} className="font-medium text-forest-700 dark:text-forest-300 hover:underline text-sm">
                      {s.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-sm text-[var(--foreground)]">{s.name}</span>
                  )}
                  <p className="text-xs text-earth-500 dark:text-earth-400 mt-0.5">{s.notes}</p>
                </div>
                <span className="tag bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-300 text-xs">
                  {s.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="card p-6 text-center">
        <p className="font-medium text-[var(--foreground)] mb-3">Want to contribute?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/submit" className="btn-primary text-sm">
            Submit a word
          </Link>
          <Link href="/contribute" className="btn-ghost text-sm">
            How to contribute
          </Link>
        </div>
      </div>
    </div>
  )
}
