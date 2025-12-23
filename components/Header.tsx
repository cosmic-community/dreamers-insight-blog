import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'
import { Menu } from 'lucide-react'

export default async function Header() {
  const categories = await getAllCategories();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-tight text-gray-900">
              Dreamer's Insight
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Home
            </Link>
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                {category.metadata.title}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="md:hidden">
          <button className="text-gray-500 hover:text-gray-700">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
    </header>
  )
}