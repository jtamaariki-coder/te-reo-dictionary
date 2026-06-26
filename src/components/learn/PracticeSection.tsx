'use client'

import { useState, useMemo } from 'react'
import type { WordEntry } from '@/types/dictionary'
import Link from 'next/link'

interface Props {
  word: WordEntry
}

// ── Exercise types ────────────────────────────────────────────────────────────

interface FillBlankEx {
  type: 'fill-blank'
  title: string
  instruction: string
  sentence: { before: string; after: string; answer: string }
  english: string
}

interface TenseMarkerEx {
  type: 'tense-marker'
  title: string
  instruction: string
  sentence: string
  options: string[]
  answer: string
  english: string
}

interface BuildSentenceEx {
  type: 'build-sentence'
  title: string
  instruction: string
  tiles: string[]
  answer: string[]
  english: string
}

interface TypeSentenceEx {
  type: 'type-sentence'
  title: string
  instruction: string
  english: string
  answer: string
}

type ExerciseSet = [FillBlankEx, TenseMarkerEx, BuildSentenceEx, TypeSentenceEx]

function getExercises(word: WordEntry): ExerciseSet {
  const m = word.maori
  const eng = word.english[0]

  return [
    {
      type: 'fill-blank',
      title: 'Fill in the blank',
      instruction: 'Type the missing word to complete the sentence.',
      sentence: { before: 'He', after: 'tēnei.', answer: m },
      english: `This is ${eng}.`,
    },
    {
      type: 'tense-marker',
      title: 'Tap the correct tense marker',
      instruction: 'Which tense marker makes this a present-tense sentence?',
      sentence: `___ pai tēnei ${m}.`,
      options: ['i', 'kei te', 'ka', 'e…ana'],
      answer: 'kei te',
      english: `This ${m} is good.`,
    },
    {
      type: 'build-sentence',
      title: 'Build the sentence',
      instruction: 'Tap the tiles in the correct order to build the Māori sentence.',
      tiles: ['He', m, 'tēnei.'],
      answer: ['He', m, 'tēnei.'],
      english: `This is ${eng}.`,
    },
    {
      type: 'type-sentence',
      title: 'Type the sentence',
      instruction: 'Read the English below and type the Māori sentence.',
      english: `This is ${eng}.`,
      answer: `He ${m} tēnei.`,
    },
  ]
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function PlaceholderBadge() {
  return (
    <div className="flex items-center gap-1.5 text-xs text-earth-500 dark:text-earth-500 mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      Placeholder question — real content being prepared by te reo experts
    </div>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1.5 text-xs text-earth-500 dark:text-earth-500">
        <span>Exercise {current} of {total}</span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-earth-100 dark:bg-forest-900 overflow-hidden">
        <div
          className="h-full rounded-full bg-forest-500 dark:bg-forest-400 transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <div className="flex gap-1.5 mt-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-0.5 rounded-full transition-colors duration-300 ${
              i < current
                ? 'bg-forest-500 dark:bg-forest-400'
                : 'bg-earth-200 dark:bg-forest-900'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

interface ShellProps {
  title: string
  children: React.ReactNode
  onNext: () => void
  onSkip: () => void
  nextLabel?: string
  canNext: boolean
}

function ExerciseShell({ title, children, onNext, onSkip, nextLabel = 'Next →', canNext }: ShellProps) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-1">
        {title}
      </p>
      <PlaceholderBadge />
      {children}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={onNext}
          disabled={!canNext}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          {nextLabel}
        </button>
        <button onClick={onSkip} className="btn-ghost text-sm text-earth-500">
          Skip
        </button>
      </div>
    </div>
  )
}

// ── Exercise 1 — Fill in the blank ────────────────────────────────────────────

function FillBlank({ ex, onNext, onSkip }: { ex: FillBlankEx; onNext: () => void; onSkip: () => void }) {
  const [value, setValue] = useState('')
  const [revealed, setRevealed] = useState(false)

  return (
    <ExerciseShell
      title={ex.title}
      onNext={onNext}
      onSkip={onSkip}
      nextLabel={revealed ? 'Next →' : 'Check'}
      canNext={revealed || value.trim().length > 0}
    >
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4">{ex.instruction}</p>
      <p className="text-xs italic text-earth-400 dark:text-earth-600 mb-3">{ex.english}</p>

      <div className="flex items-baseline gap-2 flex-wrap text-lg font-display maori-word">
        <span className="text-forest-800 dark:text-forest-200">{ex.sentence.before}</span>
        {!revealed ? (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && value.trim()) setRevealed(true) }}
            placeholder="___"
            aria-label="Fill in the missing word"
            className="input-base font-display maori-word w-40 inline-block text-center py-1.5"
          />
        ) : (
          <span className="px-3 py-1 rounded-lg bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-300 font-bold">
            {ex.sentence.answer}
          </span>
        )}
        <span className="text-forest-800 dark:text-forest-200">{ex.sentence.after}</span>
      </div>

      {!revealed && value.trim().length > 0 && (
        <button onClick={() => setRevealed(true)} className="mt-4 btn-ghost text-sm">
          Check answer
        </button>
      )}
      {revealed && (
        <p className="mt-3 text-sm text-forest-600 dark:text-forest-400">
          Ka pai! The answer is <span className="font-display font-bold maori-word">{ex.sentence.answer}</span>.
        </p>
      )}
    </ExerciseShell>
  )
}

// ── Exercise 2 — Tap the tense marker ────────────────────────────────────────

function TenseMarker({ ex, onNext, onSkip }: { ex: TenseMarkerEx; onNext: () => void; onSkip: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const correct = selected === ex.answer

  return (
    <ExerciseShell
      title={ex.title}
      onNext={onNext}
      onSkip={onSkip}
      canNext={selected !== null}
    >
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4">{ex.instruction}</p>
      <p className="text-xs italic text-earth-400 dark:text-earth-600 mb-4">{ex.english}</p>

      <div className="font-display maori-word text-lg text-forest-800 dark:text-forest-200 mb-5 p-4 rounded-xl bg-[var(--muted)] border border-[var(--border)]">
        {selected ? ex.sentence.replace('___', selected) : ex.sentence}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ex.options.map((opt) => {
          const isCorrectOpt = selected !== null && opt === ex.answer
          const isWrong = selected === opt && !correct

          return (
            <button
              key={opt}
              onClick={() => { if (!selected) setSelected(opt) }}
              disabled={selected !== null}
              className={`py-2.5 px-3 rounded-xl border text-sm font-medium font-display maori-word transition-colors ${
                isCorrectOpt
                  ? 'border-forest-400 bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-300'
                  : isWrong
                  ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400'
                  : selected !== null
                  ? 'border-[var(--border)] bg-[var(--muted)] opacity-50'
                  : 'border-[var(--border)] bg-[var(--card)] hover:border-forest-300 dark:hover:border-forest-700 hover:bg-forest-50 dark:hover:bg-forest-900'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {selected && (
        <p className={`mt-4 text-sm ${correct ? 'text-forest-600 dark:text-forest-400' : 'text-earth-600 dark:text-earth-400'}`}>
          {correct
            ? `Ka pai! "${ex.answer}" marks present tense.`
            : `The correct answer is "${ex.answer}" — it marks present tense.`}
        </p>
      )}
    </ExerciseShell>
  )
}

// ── Exercise 3 — Build sentence from tiles ────────────────────────────────────

function BuildSentence({ ex, onNext, onSkip }: { ex: BuildSentenceEx; onNext: () => void; onSkip: () => void }) {
  const shuffled = useMemo(() => [...ex.tiles].sort(() => Math.random() - 0.5), [ex.tiles])
  const [available, setAvailable] = useState<string[]>(shuffled)
  const [placed, setPlaced] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)

  const isCorrect = placed.join(' ') === ex.answer.join(' ')

  function tapAvailable(tile: string, idx: number) {
    if (revealed) return
    setAvailable((p) => p.filter((_, i) => i !== idx))
    setPlaced((p) => [...p, tile])
  }

  function tapPlaced(tile: string, idx: number) {
    if (revealed) return
    setPlaced((p) => p.filter((_, i) => i !== idx))
    setAvailable((p) => [...p, tile])
  }

  return (
    <ExerciseShell
      title={ex.title}
      onNext={onNext}
      onSkip={onSkip}
      nextLabel={revealed ? 'Next →' : 'Check'}
      canNext={revealed || placed.length === ex.tiles.length}
    >
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4">{ex.instruction}</p>
      <p className="text-xs italic text-earth-400 dark:text-earth-600 mb-5">{ex.english}</p>

      {/* Answer area */}
      <div
        aria-label="Your answer"
        className={`min-h-[52px] rounded-xl border-2 border-dashed p-3 mb-4 flex flex-wrap gap-2 transition-colors ${
          revealed
            ? isCorrect
              ? 'border-forest-400 dark:border-forest-600 bg-forest-50 dark:bg-forest-950'
              : 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950'
            : 'border-earth-200 dark:border-forest-800 bg-[var(--muted)]'
        }`}
      >
        {placed.length === 0 && (
          <span className="text-xs text-earth-300 dark:text-earth-700 italic self-center">
            Tap tiles below to build the sentence…
          </span>
        )}
        {placed.map((tile, i) => (
          <button
            key={`placed-${i}`}
            onClick={() => tapPlaced(tile, i)}
            disabled={revealed}
            className="px-3 py-1.5 rounded-lg bg-forest-100 dark:bg-forest-800 border border-forest-200 dark:border-forest-700 text-forest-800 dark:text-forest-200 text-sm font-display maori-word font-medium hover:bg-forest-200 dark:hover:bg-forest-700 transition-colors disabled:cursor-default"
          >
            {tile}
          </button>
        ))}
      </div>

      {/* Tile pool */}
      <div aria-label="Available tiles" className="flex flex-wrap gap-2 mb-2">
        {available.map((tile, i) => (
          <button
            key={`avail-${i}`}
            onClick={() => tapAvailable(tile, i)}
            disabled={revealed}
            className="px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm font-display maori-word font-medium hover:border-forest-300 dark:hover:border-forest-700 hover:bg-forest-50 dark:hover:bg-forest-900 transition-colors disabled:opacity-40 disabled:cursor-default"
          >
            {tile}
          </button>
        ))}
      </div>

      {!revealed && placed.length === ex.tiles.length && (
        <button onClick={() => setRevealed(true)} className="mt-3 btn-ghost text-sm">
          Check answer
        </button>
      )}
      {revealed && (
        <p className={`mt-3 text-sm ${isCorrect ? 'text-forest-600 dark:text-forest-400' : 'text-earth-600 dark:text-earth-400'}`}>
          {isCorrect ? "Ka pai! That's the correct order." : `Correct: ${ex.answer.join(' ')}`}
        </p>
      )}
    </ExerciseShell>
  )
}

// ── Exercise 4 — Type the sentence ───────────────────────────────────────────

function TypeSentence({ ex, onNext, onSkip, isLast }: { ex: TypeSentenceEx; onNext: () => void; onSkip: () => void; isLast: boolean }) {
  const [value, setValue] = useState('')
  const [revealed, setRevealed] = useState(false)

  return (
    <ExerciseShell
      title={ex.title}
      onNext={onNext}
      onSkip={onSkip}
      nextLabel={revealed ? (isLast ? 'Finish →' : 'Next →') : 'Check'}
      canNext={revealed || value.trim().length > 0}
    >
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4">{ex.instruction}</p>

      <div className="rounded-xl bg-[var(--muted)] border border-[var(--border)] px-4 py-3 mb-4 text-center">
        <p className="text-lg font-medium text-[var(--foreground)]">{ex.english}</p>
      </div>

      {!revealed ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={2}
          placeholder="Type the Māori sentence here…"
          aria-label="Type the Māori sentence"
          className="input-base font-display maori-word resize-none"
        />
      ) : (
        <div className="rounded-xl border border-forest-200 dark:border-forest-800 bg-forest-50 dark:bg-forest-950 px-4 py-3 font-display maori-word text-forest-700 dark:text-forest-300">
          {ex.answer}
        </div>
      )}

      {!revealed && value.trim().length > 0 && (
        <button onClick={() => setRevealed(true)} className="mt-3 btn-ghost text-sm">
          Check answer
        </button>
      )}
      {revealed && (
        <p className="mt-3 text-sm text-earth-600 dark:text-earth-400">
          Ka pai for trying! The model sentence is shown above.
        </p>
      )}
    </ExerciseShell>
  )
}

// ── Screens ───────────────────────────────────────────────────────────────────

function IntroScreen({ word, onStart }: { word: WordEntry; onStart: () => void }) {
  return (
    <div className="card p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-forest-500 dark:text-forest-500 mb-3">
        4 exercises
      </p>
      <p className="text-[var(--foreground)] mb-2 leading-relaxed text-sm">
        Practice using{' '}
        <span className="font-display font-bold maori-word text-forest-800 dark:text-forest-200">{word.maori}</span>{' '}
        in context — fill in blanks, choose tense markers, build sentences, and more.
      </p>
      <p className="text-xs text-earth-400 dark:text-earth-600 mb-5">
        Exercises use placeholder content — real questions are being prepared by te reo experts.
      </p>
      <button onClick={onStart} className="btn-primary">
        Start practice →
      </button>
    </div>
  )
}

function CompletionScreen({ word }: { word: WordEntry }) {
  return (
    <div className="text-center py-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-100 dark:bg-forest-800 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forest-600 dark:text-forest-300">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="font-display text-3xl font-bold text-forest-800 dark:text-forest-200 mb-1">Ka pai!</h2>
      <p className="text-earth-500 dark:text-earth-400 italic mb-4">Well done</p>
      <p className="text-sm text-[var(--foreground)] mb-6 max-w-xs mx-auto leading-relaxed">
        You completed all 4 exercises for{' '}
        <span className="font-display font-semibold maori-word text-forest-700 dark:text-forest-300">{word.maori}</span>.
        Keep practising to strengthen your reo!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href={`/word/${word.id}`} className="btn-primary text-sm">
          Back to {word.maori}
        </Link>
        <Link href="/browse" className="btn-ghost text-sm">
          Learn another word
        </Link>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PracticeSection({ word }: Props) {
  const exercises = useMemo(() => getExercises(word), [word])
  const [phase, setPhase] = useState<'intro' | number | 'done'>('intro')

  function advance() {
    if (phase === 'intro') { setPhase(0); return }
    if (typeof phase === 'number') {
      const next = phase + 1
      setPhase(next >= exercises.length ? 'done' : next)
    }
  }

  if (phase === 'intro') return <IntroScreen word={word} onStart={advance} />
  if (phase === 'done') return <CompletionScreen word={word} />

  const idx = phase as number

  return (
    <div>
      <ProgressBar current={idx + 1} total={exercises.length} />
      <div className="card p-5 sm:p-6">
        {idx === 0 && <FillBlank ex={exercises[0]} onNext={advance} onSkip={advance} />}
        {idx === 1 && <TenseMarker ex={exercises[1]} onNext={advance} onSkip={advance} />}
        {idx === 2 && <BuildSentence ex={exercises[2]} onNext={advance} onSkip={advance} />}
        {idx === 3 && <TypeSentence ex={exercises[3]} onNext={advance} onSkip={advance} isLast />}
      </div>
    </div>
  )
}
