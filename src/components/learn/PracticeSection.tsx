'use client'

import { useState, useMemo, useRef, useEffect, type ReactNode } from 'react'
import type { WordEntry } from '@/types/dictionary'
import Link from 'next/link'

interface Props {
  word: WordEntry
}

// ── Exercise types ────────────────────────────────────────────────────────────

interface FillBlankEx {
  type: 'fill-blank'
  title: string
  sentence: { before: string; after: string; answer: string }
  english: string
}

interface TenseMarkerEx {
  type: 'tense-marker'
  title: string
  sentence: string
  options: string[]
  answer: string
  english: string
}

interface BuildSentenceEx {
  type: 'build-sentence'
  title: string
  tiles: string[]
  answer: string[]
  english: string
}

interface TypeSentenceEx {
  type: 'type-sentence'
  title: string
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
      sentence: { before: 'He', after: 'tēnei.', answer: m },
      english: `This is ${eng}.`,
    },
    {
      type: 'tense-marker',
      title: 'Tap the correct tense marker',
      sentence: `___ pai tēnei ${m}.`,
      options: ['i', 'kei te', 'ka', 'e…ana'],
      answer: 'kei te',
      english: `This ${m} is good.`,
    },
    {
      type: 'build-sentence',
      title: 'Build the sentence',
      tiles: ['He', m, 'tēnei.'],
      answer: ['He', m, 'tēnei.'],
      english: `This is ${eng}.`,
    },
    {
      type: 'type-sentence',
      title: 'Type the sentence',
      english: `This is ${eng}.`,
      answer: `He ${m} tēnei.`,
    },
  ]
}

// ── Chat history ──────────────────────────────────────────────────────────────

interface Exchange {
  title: string
  userAnswer: string
  modelAnswer: string
  correct: boolean
}

// ── Chat UI primitives ────────────────────────────────────────────────────────

function TeacherAvatar() {
  return (
    <div className="w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 select-none"
      style={{ background: 'var(--accent)', color: 'var(--background)' }}>
      WA
    </div>
  )
}

function TeacherMsg({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2.5 items-start">
      <TeacherAvatar />
      <div className="bubble-teacher max-w-[85%]">{children}</div>
    </div>
  )
}

function StudentMsg({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="bubble-student max-w-[75%] maori-word">{children}</div>
    </div>
  )
}

function FeedbackMsg({ correct, model }: { correct: boolean; model: string }) {
  return (
    <TeacherMsg>
      {correct ? (
        <span style={{ color: 'var(--terracotta)' }}>Tika · spot on!</span>
      ) : (
        <span style={{ color: 'var(--text-secondary)' }}>
          Try saying:{' '}
          <span className="font-display maori-word font-semibold" style={{ color: 'var(--accent)' }}>{model}</span>
        </span>
      )}
    </TeacherMsg>
  )
}

function PlaceholderBadge() {
  return (
    <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      Placeholder — real content being prepared by te reo experts
    </div>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
        <span>Exercise {current} of {total}</span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(current / total) * 100}%`, background: 'var(--accent)' }} />
      </div>
      <div className="flex gap-1.5 mt-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full transition-colors duration-300"
            style={{ background: i < current ? 'var(--accent)' : 'var(--border)' }} />
        ))}
      </div>
    </div>
  )
}

// ── Exercises ─────────────────────────────────────────────────────────────────

function FillBlank({ ex, onAdvance, onSkip }: { ex: FillBlankEx; onAdvance: (a: string, c: boolean, m: string) => void; onSkip: () => void }) {
  const [value, setValue] = useState('')
  const [revealed, setRevealed] = useState(false)
  const isCorrect = value.trim().toLowerCase() === ex.sentence.answer.toLowerCase()

  return (
    <div>
      <PlaceholderBadge />
      <p className="text-xs italic mb-4" style={{ color: 'var(--text-secondary)' }}>{ex.english}</p>
      <div className="flex items-baseline gap-2 flex-wrap text-lg font-display maori-word mb-4" style={{ color: 'var(--accent)' }}>
        <span>{ex.sentence.before}</span>
        {!revealed ? (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && value.trim()) setRevealed(true) }}
            placeholder="___"
            aria-label="Fill in the missing word"
            className="input-base font-display maori-word w-36 inline-block text-center py-1.5 text-base"
          />
        ) : (
          <span className="px-3 py-1 rounded-lg font-bold" style={{ background: 'var(--accent)', color: 'var(--background)' }}>
            {ex.sentence.answer}
          </span>
        )}
        <span>{ex.sentence.after}</span>
      </div>
      {revealed && (
        <p className="text-sm mb-4">
          {isCorrect
            ? <span style={{ color: 'var(--terracotta)' }}>Tika · spot on!</span>
            : <span style={{ color: 'var(--text-secondary)' }}>The answer is <span className="font-display maori-word font-bold" style={{ color: 'var(--accent)' }}>{ex.sentence.answer}</span></span>
          }
        </p>
      )}
      <div className="flex items-center gap-3">
        {!revealed
          ? <button onClick={() => { if (value.trim()) setRevealed(true) }} disabled={!value.trim()} className="btn-primary text-sm disabled:opacity-40">Check</button>
          : <button onClick={() => onAdvance(value || '—', isCorrect, ex.sentence.answer)} className="btn-primary text-sm">Next →</button>
        }
        <button onClick={onSkip} className="text-sm" style={{ color: 'var(--text-secondary)' }}>Skip</button>
      </div>
    </div>
  )
}

function TenseMarker({ ex, onAdvance, onSkip }: { ex: TenseMarkerEx; onAdvance: (a: string, c: boolean, m: string) => void; onSkip: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const correct = selected === ex.answer

  return (
    <div>
      <PlaceholderBadge />
      <p className="text-xs italic mb-4" style={{ color: 'var(--text-secondary)' }}>{ex.english}</p>
      <div className="font-display maori-word text-base mb-5 p-4 rounded-xl"
        style={{ background: 'var(--muted)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
        {selected ? ex.sentence.replace('___', selected) : ex.sentence}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-4">
        {ex.options.map((opt) => {
          const isCorrectOpt = selected !== null && opt === ex.answer
          const isWrong = selected === opt && !correct
          return (
            <button
              key={opt}
              onClick={() => { if (!selected) setSelected(opt) }}
              disabled={selected !== null}
              className="py-2.5 px-3 rounded-xl border text-sm font-medium font-display maori-word transition-colors"
              style={
                isCorrectOpt
                  ? { borderColor: 'var(--accent)', background: 'var(--accent)', color: 'var(--background)' }
                  : isWrong
                  ? { borderColor: 'var(--terracotta)', background: 'var(--terracotta-light)', color: 'var(--terracotta)' }
                  : selected !== null
                  ? { borderColor: 'var(--border)', background: 'var(--muted)', color: 'var(--text-secondary)', opacity: 0.4 }
                  : { borderColor: 'var(--border)', background: 'var(--card)' }
              }
            >
              {opt}
            </button>
          )
        })}
      </div>
      {selected && (
        <p className="text-sm mb-4">
          {correct
            ? <span style={{ color: 'var(--terracotta)' }}>Tika · spot on!</span>
            : <span style={{ color: 'var(--text-secondary)' }}>Try saying: <span className="font-display maori-word font-bold" style={{ color: 'var(--accent)' }}>{ex.answer}</span></span>
          }
        </p>
      )}
      <div className="flex items-center gap-3">
        <button onClick={() => selected && onAdvance(selected, correct, ex.answer)} disabled={!selected} className="btn-primary text-sm disabled:opacity-40">Next →</button>
        <button onClick={onSkip} className="text-sm" style={{ color: 'var(--text-secondary)' }}>Skip</button>
      </div>
    </div>
  )
}

function BuildSentence({ ex, onAdvance, onSkip }: { ex: BuildSentenceEx; onAdvance: (a: string, c: boolean, m: string) => void; onSkip: () => void }) {
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
    <div>
      <PlaceholderBadge />
      <p className="text-xs italic mb-4" style={{ color: 'var(--text-secondary)' }}>{ex.english}</p>
      <div
        aria-label="Your answer"
        className="min-h-[52px] rounded-xl border-2 border-dashed p-3 mb-3 flex flex-wrap gap-2"
        style={{
          borderColor: revealed ? (isCorrect ? 'var(--accent)' : 'var(--terracotta)') : 'var(--border)',
          background: 'var(--muted)',
        }}
      >
        {placed.length === 0 && (
          <span className="text-xs italic self-center" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>
            Tap tiles below to build the sentence…
          </span>
        )}
        {placed.map((tile, i) => (
          <button
            key={`p-${i}`}
            onClick={() => tapPlaced(tile, i)}
            disabled={revealed}
            className="px-3 py-1.5 rounded-lg border text-sm font-display maori-word font-medium transition-colors disabled:cursor-default"
            style={{ background: 'var(--accent)', color: 'var(--background)', borderColor: 'var(--accent)' }}
          >
            {tile}
          </button>
        ))}
      </div>
      <div aria-label="Available tiles" className="flex flex-wrap gap-2 mb-4">
        {available.map((tile, i) => (
          <button
            key={`a-${i}`}
            onClick={() => tapAvailable(tile, i)}
            disabled={revealed}
            className="px-3 py-1.5 rounded-lg border text-sm font-display maori-word font-medium transition-colors disabled:opacity-40 disabled:cursor-default"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
          >
            {tile}
          </button>
        ))}
      </div>
      {revealed && (
        <p className="text-sm mb-4">
          {isCorrect
            ? <span style={{ color: 'var(--terracotta)' }}>Tika · spot on!</span>
            : <span style={{ color: 'var(--text-secondary)' }}>Correct order: <span className="font-display maori-word font-bold" style={{ color: 'var(--accent)' }}>{ex.answer.join(' ')}</span></span>
          }
        </p>
      )}
      <div className="flex items-center gap-3">
        {!revealed
          ? <button onClick={() => { if (placed.length === ex.tiles.length) setRevealed(true) }} disabled={placed.length !== ex.tiles.length} className="btn-primary text-sm disabled:opacity-40">Check</button>
          : <button onClick={() => onAdvance(placed.join(' '), isCorrect, ex.answer.join(' '))} className="btn-primary text-sm">Next →</button>
        }
        <button onClick={onSkip} className="text-sm" style={{ color: 'var(--text-secondary)' }}>Skip</button>
      </div>
    </div>
  )
}

function TypeSentence({ ex, onAdvance, onSkip, isLast }: { ex: TypeSentenceEx; onAdvance: (a: string, c: boolean, m: string) => void; onSkip: () => void; isLast: boolean }) {
  const [value, setValue] = useState('')
  const [revealed, setRevealed] = useState(false)

  return (
    <div>
      <PlaceholderBadge />
      <div className="rounded-xl px-4 py-3 mb-4 text-center"
        style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}>
        <p className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>{ex.english}</p>
      </div>
      {!revealed ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={2}
          placeholder="Type the Māori sentence here…"
          aria-label="Type the Māori sentence"
          className="input-base font-display maori-word resize-none mb-4"
        />
      ) : (
        <div className="rounded-xl border px-4 py-3 font-display maori-word mb-4"
          style={{ background: 'var(--card)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
          {ex.answer}
        </div>
      )}
      {revealed && (
        <p className="text-sm mb-4">
          <span style={{ color: 'var(--terracotta)' }}>Try saying: </span>
          <span className="font-display maori-word font-semibold" style={{ color: 'var(--accent)' }}>{ex.answer}</span>
        </p>
      )}
      <div className="flex items-center gap-3">
        {!revealed
          ? <button onClick={() => { if (value.trim()) setRevealed(true) }} disabled={!value.trim()} className="btn-primary text-sm disabled:opacity-40">Check</button>
          : <button onClick={() => onAdvance(value || '—', false, ex.answer)} className="btn-primary text-sm">{isLast ? 'Finish →' : 'Next →'}</button>
        }
        <button onClick={onSkip} className="text-sm" style={{ color: 'var(--text-secondary)' }}>Skip</button>
      </div>
    </div>
  )
}

// ── Screens ───────────────────────────────────────────────────────────────────

function IntroScreen({ word, onStart }: { word: WordEntry; onStart: () => void }) {
  return (
    <div className="card p-6 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--terracotta)' }}>
        4 exercises
      </p>
      <p className="text-sm mb-2 leading-relaxed" style={{ color: 'var(--foreground)' }}>
        Practice using{' '}
        <span className="font-display font-bold maori-word" style={{ color: 'var(--accent)' }}>{word.maori}</span>{' '}
        in context — fill in blanks, choose tense markers, build sentences, and more.
      </p>
      <p className="text-xs mb-5" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
        Exercises use placeholder content — real questions are being prepared by te reo experts.
      </p>
      <button onClick={onStart} className="btn-primary">
        Tīmata — Start →
      </button>
    </div>
  )
}

function CompletionScreen({ word }: { word: WordEntry }) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
        style={{ background: 'var(--accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--background)' }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="font-display text-4xl font-bold mb-1" style={{ color: 'var(--accent)' }}>Ka pai!</h2>
      <p className="text-sm italic mb-4" style={{ color: 'var(--terracotta)' }}>Well done</p>
      <p className="text-sm mb-6 max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--foreground)' }}>
        You completed all 4 exercises for{' '}
        <span className="font-display font-semibold maori-word" style={{ color: 'var(--accent)' }}>{word.maori}</span>.
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
  const [history, setHistory] = useState<Exchange[]>([])
  const historyEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [history])

  function advance(answer: string, correct: boolean, model: string) {
    if (typeof phase === 'number') {
      setHistory((h) => [...h, { title: exercises[phase].title, userAnswer: answer, modelAnswer: model, correct }])
    }
    if (phase === 'intro') { setPhase(0); return }
    if (typeof phase === 'number') {
      const next = phase + 1
      setPhase(next >= exercises.length ? 'done' : next)
    }
  }

  function skip() {
    if (phase === 'intro') { setPhase(0); return }
    if (typeof phase === 'number') {
      const next = phase + 1
      setPhase(next >= exercises.length ? 'done' : next)
    }
  }

  if (phase === 'intro') return <IntroScreen word={word} onStart={() => setPhase(0)} />
  if (phase === 'done') return <CompletionScreen word={word} />

  const idx = phase as number

  return (
    <div>
      <ProgressBar current={idx + 1} total={exercises.length} />

      {/* Chat history */}
      {history.length > 0 && (
        <div className="space-y-3 mb-5">
          {history.map((ex, i) => (
            <div key={i} className="space-y-2">
              <TeacherMsg>
                <span className="text-[9px] font-semibold uppercase tracking-widest block mb-1" style={{ color: 'var(--terracotta)' }}>
                  {ex.title}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Completed
                </span>
              </TeacherMsg>
              <StudentMsg>{ex.userAnswer}</StudentMsg>
              <FeedbackMsg correct={ex.correct} model={ex.modelAnswer} />
            </div>
          ))}
          <div ref={historyEndRef} />
        </div>
      )}

      {/* Divider between history and active exercise */}
      {history.length > 0 && (
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>
            Exercise {idx + 1}
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>
      )}

      {/* Active exercise — chat bubble wrapper */}
      <div className="space-y-3">
        <TeacherMsg>
          <span className="text-[9px] font-semibold uppercase tracking-widest block mb-1" style={{ color: 'var(--terracotta)' }}>
            {exercises[idx].title}
          </span>
          <span className="text-sm">
            {idx === 0 && 'Type the missing word to complete the sentence.'}
            {idx === 1 && 'Which tense marker makes this a present-tense sentence?'}
            {idx === 2 && 'Tap the tiles in the correct order to build the Māori sentence.'}
            {idx === 3 && 'Read the English below and type the Māori sentence.'}
          </span>
        </TeacherMsg>

        <div className="card p-5 sm:p-6">
          {idx === 0 && <FillBlank ex={exercises[0]} onAdvance={advance} onSkip={skip} />}
          {idx === 1 && <TenseMarker ex={exercises[1]} onAdvance={advance} onSkip={skip} />}
          {idx === 2 && <BuildSentence ex={exercises[2]} onAdvance={advance} onSkip={skip} />}
          {idx === 3 && <TypeSentence ex={exercises[3]} onAdvance={advance} onSkip={skip} isLast />}
        </div>
      </div>
    </div>
  )
}
