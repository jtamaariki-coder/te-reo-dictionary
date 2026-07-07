'use client'

import { useMemo, useState } from 'react'
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

type TenseExample = {
  title: string
  marker: string
  pattern: string
  plainEnglish: string
  maori: string
  english: string
  why: string
}

function getEnglish(word: WordEntry): string {
  if (Array.isArray(word.english)) return word.english.slice(0, 3).join(', ')
  return String(word.english ?? '')
}

function cleanKey(value: string): string {
  return value.toLowerCase().replace(/ā/g, 'a').replace(/ē/g, 'e').replace(/ī/g, 'i').replace(/ō/g, 'o').replace(/ū/g, 'u')
}

function getTenseExamples(word: WordEntry): TenseExample[] {
  const kupu = word.maori || 'kupu'
  const key = cleanKey(kupu)
  const partOfSpeech = String(word.part_of_speech ?? '').toLowerCase()

  const knownExamples: Record<string, TenseExample[]> = {
    aroha: [
      {
        title: 'Past',
        marker: 'I',
        pattern: 'Tohu wā + kupu + tūpou + ...',
        plainEnglish: 'A completed feeling or action in the past.',
        maori: 'I aroha ahau ki tōku whānau.',
        english: 'I loved my family.',
        why: 'The particle “I” places the action or feeling in the past.',
      },
      {
        title: 'Present',
        marker: 'Kei te',
        pattern: 'Tohu wā + kupu + tūpou + ...',
        plainEnglish: 'Something happening or being felt now.',
        maori: 'Kei te aroha ahau ki tōku whānau.',
        english: 'I love my family / I am loving my family.',
        why: '“Kei te” shows the action or state is happening now.',
      },
      {
        title: 'Future / next action',
        marker: 'Ka',
        pattern: 'Tohu wā + kupu + tūpou + ...',
        plainEnglish: 'Something that will happen, or a new action beginning.',
        maori: 'Ka aroha tonu ahau ki a koe.',
        english: 'I will always love you.',
        why: '“Ka” often points forward, or shows the next action in a sequence.',
      },
      {
        title: 'Continuous',
        marker: 'E ... ana',
        pattern: 'Tohu wā + kupu + ana + tūpou + ...',
        plainEnglish: 'A feeling or action continuing over time.',
        maori: 'E aroha ana ia ki tana whaea.',
        english: 'They love their mother.',
        why: '“E ... ana” wraps around the word to show something ongoing.',
      },
    ],

    haere: [
      {
        title: 'Past',
        marker: 'I',
        pattern: 'Tohu wā + kupu + tūpou + ...',
        plainEnglish: 'A completed action in the past.',
        maori: 'I haere ahau ki te toa.',
        english: 'I went to the shop.',
        why: '“I” tells the listener this already happened.',
      },
      {
        title: 'Present',
        marker: 'Kei te',
        pattern: 'Tohu wā + kupu + tūpou + ...',
        plainEnglish: 'An action happening now.',
        maori: 'Kei te haere ahau ki te toa.',
        english: 'I am going to the shop.',
        why: '“Kei te” makes it clear the action is happening now.',
      },
      {
        title: 'Future / next action',
        marker: 'Ka',
        pattern: 'Tohu wā + kupu + tūpou + ...',
        plainEnglish: 'An action that will happen or starts next.',
        maori: 'Ka haere ahau ki te toa.',
        english: 'I will go to the shop.',
        why: '“Ka” can point to future action or the next step.',
      },
      {
        title: 'Continuous',
        marker: 'E ... ana',
        pattern: 'Tohu wā + kupu + ana + tūpou + ...',
        plainEnglish: 'An action continuing over time.',
        maori: 'E haere ana ahau ki te toa.',
        english: 'I am going to the shop.',
        why: '“E ... ana” shows the action is in progress.',
      },
    ],

    kai: [
      {
        title: 'Past',
        marker: 'I',
        pattern: 'Tohu wā + kupu + tūpou + ...',
        plainEnglish: 'A completed action in the past.',
        maori: 'I kai ahau i te parāoa.',
        english: 'I ate the bread.',
        why: '“I” shows the eating already happened.',
      },
      {
        title: 'Present',
        marker: 'Kei te',
        pattern: 'Tohu wā + kupu + tūpou + ...',
        plainEnglish: 'An action happening now.',
        maori: 'Kei te kai ahau i te parāoa.',
        english: 'I am eating the bread.',
        why: '“Kei te” shows the action is happening now.',
      },
      {
        title: 'Future / next action',
        marker: 'Ka',
        pattern: 'Tohu wā + kupu + tūpou + ...',
        plainEnglish: 'An action that will happen.',
        maori: 'Ka kai ahau ā muri ake.',
        english: 'I will eat later.',
        why: '“Ka” points to what will happen next.',
      },
      {
        title: 'Continuous',
        marker: 'E ... ana',
        pattern: 'Tohu wā + kupu + ana + tūpou + ...',
        plainEnglish: 'An action continuing over time.',
        maori: 'E kai ana ngā tamariki.',
        english: 'The children are eating.',
        why: '“E ... ana” shows the action is ongoing.',
      },
    ],
  }

  if (knownExamples[key]) return knownExamples[key]

  const looksLikeVerb = partOfSpeech.includes('verb')

  if (looksLikeVerb) {
    return [
      {
        title: 'Past',
        marker: 'I',
        pattern: `I + ${kupu} + subject`,
        plainEnglish: 'A completed action in the past.',
        maori: `I ${kupu} ahau.`,
        english: `I ${getEnglish(word)}.`,
        why: '“I” places the action in the past.',
      },
      {
        title: 'Present',
        marker: 'Kei te',
        pattern: `Kei te + ${kupu} + subject`,
        plainEnglish: 'An action happening now.',
        maori: `Kei te ${kupu} ahau.`,
        english: `I am ${getEnglish(word)}.`,
        why: '“Kei te” marks the action as happening now.',
      },
      {
        title: 'Future / next action',
        marker: 'Ka',
        pattern: `Ka + ${kupu} + subject`,
        plainEnglish: 'An action that will happen.',
        maori: `Ka ${kupu} ahau.`,
        english: `I will ${getEnglish(word)}.`,
        why: '“Ka” can point to the future or to the next action.',
      },
      {
        title: 'Continuous',
        marker: 'E ... ana',
        pattern: `E + ${kupu} + ana + subject`,
        plainEnglish: 'An action continuing over time.',
        maori: `E ${kupu} ana ahau.`,
        english: `I am ${getEnglish(word)}.`,
        why: '“E ... ana” wraps around the action to show it is ongoing.',
      },
    ]
  }

  return [
    {
      title: 'Past',
      marker: 'I',
      pattern: `I + action + te kupu “${kupu}”`,
      plainEnglish: 'The searched kupu is used inside a past-tense sentence.',
      maori: `I ako ahau i te kupu “${kupu}”.`,
      english: `I learned the word “${kupu}”.`,
      why: 'Some kupu are not actions by themselves, so we place them inside a sentence that uses a tense marker.',
    },
    {
      title: 'Present',
      marker: 'Kei te',
      pattern: `Kei te + action + te kupu “${kupu}”`,
      plainEnglish: 'The searched kupu is used inside a present-tense sentence.',
      maori: `Kei te ako ahau i te kupu “${kupu}”.`,
      english: `I am learning the word “${kupu}”.`,
      why: '“Kei te” shows the learning is happening now.',
    },
    {
      title: 'Future / next action',
      marker: 'Ka',
      pattern: `Ka + action + te kupu “${kupu}”`,
      plainEnglish: 'The searched kupu is used inside a future-tense sentence.',
      maori: `Ka ako ahau i te kupu “${kupu}” āpōpō.`,
      english: `I will learn the word “${kupu}” tomorrow.`,
      why: '“Ka” points to what will happen next or in the future.',
    },
    {
      title: 'Continuous',
      marker: 'E ... ana',
      pattern: `E + action + ana + te kupu “${kupu}”`,
      plainEnglish: 'The searched kupu is used inside an ongoing sentence.',
      maori: `E ako ana ahau i te kupu “${kupu}”.`,
      english: `I am learning the word “${kupu}”.`,
      why: '“E ... ana” shows the action is continuing.',
    },
  ]
}

export default function GrammarTabs({ word }: Props) {
  const [activeTopic, setActiveTopic] = useState('tense')

  return (
    <section className="mt-12 space-y-6">
      <div className="flex items-end gap-3">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
          Grammar lessons
        </h2>
        <span className="text-sm" style={{ color: 'var(--text)' }}>
          {TOPICS.length} topics
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {TOPICS.map((topic) => {
          const isActive = activeTopic === topic.id

          return (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className="whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition"
              style={{
                background: isActive ? 'var(--accent)' : 'var(--surface)',
                color: isActive ? 'white' : 'var(--text)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              {topic.label}
            </button>
          )
        })}
      </div>

      {activeTopic === 'tense' ? (
        <TenseTab word={word} />
      ) : (
        <ComingSoonTab word={word} topic={TOPICS.find((topic) => topic.id === activeTopic)?.label ?? 'Grammar'} />
      )}
    </section>
  )
}

function TenseTab({ word }: Props) {
  const examples = useMemo(() => getTenseExamples(word), [word])
  const kupu = word.maori || 'kupu'
  const partOfSpeech = String(word.part_of_speech ?? 'word')

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl border p-5"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--terracotta)' }}>
          What this lesson teaches
        </p>

        <h3 className="mt-2 text-xl font-bold" style={{ color: 'var(--text)' }}>
          Using <span className="maori-word">{kupu}</span> with tense markers
        </h3>

        <p className="mt-3 leading-relaxed" style={{ color: 'var(--text)' }}>
          In te reo Māori, time is usually shown with small words placed before the main word or action.
          These are often called tense markers. Instead of changing the word itself, we change the marker around it.
        </p>

        <div
          className="mt-4 rounded-xl border p-4"
          style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
        >
          <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            Focus kupu
          </p>
          <p className="mt-1 text-2xl font-bold maori-word">{kupu}</p>
          <p className="mt-1 text-sm" style={{ color: 'var(--text)' }}>
            Part of speech: {partOfSpeech}
          </p>
        </div>
      </div>

      <div
        className="rounded-2xl border p-5"
        style={{ background: 'var(--terracotta-light)', borderColor: 'var(--terracotta)' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--terracotta)' }}>
          Learner note
        </p>

<h3 className="mt-2 text-2xl font-bold">
  Speak with confidence. Learn with purpose.
</h3>

<p className="mt-4 leading-relaxed">
  Being understood is an important part of learning, but don't stop there.
</p>

<p className="mt-4 leading-relaxed">
  Keep aiming for <strong>reo tika</strong>. Every correction, every new
  pattern, and every conversation helps your reo become stronger.
</p>

<div
  className="mt-6 rounded-xl border-l-4 pl-5 py-2"
  style={{ borderColor: 'var(--terracotta)' }}
>
  <p className="font-semibold maori-word">
    Kaua e mataku ki te hē. Engari, kaua hoki e noho ki te hē.
  </p>

  <p className="mt-2 italic">
    Don't be afraid to make mistakes.<br />
    But don't stay in your mistakes.
  </p>
</div>

<p className="mt-6 text-center italic font-semibold">
  Speak today. Learn tomorrow. Keep improving forever.
</p>
      </div>

      <div className="grid gap-4">
        {examples.map((example) => (
          <TenseCard key={example.title} example={example} />
        ))}
      </div>

      <div
        className="rounded-2xl border p-5"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--terracotta)' }}>
          Practice
        </p>

        <h3 className="mt-2 text-lg font-bold" style={{ color: 'var(--text)' }}>
          Build your own sentence with <span className="maori-word">{kupu}</span>
        </h3>

        <div className="mt-4 space-y-3">
          <PracticeLine label="Past" prompt={`I ______ ahau.  /  I ako ahau i te kupu “${kupu}”.`} />
          <PracticeLine label="Present" prompt={`Kei te ______ ahau.  /  Kei te ako ahau i te kupu “${kupu}”.`} />
          <PracticeLine label="Future" prompt={`Ka ______ ahau.  /  Ka ako ahau i te kupu “${kupu}”.`} />
          <PracticeLine label="Continuous" prompt={`E ______ ana ahau.  /  E ako ana ahau i te kupu “${kupu}”.`} />
        </div>
      </div>

      <ReferencesBox />
    </div>
  )
}

function getEnglishPattern(example: TenseExample): string {
  const marker = example.marker

  if (marker === 'I') return 'Tense marker + word + subject + ...'
  if (marker === 'Kei te') return 'Tense marker + word + subject + ...'
  if (marker === 'Ka') return 'Tense marker + word + subject + ...'
  if (marker === 'E ... ana') return 'Continuous marker + word + ana + subject + ...'

  return 'Tense marker + word + subject + ...'
}

function TenseCard({ example }: { example: TenseExample }) {
  return (
    <article
      className="rounded-2xl border p-5"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]"
          style={{ background: 'var(--terracotta-light)', color: 'var(--terracotta)' }}
        >
          {example.title}
        </span>

        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          {example.marker}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--text)' }}>
          He aha tēnei?
        </p>

        <p className="mt-1 leading-relaxed" style={{ color: 'var(--text)' }}>
          {example.plainEnglish}
        </p>
      </div>

      <div
        className="mt-4 rounded-xl border p-4"
        style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--text)' }}>
          Rerenga mahi
        </p>

        <p className="mt-1 text-xs italic" style={{ color: 'var(--text)' }}>
          Sentence pattern
        </p>

        <div className="mt-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--terracotta)' }}>
            Māori
          </p>

          <p className="mt-1 font-mono text-sm" style={{ color: 'var(--text)' }}>
            {example.pattern}
          </p>
        </div>

        <div className="mt-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--terracotta)' }}>
            English
          </p>

          <p className="mt-1 italic text-sm" style={{ color: 'var(--text)' }}>
            {getEnglishPattern(example)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--text)' }}>
          Tauira
        </p>

        <p className="mt-2 text-xl font-bold maori-word">
          {example.maori}
        </p>

        <p className="mt-1 italic" style={{ color: 'var(--text)' }}>
          {example.english}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--text)' }}>
          He whakamārama
        </p>

        <p className="mt-1 leading-relaxed" style={{ color: 'var(--text)' }}>
          {example.why}
        </p>
      </div>
    </article>
  )
}

function PracticeLine({ label, prompt }: { label: string; prompt: string }) {
  return (
    <div
      className="rounded-xl border p-3"
      style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--terracotta)' }}>
        {label}
      </p>
      <p className="mt-1 font-mono text-sm" style={{ color: 'var(--text)' }}>
        {prompt}
      </p>
    </div>
  )
}

function ComingSoonTab({ word, topic }: { word: WordEntry; topic: string }) {
  const kupu = word.maori || 'kupu'

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--terracotta)' }}>
        Coming soon
      </p>

      <h3 className="mt-2 text-xl font-bold" style={{ color: 'var(--text)' }}>
        {topic} with <span className="maori-word">{kupu}</span>
      </h3>

      <p className="mt-3 leading-relaxed" style={{ color: 'var(--text)' }}>
        This section will teach the grammar using the kupu the learner searched for. For now, this is a clean placeholder
        so we can build the learning structure first and refine the exact grammar content later.
      </p>

      <div
        className="mt-4 rounded-xl border p-4"
        style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          Future structure
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm" style={{ color: 'var(--text)' }}>
          <li>Simple explanation</li>
          <li>Examples using “{kupu}”</li>
          <li>Everyday conversation note</li>
          <li>Formal / standard reo note</li>
          <li>Practice activity</li>
          <li>References and review status</li>
        </ul>
      </div>
    </div>
  )
}

function ReferencesBox() {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--terracotta)' }}>
        References to guide this section
      </p>

      <p className="mt-2 leading-relaxed" style={{ color: 'var(--text)' }}>
        This section is a working placeholder. As we refine it, we will check our explanations against trusted reo resources
        and write the final lesson in our own words.
      </p>

      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm" style={{ color: 'var(--text)' }}>
        <li>A Māori Reference Grammar — Ray Harlow</li>
        <li>Māori Made Easy — Scotty Morrison</li>
        <li>Māori at Home — Scotty and Stacey Morrison</li>
        <li>Takiura learning notes</li>
        <li>Reviewed community examples over time</li>
      </ul>
    </div>
  )
}