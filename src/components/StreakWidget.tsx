'use client'

import { useEffect, useState } from 'react'

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function daysBetween(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000)
}

export default function StreakWidget() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const today = getToday()
    const stored = localStorage.getItem('tereo_streak_date')
    const raw = localStorage.getItem('tereo_streak_count')
    const prev = raw ? parseInt(raw, 10) : 0

    let next = 1
    if (stored) {
      const diff = daysBetween(stored, today)
      if (diff === 0) next = prev || 1
      else if (diff === 1) next = prev + 1
      else next = 1
    }

    localStorage.setItem('tereo_streak_date', today)
    localStorage.setItem('tereo_streak_count', String(next))
    setCount(next)
  }, [])

  if (count === null) return null

  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
      style={{ borderColor: 'var(--terracotta)', color: 'var(--terracotta)', background: 'var(--terracotta-light)' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8 8 6 12 6 15a6 6 0 0 0 12 0c0-3-2-7-6-13z" opacity=".8" />
        <path d="M12 12c-1.5 3-1 5 1 6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <span>He aha kei te haere — <strong>{count} rā</strong> unbroken</span>
    </div>
  )
}
