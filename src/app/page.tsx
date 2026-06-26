import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import FeaturedWords from '@/components/FeaturedWords'
import DayHeader from '@/components/DayHeader'
import StreakWidget from '@/components/StreakWidget'
import { getFeaturedWords, getCategories } from '@/lib/words'
import whakatauki from '../../data/whakatauki.json'

function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000)
}

export default function HomePage() {
  const featuredWords = getFeaturedWords(6)
  const categories = getCategories()
  // Server renders a fallback; client DayHeader overrides. For whakatauki, pick by build date.
  const w = whakatauki[getDayOfYear() % whakatauki.length]

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <DayHeader />

      {/* Hero */}
      <section className="py-12 sm:py-20 text-center">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3"
          style={{ color: 'var(--accent)' }}>
          Te Reo Māori Dictionary
        </h1>
        <p className="text-base mb-2" style={{ color: 'var(--text-secondary)' }}>
          A free, community-driven dictionary for all of Aotearoa.
        </p>
        <div className="flex justify-center mb-6">
          <StreakWidget />
        </div>
        <div className="max-w-xl mx-auto">
          <SearchBar autoFocus placeholder="Search in English or Māori — e.g. love or aroha…" />
        </div>
        <p className="mt-3 text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
          Typing without macrons works too — we&rsquo;ll find it.
        </p>
      </section>

      {/* Whakatauki of the day */}
      <section className="mb-12">
        <div className="card p-6 sm:p-8 max-w-2xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: 'var(--terracotta)' }} />
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--terracotta)' }}>
            Whakatauki o te rā — Proverb of the day
          </p>
          <blockquote>
            <p className="font-display text-xl sm:text-2xl font-semibold leading-snug mb-3 maori-word"
              style={{ color: 'var(--accent)' }}>
              &ldquo;{w.maori}&rdquo;
            </p>
            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
              {w.english}
            </p>
          </blockquote>
          <p className="mt-4 text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>
            {w.attribution}
          </p>
        </div>
      </section>

      {/* Category cards */}
      <section className="mb-14">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>
          Browse by category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="card p-4 hover:shadow-md transition-all duration-150 group"
              style={{ ['--hover-border' as string]: 'var(--accent)' }}
            >
              <p className="font-display font-semibold text-sm leading-snug maori-word transition-colors"
                style={{ color: 'var(--accent)' }}>
                {cat.maori_label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured words */}
      <section className="mb-16">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>
          Featured words
        </h2>
        <FeaturedWords words={featuredWords} />
        <div className="mt-6 text-center">
          <Link href="/browse" className="btn-ghost text-sm">
            Browse all words →
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="mb-16 card p-8 max-w-2xl mx-auto text-center">
        <h2 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
          Ko tō tātou kaupapa
        </h2>
        <p className="leading-relaxed mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          We are building the best te reo Māori dictionary available — fast, beautiful, and community-driven.
          Grown through partnerships with kura kaupapa, iwi, and reo speakers across Aotearoa.
        </p>
        <Link href="/about" className="btn-ghost text-sm">
          Learn about this project →
        </Link>
      </section>
    </div>
  )
}
