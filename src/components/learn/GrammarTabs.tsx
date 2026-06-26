'use client'

import { useState } from 'react'
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

function ComingSoonNotice({ word }: { word: WordEntry }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-earth-200 dark:border-forest-800 bg-earth-50 dark:bg-forest-950 px-3.5 py-3 mb-5 text-xs leading-relaxed text-earth-600 dark:text-earth-400">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>
        Grammar content for <span className="font-display font-semibold maori-word text-forest-700 dark:text-forest-300">{word.maori}</span> is being reviewed by te reo experts and will appear here soon.
        The structure below shows what this lesson will teach.
      </span>
    </div>
  )
}

function PlaceholderCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600">{label}</p>
      {children}
    </div>
  )
}

function PlaceholderSentence({ word }: { word: WordEntry }) {
  return (
    <p className="font-display text-sm maori-word text-earth-300 dark:text-forest-800 italic">
      [Example sentence using &ldquo;{word.maori}&rdquo; — coming soon]
    </p>
  )
}

// ── Tab content components ────────────────────────────────────────────────────

function TenseTab({ word }: { word: WordEntry }) {
  return (
    <div>
      <ComingSoonNotice word={word} />
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4 leading-relaxed">
        In te reo Māori, tense is shown by particles placed <em>before</em> the verb — not by changing the verb itself. Here is how <span className="font-display font-semibold maori-word text-forest-700 dark:text-forest-300">{word.maori}</span> will appear in each tense:
      </p>
      <div className="space-y-3">
        {TENSE_ROWS.map((row) => (
          <PlaceholderCard key={row.marker} label={`${row.name} — ${row.marker}`}>
            <p className="text-xs text-earth-500 dark:text-earth-500">{row.signal}</p>
            <PlaceholderSentence word={word} />
          </PlaceholderCard>
        ))}
      </div>
    </div>
  )
}

function StructureTab({ word }: { word: WordEntry }) {
  return (
    <div>
      <ComingSoonNotice word={word} />
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4 leading-relaxed">
        Te reo Māori uses <strong>Verb–Subject–Object (VSO)</strong> word order — the opposite of English. The action comes first, then who does it, then what it&rsquo;s done to.
      </p>
      <PlaceholderCard label="Example sentence breakdown">
        <PlaceholderSentence word={word} />
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {[
            { label: 'Verb', colour: 'bg-forest-100 text-forest-700 dark:bg-forest-800 dark:text-forest-300 border border-forest-200 dark:border-forest-700' },
            { label: 'Subject', colour: 'bg-moana-100 text-moana-700 dark:bg-moana-900 dark:text-moana-300 border border-moana-200 dark:border-moana-800' },
            { label: 'Object', colour: 'bg-earth-100 text-earth-700 dark:bg-earth-900 dark:text-earth-300 border border-earth-200 dark:border-earth-700' },
          ].map(({ label, colour }) => (
            <span key={label} className={`px-2.5 py-1 rounded-full font-medium ${colour}`}>{label}</span>
          ))}
        </div>
        <p className="text-xs text-earth-400 dark:text-earth-600 mt-2 italic">Colour-coded breakdown coming soon</p>
      </PlaceholderCard>
    </div>
  )
}

function ParticlesTab({ word }: { word: WordEntry }) {
  return (
    <div>
      <ComingSoonNotice word={word} />
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4 leading-relaxed">
        Particles are short words that show the relationship between parts of a sentence. Here is how common particles interact with <span className="font-display font-semibold maori-word text-forest-700 dark:text-forest-300">{word.maori}</span>:
      </p>
      <div className="space-y-2.5">
        {PARTICLES.map((p) => (
          <PlaceholderCard key={p.particle} label={p.particle}>
            <p className="text-xs text-earth-500 dark:text-earth-500">{p.role}</p>
            <PlaceholderSentence word={word} />
          </PlaceholderCard>
        ))}
      </div>
    </div>
  )
}

function AffixesTab({ word }: { word: WordEntry }) {
  return (
    <div>
      <ComingSoonNotice word={word} />
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4 leading-relaxed">
        Māori uses prefixes and suffixes to change the meaning or grammatical function of a word. Below are the affixes that may apply to <span className="font-display font-semibold maori-word text-forest-700 dark:text-forest-300">{word.maori}</span>:
      </p>
      <div className="space-y-2.5">
        {AFFIXES.map((a) => (
          <PlaceholderCard key={a.affix} label={`${a.affix} (${a.type})`}>
            <p className="text-xs text-earth-500 dark:text-earth-500">{a.meaning}</p>
            <p className="font-display text-sm maori-word text-earth-400 dark:text-forest-700">
              {a.type === 'prefix'
                ? `${a.affix}${word.maori} → [result coming soon]`
                : `${word.maori}${a.affix} → [result coming soon]`}
            </p>
          </PlaceholderCard>
        ))}
      </div>
    </div>
  )
}

function PassiveTab({ word }: { word: WordEntry }) {
  return (
    <div>
      <ComingSoonNotice word={word} />
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4 leading-relaxed">
        In te reo Māori, verbs change form in the passive voice — typically by adding a suffix like <em>-tia</em>, <em>-ngia</em>, <em>-a</em>, or others. The passive is very common and important in daily speech.
      </p>
      <div className="space-y-3">
        <PlaceholderCard label="Active voice">
          <PlaceholderSentence word={word} />
        </PlaceholderCard>
        <PlaceholderCard label={`Passive form of "${word.maori}"`}>
          <p className="font-display text-sm maori-word text-earth-400 dark:text-forest-700">
            {word.maori}[-suffix] → [passive form coming soon]
          </p>
          <PlaceholderSentence word={word} />
        </PlaceholderCard>
      </div>
    </div>
  )
}

function PossessivesTab({ word }: { word: WordEntry }) {
  return (
    <div>
      <ComingSoonNotice word={word} />
      <p className="text-sm text-earth-600 dark:text-earth-400 mb-4 leading-relaxed">
        Māori has two categories of possession — <strong>o-category</strong> (things you don&rsquo;t control, that dominate you) and <strong>a-category</strong> (things you control, possess, or create). The category of <span className="font-display font-semibold maori-word text-forest-700 dark:text-forest-300">{word.maori}</span> will be explained here.
      </p>
      <div className="space-y-3">
        {[
          { category: 'O-category', examples: 'Parents, home, land, feelings, body parts', colour: 'border-moana-200 dark:border-moana-800' },
          { category: 'A-category', examples: 'Tools, creations, pets, food, subordinates', colour: 'border-earth-200 dark:border-earth-700' },
        ].map(({ category, examples, colour }) => (
          <div key={category} className={`rounded-xl border bg-[var(--card)] p-4 ${colour}`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-1">{category}</p>
            <p className="text-xs text-earth-500 dark:text-earth-400 mb-2">{examples}</p>
            <PlaceholderSentence word={word} />
          </div>
        ))}
        <p className="text-xs text-earth-400 dark:text-earth-600 italic pl-1">
          Which category does &ldquo;{word.maori}&rdquo; belong to? Our experts will confirm and add examples.
        </p>
      </div>
    </div>
  )
}

const TAB_CONTENT: Record<string, (word: WordEntry) => React.ReactNode> = {
  tense: (w) => <TenseTab word={w} />,
  structure: (w) => <StructureTab word={w} />,
  particles: (w) => <ParticlesTab word={w} />,
  affixes: (w) => <AffixesTab word={w} />,
  passive: (w) => <PassiveTab word={w} />,
  possessives: (w) => <PossessivesTab word={w} />,
}

export default function GrammarTabs({ word }: Props) {
  const [active, setActive] = useState('tense')

  return (
    <div>
      {/* Tab bar — horizontally scrollable on mobile */}
      <div
        role="tablist"
        aria-label="Grammar topics"
        className="flex gap-1 overflow-x-auto pb-1 mb-5 scrollbar-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            role="tab"
            aria-selected={active === topic.id}
            aria-controls={`panel-${topic.id}`}
            onClick={() => setActive(topic.id)}
            className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              active === topic.id
                ? 'bg-forest-600 dark:bg-forest-500 text-white dark:text-forest-950'
                : 'bg-[var(--muted)] text-earth-600 dark:text-earth-400 hover:bg-forest-100 dark:hover:bg-forest-900 hover:text-forest-700 dark:hover:text-forest-300'
            }`}
          >
            {topic.label}
          </button>
        ))}
      </div>

      {/* Tab panel */}
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
