import type { ExampleSentence as ExampleSentenceType } from '@/types/dictionary'

interface Props {
  sentence: ExampleSentenceType
  index?: number
}

export default function ExampleSentence({ sentence, index }: Props) {
  return (
    <div className="rounded-xl border px-5 py-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      {index !== undefined && (
        <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
          Example {index + 1}
        </p>
      )}
      <p className="font-display font-semibold leading-snug maori-word text-base" style={{ color: 'var(--accent)' }}>
        {sentence.maori}
      </p>
      <p className="mt-1.5 text-sm italic" style={{ color: 'var(--text-secondary)' }}>
        {sentence.english}
      </p>
    </div>
  )
}
