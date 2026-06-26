import Fuse from 'fuse.js'
import type { WordEntry } from '@/types/dictionary'
import { normalise } from './macrons'
import { getAllWords } from './words'

type NormalisedWord = WordEntry & {
  _maori_normalised: string
  _english_normalised: string
}

function buildNormalisedWords(): NormalisedWord[] {
  return getAllWords().map((w) => ({
    ...w,
    _maori_normalised: normalise(w.maori),
    _english_normalised: normalise(w.english.join(' ')),
  }))
}

let fuseInstance: Fuse<NormalisedWord> | null = null

function getFuse(): Fuse<NormalisedWord> {
  if (!fuseInstance) {
    const data = buildNormalisedWords()
    fuseInstance = new Fuse(data, {
      keys: [
        { name: '_maori_normalised', weight: 3 },
        { name: '_english_normalised', weight: 2 },
      ],
      threshold: 0.2,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 3,
    })
  }
  return fuseInstance
}

export function search(query: string): WordEntry[] {
  if (!query || query.trim().length < 2) return []
  const normalisedQuery = normalise(query.trim())
  const fuse = getFuse()
  const results = fuse.search(normalisedQuery)
  return results.map((r) => {
    const { _maori_normalised, _english_normalised, ...word } = r.item
    void _maori_normalised; void _english_normalised
    return word as WordEntry
  })
}
