// app/authors/[slug]/page.tsx
import { getPostsByAuthor } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import { notFound } from 'next/navigation'

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { posts, author } = await getPostsByAuthor(slug)

  if (!author) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-16 flex flex-col items-center text-center">
        {author.metadata.avatar && (
          <img
            src={`${author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={author.metadata.name}
            className="mb-6 h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
        )}
        <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900">
          {author.metadata.name}
        </h1>
        {author.metadata.bio && (
          <p className="max-w-xl text-lg text-gray-600">
            {author.metadata.bio}
          </p>
        )}
      </div>

      <div className="mb-8 border-b border-gray-200 pb-4">
        <h2 className="font-serif text-2xl font-bold text-gray-900">
          Articles by {author.metadata.name}
        </h2>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-lg text-gray-600">No posts found for this author.</p>
        </div>
      )}
    </div>
  )
}