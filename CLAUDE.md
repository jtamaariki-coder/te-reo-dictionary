# Te Reo Māori Dictionary — Claude Code Context Document

> **Project owners:** Jackson + Seymore  
> **Build engine:** Claude Code (plan mode first, then execute)  
> **Type:** Static site — no backend, no database  
> **Status:** In progress — core build complete, adding content and features

---

## 1. Project overview

We are building a free, open, community-driven **Te Reo Māori dictionary** for all New Zealanders. The goal is to become the best te reo Māori dictionary available online — surpassing existing references like **Te Aka** (maoridictionary.co.nz) and **Kupu** (kupu.maori.nz) by being faster, more beautiful, more community-connected, and more comprehensive over time.

This is a long-term kaupapa. We are starting from scratch with a static site, then growing the data through partnerships with kura kaupapa, iwi, and other te reo experts.

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14** (static export) | `output: 'export'` in next.config — no server needed |
| Language | **TypeScript** | Strict mode |
| Styling | **Tailwind CSS** | Mobile-first |
| Data layer | **JSON files** | Words stored as structured `.json` in `/data/` |
| Search | **Fuse.js** | Client-side fuzzy search, no API calls |
| Audio | **HTML5 `<audio>`** | MP3 files stored in `/public/audio/` |
| Animations | **Framer Motion** | Subtle, tasteful |
| Hosting | **Vercel** (static) | Free tier, fast CDN globally |
| Version control | **GitHub** | Public repo |

> **No backend. No database. No auth.** Everything is file-based and client-side. This keeps the site fast, free to host, and easy for the community to contribute to via GitHub pull requests.

---

## 3. Data structure

All dictionary words live in `/data/words.json`. Each word entry follows this schema:

```json
{
  "id": "unique-slug",
  "maori": "aroha",
  "english": ["love", "compassion", "empathy"],
  "pronunciation": "ah-roh-hah",
  "audio": "/audio/aroha.mp3",
  "part_of_speech": "noun",
  "categories": ["emotions", "values", "common"],
  "definition": "The feeling of deep affection, compassion, and empathy toward others.",
  "example_sentences": [
    {
      "maori": "He aroha whakatō, he aroha puta mai.",
      "english": "If you sow love, love will be returned."
    }
  ],
  "related_words": ["manaaki", "ngākau"],
  "source": "Te Aka",
  "verified": true,
  "submitted_by": null,
  "date_added": "2026",
"dialect": null
}
```

### Categories (initial set)
- `common` — everyday vocabulary
- `whanau` — family and relationships
- `emotions` — feelings and states of mind
- `nature` — environment, land, sea
- `body` — te tinana
- `numbers` — ngā tau
- `colours` — ngā tae
- `food` — kai
- `actions` — verbs and doing words
- `values` — tikanga and cultural concepts
- `waka-ama` — paddling and water sports specific
- `kura` — school / learning context

---

## 4. Features

### 4.1 Bidirectional search
- Search **English → Māori** and **Māori → English** simultaneously
- Powered by **Fuse.js** (client-side, instant, fuzzy-tolerant)
- Handles macrons (ā, ē, ī, ō, ū) — search without macrons still returns results
- Results ranked by relevance
- URL updates on search: `/search?q=love`

### 4.2 Word detail page
- Route: `/word/[slug]`
- Displays: Māori word, English meanings, pronunciation guide, audio player, part of speech, categories, definition, example sentences, related words, source attribution

### 4.3 Audio pronunciation
- HTML5 `<audio>` player on each word page
- MP3 files in `/public/audio/[word].mp3`
- Initially: synthesized or sourced audio; eventually: native speaker recordings
- Fallback: phonetic pronunciation text if no audio file exists

### 4.4 Example sentences
- At least one Māori sentence + English translation per word
- Displayed in a styled bilingual block
- Sourced from Te Aka, whakatauki (proverbs), and community contributions

### 4.5 Word categories / tags
- Filter browse page by category
- Route: `/category/[slug]`
- Visual tag chips on each word card

### 4.6 Community submissions
- A static **submission form** that generates a GitHub Issue (via GitHub Issues API or a Formspree/Netlify Forms fallback)
- Fields: Māori word, English meaning, example sentence, source, submitter name (optional), iwi/hapū (optional)
- Submissions reviewed by Jackson/Seymore before being added to `words.json` via pull request
- No user accounts required — low friction, community-first

### 4.7 Browse / explore
- Route: `/browse`
- Alphabetical listing (Māori alphabet order: a, ā, e, ē, h, i, ī, k, m, n, ng, o, ō, p, r, t, u, ū, w, wh)
- Filter by category, letter, or part of speech
- Word count displayed

---

## 5. Page structure / routes

```
/                    → Homepage — hero search, featured words, categories
/search?q=...        → Search results page
/word/[slug]         → Individual word page
/browse              → Full browse / A–Z listing
/category/[slug]     → Words filtered by category
/about               → About the kaupapa, team, data sources
/contribute          → How to contribute, submission form
/submit              → Word submission form
```

---

## 6. Design direction

- **Feeling:** Clean, proud, modern — not touristy, not colonial-aesthetic
- **Colour palette:** Deep forest greens, earth tones, warm off-whites — inspired by NZ nature (ngahere, moana, whenua)
- **Typography:** Strong display font for Māori words; clean sans-serif for UI
- **Macron support:** All text rendering must correctly display ā ē ī ō ū
- **Mobile-first:** Majority of users will be on phones
- **Dark mode:** Support from day one
- **No clutter:** Each word gets space to breathe — this is a taonga, treat it that way

---

## 7. Data sourcing plan

We are building the word list from multiple sources over time. Sources to draw from:

| Source | Type | Notes |
|---|---|---|
| **Te Aka** (maoridictionary.co.nz) | Reference | Most comprehensive existing dictionary — use as primary reference baseline |
| **Kupu** (kupu.maori.nz) | Reference | Good for common everyday words |
| **Te Taura Whiri i te Reo Māori** | Official body | NZ Māori Language Commission — authoritative definitions |
| **Kura kaupapa Māori** | Community | Direct outreach — they will contribute words + example sentences in context |
| **Iwi reo rūnanga** | Community | Iwi-specific vocabulary and dialect variations |
| **Whakatauki databases** | Cultural | Proverbs as example sentences |
| **Community submissions** | Crowdsourced | Via the submit form on the site |

All entries must carry a `source` field. Verified entries (reviewed by a speaker) are flagged `verified: true`.

---

## 8. File structure

```
te-reo-dictionary/
├── data/
│   ├── words.json              ← main word database
│   ├── categories.json         ← category definitions
│   └── whakatauki.json         ← proverbs database
├── public/
│   ├── audio/                  ← MP3 pronunciation files
│   └── images/                 ← og images, logos
├── src/
│   ├── app/
│   │   ├── page.tsx            ← homepage
│   │   ├── search/page.tsx     ← search results
│   │   ├── word/[slug]/page.tsx
│   │   ├── browse/page.tsx
│   │   ├── category/[slug]/page.tsx
│   │   ├── about/page.tsx
│   │   └── contribute/page.tsx
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── WordCard.tsx
│   │   ├── WordDetail.tsx
│   │   ├── AudioPlayer.tsx
│   │   ├── CategoryBadge.tsx
│   │   ├── ExampleSentence.tsx
│   │   ├── SubmissionForm.tsx
│   │   └── BrowseList.tsx
│   ├── lib/
│   │   ├── search.ts           ← Fuse.js search logic
│   │   ├── words.ts            ← data loading helpers
│   │   └── macrons.ts          ← macron normalisation utils
│   └── types/
│       └── dictionary.ts       ← TypeScript types
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 9. Seed word list (initial batch to build with)

Start with ~50 high-frequency, culturally significant words. Include a mix of categories. Examples:

- aroha, whanau, kai, moana, maunga, awa, ngahere
- tūrangawaewae, manaakitanga, kaitiakitanga, whakapapa
- numbers 1–10, days of the week, colours
- waka, hoe, ama, ihu, kupe (waka ama specific)
- kia ora, tēnā koe, kei te pēhea koe, ka pai

---

## 10. Constraints and conventions

- **No backend** — do not introduce a server, database, or auth system
- **No CMS** — words.json is the source of truth
- **Macrons matter** — never strip or ignore macrons in display; only normalise for search input
- **Source attribution always** — every word must credit its source
- **Accessibility** — semantic HTML, proper ARIA labels, audio controls keyboard-accessible
- **Commit often** — Claude Code commits after every meaningful task
- **Static export only** — `next build` must produce a static `/out` folder deployable to Vercel/Netlify/GitHub Pages
- **NO AI-generated te reo content** — never generate, suggest, or invent Māori words, definitions, translations, or example sentences. All content must come from verified human sources only (Te Aka, Te Taura Whiri, kura, iwi). If asked to generate te reo content, refuse.
- **Branch is `master`** — not main
- **Two owners** — Jackson and Seymore both review PRs before merging. Do not merge unilaterally.
- **Fuse.js config** — threshold 0.2, minMatchCharLength 3. Do not change these without discussion.

---

## 11. Out of scope (for now)

- User accounts / login
- Database (Supabase, Postgres, etc.)
- Paid features
- Mobile app
- Video content
- Real-time collaboration

---

## 12. Current status
Project is built and deployed. Do not re-scaffold. Read the existing file structure before making any changes. Run `next build` after any significant change to confirm static export still works.

When starting in **plan mode**, Claude Code should:

1. Scaffold the full Next.js 14 project with TypeScript + Tailwind + static export config
2. Create the `words.json` schema and seed with ~50 words across all categories
3. Build the data loading utilities (`/lib/words.ts`, `/lib/search.ts`, `/lib/macrons.ts`)
4. Build all TypeScript types in `/types/dictionary.ts`
5. Build all components one at a time, starting with `SearchBar`, `WordCard`, `WordDetail`
6. Build all routes: homepage → search → word detail → browse → category → contribute
7. Wire up Fuse.js search with macron normalisation
8. Add audio player component (graceful fallback if no MP3 exists)
9. Add submission form (GitHub Issues API or Formspree)
10. Style everything to the design direction above — green/earth palette, dark mode, mobile-first
11. Final: `next build` static export, verify no errors, push to GitHub

**Do not skip plan mode.** Show the full file tree and task list before writing any code.

---

## 13. Partnership and community notes

- We will reach out to **kura kaupapa Māori** across Tāmaki Makaurau and wider Aotearoa to contribute words and example sentences
- **Iwi reo rūnanga** to be contacted for dialect-specific vocabulary
- The site should feel like it *belongs* to the Māori language community — not built for them, built *with* them
- Attribution and mana of contributors is important — credit is given where it is due
- Long-term: consider a `dialect` field on word entries to capture regional variations

---
