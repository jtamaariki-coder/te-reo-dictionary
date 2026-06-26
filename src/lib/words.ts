import type { WordEntry, Category } from '@/types/dictionary'
import wordsData from '../../data/words.json'
import categoriesData from '../../data/categories.json'
import { normalise } from './macrons'

const words = wordsData as WordEntry[]
const categories = categoriesData as Category[]

export function getAllWords(): WordEntry[] {
  return words
}

export function getWordBySlug(slug: string): WordEntry | undefined {
  // Exact id match first
  const exact = words.find((w) => w.id === slug)
  if (exact) return exact
  // Normalised fallback: handles macron variants in the URL (e.g. /word/whānau → id "whanau")
  const normSlug = normalise(slug)
  return words.find((w) => normalise(w.id) === normSlug || normalise(w.maori) === normSlug)
}

export function getWordsByCategory(categorySlug: string): WordEntry[] {
  return words.filter((w) => w.categories.includes(categorySlug))
}

export function getCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getFeaturedWords(count = 6): WordEntry[] {
  const featured = [
    'aroha', 'whanau', 'mana', 'kaitiakitanga', 'turangawaewae', 'whakapapa',
    'manaakitanga', 'reo', 'moana', 'ngahere',
  ]
  const result: WordEntry[] = []
  for (const id of featured) {
    const word = words.find((w) => w.id === id)
    if (word) result.push(word)
    if (result.length >= count) break
  }
  return result
}
