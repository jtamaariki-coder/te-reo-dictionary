import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-sm font-semibold uppercase tracking-widest mb-4"
        style={{ color: 'var(--terracotta)' }}>
        404
      </p>
      <h1 className="text-4xl font-serif mb-4 maori-word"
        style={{ color: 'var(--accent)' }}>
        Kāore i kitea
      </h1>
      <p className="italic text-muted mb-2">Not found</p>
      <p className="text-muted mb-8 max-w-sm leading-relaxed">
        The page you were looking for does not exist. Try searching for a word below.
      </p>
      <div className="w-full max-w-md mb-6">
        <SearchBar placeholder="Search te reo Māori…" />
      </div>
      <div className="flex justify-center gap-3">
        <Link href="/" className="btn-ghost text-sm">← Home</Link>
        <Link href="/browse" className="btn-ghost text-sm">Browse all words</Link>
      </div>
    </div>
  )
}
