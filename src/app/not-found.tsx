import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-20 text-center">
      <h1 className="font-display text-5xl font-bold text-forest-800 dark:text-forest-200 mb-2">
        Kāore i kitea
      </h1>
      <p className="text-earth-500 dark:text-earth-400 italic mb-6">Not found</p>
      <p className="text-[var(--foreground)] mb-8">
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
