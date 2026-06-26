'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { WordEntry } from '@/types/dictionary'

interface Props {
  initialQuery?: string
  autoFocus?: boolean
  onResultsChange?: (results: WordEntry[]) => void
  placeholder?: string
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function SearchBar({
  initialQuery = '',
  autoFocus = false,
  onResultsChange,
  placeholder = 'Search in English or Māori…',
}: Props) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [suggestions, setSuggestions] = useState<WordEntry[]>([])
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setSuggestions([]); onResultsChange?.([]); return }
    const { search } = await import('@/lib/search')
    const results = search(q)
    setSuggestions(results.slice(0, 7))
    onResultsChange?.(results)
  }, [onResultsChange])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => runSearch(query), 200)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, runSearch])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
      return
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, -1)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIdx >= 0) { router.push(`/word/${suggestions[activeIdx].id}`); setOpen(false) }
      else { router.push(`/search?q=${encodeURIComponent(query.trim())}`) }
    } else if (e.key === 'Escape') { setOpen(false); setActiveIdx(-1) }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) { router.push(`/search?q=${encodeURIComponent(query.trim())}`); setOpen(false) }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} role="search">
        <div className="relative flex items-center">
          <span className="absolute left-4 pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIdx(-1) }}
            onFocus={() => query.length >= 2 && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search te reo Māori dictionary"
            aria-autocomplete="list"
            aria-expanded={open && suggestions.length > 0}
            className="input-base pl-12 pr-10 text-base h-13"
            style={{ height: '3.25rem', fontSize: '1rem' }}
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setSuggestions([]); onResultsChange?.([]); inputRef.current?.focus() }}
              aria-label="Clear search"
              className="absolute right-3.5"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ClearIcon />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1.5 w-full rounded-xl shadow-lg overflow-hidden divide-y"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          {suggestions.map((word, i) => (
            <li
              key={word.id}
              role="option"
              aria-selected={activeIdx === i}
              onMouseDown={() => router.push(`/word/${word.id}`)}
              onMouseEnter={() => setActiveIdx(i)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm transition-colors"
              style={{
                background: activeIdx === i ? 'var(--muted)' : undefined,
              }}
            >
              <span className="font-display font-semibold maori-word" style={{ color: 'var(--accent)' }}>
                {word.maori}
              </span>
              <span className="truncate ml-3 italic" style={{ color: 'var(--text-secondary)' }}>
                {word.english.slice(0, 2).join(', ')}
              </span>
            </li>
          ))}
          {query.trim().length >= 2 && (
            <li
              role="option"
              aria-selected={false}
              onMouseDown={() => router.push(`/search?q=${encodeURIComponent(query.trim())}`)}
              className="px-4 py-2.5 cursor-pointer text-xs font-medium transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              See all results for &ldquo;{query}&rdquo; →
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
