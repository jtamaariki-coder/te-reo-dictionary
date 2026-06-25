import type { Metadata } from 'next'
import SubmissionForm from '@/components/SubmissionForm'

export const metadata: Metadata = {
  title: 'Submit a word',
  description: 'Submit a new te reo Māori word for inclusion in the dictionary.',
}

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-forest-800 dark:text-forest-200 mb-2">
        Tukua he kupu
      </h1>
      <p className="text-earth-500 dark:text-earth-400 italic mb-2">Submit a word</p>
      <p className="text-sm text-[var(--foreground)] leading-relaxed mb-8">
        Fill in the details below. When you click submit, a pre-filled GitHub Issue will open in a new tab — review it and click <strong>Submit new issue</strong>. Our team will review and add it to the dictionary.
      </p>
      <SubmissionForm />
    </div>
  )
}
