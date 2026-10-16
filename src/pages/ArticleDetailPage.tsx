import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types/blog';
import { BLOG_POSTS } from '../data/articles';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft, Clock, Calendar, Share2, Check, ArrowRight, Bookmark, ThumbsUp, Sparkles, BookOpen } from 'lucide-react';

interface ArticleDetailPageProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
  onOpenNewsletter: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  post,
  onNavigate,
  onOpenNewsletter,
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Track scroll depth for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find related articles (matching slugs or fallback to same category)
  const relatedArticles = BLOG_POSTS.filter((item) => {
    if (item.slug === post.slug) return false;
    if (post.relatedArticleSlugs?.includes(item.slug)) return true;
    return item.category === post.category;
  }).slice(0, 3);

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.subtitle,
    image: [window.location.origin + post.featuredImage],
    datePublished: post.publishedIso,
    dateModified: post.modifiedIso,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: window.location.origin,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Smart Girl Edit',
      logo: {
        '@type': 'ImageObject',
        url: window.location.origin + '/logo.svg',
      },
    },
    description: post.metaDescription,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': window.location.origin + post.exactPath,
    },
    keywords: [post.primaryKeyword, ...post.relatedKeywords].join(', '),
  };

  // Breadcrumbs Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: window.location.origin + '/blog-about-lifestyle',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.category,
        item: window.location.origin + '/blog-about-lifestyle',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: window.location.origin + post.exactPath,
      },
    ],
  };

  // FAQ Schema for AEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <article className="min-h-screen pb-24">
      <SEOHead
        title={post.seoTitle}
        description={post.metaDescription}
        canonicalPath={post.exactPath}
        ogType="article"
        publishedTime={post.publishedIso}
        modifiedTime={post.modifiedIso}
        authorName={post.author.name}
        image={post.featuredImage}
        jsonLd={[articleSchema, breadcrumbSchema, faqSchema]}
      />

      {/* Reading Progress Line */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#8B6B52] z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Top Breadcrumb & Back Bar */}
      <div className="border-b border-[#EAE3D9] bg-[#F7F4EE] py-4">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-xs text-[#7A6F64]">
          <div className="flex items-center gap-2">
            <a
              href="/blog-about-lifestyle"
              onClick={(e) => handleLink(e, '/blog-about-lifestyle')}
              className="flex items-center gap-1 hover:text-[#1F1B18] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </a>
            <span aria-hidden="true">/</span>
            <span className="uppercase tracking-wider font-semibold text-[#8B6B52]">
              {post.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs hover:text-[#1F1B18] border border-[#DDD3C7] bg-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Header (Editorial Hero) */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center space-y-5">
        {/* Unboxed Metadata */}
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#7A6F64]">
          <span className="text-[#8B6B52]">{post.category} Edit</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 inline" /> {post.readTime}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 inline" /> {post.publishedDate}
          </span>
        </div>

        {/* Exact Main H1 Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-serif font-bold text-[#1F1B18] leading-[1.18] tracking-tight text-balance">
          {post.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#665D54] max-w-2xl mx-auto leading-relaxed font-sans">
          {post.subtitle}
        </p>

        {/* Author Bylines */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <img
            src={post.author.avatar}
            alt={`Portrait of ${post.author.name}, ${post.author.role}`}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover border border-[#D5C7B7]"
          />
          <div className="text-left text-xs">
            <div className="font-semibold text-[#1F1B18]">{post.author.name}</div>
            <div className="text-[#7C7166]">{post.author.role}</div>
          </div>
        </div>
      </header>

      {/* Featured Image Container (Small size frame) */}
      <div className="max-w-md sm:max-w-lg mx-auto px-6 mb-8 flex flex-col items-center">
        <div className="border border-[#E2D8CC] p-2 bg-white shadow-sm w-full">
          <ResponsiveImage
            src={post.featuredImage}
            alt={post.imageAlt || `Editorial feature image for ${post.title}`}
            aspectRatio="16:9"
            priority
            className="w-full max-h-[200px] sm:max-h-[220px] object-cover"
          />
        </div>
        <p className="text-xs font-serif italic text-[#7C7166] mt-2.5 text-center">
          {post.imageAlt}
        </p>
      </div>

      {/* Main Reading Column */}
      <div className="max-w-3xl mx-auto px-6">
        {/* Quick Table of Contents Jump Bar */}
        <nav aria-label="Table of contents" className="mb-10 p-6 bg-[#F4EDE2] border border-[#E2D8CC]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B6B52] mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Table of Contents</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#5C534A]">
            {post.sections.map((section, idx) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="hover:text-[#1F1B18] hover:underline flex items-start gap-1.5"
                >
                  <span className="text-[#8B6B52] font-mono">{idx + 1}.</span>
                  <span>{section.heading.trim().endsWith('?') ? section.heading : `${section.heading.trim()}?`}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#faqs-aeo"
                className="hover:text-[#1F1B18] hover:underline flex items-start gap-1.5"
              >
                <span className="text-[#8B6B52] font-mono">Q.</span>
                <span>Frequently Asked Questions</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Core Guide Direct Answer Section (Styled with Curated Question & Answer Element) */}
        {post.directAnswer && (
          <section className="mb-14 p-8 sm:p-10 bg-[#FAF7F2] border border-[#DDD3C7] shadow-xs text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0E8DC] border border-[#DDD3C7] text-xs uppercase tracking-widest font-semibold text-[#8B6B52]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Guide Question & Editorial Answer</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1F1B18] tracking-tight border-b-2 border-[#8B6B52]/40 pb-3 inline-block">
                {post.directAnswer.question.trim().endsWith('?') ? post.directAnswer.question : `${post.directAnswer.question.trim()}?`}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#423A33] leading-relaxed max-w-2xl mx-auto pt-1">
              <strong className="text-[#1F1B18] font-semibold">The Direct Answer: </strong>
              <span>{post.directAnswer.answer}</span>
            </p>
          </section>
        )}

        {/* Section Contents */}
        <div className="space-y-14 text-[#2B2622] leading-relaxed text-[16px] sm:text-[17px]">
          {post.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
              <div className="pt-8 border-t border-[#EAE3D9] first:border-t-0 first:pt-0">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8B6B52] text-white text-xs font-mono font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8B6B52]">
                    Core Editorial Question
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1B18] tracking-tight leading-snug border-l-4 border-[#8B6B52] pl-4 py-0.5">
                  {section.heading.trim().endsWith('?') ? section.heading : `${section.heading.trim()}?`}
                </h2>
              </div>

              {section.subheading && (
                <p className="text-sm font-medium uppercase tracking-wider text-[#8B6B52] pl-5 -mt-2">
                  {section.subheading}
                </p>
              )}

              {/* Render Section Text with Markdown-like bold / links */}
              <div className="space-y-4 font-sans leading-[1.8] text-[#3D352E]">
                {section.content.split('\n\n').map((paragraph, pIdx) => {
                  // Direct Answer Callout Block
                  if (paragraph.startsWith('**The Direct Answer:**')) {
                    const cleanAnswer = paragraph.replace('**The Direct Answer:**', '').trim();
                    return (
                      <div
                        key={pIdx}
                        className="p-5 bg-[#FAF7F2] border-l-4 border-[#8B6B52] border-y border-r border-[#E8E1D7] text-[#2E2722] text-sm sm:text-base leading-relaxed my-4 shadow-xs"
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B6B52] mb-1.5">
                          <Check className="w-4 h-4 text-[#8B6B52]" />
                          <span>The Direct Answer</span>
                        </div>
                        <div className="font-medium text-[#2E2722]">
                          {renderRichText(cleanAnswer, onNavigate)}
                        </div>
                      </div>
                    );
                  }

                  // Check for subheadings inside paragraph
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3
                        key={pIdx}
                        className="text-xl font-serif font-semibold text-[#1F1B18] pt-3 text-[#2E2722]"
                      >
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }

                  // Check for lists
                  if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
                    const listItems = paragraph
                      .split('\n')
                      .filter((line) => line.trim().startsWith('- '));
                    return (
                      <ul key={pIdx} className="space-y-2.5 my-3 pl-4 border-l-2 border-[#D8CEBF]">
                        {listItems.map((item, iIdx) => (
                          <li key={iIdx} className="text-sm sm:text-base text-[#423A33]">
                            {renderRichText(item.replace('- ', ''), onNavigate)}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={pIdx}>
                      {renderRichText(paragraph, onNavigate)}
                    </p>
                  );
                })}
              </div>

              {/* Section Visual Asset (Small size container with alt text) */}
              {section.image && (
                <div className="my-6 max-w-sm mx-auto p-2 border border-[#E2D8CC] bg-white shadow-xs">
                  <ResponsiveImage
                    src={section.image.src}
                    alt={section.image.alt}
                    aspectRatio="16:9"
                    className="w-full max-h-[180px] sm:max-h-[200px] object-cover"
                  />
                  {section.image.caption && (
                    <p className="text-xs font-serif italic text-[#7C7166] mt-2 text-center">
                      {section.image.caption}
                    </p>
                  )}
                </div>
              )}

              {/* Callout Box */}
              {section.calloutBox && (
                <div className="my-8 p-6 bg-[#F7F3EC] border border-[#DDD3C7]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B6B52] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{section.calloutBox.title}</span>
                  </div>
                  <p className="text-sm sm:text-base font-serif italic text-[#26211C] leading-relaxed">
                    "{section.calloutBox.description}"
                  </p>
                </div>
              )}

              {/* Key Takeaways */}
              {section.keyTakeaways && (
                <div className="p-6 bg-[#FFFFFF] border border-[#E2D8CC] space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#8B6B52]">
                    Key Takeaways
                  </h4>
                  <ul className="space-y-2 text-sm text-[#4A4138]">
                    {section.keyTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#8B6B52] shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* Comparison Table (For Budgeting Apps Article) */}
          {post.comparisonTable && (
            <section className="scroll-mt-24 pt-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1B18] border-l-4 border-[#8B6B52] pl-3.5">
                How Do the Top Budgeting Apps Compare Head-to-Head?
              </h2>
              <p className="text-sm text-[#665D54]">
                Side-by-side evaluation of leading beginner budgeting apps in 2026.
              </p>

              <div className="overflow-x-auto border border-[#E2D8CC] bg-white">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#F4EDE2] border-b border-[#E2D8CC] text-[#2E2722]">
                      <th className="p-3.5 font-serif font-semibold">App</th>
                      <th className="p-3.5 font-serif font-semibold">Best For</th>
                      <th className="p-3.5 font-serif font-semibold">Pricing</th>
                      <th className="p-3.5 font-serif font-semibold">Key Highlights</th>
                      <th className="p-3.5 font-serif font-semibold">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE3D9]">
                    {post.comparisonTable.map((app) => (
                      <tr key={app.name} className="hover:bg-[#FAF8F5]">
                        <td className="p-3.5 font-semibold text-[#1F1B18] whitespace-nowrap">
                          {app.name}
                        </td>
                        <td className="p-3.5 text-[#5A5148]">{app.bestFor}</td>
                        <td className="p-3.5 text-[#2E2722] font-mono whitespace-nowrap">
                          {app.pricing}
                        </td>
                        <td className="p-3.5 text-[#5A5148]">
                          {app.keyFeatures.join(' · ')}
                        </td>
                        <td className="p-3.5 text-[#8B6B52] font-semibold whitespace-nowrap">
                          ★ {app.rating}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Answer Engine Optimization FAQ Section */}
          <section id="faqs-aeo" className="scroll-mt-24 pt-10 border-t border-[#EAE3D9] space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8B6B52]">
                AEO Direct Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1B18] mt-1 border-l-4 border-[#8B6B52] pl-3.5">
                Have More Questions About {post.title.replace(/\?+$/, '')}?
              </h2>
            </div>

            <div className="space-y-4">
              {post.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="p-6 bg-[#FFFFFF] border border-[#E2D8CC] space-y-2">
                  <h3 className="text-base sm:text-lg font-serif font-semibold text-[#1F1B18]">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-[#5C534A] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Reader Feedback & Engagement Bar */}
        <div className="mt-14 pt-8 border-t border-[#EAE3D9] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-colors ${
                liked
                  ? 'bg-[#8B6B52] text-white border-[#8B6B52]'
                  : 'bg-white text-[#2E2722] border-[#DDD3C7] hover:bg-[#F4EDE2]'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{liked ? 'Helpful (Thank you!)' : 'Was this helpful?'}</span>
            </button>

            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-colors ${
                saved
                  ? 'bg-[#2E2722] text-white border-[#2E2722]'
                  : 'bg-white text-[#2E2722] border-[#DDD3C7] hover:bg-[#F4EDE2]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{saved ? 'Saved in Reading List' : 'Save for later'}</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#665D54] hover:text-[#1F1B18]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Author Bio Box */}
        <div className="mt-12 p-8 bg-[#F5EFE7] border border-[#DDD3C7] flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={post.author.avatar}
            alt={`Portrait of ${post.author.name}, ${post.author.role}`}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-[#8B6B52] font-semibold">
              Written By
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1F1B18]">
              {post.author.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#61574E] leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </div>

        {/* Mid-Article Newsletter Invitation */}
        <div className="mt-12 p-8 bg-[#241F1C] text-[#FAF8F5] text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C4A482] font-semibold">
            The Sunday Edit Dispatch
          </span>
          <h3 className="text-2xl font-serif font-semibold">
            Loved this guide? Join 50,000+ readers.
          </h3>
          <p className="text-xs sm:text-sm text-[#BDB2A5] max-w-md mx-auto">
            Get 3 curated beauty rituals, 1 financial independence principle, and 1 capsule outfit delivered every Sunday morning.
          </p>
          <button
            onClick={onOpenNewsletter}
            className="px-6 py-2.5 text-xs uppercase tracking-widest font-semibold bg-[#E8DFD3] text-[#1F1B18] hover:bg-white transition-colors"
          >
            Get The Sunday Edit
          </button>
        </div>

        {/* Next in The Edit (Internal Cross-links) */}
        <section className="mt-16 pt-10 border-t border-[#EAE3D9]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif font-bold text-[#1F1B18]">
              Read Next in The Edit
            </h3>
            <a
              href="/blog-about-lifestyle"
              onClick={(e) => handleLink(e, '/blog-about-lifestyle')}
              className="text-xs uppercase tracking-wider font-semibold text-[#8B6B52] hover:underline flex items-center gap-1"
            >
              <span>Explore All Articles</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <a
                key={related.id}
                href={related.exactPath}
                onClick={(e) => handleLink(e, related.exactPath)}
                aria-label={`Read guide: ${related.title}`}
                className="group border border-[#E2D8CC] bg-white p-5 flex flex-col justify-between hover:border-[#8B6B52] transition-colors"
              >
                <div className="space-y-3">
                  {/* Small Size Thumbnail */}
                  <div className="overflow-hidden max-h-36 sm:max-h-40 bg-[#F2EDE4]">
                    <ResponsiveImage
                      src={related.featuredImage}
                      alt={related.imageAlt || `Editorial image for ${related.title}`}
                      aspectRatio="16:9"
                      className="w-full max-h-36 sm:max-h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-xs text-[#8B6B52] uppercase tracking-wider font-semibold">
                    {related.category} · {related.readTime}
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-[#1F1B18] group-hover:text-[#8B6B52] transition-colors leading-snug">
                    {related.title}
                  </h4>
                  <p className="text-xs text-[#665D54] line-clamp-2">
                    {related.excerpt}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#F0EBE3] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2E2722] group-hover:text-[#8B6B52]">
                  <span className="flex items-center gap-1">
                    <span>Read Guide:</span>
                    <span className="font-serif normal-case italic font-normal text-[#8B6B52] line-clamp-1">{related.title}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

// Helper function to render text with Markdown bold, internal links, and inline images
function renderRichText(text: string, onNavigate: (path: string) => void) {
  // Regex to match markdown images ![alt](url) and markdown links [anchor text](url)
  const parts = [];
  const tokenRegex = /(!?)\[(.*?)\]\((.*?)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    // Push preceding text
    if (match.index > lastIndex) {
      parts.push(parseBold(text.substring(lastIndex, match.index)));
    }

    const isImage = match[1] === '!';
    const altOrText = match[2];
    const url = match[3];

    if (isImage) {
      parts.push(
        <span key={match.index} className="block my-5 max-w-sm mx-auto p-2 border border-[#E2D8CC] bg-white shadow-xs">
          <img
            src={url}
            alt={altOrText || 'Editorial lifestyle guide illustration'}
            loading="lazy"
            className="w-full max-h-[190px] object-cover"
          />
          {altOrText && (
            <span className="block text-xs font-serif italic text-[#7C7166] mt-2 text-center">
              {altOrText}
            </span>
          )}
        </span>
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={url}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(url);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-semibold text-[#8B6B52] underline decoration-[#8B6B52]/40 hover:decoration-[#8B6B52] transition-colors"
        >
          {altOrText}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(parseBold(text.substring(lastIndex)));
  }

  return parts;
}

function parseBold(text: string) {
  const segments = text.split(/(\*\*.*?\*\*)/g);
  return segments.map((seg, idx) => {
    if (seg.startsWith('**') && seg.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-[#1F1B18]">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    return seg;
  });
}
