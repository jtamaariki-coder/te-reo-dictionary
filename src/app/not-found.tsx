import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p style={{ color: 'var(--terracotta)' }} className="text-sm font-medium tracking-widest uppercase mb-4">404</p>
      <h1 className="text-4xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>Kāore i kitea</h1>
      <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>The page you were looking for does not exist.</p>
      <div className="flex gap-4">
        <Link href="/" className="btn-ghost">← Home</Link>
        <Link href="/browse" className="btn-ghost">Browse all words</Link>
      </div>
    </main>
  )
}
