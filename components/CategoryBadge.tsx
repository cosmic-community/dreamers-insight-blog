import Link from 'next/link'
import { Category } from '@/types'

export default function CategoryBadge({ category }: { category: Category }) {
  if (!category) return null;

  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
    >
      {category.metadata.title}
    </Link>
  )
}