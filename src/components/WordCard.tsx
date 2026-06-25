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
      className="card block p-4 hover:border-forest-400 dark:hover:border-forest-600 hover:shadow-md transition-all duration-150 group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-bold text-forest-800 dark:text-forest-200 group-hover:text-forest-600 dark:group-hover:text-forest-300 transition-colors maori-word truncate">
            {word.maori}
          </h2>
          <p className="text-xs text-earth-500 dark:text-earth-500 mt-0.5 uppercase tracking-wide">
            {word.part_of_speech}
          </p>
        </div>
        {!word.verified && (
          <span className="shrink-0 text-[10px] bg-earth-100 dark:bg-earth-900 text-earth-500 dark:text-earth-400 px-1.5 py-0.5 rounded font-medium">
            unverified
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-[var(--foreground)] opacity-80 line-clamp-1">
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
