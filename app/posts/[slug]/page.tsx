// app/posts/[slug]/page.tsx
import { getPostBySlug } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { title, content, cover_image, author, categories } = post.metadata
  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'long', 
    day: 'numeric', 
    year: 'numeric'
  })

  return (
    <article className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {categories?.map((cat) => (
              <CategoryBadge key={cat.id} category={cat} />
            ))}
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-600">
            {author && (
              <Link href={`/authors/${author.slug}`} className="font-medium hover:text-primary-600">
                {author.metadata.name}
              </Link>
            )}
            <span>•</span>
            <time dateTime={post.created_at}>{date}</time>
          </div>
        </div>

        {cover_image && (
          <div className="mb-12 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={`${cover_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={title}
              className="h-auto w-full object-cover"
              width={1200}
              height={600}
            />
          </div>
        )}

        <div className="prose prose-lg prose-gray mx-auto prose-headings:font-serif prose-a:text-primary-600">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {author && (
          <div className="mt-16 flex items-center gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            {author.metadata.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                className="h-20 w-20 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="mb-1 font-serif text-xl font-bold text-gray-900">
                About {author.metadata.name}
              </h3>
              <p className="text-gray-600">{author.metadata.bio}</p>
              <Link 
                href={`/authors/${author.slug}`}
                className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all posts by {author.metadata.name} →
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}