import { Suspense } from 'react'
import SearchResults from './SearchResults'

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <div className="h-12 rounded-lg bg-earth-100 dark:bg-forest-900 animate-pulse mb-8 max-w-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-4 h-28 animate-pulse bg-earth-50 dark:bg-forest-900" />
          ))}
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}
