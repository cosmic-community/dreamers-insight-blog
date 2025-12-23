import { createBucketClient } from '@cosmicjs/sdk';
import { Post, Author, Category } from '@/types';

// Initialize the Cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || 'leonardo-boff-production',
  readKey: process.env.COSMIC_READ_KEY || 'kvAh7MMqgwhqfHW3kvgZYnvXhDqixtOqAipN3UhwV1HNP90GaO',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
});

// Helper to check for Cosmic errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object as Post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<{ posts: Post[], category: Category | null }> {
  try {
    // First get the category ID
    const categoryResponse = await cosmic.objects
      .findOne({ type: 'categories', slug: categorySlug })
      .props(['id', 'slug', 'title', 'metadata']);
    
    const category = categoryResponse.object as Category;
    
    if (!category) {
      return { posts: [], category: null };
    }

    // Then find posts with this category
    const postsResponse = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.categories': category.id
      })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
      
    return { 
      posts: postsResponse.objects as Post[], 
      category 
    };
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return { posts: [], category: null };
    console.error(`Error fetching category ${categorySlug}:`, error);
    return { posts: [], category: null };
  }
}

export async function getPostsByAuthor(authorSlug: string): Promise<{ posts: Post[], author: Author | null }> {
  try {
    // First get the author
    const authorResponse = await cosmic.objects
      .findOne({ type: 'authors', slug: authorSlug })
      .props(['id', 'slug', 'title', 'metadata']);
    
    const author = authorResponse.object as Author;
    
    if (!author) {
      return { posts: [], author: null };
    }

    // Then find posts by this author
    const postsResponse = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': author.id
      })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
      
    return { 
      posts: postsResponse.objects as Post[], 
      author 
    };
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return { posts: [], author: null };
    console.error(`Error fetching author ${authorSlug}:`, error);
    return { posts: [], author: null };
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    return [];
  }
}