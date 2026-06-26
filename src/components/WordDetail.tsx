import type { WordEntry } from '@/types/dictionary'
import AudioPlayer from './AudioPlayer'
import CategoryBadge from './CategoryBadge'
import ExampleSentence from './ExampleSentence'
import Link from 'next/link'

interface Props {
  word: WordEntry
}

export default function WordDetail({ word }: Props) {
  return (
    <article className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-forest-800 dark:text-forest-200 maori-word leading-tight">
              {word.maori}
            </h1>
            <p className="mt-1 text-base text-earth-500 dark:text-earth-400 italic">
              {word.part_of_speech}
            </p>
          </div>
          {!word.verified && (
            <span className="tag bg-earth-100 dark:bg-earth-900 text-earth-600 dark:text-earth-400 text-xs">
              Community submission — not yet verified
            </span>
          )}
        </div>

        <div className="mt-4">
          <AudioPlayer src={word.audio} pronunciation={word.pronunciation} word={word.maori} />
        </div>
      </div>

      {/* English meanings */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-2">
          English
        </h2>
        <div className="flex flex-wrap gap-2">
          {word.english.map((meaning, i) => (
            <span
              key={i}
              className="text-lg font-medium text-[var(--foreground)]"
            >
              {meaning}{i < word.english.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      </section>

      {/* Definition */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-2">
          Definition
        </h2>
        <p className="text-base leading-relaxed text-[var(--foreground)]">
          {word.definition}
        </p>
      </section>

      {/* Ako — Learn link */}
      <div className="mb-6 -mt-2">
        <Link
          href={`/word/${word.id}/learn`}
          className="inline-flex items-center gap-2 rounded-lg border border-forest-200 dark:border-forest-800 bg-forest-50 dark:bg-forest-950 px-3.5 py-2 text-sm text-forest-600 dark:text-forest-400 hover:border-forest-400 dark:hover:border-forest-600 hover:text-forest-700 dark:hover:text-forest-300 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span>Ako — Learn this word in context</span>
          <span className="ml-auto text-forest-400 dark:text-forest-600 group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </div>

      {/* Examples */}
      {word.example_sentences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-3">
            Example sentences
          </h2>
          <div className="space-y-3">
            {word.example_sentences.map((sentence, i) => (
              <ExampleSentence key={i} sentence={sentence} index={word.example_sentences.length > 1 ? i : undefined} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {word.categories.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-2">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {word.categories.map((slug) => (
              <CategoryBadge key={slug} slug={slug} />
            ))}
          </div>
        </section>
      )}

      {/* Related words */}
      {word.related_words.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-2">
            Related words
          </h2>
          <div className="flex flex-wrap gap-2">
            {word.related_words.map((id) => (
              <Link
                key={id}
                href={`/word/${id}`}
                className="font-display text-sm font-semibold text-forest-600 dark:text-forest-400 hover:underline maori-word"
              >
                {id}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Source */}
      <section className="pt-4 border-t border-[var(--border)]">
        <p className="text-xs text-earth-400 dark:text-earth-600">
          Source: <span className="font-medium">{word.source}</span>
          {word.date_added && (
            <> &middot; Added {new Date(word.date_added).toLocaleDateString('en-NZ', { year: 'numeric', month: 'long' })}</>
          )}
        </p>
      </section>
    </article>
  )
}
