export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection'
  | 'particle'
  | 'phrase'

export interface ExampleSentence {
  maori: string
  english: string
}

export interface WordEntry {
  id: string
  maori: string
  english: string[]
  pronunciation: string
  audio: string | null
  part_of_speech: PartOfSpeech
  categories: string[]
  definition: string
  example_sentences: ExampleSentence[]
  related_words: string[]
  source: string
  verified: boolean
  submitted_by: string | null
  date_added: string
}

export interface Category {
  slug: string
  label: string
  maori_label: string
  description: string
  colour: string
}

export interface SearchResult {
  item: WordEntry
  score: number
}
