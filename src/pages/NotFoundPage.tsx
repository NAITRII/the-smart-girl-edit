import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/articles';
import { SEOHead } from '../components/SEOHead';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center max-w-2xl mx-auto space-y-6">
      <SEOHead
        title="Page Not Found – The Smart Girl Edit"
        description="The requested page could not be found. Explore curated lifestyle guides on The Smart Girl Edit."
        canonicalPath="/404"
        noIndex={true}
      />
      <span className="text-xs uppercase tracking-widest font-semibold text-[#8B6B52]">
        Page Not Found
      </span>
      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1F1B18]">
        This page seems to have slipped off our reading list.
      </h1>
      <p className="text-sm sm:text-base text-[#61574E] leading-relaxed">
        The link you followed may have moved or doesn't exist. Explore our curated editorial guides below:
      </p>

      <div className="w-full text-left bg-white border border-[#E2D8CC] p-6 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#8B6B52] flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Core Editorial Guides</span>
        </div>
        <ul className="divide-y divide-[#F0EBE3] text-sm text-[#2E2722]">
          <li>
            <a
              href="/blog-about-lifestyle"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog-about-lifestyle');
              }}
              className="py-2.5 flex items-center justify-between hover:text-[#8B6B52] transition-colors"
            >
              <span>Homepage (Blog About Lifestyle)</span>
              <span className="text-xs text-[#8C7E72] font-mono">/blog-about-lifestyle</span>
            </a>
          </li>
          {BLOG_POSTS.map((post) => (
            <li key={post.id}>
              <a
                href={post.exactPath}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(post.exactPath);
                }}
                className="py-2.5 flex items-center justify-between hover:text-[#8B6B52] transition-colors"
              >
                <span>{post.title}</span>
                <span className="text-xs text-[#8C7E72] font-mono">{post.exactPath}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onNavigate('/blog-about-lifestyle')}
        className="px-6 py-3 text-xs uppercase tracking-widest font-semibold bg-[#2E2722] text-white hover:bg-[#4A3F37] transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Homepage</span>
      </button>
    </div>
  );
};
