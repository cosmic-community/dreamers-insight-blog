import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 sm:text-5xl">
          The Courage to Dream
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Explore thoughts on philosophy, development, and the price of pursuing a vision.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-lg text-gray-600">No posts found yet. Start dreaming!</p>
        </div>
      )}
    </div>
  )
}