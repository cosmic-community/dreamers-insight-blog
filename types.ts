export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    title: string;
    description?: string;
  };
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title: string;
    excerpt: string;
    content: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    categories?: Category[];
  };
}