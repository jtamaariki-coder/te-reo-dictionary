import Link from 'next/link'
import type { WordEntry } from '@/types/dictionary'
import CategoryBadge from './CategoryBadge'

interface Props {
  word: WordEntry
}

export default function WordCard({ word }: Props) {
  return (
    <Link
      href={`/word/${word.id}`}
      className="card block p-4 hover:shadow-md transition-all duration-150 group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-bold truncate maori-word transition-colors"
            style={{ color: 'var(--accent)' }}>
            {word.maori}
          </h2>
          <p className="text-[10px] uppercase tracking-wide mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            {word.part_of_speech}
          </p>
        </div>
        {!word.verified && (
          <span className="shrink-0 text-[9px] px-1.5 py-0.5 rounded border font-medium"
            style={{ color: 'var(--terracotta)', borderColor: 'var(--terracotta)', background: 'var(--terracotta-light)' }}>
            unverified
          </span>
        )}
      </div>

      <p className="mt-2 text-sm italic line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
        {word.english.join(', ')}
      </p>

      {word.categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {word.categories.slice(0, 3).map((slug) => (
            <CategoryBadge key={slug} slug={slug} size="sm" noLink />
          ))}
        </div>
      )}
    </Link>
  )
}
