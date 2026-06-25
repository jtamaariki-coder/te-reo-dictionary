'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import WordCard from '@/components/WordCard'
import type { WordEntry } from '@/types/dictionary'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [results, setResults] = useState<WordEntry[]>([])
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (!initialQuery) { setSearched(false); return }
    import('@/lib/search').then(({ search }) => {
      setResults(search(initialQuery))
      setSearched(true)
    })
  }, [initialQuery])

  function handleResultsChange(r: WordEntry[]) {
    setResults(r)
    setSearched(true)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <div className="mb-8 max-w-xl">
        <SearchBar
          initialQuery={initialQuery}
          autoFocus={!initialQuery}
          onResultsChange={handleResultsChange}
          placeholder="Search in English or Māori…"
        />
      </div>

      {searched && initialQuery && (
        <p className="text-sm text-earth-500 dark:text-earth-500 mb-6">
          {results.length === 0
            ? `No results for "${initialQuery}"`
            : `${results.length} result${results.length !== 1 ? 's' : ''} for "${initialQuery}"`}
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {results.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      ) : searched && initialQuery ? (
        <div className="card p-8 text-center">
          <p className="text-xl font-display mb-2 text-forest-700 dark:text-forest-300">
            Kāore he hua
          </p>
          <p className="text-earth-500 dark:text-earth-400 mb-4">
            No words found for &ldquo;{initialQuery}&rdquo;. Try a different spelling or search term.
          </p>
          <p className="text-sm text-earth-400">
            Know this word?{' '}
            <a href="/submit" className="text-forest-600 dark:text-forest-400 hover:underline">
              Submit it →
            </a>
          </p>
        </div>
      ) : (
        <div className="max-w-xl">
          <p className="text-earth-500 dark:text-earth-400 text-sm">
            Type above to search — try &ldquo;love&rdquo;, &ldquo;aroha&rdquo;, or &ldquo;family&rdquo;.
          </p>
        </div>
      )}
    </div>
  )
}
