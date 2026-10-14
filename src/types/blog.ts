export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  content: string; // Markdown / HTML formatted or paragraph chunks
  keyTakeaways?: string[];
  calloutBox?: {
    title: string;
    description: string;
  };
}

export interface ArticleComparisonItem {
  name: string;
  bestFor: string;
  pricing: string;
  keyFeatures: string[];
  limitations: string[];
  rating: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  exactPath: string;
  aliases?: string[];
  title: string;
  subtitle: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  category: 'Beauty' | 'Style' | 'Money' | 'Digital' | 'Life';
  readTime: string;
  publishedDate: string;
  modifiedDate: string;
  publishedIso: string;
  modifiedIso: string;
  author: Author;
  featuredImage: string;
  imageAlt: string;
  excerpt: string;
  directAnswer?: {
    question: string;
    answer: string;
  };
  sections: ArticleSection[];
  comparisonTable?: ArticleComparisonItem[];
  faqs: FAQItem[];
  relatedArticleSlugs: string[];
}
