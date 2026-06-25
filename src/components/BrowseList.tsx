import type { WordEntry } from '@/types/dictionary'
import WordCard from './WordCard'

const MAORI_ALPHABET = ['a', 'ā', 'e', 'ē', 'h', 'i', 'ī', 'k', 'm', 'n', 'ng', 'o', 'ō', 'p', 'r', 't', 'u', 'ū', 'w', 'wh']

function getMaoriFirstLetter(word: string): string {
  const lower = word.toLowerCase()
  if (lower.startsWith('wh')) return 'wh'
  if (lower.startsWith('ng')) return 'ng'
  return lower[0] ?? '#'
}

function maoriAlphaSort(a: WordEntry, b: WordEntry): number {
  const aLetter = getMaoriFirstLetter(a.maori)
  const bLetter = getMaoriFirstLetter(b.maori)
  const aIdx = MAORI_ALPHABET.indexOf(aLetter)
  const bIdx = MAORI_ALPHABET.indexOf(bLetter)
  if (aIdx !== bIdx) return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx)
  return a.maori.localeCompare(b.maori, 'mi')
}

interface Props {
  words: WordEntry[]
}

export default function BrowseList({ words }: Props) {
  const sorted = [...words].sort(maoriAlphaSort)

  const grouped = new Map<string, WordEntry[]>()
  for (const word of sorted) {
    const letter = getMaoriFirstLetter(word.maori)
    const key = MAORI_ALPHABET.includes(letter) ? letter : '#'
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(word)
  }

  const presentLetters = MAORI_ALPHABET.filter((l) => grouped.has(l))

  return (
    <div>
      {/* Jump links */}
      <nav aria-label="Jump to letter" className="flex flex-wrap gap-1.5 mb-8">
        {MAORI_ALPHABET.map((letter) => {
          const has = grouped.has(letter)
          return (
            <a
              key={letter}
              href={has ? `#letter-${letter}` : undefined}
              aria-disabled={!has}
              className={`font-display font-semibold text-sm px-2.5 py-1 rounded-md transition-colors ${
                has
                  ? 'bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-300 hover:bg-forest-200 dark:hover:bg-forest-700'
                  : 'text-earth-300 dark:text-earth-700 cursor-default'
              }`}
            >
              {letter}
            </a>
          )
        })}
      </nav>

      {/* Grouped lists */}
      <div className="space-y-10">
        {presentLetters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="font-display text-3xl font-bold text-forest-700 dark:text-forest-300 maori-word mb-4 scroll-mt-24">
              {letter.toUpperCase()}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {grouped.get(letter)!.map((word) => (
                <WordCard key={word.id} word={word} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
