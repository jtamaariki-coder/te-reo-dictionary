import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import FeaturedWords from '@/components/FeaturedWords'
import { getFeaturedWords, getCategories } from '@/lib/words'

export default function HomePage() {
  const featuredWords = getFeaturedWords(6)
  const categories = getCategories()

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-800 dark:text-forest-200 leading-tight mb-4">
          Te Reo Māori Dictionary
        </h1>
        <p className="text-lg text-earth-600 dark:text-earth-400 max-w-xl mx-auto mb-8">
          A free, community-driven dictionary for all of Aotearoa. Search English to Māori and Māori to English.
        </p>
        <div className="max-w-xl mx-auto">
          <SearchBar autoFocus placeholder="Search in English or Māori — e.g. love or aroha…" />
        </div>
        <p className="mt-3 text-xs text-earth-400 dark:text-earth-600">
          Typing without macrons works too — we&rsquo;ll find it.
        </p>
      </section>

      {/* Category cards */}
      <section className="mb-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-500 dark:text-earth-500 mb-4">
          Browse by category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="card p-4 hover:border-forest-400 dark:hover:border-forest-600 hover:shadow-md transition-all duration-150 group"
            >
              <p className="font-display font-semibold text-forest-700 dark:text-forest-300 group-hover:text-forest-600 dark:group-hover:text-forest-200 text-sm leading-snug maori-word">
                {cat.maori_label}
              </p>
              <p className="text-xs text-earth-500 dark:text-earth-500 mt-0.5">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured words */}
      <section className="mb-16">
        <FeaturedWords words={featuredWords} />
        <div className="mt-6 text-center">
          <Link href="/browse" className="btn-ghost text-sm">
            Browse all words →
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="mb-16 card p-8 max-w-2xl mx-auto text-center">
        <h2 className="font-display text-2xl font-bold text-forest-800 dark:text-forest-200 mb-3">
          Ko tō tātou kaupapa
        </h2>
        <p className="text-earth-600 dark:text-earth-400 leading-relaxed mb-4">
          We are building the best te reo Māori dictionary available — fast, beautiful, and community-driven. Grown through partnerships with kura kaupapa, iwi, and reo speakers across Aotearoa.
        </p>
        <Link href="/about" className="btn-ghost text-sm">
          Learn about this project →
        </Link>
      </section>
    </div>
  )
}
