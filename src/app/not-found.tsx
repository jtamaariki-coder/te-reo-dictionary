import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'var(--terracotta)' }}>
        404
      </p>
      <h1 className="font-display text-5xl sm:text-6xl font-bold mb-2 maori-word"
        style={{ color: 'var(--accent)' }}>
        Kāore i kitea
      </h1>
      <p className="text-base italic mb-6"
        style={{ color: 'var(--text-secondary)' }}>
        Not found
      </p>
      <p className="mb-10 leading-relaxed"
        style={{ color: 'var(--foreground)' }}>
        The page you were looking for does not exist. Try searching for a word below.
      </p>
      <SearchBar placeholder="Search te reo Māori…" />
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="btn-ghost text-sm">← Home</Link>
        <Link href="/browse" className="btn-ghost text-sm">Browse all words</Link>
      </div>
    </div>
  )
}
