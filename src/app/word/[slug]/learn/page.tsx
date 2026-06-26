import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWords, getWordBySlug } from '@/lib/words'
import GrammarTabs from '@/components/learn/GrammarTabs'
import PracticeSection from '@/components/learn/PracticeSection'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllWords().map((w) => ({ slug: w.id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const word = getWordBySlug(params.slug)
  if (!word) return { title: 'Learn' }
  return {
    title: `Ako — Learn ${word.maori}`,
    description: `Learn ${word.maori} (${word.english[0]}) in te reo Māori — grammar lessons and practice exercises.`,
  }
}

export default function LearnPage({ params }: Props) {
  const word = getWordBySlug(params.slug)
  if (!word) notFound()

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-earth-500 dark:text-earth-500 flex items-center gap-1.5 mb-6 flex-wrap">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href={`/word/${word.id}`} className="hover:underline font-display maori-word text-forest-700 dark:text-forest-300">{word.maori}</Link>
        <span>/</span>
        <span>Ako</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-forest-500 dark:text-forest-500 mb-1">
          Ako — Learning
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-forest-800 dark:text-forest-200 maori-word leading-tight">
          {word.maori}
        </h1>
        <p className="mt-1 text-base text-earth-500 dark:text-earth-400 italic">
          {word.english[0]} &middot; {word.part_of_speech}
        </p>
      </div>

      {/* Learn section */}
      <section className="mb-12">
        <div className="flex items-baseline gap-3 mb-5">
          <h2 className="text-lg font-semibold text-forest-800 dark:text-forest-200">
            Grammar lessons
          </h2>
          <span className="text-xs text-earth-400 dark:text-earth-600">6 topics</span>
        </div>
        <GrammarTabs word={word} />
      </section>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-10">
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600">
          Whakarite — Practice
        </span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>

      {/* Practice section */}
      <section className="mb-12">
        <PracticeSection word={word} />
      </section>

      {/* Back link */}
      <div className="pt-6 border-t border-[var(--border)]">
        <Link
          href={`/word/${word.id}`}
          className="btn-ghost text-sm"
        >
          ← Back to {word.maori}
        </Link>
      </div>
    </div>
  )
}
