'use client'

import { useState, type ReactNode } from 'react'
import type { WordEntry } from '@/types/dictionary'

interface Props {
  word: WordEntry
}

const TOPICS = [
  { id: 'tense', label: 'Tense markers' },
  { id: 'structure', label: 'Sentence structure' },
  { id: 'particles', label: 'Particles' },
  { id: 'affixes', label: 'Prefixes & suffixes' },
  { id: 'passive', label: 'Passive voice' },
  { id: 'possessives', label: 'Possessives' },
]

const TENSE_ROWS = [
  { marker: 'i', name: 'Past', signal: 'A completed action or state in the past.' },
  { marker: 'kei te', name: 'Present', signal: 'A current, ongoing state or action.' },
  { marker: 'ka', name: 'Narrative', signal: 'Sequential action — used in storytelling and instruction.' },
  { marker: 'e…ana', name: 'Continuous', signal: 'An action in progress at a given time.' },
]

const PARTICLES = [
  { particle: 'i', role: 'Past tense / direct object marker' },
  { particle: 'ki', role: 'Direction, goal, or recipient' },
  { particle: 'kei', role: 'Present location / present tense marker' },
  { particle: 'hei', role: 'Future location or purpose' },
  { particle: 'ko', role: 'Identity or equation (naming sentences)' },
  { particle: 'he', role: 'Indefinite article / descriptive' },
]

const AFFIXES = [
  { affix: 'whaka-', type: 'prefix', meaning: 'Causative — to make or cause something to be' },
  { affix: 'tū-', type: 'prefix', meaning: 'To stand in a state or position' },
  { affix: '-tia', type: 'suffix', meaning: 'Common passive ending' },
  { affix: '-ngia', type: 'suffix', meaning: 'Alternative passive ending' },
]

// ── Chat UI primitives ────────────────────────────────────────────────────────

function TeacherAvatar() {
  return (
    <div
      className="w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 select-none"
      style={{ background: 'var(--accent)', color: 'var(--background)' }}
    >
      WA
    </div>
  )
}

function TeacherBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2.5 items-start">
      <TeacherAvatar />
      <div className="bubble-teacher max-w-[90%]">{children}</div>
    </div>
  )
}

function PlaceholderRow({ label, sublabel, word }: { label: string; sublabel: string; word: WordEntry }) {
  return (
    <TeacherBubble>
      <span className="text-[9px] font-semibold uppercase tracking-widest block mb-1" style={{ color: 'var(--terracotta)' }}>
        {label}
      </span>
      <span className="text-xs block mb-2" style={{ color: 'var(--text-secondary)' }}>{sublabel}</span>
      <span className="block maori-word text-sm font-semibold" style={{ fontFamily: 'Georgia, serif', color: 'var(--accent)', opacity: 0.7 }}>
        Aroha mai, kei te hanga tonu
      </span>
      <span className="block text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
        Bear with us, still being built
      </span>
    </TeacherBubble>
  )
}

function ComingSoonBanner({ word: _word }: { word: WordEntry }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border px-3.5 py-3 mb-4"
      style={{ background: 'var(--terracotta-light)', borderColor: 'color-mix(in srgb, var(--terracotta) 30%, transparent)' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1" style={{ color: 'var(--terracotta)' }}>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>
        <span className="block maori-word font-semibold text-sm" style={{ fontFamily: 'Georgia, serif', color: 'var(--accent)' }}>
          Aroha mai, kei te hanga tonu
        </span>
        <span className="block text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          Bear with us, still being built
        </span>
      </span>
    </div>
  )
}

// ── Tab content ───────────────────────────────────────────────────────────────

function TenseTab({ word }: { word: WordEntry }) {
  return (
    <div className="space-y-3">
      <ComingSoonBanner word={word} />
      <TeacherBubble>
        In te reo Māori, tense is shown by particles placed <em>before</em> the verb — not by changing the verb itself.
        Here is how <strong className="font-display maori-word">{word.maori}</strong> will appear in each tense:
      </TeacherBubble>
      {TENSE_ROWS.map((row) => (
        <PlaceholderRow key={row.marker} label={`${row.name} — ${row.marker}`} sublabel={row.signal} word={word} />
      ))}
    </div>
  )
}

function StructureTab({ word }: { word: WordEntry }) {
  return (
    <div className="space-y-3">
      <ComingSoonBanner word={word} />
      <TeacherBubble>
        Te reo Māori uses <strong>Verb–Subject–Object (VSO)</strong> word order — the action comes first, then who does it, then what it&rsquo;s done to.
        Here is how a sentence with <strong className="font-display maori-word">{word.maori}</strong> breaks down:
      </TeacherBubble>
      <TeacherBubble>
        <span className="block maori-word text-sm font-semibold mb-1" style={{ fontFamily: 'Georgia, serif', color: 'var(--accent)', opacity: 0.7 }}>
          Aroha mai, kei te hanga tonu
        </span>
        <span className="block text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
          Bear with us, still being built
        </span>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { label: 'Verb', bg: 'var(--accent)', fg: 'var(--background)' },
            { label: 'Subject', bg: 'var(--terracotta)', fg: 'var(--background)' },
            { label: 'Object', bg: 'var(--muted)', fg: 'var(--foreground)' },
          ].map(({ label, bg, fg }) => (
            <span key={label} className="px-2.5 py-1 rounded-full font-medium" style={{ background: bg, color: fg }}>
              {label}
            </span>
          ))}
        </div>
      </TeacherBubble>
    </div>
  )
}

function ParticlesTab({ word }: { word: WordEntry }) {
  return (
    <div className="space-y-3">
      <ComingSoonBanner word={word} />
      <TeacherBubble>
        Particles are short words that show the relationship between parts of a sentence.
        Here is how common particles interact with <strong className="font-display maori-word">{word.maori}</strong>:
      </TeacherBubble>
      {PARTICLES.map((p) => (
        <PlaceholderRow key={p.particle} label={p.particle} sublabel={p.role} word={word} />
      ))}
    </div>
  )
}

function AffixesTab({ word }: { word: WordEntry }) {
  return (
    <div className="space-y-3">
      <ComingSoonBanner word={word} />
      <TeacherBubble>
        Māori uses prefixes and suffixes to change the meaning or grammatical function of a word.
        Below are the affixes that may apply to <strong className="font-display maori-word">{word.maori}</strong>:
      </TeacherBubble>
      {AFFIXES.map((a) => (
        <TeacherBubble key={a.affix}>
          <span className="text-[9px] font-semibold uppercase tracking-widest block mb-1" style={{ color: 'var(--terracotta)' }}>
            {a.affix} ({a.type})
          </span>
          <span className="text-xs block mb-1.5" style={{ color: 'var(--text-secondary)' }}>{a.meaning}</span>
          <span className="block maori-word text-sm font-semibold" style={{ fontFamily: 'Georgia, serif', color: 'var(--accent)', opacity: 0.7 }}>
            Aroha mai, kei te hanga tonu
          </span>
          <span className="block text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Bear with us, still being built
          </span>
        </TeacherBubble>
      ))}
    </div>
  )
}

function PassiveTab({ word }: { word: WordEntry }) {
  return (
    <div className="space-y-3">
      <ComingSoonBanner word={word} />
      <TeacherBubble>
        In te reo Māori, verbs change form in the passive voice — typically by adding a suffix like <em>-tia</em>, <em>-ngia</em>, <em>-a</em>.
        The passive is very common and important in daily speech.
      </TeacherBubble>
      <PlaceholderRow label="Active voice" sublabel={`Using "${word.maori}" actively`} word={word} />
      <PlaceholderRow label={`Passive form of "${word.maori}"`} sublabel="Form being confirmed by te reo experts" word={word} />
    </div>
  )
}

function PossessivesTab({ word }: { word: WordEntry }) {
  return (
    <div className="space-y-3">
      <ComingSoonBanner word={word} />
      <TeacherBubble>
        Māori has two categories of possession — <strong>o-category</strong> (things you don&rsquo;t control, that dominate you)
        and <strong>a-category</strong> (things you control or create).
        Our experts will confirm which applies to <strong className="font-display maori-word">{word.maori}</strong>.
      </TeacherBubble>
      {[
        { cat: 'O-category', examples: 'Parents, home, land, feelings, body parts' },
        { cat: 'A-category', examples: 'Tools, creations, pets, food, subordinates' },
      ].map(({ cat, examples }) => (
        <TeacherBubble key={cat}>
          <span className="text-[9px] font-semibold uppercase tracking-widest block mb-1" style={{ color: 'var(--terracotta)' }}>
            {cat}
          </span>
          <span className="text-xs block mb-1.5" style={{ color: 'var(--text-secondary)' }}>{examples}</span>
          <span className="block maori-word text-sm font-semibold" style={{ fontFamily: 'Georgia, serif', color: 'var(--accent)', opacity: 0.7 }}>
            Aroha mai, kei te hanga tonu
          </span>
          <span className="block text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Bear with us, still being built
          </span>
        </TeacherBubble>
      ))}
    </div>
  )
}

const TAB_CONTENT: Record<string, (word: WordEntry) => ReactNode> = {
  tense: (w) => <TenseTab word={w} />,
  structure: (w) => <StructureTab word={w} />,
  particles: (w) => <ParticlesTab word={w} />,
  affixes: (w) => <AffixesTab word={w} />,
  passive: (w) => <PassiveTab word={w} />,
  possessives: (w) => <PossessivesTab word={w} />,
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function GrammarTabs({ word }: Props) {
  const [active, setActive] = useState('tense')

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Grammar topics"
        className="flex gap-1 overflow-x-auto pb-2 mb-5"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
      >
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            role="tab"
            aria-selected={active === topic.id}
            aria-controls={`panel-${topic.id}`}
            onClick={() => setActive(topic.id)}
            className="shrink-0 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
            style={
              active === topic.id
                ? { background: 'var(--accent)', color: 'var(--background)' }
                : { background: 'var(--muted)', color: 'var(--text-secondary)' }
            }
          >
            {topic.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {TOPICS.map((topic) => (
        <div
          key={topic.id}
          id={`panel-${topic.id}`}
          role="tabpanel"
          hidden={active !== topic.id}
        >
          {active === topic.id && TAB_CONTENT[topic.id]?.(word)}
        </div>
      ))}
    </div>
  )
}
