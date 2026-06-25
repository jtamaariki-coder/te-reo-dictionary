import type { WordEntry } from '@/types/dictionary'
import WordCard from './WordCard'

interface Props {
  words: WordEntry[]
}

export default function FeaturedWords({ words }: Props) {
  if (words.length === 0) return null
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-500 dark:text-earth-500 mb-4">
        Featured words
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {words.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </section>
  )
}
