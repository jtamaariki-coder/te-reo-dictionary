'use client'

import { useEffect, useState } from 'react'

const MAORI_DAYS = ['Rātapu', 'Rāhina', 'Rātū', 'Rāapa', 'Rāpare', 'Rāmere', 'Rāhoroi']
const MAORI_MONTHS = [
  'Kohi-tātea', 'Hui-tanguru', 'Poutū-te-rangi', 'Paenga-whāwhā',
  'Haratua', 'Pipiri', 'Hōngongoi', 'Here-turi-kōkā',
  'Mahuru', 'Whiringa-ā-nuku', 'Whiringa-ā-rangi', 'Hakihea',
]

export default function DayHeader() {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const now = new Date()
    const maoriDay = MAORI_DAYS[now.getDay()]
    const englishDay = now.toLocaleDateString('en-NZ', { weekday: 'long' })
    const day = now.getDate()
    const maoriMonth = MAORI_MONTHS[now.getMonth()]
    const englishMonth = now.toLocaleDateString('en-NZ', { month: 'long' })
    setLabel(`${maoriDay} ${day} ${maoriMonth}  ·  ${englishDay} ${day} ${englishMonth}`)
  }, [])

  if (!label) return null

  return (
    <div className="text-center py-3 text-xs tracking-wider" style={{ color: 'var(--text-secondary)' }}>
      <span className="font-display maori-word">{label.split('·')[0].trim()}</span>
      <span className="mx-2 opacity-40">·</span>
      <span>{label.split('·')[1]?.trim()}</span>
    </div>
  )
}
