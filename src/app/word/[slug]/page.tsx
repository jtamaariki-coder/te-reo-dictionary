import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllWords, getWordBySlug } from '@/lib/words'
import WordDetail from '@/components/WordDetail'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllWords().map((w) => ({ slug: w.id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const word = getWordBySlug(params.slug)
  if (!word) return { title: 'Word not found' }
  return {
    title: `${word.maori} — ${word.english[0]}`,
    description: word.definition,
  }
}

export default function WordPage({ params }: Props) {
  const word = getWordBySlug(params.slug)
  if (!word) notFound()

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-6">
        <nav className="text-sm text-earth-500 dark:text-earth-500 flex items-center gap-1.5">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/browse" className="hover:underline">Browse</Link>
          <span>/</span>
          <span className="font-display maori-word text-forest-700 dark:text-forest-300">{word.maori}</span>
        </nav>
      </div>
      <WordDetail word={word} />
    </div>
  )
}
