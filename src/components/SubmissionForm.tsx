'use client'

import { useState } from 'react'

const REPO = 'YOUR_ORG/te-reo-dictionary'

interface FormState {
  maori: string
  english: string
  definition: string
  example_maori: string
  example_english: string
  source: string
  name: string
  iwi: string
}

const INITIAL: FormState = {
  maori: '',
  english: '',
  definition: '',
  example_maori: '',
  example_english: '',
  source: '',
  name: '',
  iwi: '',
}

function buildIssueUrl(form: FormState): string {
  const title = encodeURIComponent(`[Word submission] ${form.maori}`)
  const body = encodeURIComponent(
    `## Word submission\n\n` +
    `**Māori word:** ${form.maori}\n` +
    `**English meaning(s):** ${form.english}\n` +
    `**Definition:** ${form.definition}\n\n` +
    `**Example sentence (Māori):** ${form.example_maori}\n` +
    `**Example sentence (English):** ${form.example_english}\n\n` +
    `**Source:** ${form.source}\n` +
    `**Submitted by:** ${form.name || 'Anonymous'}\n` +
    `**Iwi / hapū:** ${form.iwi || 'Not specified'}\n`
  )
  return `https://github.com/${REPO}/issues/new?title=${title}&body=${body}&labels=word-submission`
}

export default function SubmissionForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.maori.trim() || !form.english.trim()) return
    window.open(buildIssueUrl(form), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card p-6 text-center">
        <p className="text-2xl mb-2">Ka pai!</p>
        <p className="text-[var(--foreground)] mb-4">
          Your browser opened a GitHub Issue pre-filled with your submission. Review it and click <strong>Submit new issue</strong> to send it through.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-ghost text-sm">
          Submit another word
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="maori" className="block text-sm font-medium mb-1">
            Māori word <span className="text-red-500">*</span>
          </label>
          <input
            id="maori"
            type="text"
            value={form.maori}
            onChange={update('maori')}
            required
            placeholder="e.g. aroha"
            className="input-base font-display"
          />
        </div>
        <div>
          <label htmlFor="english" className="block text-sm font-medium mb-1">
            English meaning(s) <span className="text-red-500">*</span>
          </label>
          <input
            id="english"
            type="text"
            value={form.english}
            onChange={update('english')}
            required
            placeholder="e.g. love, compassion"
            className="input-base"
          />
        </div>
      </div>

      <div>
        <label htmlFor="definition" className="block text-sm font-medium mb-1">
          Definition
        </label>
        <textarea
          id="definition"
          value={form.definition}
          onChange={update('definition')}
          rows={3}
          placeholder="A full sentence describing the word's meaning and cultural context."
          className="input-base resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="example_maori" className="block text-sm font-medium mb-1">
            Example sentence (Māori)
          </label>
          <input
            id="example_maori"
            type="text"
            value={form.example_maori}
            onChange={update('example_maori')}
            placeholder="He aroha whakatō, he aroha puta mai."
            className="input-base font-display"
          />
        </div>
        <div>
          <label htmlFor="example_english" className="block text-sm font-medium mb-1">
            Example sentence (English)
          </label>
          <input
            id="example_english"
            type="text"
            value={form.example_english}
            onChange={update('example_english')}
            placeholder="If you sow love, love will be returned."
            className="input-base"
          />
        </div>
      </div>

      <div>
        <label htmlFor="source" className="block text-sm font-medium mb-1">
          Source
        </label>
        <input
          id="source"
          type="text"
          value={form.source}
          onChange={update('source')}
          placeholder="e.g. Te Aka, personal knowledge, kura kaupapa"
          className="input-base"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your name <span className="text-earth-400 text-xs">(optional)</span>
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={update('name')}
            placeholder="Anonymous"
            className="input-base"
          />
        </div>
        <div>
          <label htmlFor="iwi" className="block text-sm font-medium mb-1">
            Iwi / hapū <span className="text-earth-400 text-xs">(optional)</span>
          </label>
          <input
            id="iwi"
            type="text"
            value={form.iwi}
            onChange={update('iwi')}
            placeholder="e.g. Ngāti Porou"
            className="input-base"
          />
        </div>
      </div>

      <div className="pt-2">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Submit via GitHub →
        </button>
        <p className="mt-2 text-xs text-earth-500 dark:text-earth-500">
          This opens a pre-filled GitHub Issue for review by our team. You&rsquo;ll need a GitHub account.
        </p>
      </div>
    </form>
  )
}
