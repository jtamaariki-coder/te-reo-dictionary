import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCategories, getCategoryBySlug, getWordsByCategory } from '@/lib/words'
import WordCard from '@/components/WordCard'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) return { title: 'Category not found' }
  return {
    title: `${cat.label} — ${cat.maori_label}`,
    description: cat.description,
  }
}

export default function CategoryPage({ params }: Props) {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) notFound()

  const words = getWordsByCategory(params.slug)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-earth-500 dark:text-earth-500 flex items-center gap-1.5 mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/browse" className="hover:underline">Browse</Link>
        <span>/</span>
        <span className="text-forest-700 dark:text-forest-300">{cat.label}</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-forest-800 dark:text-forest-200 maori-word">
          {cat.maori_label}
        </h1>
        <p className="text-earth-500 dark:text-earth-400 mt-1">{cat.description}</p>
        <p className="text-sm text-earth-400 dark:text-earth-600 mt-2">
          {words.length} word{words.length !== 1 ? 's' : ''}
        </p>
      </div>

      {words.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-earth-500">No words in this category yet.</p>
          <Link href="/submit" className="mt-3 inline-block text-sm text-forest-600 dark:text-forest-400 hover:underline">
            Submit one →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {words.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      )}
    </div>
  )
}
