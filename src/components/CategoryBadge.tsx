import Link from 'next/link'
import type { Category } from '@/types/dictionary'
import { getCategories } from '@/lib/words'

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
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'

  const style: React.CSSProperties = {
    background: 'var(--terracotta-light)',
    color: 'var(--terracotta)',
    border: '1px solid color-mix(in srgb, var(--terracotta) 30%, transparent)',
  }

  const className = `tag font-medium transition-colors ${sizeClass}`

  if (noLink) {
    return <span className={className} style={style}>{label}</span>
  }

  return (
    <Link href={`/category/${slug}`} className={className} style={style}>
      {label}
    </Link>
  )
}
