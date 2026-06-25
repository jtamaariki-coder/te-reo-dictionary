import Link from 'next/link'
import type { Category } from '@/types/dictionary'
import { getCategories } from '@/lib/words'

const COLOUR_MAP: Record<string, string> = {
  forest: 'bg-forest-100 text-forest-800 dark:bg-forest-800 dark:text-forest-200 hover:bg-forest-200 dark:hover:bg-forest-700',
  earth:  'bg-earth-100  text-earth-800  dark:bg-earth-900  dark:text-earth-300  hover:bg-earth-200  dark:hover:bg-earth-800',
  moana:  'bg-moana-100  text-moana-800  dark:bg-moana-900  dark:text-moana-300  hover:bg-moana-200  dark:hover:bg-moana-800',
}

const DEFAULT_COLOUR = COLOUR_MAP.forest

let _categoryMap: Map<string, Category> | null = null
function getCategoryMap(): Map<string, Category> {
  if (!_categoryMap) {
    _categoryMap = new Map(getCategories().map((c) => [c.slug, c]))
  }
  return _categoryMap
}

interface CategoryBadgeProps {
  slug: string
  size?: 'sm' | 'md'
  noLink?: boolean
}

export default function CategoryBadge({ slug, size = 'md', noLink = false }: CategoryBadgeProps) {
  const cat = getCategoryMap().get(slug)
  const label = cat?.label ?? slug
  const colourClass = cat ? (COLOUR_MAP[cat.colour] ?? DEFAULT_COLOUR) : DEFAULT_COLOUR
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'

  const className = `tag font-medium transition-colors ${colourClass} ${sizeClass}`

  if (noLink) {
    return <span className={className}>{label}</span>
  }

  return (
    <Link href={`/category/${slug}`} className={className}>
      {label}
    </Link>
  )
}
