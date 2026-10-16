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
          aria-label={`Read complete article: ${post.title}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-0 text-inherit no-underline"
        >
          {/* Featured Image - Small Size Container */}
          <div className="lg:col-span-5 overflow-hidden max-h-48 sm:max-h-52 bg-[#F2EDE4] flex items-center justify-center">
            <ResponsiveImage
              src={post.featuredImage}
              alt={post.imageAlt || `Featured editorial image for ${post.title}`}
              aspectRatio="16:9"
              priority
              className="w-full h-full max-h-48 sm:max-h-52 object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Featured Content Details */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#FFFFFF]">
            <div className="space-y-3">
              {/* Zero-Pill Unboxed Metadata with separators */}
              <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#7D7267] font-medium">
                <span className="text-[#966746] font-semibold">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishedDate}</span>
              </div>

              {/* Title as Anchor Text (H2 with question mark) */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-semibold text-[#201D1A] group-hover:text-[#7A5B45] transition-colors leading-tight">
                {post.title.endsWith('?') ? post.title : (['skincare-routine-for-beginners', 'capsule-wardrobe-essentials-for-women', 'how-to-manage-money-in-your-20s'].includes(post.id) ? `${post.title}?` : post.title)}
              </h2>

              {/* Subtitle / Excerpt */}
              <p className="text-xs sm:text-sm text-[#61574E] leading-relaxed line-clamp-2 font-sans">
                {post.excerpt}
              </p>
            </div>

            {/* Read More Link with Explicit Anchor Text */}
            <div className="pt-4 mt-4 border-t border-[#F0EBE3] flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#241F1C] group-hover:text-[#7A5B45]">
              <span className="flex items-center gap-1.5">
                <span>Read Full Article:</span>
                <span className="font-serif normal-case italic font-medium text-[#7A5B45] line-clamp-1">{post.title}</span>
              </span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
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
        aria-label={`Read article: ${post.title}`}
        className="flex flex-col h-full text-inherit no-underline"
      >
        {/* Card Image - Small Size Container */}
        <div className="overflow-hidden max-h-36 sm:max-h-40 bg-[#F2EDE4]">
          <ResponsiveImage
            src={post.featuredImage}
            alt={post.imageAlt || `Editorial image for ${post.title}`}
            aspectRatio="16:9"
            className="w-full max-h-36 sm:max-h-40 object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-[#FFFFFF]">
          <div className="space-y-2.5">
            {/* Zero-Pill Metadata */}
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#7D7267] font-medium">
              <span className="text-[#966746] font-semibold">{post.category}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title as Anchor Text (H2 with question mark) */}
            <h2 className="text-lg sm:text-xl font-serif font-semibold text-[#201D1A] group-hover:text-[#7A5B45] transition-colors leading-snug">
              {post.title.endsWith('?') ? post.title : (['skincare-routine-for-beginners', 'capsule-wardrobe-essentials-for-women', 'how-to-manage-money-in-your-20s'].includes(post.id) ? `${post.title}?` : post.title)}
            </h2>

            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-[#61574E] leading-relaxed line-clamp-2 font-sans">
              {post.excerpt}
            </p>
          </div>

          {/* Bottom Action with Descriptive Anchor Text */}
          <div className="pt-4 mt-4 border-t border-[#F0EBE3] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#241F1C] group-hover:text-[#7A5B45]">
            <span className="flex items-center gap-1">
              <span>Read Guide:</span>
              <span className="font-serif normal-case italic font-normal text-[#7A5B45] line-clamp-1">{post.title}</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </div>
        </div>
      </a>
    </article>
  );
};
