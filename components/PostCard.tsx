import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import { Calendar, User } from 'lucide-react'

export default function PostCard({ post }: { post: Post }) {
  if (!post) return null;

  const { title, excerpt, cover_image, author, categories } = post.metadata;
  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      {cover_image && (
        <Link href={`/posts/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={`${cover_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={800}
            height={450}
          />
        </Link>
      )}
      
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {categories && categories.length > 0 && categories.map(cat => (
            <CategoryBadge key={cat.id} category={cat} />
          ))}
        </div>
        
        <h2 className="mb-2 font-serif text-2xl font-bold text-gray-900 group-hover:text-primary-600">
          <Link href={`/posts/${post.slug}`}>
            {title}
          </Link>
        </h2>
        
        <p className="mb-6 flex-1 text-gray-600 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4 text-sm text-gray-500">
          {author && (
            <Link href={`/authors/${author.slug}`} className="flex items-center gap-2 hover:text-primary-600">
              <User className="h-4 w-4" />
              <span>{author.metadata.name}</span>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.created_at}>{date}</time>
          </div>
        </div>
      </div>
    </article>
  )
}