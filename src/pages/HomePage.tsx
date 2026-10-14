import React, { useState } from 'react';
import { BLOG_POSTS, CATEGORIES, heroImg, defaultAuthor } from '../data/articles';
import { BlogCard } from '../components/BlogCard';
import { SEOHead } from '../components/SEOHead';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { ArrowRight, Sparkles, BookOpen, Heart, TrendingUp, Compass, HelpCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenNewsletter: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenNewsletter }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filtered posts based on category selection
  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  // JSON-LD structured data for Homepage
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Smart Girl Edit',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://thesmartgirledit.com',
    description:
      'Discover a chic blog about lifestyle for women. Explore simple skincare routines, capsule wardrobes, and mindful money habits. Start reading our curated edit!',
    publisher: {
      '@type': 'Organization',
      name: 'The Smart Girl Edit',
      logo: {
        '@type': 'ImageObject',
        url: typeof window !== 'undefined' ? `${window.location.origin}/logo.svg` : '',
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is The Smart Girl Edit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Smart Girl Edit is an editorial lifestyle destination tailored for Gen Z and young women up to age 30, providing practical, research-backed advice across beauty, capsule fashion, personal finance, and modern living.',
        },
      },
      {
        '@type': 'Question',
        name: 'What topics does this beauty and lifestyle blog cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The blog covers five core pillars: Beauty (gentle skincare routines and barrier health), Style (timeless capsule wardrobes and tailoring), Money (modern budgeting apps and debt freedom), Digital (productivity tools and screen balance), and Life (mindful daily rituals).',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the most effective lifestyle tips for women in their twenties?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Focus on sustainable habits: automate savings into high-yield accounts, master a simple 4-step skincare routine, curate an interchangeable capsule wardrobe, and schedule weekly mindful check-ins.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find curated guides on skincare routines, capsule wardrobes, and budgeting apps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Explore our dedicated deep-dive guides: read our Skincare Routine for Beginners, browse our 14-piece Capsule Wardrobe Essentials for Women, and compare top platforms in our Best Budgeting Apps for Beginners guide.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Blog About Lifestyle: Daily Tips | The Smart Girl Edit"
        description="Discover a chic blog about lifestyle for women. Explore simple skincare routines, capsule wardrobes, and mindful money habits. Start reading our curated edit!"
        canonicalPath="/"
        ogType="website"
        image={heroImg}
        jsonLd={[websiteSchema, faqSchema]}
      />

      {/* Hero Section */}
      <section className="relative border-b border-[#E8E1D7] bg-[#F7F3EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Editorial Headline & Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed editorial kicker */}
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#8B6B52]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Modern Woman's Curated Edit</span>
                <span aria-hidden="true">·</span>
                <span>Issue No. 14</span>
              </div>

              {/* Main H1 Heading containing primary keyword */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1F1B18] leading-[1.12] tracking-tight text-balance">
                A Curated <span className="italic font-normal">Blog About Lifestyle</span>, Style & Modern Independence.
              </h1>

              {/* Engaging Intro */}
              <p className="text-base sm:text-lg text-[#5E544A] leading-relaxed font-sans max-w-xl">
                Welcome to <strong>The Smart Girl Edit</strong>—your digital destination for actionable, elevated lifestyle tips for women. We believe modern life shouldn’t feel like an overwhelming race of conflicting trends. From science-backed skincare routines to chic capsule wardrobe basics and stress-free money management apps, discover the curations designed to help you live intentionally.
              </p>

              {/* CTAs with descriptive anchor text */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/blogs/skincare-routine-for-beginners"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blogs/skincare-routine-for-beginners');
                  }}
                  className="px-6 py-3.5 text-xs uppercase tracking-widest font-semibold bg-[#2E2722] text-white hover:bg-[#4A3F37] transition-colors flex items-center gap-2"
                >
                  <span>Explore Featured Guides</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={onOpenNewsletter}
                  className="px-6 py-3.5 text-xs uppercase tracking-widest font-semibold border border-[#2E2722] text-[#2E2722] hover:bg-[#EAE1D5] transition-colors"
                >
                  Join The Sunday Edit
                </button>
              </div>

              {/* Subdued Editorial Proof Bar */}
              <div className="pt-6 border-t border-[#E8E1D7] flex items-center gap-6 text-xs text-[#7A6F64]">
                <div>
                  <span className="font-semibold text-[#1F1B18]">50,000+</span> Mindful Readers
                </div>
                <span aria-hidden="true">·</span>
                <div>
                  <span className="font-semibold text-[#1F1B18]">Zero Filler</span> Editorial Standards
                </div>
                <span aria-hidden="true">·</span>
                <div>
                  <span className="font-semibold text-[#1F1B18]">100% Honest</span> Reviews
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="border border-[#DDD3C7] p-2 bg-white shadow-xl">
                <ResponsiveImage
                  src={heroImg}
                  alt="Curated journal with morning thoughts, ceramic coffee mug, and sunglasses representing an intentional blog about lifestyle"
                  aspectRatio="4:3"
                  priority
                  className="w-full"
                />
              </div>
              {/* Subtle caption */}
              <p className="text-xs font-serif italic text-[#7C7166] mt-3 text-center">
                Fig. 1 — The art of the slow morning: journaling, intentional budgeting, and quiet focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Categories Section */}
      <section className="py-16 bg-[#FAF8F5] border-b border-[#E8E1D7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8B6B52]">
              Curated Departments
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#1F1B18]">
              What Readers Discover in Our Beauty and Lifestyle Blog
            </h2>
            <p className="text-sm text-[#665D54] leading-relaxed">
              Explore our core categories tailored specifically for young women navigating personal growth, style confidence, and financial wellness.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => {
              const icons = {
                Beauty: Sparkles,
                Style: Heart,
                Money: TrendingUp,
                Digital: Compass,
                Life: BookOpen,
              };
              const IconComponent = icons[cat.name as keyof typeof icons] || Sparkles;

              return (
                <div
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    const el = document.getElementById('articles-feed');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-6 border text-left cursor-pointer transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? 'border-[#8B6B52] bg-[#F4EDE2] shadow-sm'
                      : 'border-[#E8E1D7] bg-white hover:border-[#C4B4A2]'
                  }`}
                >
                  <IconComponent className="w-5 h-5 text-[#8B6B52] mb-3" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-semibold text-[#1F1B18]">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-mono text-[#8B6B52]">{cat.count} articles</span>
                  </div>
                  <p className="text-xs text-[#70665D] mt-1 leading-snug line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Blog Articles Section */}
      <section id="articles-feed" className="py-20 max-w-7xl mx-auto px-6 scroll-mt-20">
        {/* Section Header with Category Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#E8E1D7]">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8B6B52]">
              In-Depth Editorial Features ({filteredPosts.length} Guides)
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F1B18] mt-1">
              Featured Articles & Lifestyle Tips for Women
            </h2>
            <p className="text-sm text-[#665D54] mt-1">
              Read comprehensive, long-form guides crafted to simplify your beauty, wardrobe, and money decisions.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center flex-wrap gap-1 p-1 bg-[#EFE9DF] border border-[#E0D8CB]">
            {['All', 'Beauty', 'Style', 'Money', 'Digital', 'Life'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-[#1F1B18] shadow-xs font-semibold'
                    : 'text-[#6B6158] hover:text-[#1F1B18]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Story (Prominently featured) */}
        {filteredPosts.length > 0 && (
          <div className="mb-14">
            <BlogCard
              post={filteredPosts[0]}
              onNavigate={onNavigate}
              featured={true}
            />
          </div>
        )}

        {/* Secondary Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* Editor's Note & Mission Statement Banner */}
      <section className="my-16 bg-[#F4EDE2] border-y border-[#E2D8CC] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-[#D6C7B6]">
            <img
              src={defaultAuthor.avatar}
              alt={defaultAuthor.name}
              className="w-full h-full object-cover"
            />
          </div>

          <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#26211C] leading-relaxed">
            "A chic lifestyle isn't built on accumulating endless things—it is founded on editing away the noise so that what remains is purposeful, beautiful, and authentic to you."
          </blockquote>

          <div className="text-xs uppercase tracking-widest text-[#7C6F62] font-medium">
            Chloe Laurent · Founder & Editor of The Smart Girl Edit
          </div>
        </div>
      </section>

      {/* AEO / Answer Engine Optimization Section (Lifestyle Tips for Women) */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="border border-[#E2D8CC] bg-white p-8 sm:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#8B6B52]">
              <HelpCircle className="w-4 h-4" />
              <span>Lifestyle Editorial Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1B18]">
              Essential Lifestyle Tips for Women in Their Twenties & Beyond
            </h2>
            <p className="text-sm text-[#665D54] leading-relaxed">
              Straightforward answers to the most frequently asked questions about building a balanced, stylish, and financially sound daily routine.
            </p>
          </div>

          <div className="space-y-6 divide-y divide-[#EFEAE2]">
            <div className="pt-4 first:pt-0">
              <h3 className="text-lg font-serif font-semibold text-[#1F1B18] mb-2">
                How do I start a simple beauty and lifestyle blog routine without burning out?
              </h3>
              <p className="text-sm text-[#5C534A] leading-relaxed">
                Focus on the 80/20 rule: identify the few daily rituals that provide 80% of your peace and confidence. For skincare, master the baseline cleanser, moisturizer, and sunscreen before adding multi-step serums. In fashion, invest in 14 versatile capsule staples so getting dressed takes under three minutes. In finance, automate fixed savings right after payday so you never have to micromanage daily coffee purchases.
              </p>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-serif font-semibold text-[#1F1B18] mb-2">
                What are the three most impactful habits for young women seeking financial independence?
              </h3>
              <p className="text-sm text-[#5C534A] leading-relaxed">
                First, establish a dedicated emergency fund holding 3 to 6 months of basic living expenses in a high-yield savings account (HYSA). Second, use an intuitive budgeting app (like Monarch or YNAB) to track subscriptions and discretionary spending. Third, start investing early in low-cost broad-market index funds to harness the power of compound interest throughout your twenties.
              </p>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-serif font-semibold text-[#1F1B18] mb-2">
                How can I transition my wardrobe into a minimalist capsule collection?
              </h3>
              <p className="text-sm text-[#5C534A] leading-relaxed">
                Start with a 1-month closet audit. Place garments on backwards hangers; once an item is worn, flip the hanger forward. At the end of the month, pack away anything you didn't touch. Then, build around high-quality core neutrals: tailored trousers, an oversized blazer, straight-leg denim, and crisp cotton shirts that seamlessly mix and match.
              </p>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-serif font-semibold text-[#1F1B18] mb-2">
                Where can I find curated guides on skincare routines, capsule wardrobes, and budgeting apps?
              </h3>
              <p className="text-sm text-[#5C534A] leading-relaxed">
                Explore our three foundational deep dives directly on The Smart Girl Edit: read our complete <a href="/blogs/skincare-routine-for-beginners" onClick={(e) => { e.preventDefault(); onNavigate('/blogs/skincare-routine-for-beginners'); }} className="text-[#8B6B52] font-semibold underline decoration-[#8B6B52]/40 hover:decoration-[#8B6B52]">skincare routine for beginners</a>, browse our guide to <a href="/blogs/capsule-wardrobe-essentials-for-women" onClick={(e) => { e.preventDefault(); onNavigate('/blogs/capsule-wardrobe-essentials-for-women'); }} className="text-[#8B6B52] font-semibold underline decoration-[#8B6B52]/40 hover:decoration-[#8B6B52]">capsule wardrobe essentials for women</a>, and compare verified platforms in our <a href="/blogs/best-budgeting-apps-for-beginners" onClick={(e) => { e.preventDefault(); onNavigate('/blogs/best-budgeting-apps-for-beginners'); }} className="text-[#8B6B52] font-semibold underline decoration-[#8B6B52]/40 hover:decoration-[#8B6B52]">best budgeting apps for beginners</a> review.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
