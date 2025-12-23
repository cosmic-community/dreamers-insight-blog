// app/categories/[slug]/page.tsx
import { getPostsByCategory } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import { notFound } from 'next/navigation'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { posts, category } = await getPostsByCategory(slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="mb-2 block text-sm font-semibold uppercase tracking-wider text-primary-600">
          Category
        </span>
        <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 sm:text-5xl">
          {category.metadata.title}
        </h1>
        {category.metadata.description && (
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {category.metadata.description}
          </p>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-lg text-gray-600">No posts found in this category.</p>
        </div>
      )}
    </div>
  )
}