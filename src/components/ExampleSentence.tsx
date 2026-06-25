import type { ExampleSentence as ExampleSentenceType } from '@/types/dictionary'

interface Props {
  sentence: ExampleSentenceType
  index?: number
}

export default function ExampleSentence({ sentence, index }: Props) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)] px-4 py-3">
      {index !== undefined && (
        <p className="text-[10px] font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-1">
          Example {index + 1}
        </p>
      )}
      <p className="font-display font-semibold text-forest-800 dark:text-forest-200 leading-snug maori-word">
        {sentence.maori}
      </p>
      <p className="mt-1 text-sm italic text-earth-600 dark:text-earth-400">
        {sentence.english}
      </p>
    </div>
  )
}
