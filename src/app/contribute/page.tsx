import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contribute',
  description: 'How to contribute words, example sentences, and corrections to the Te Reo Māori Dictionary.',
}

const STEPS = [
  {
    step: '1',
    title: 'Submit a word via the form',
    body: 'Use the submission form to provide a Māori word, its English meaning, definition, and an example sentence. The form opens a pre-filled GitHub Issue for review.',
  },
  {
    step: '2',
    title: 'Our team reviews it',
    body: 'Jackson or Seymore (or a trusted reo speaker) will review the submission for accuracy, macron spelling, and cultural appropriateness.',
  },
  {
    step: '3',
    title: 'Merged into words.json',
    body: 'Approved words are added to the dictionary via a GitHub pull request and marked verified: true. You\'ll be credited in the commit if you provided your name.',
  },
  {
    step: '4',
    title: 'The site rebuilds automatically',
    body: 'Vercel detects the new commit and rebuilds the static site. Your word is live within minutes.',
  },
]

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-forest-800 dark:text-forest-200 mb-2">
        Āwhina mai
      </h1>
      <p className="text-earth-500 dark:text-earth-400 italic mb-8">Help us grow</p>

      <p className="text-[var(--foreground)] leading-relaxed mb-8">
        This dictionary grows through community contributions. If you know a word, a whakatauki, or an example sentence that should be here — share it. No GitHub account is required for the form itself, but you will need one to submit the issue.
      </p>

      {/* Steps */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-6">
          How it works
        </h2>
        <ol className="space-y-4">
          {STEPS.map((s) => (
            <li key={s.step} className="flex gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-forest-600 dark:bg-forest-500 text-white flex items-center justify-center text-sm font-bold">
                {s.step}
              </span>
              <div>
                <p className="font-semibold text-sm text-[var(--foreground)]">{s.title}</p>
                <p className="text-sm text-earth-600 dark:text-earth-400 mt-0.5">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Guidelines */}
      <section className="mb-10 card p-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-3">
          Submission guidelines
        </h2>
        <ul className="space-y-2 text-sm text-[var(--foreground)]">
          <li>✓ Always use correct macrons (ā ē ī ō ū) in the Māori word field</li>
          <li>✓ Provide at least one example sentence in te reo Māori</li>
          <li>✓ Credit your source (Te Aka, personal knowledge, kura kaupapa, etc.)</li>
          <li>✓ If providing iwi-specific or dialect words, note the dialect</li>
          <li>✗ Do not submit words from copyrighted sources without permission</li>
        </ul>
      </section>

      {/* GitHub PR route */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-earth-400 dark:text-earth-600 mb-3">
          Contributing via GitHub
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed mb-3">
          If you are comfortable with GitHub, you can contribute directly by editing <code className="text-xs bg-earth-100 dark:bg-earth-900 px-1 py-0.5 rounded font-mono">data/words.json</code> and opening a pull request. Follow the existing schema exactly.
        </p>
        <a
          href="https://github.com/YOUR_ORG/te-reo-dictionary"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm inline-flex items-center gap-2"
        >
          View on GitHub →
        </a>
      </section>

      <div className="text-center">
        <Link href="/submit" className="btn-primary">
          Submit a word now →
        </Link>
      </div>
    </div>
  )
}
