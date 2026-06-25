'use client'

import { useRef, useState } from 'react'

interface Props {
  src: string | null
  pronunciation: string
  word: string
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

function SpeakerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

export default function AudioPlayer({ src, pronunciation, word }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      audio.currentTime = 0
      setPlaying(false)
    } else {
      audio.play().catch(() => setError(true))
    }
  }

  if (!src || error) {
    return (
      <div className="flex items-center gap-2 text-sm text-earth-500 dark:text-earth-400">
        <SpeakerIcon />
        <span className="font-mono tracking-wide">{pronunciation}</span>
        {!src && <span className="text-xs text-earth-400">(no audio yet)</span>}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={togglePlay}
        aria-label={playing ? `Pause pronunciation of ${word}` : `Play pronunciation of ${word}`}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-forest-600 dark:bg-forest-500 text-white hover:bg-forest-700 dark:hover:bg-forest-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className="flex items-center gap-1.5 text-sm text-earth-600 dark:text-earth-400">
        <SpeakerIcon />
        <span className="font-mono tracking-wide">{pronunciation}</span>
      </div>
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setError(true)}
        preload="none"
      />
    </div>
  )
}
