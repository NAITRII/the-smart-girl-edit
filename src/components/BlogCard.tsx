import React from 'react';
import { BlogPost } from '../types/blog';
import { ResponsiveImage } from './ResponsiveImage';
import { ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onNavigate,
  featured = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(post.exactPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (featured) {
    return (
      <article className="group cursor-pointer border border-[#E8E1D7] bg-[#FFFFFF] hover:border-[#C8B8A6] transition-all duration-300">
        <a
          href={post.exactPath}
          onClick={handleClick}
          className="grid grid-cols-1 lg:grid-cols-12 gap-0 text-inherit no-underline"
        >
          {/* Featured Image */}
          <div className="lg:col-span-7 overflow-hidden">
            <ResponsiveImage
              src={post.featuredImage}
              alt={post.imageAlt}
              aspectRatio="16:9"
              priority
              className="group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Featured Content Details */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-[#FFFFFF]">
            <div className="space-y-4">
              {/* Zero-Pill Unboxed Metadata with separators */}
              <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#7D7267] font-medium">
                <span className="text-[#966746] font-semibold">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishedDate}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-[#201D1A] group-hover:text-[#7A5B45] transition-colors leading-tight">
                {post.title}
              </h3>

              {/* Subtitle / Excerpt */}
              <p className="text-sm sm:text-base text-[#61574E] leading-relaxed line-clamp-3 font-sans">
                {post.excerpt}
              </p>
            </div>

            {/* Read More Link */}
            <div className="pt-6 mt-6 border-t border-[#F0EBE3] flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#241F1C] group-hover:text-[#7A5B45]">
              <span>Read Article</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </a>
      </article>
    );
  }

  return (
    <article className="group cursor-pointer border border-[#E8E1D7] bg-[#FFFFFF] hover:border-[#C8B8A6] flex flex-col h-full transition-all duration-300">
      <a
        href={post.exactPath}
        onClick={handleClick}
        className="flex flex-col h-full text-inherit no-underline"
      >
        {/* Card Image */}
        <div className="overflow-hidden">
          <ResponsiveImage
            src={post.featuredImage}
            alt={post.imageAlt}
            aspectRatio="4:3"
            className="group-hover:scale-[1.03] transition-transform duration-700"
          />
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-[#FFFFFF]">
          <div className="space-y-3">
            {/* Zero-Pill Metadata */}
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#7D7267] font-medium">
              <span className="text-[#966746] font-semibold">{post.category}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#201D1A] group-hover:text-[#7A5B45] transition-colors leading-snug">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-[#61574E] leading-relaxed line-clamp-3 font-sans">
              {post.excerpt}
            </p>
          </div>

          {/* Bottom Action */}
          <div className="pt-5 mt-5 border-t border-[#F0EBE3] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#241F1C] group-hover:text-[#7A5B45]">
            <span>Read More</span>
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </a>
    </article>
  );
};
