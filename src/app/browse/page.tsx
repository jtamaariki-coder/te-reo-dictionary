'use client'

import { useMemo, useState } from 'react'
import { getAllWords, getCategories } from '@/lib/words'
import BrowseList from '@/components/BrowseList'
import type { PartOfSpeech } from '@/types/dictionary'

const ALL_POS: PartOfSpeech[] = ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'particle', 'phrase']

export default function BrowsePage() {
  const allWords = getAllWords()
  const categories = getCategories()
  const [categoryFilter, setCategoryFilter] = useState('')
  const [posFilter, setPosFilter] = useState('')

  const filtered = useMemo(() => {
    return allWords.filter((w) => {
      if (categoryFilter && !w.categories.includes(categoryFilter)) return false
      if (posFilter && w.part_of_speech !== posFilter) return false
      return true
    })
  }, [allWords, categoryFilter, posFilter])

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-forest-800 dark:text-forest-200 mb-1">
          Browse all words
        </h1>
        <p className="text-earth-500 dark:text-earth-400 text-sm">
          {filtered.length} word{filtered.length !== 1 ? 's' : ''} {filtered.length !== allWords.length ? `(filtered from ${allWords.length})` : 'in the dictionary'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
          className="input-base w-auto text-sm py-2"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.label}</option>
          ))}
        </select>

        <select
          value={posFilter}
          onChange={(e) => setPosFilter(e.target.value)}
          aria-label="Filter by part of speech"
          className="input-base w-auto text-sm py-2"
        >
          <option value="">All parts of speech</option>
          {ALL_POS.map((pos) => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>

        {(categoryFilter || posFilter) && (
          <button
            onClick={() => { setCategoryFilter(''); setPosFilter('') }}
            className="btn-ghost text-sm"
          >
            Clear filters ×
          </button>
        )}
      </div>

      <BrowseList words={filtered} />
    </div>
  )
}
