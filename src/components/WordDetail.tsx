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
      {/* Word header — large serif display */}
      <div className="mb-8">
        <h1
          className="font-display font-bold maori-word leading-none mb-2"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 7rem)', color: 'var(--accent)' }}
        >
          {word.maori}
        </h1>
        <p className="text-sm italic mb-4" style={{ color: 'var(--text-secondary)' }}>
          {word.part_of_speech}
        </p>
        {!word.verified && (
          <span className="inline-block text-xs px-2.5 py-1 rounded-full border"
            style={{ color: 'var(--terracotta)', borderColor: 'var(--terracotta)', background: 'var(--terracotta-light)' }}>
            Community submission — not yet verified
          </span>
        )}
        <div className="mt-5">
          <AudioPlayer src={word.audio} pronunciation={word.pronunciation} word={word.maori} />
        </div>
      </div>

      {/* English meanings */}
      <section className="mb-7">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-secondary)' }}>
          English
        </h2>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {word.english.map((meaning, i) => (
            <span key={i} className="text-xl font-medium font-sans" style={{ color: 'var(--foreground)' }}>
              {i > 0 && <span className="mr-3" style={{ color: 'var(--text-secondary)' }}>/</span>}
              <em>{meaning}</em>
            </span>
          ))}
        </div>
      </section>

      {/* Definition */}
      <section className="mb-7">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-secondary)' }}>
          Definition
        </h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>
          {word.definition}
        </p>
      </section>

      {/* Ako — Learn link */}
      <div className="mb-8 -mt-2">
        <Link
          href={`/word/${word.id}/learn`}
          className="inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all hover:shadow-sm group"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--card)',
            color: 'var(--accent)',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span>Ako — Learn this word in context</span>
          <span className="ml-auto group-hover:translate-x-0.5 transition-transform" style={{ color: 'var(--text-secondary)' }}>→</span>
        </Link>
      </div>

      {/* Examples */}
      {word.example_sentences.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>
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
        <section className="mb-7">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-secondary)' }}>
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
        <section className="mb-7">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-secondary)' }}>
            Related words
          </h2>
          <div className="flex flex-wrap gap-3">
            {word.related_words.map((id) => (
              <Link
                key={id}
                href={`/word/${id}`}
                className="font-display text-sm font-semibold hover:underline maori-word"
                style={{ color: 'var(--accent)' }}
              >
                {id}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Source */}
      <section className="pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
          Source: <span className="font-medium">{word.source}</span>
          {word.date_added && (
            <> &middot; Added {new Date(word.date_added).toLocaleDateString('en-NZ', { year: 'numeric', month: 'long' })}</>
          )}
        </p>
      </section>
    </article>
  )
}
