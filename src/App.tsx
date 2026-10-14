import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from './data/articles';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NewsletterModal } from './components/NewsletterModal';
import { HomePage } from './pages/HomePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname || '/blog-about-lifestyle';
      return path === '/' ? '/blog-about-lifestyle' : path;
    }
    return '/blog-about-lifestyle';
  });

  const [newsletterOpen, setNewsletterOpen] = useState(false);

  // If visited via root `/`, seamlessly route to `/blog-about-lifestyle`
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/' || window.location.pathname === '') {
        window.history.replaceState({}, '', '/blog-about-lifestyle');
        setCurrentPath('/blog-about-lifestyle');
      }
    }
  }, []);

  // Sync with browser popstate (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/blog-about-lifestyle';
      setCurrentPath(path === '/' ? '/blog-about-lifestyle' : path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic navigation that updates browser URL bar without page reload
  const handleNavigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
  };

  // Route matching
  const renderCurrentView = () => {
    const cleanPath = (currentPath.split('?')[0] || '/blog-about-lifestyle').replace(/\/$/, '') || '/blog-about-lifestyle';

    // 1. Homepage: `/blog-about-lifestyle` (with aliases for `/`, `/blogs-about-lifestyle`, `/lifestyle-blog`)
    if (
      cleanPath === '/blog-about-lifestyle' ||
      cleanPath === '/' ||
      cleanPath === '/blogs-about-lifestyle' ||
      cleanPath === '/lifestyle-blog'
    ) {
      return (
        <HomePage
          onNavigate={handleNavigate}
          onOpenNewsletter={() => setNewsletterOpen(true)}
        />
      );
    }

    // 2. Exact match against our long-form blog articles
    const matchedArticle = BLOG_POSTS.find(
      (post) => post.exactPath === cleanPath || post.aliases?.includes(cleanPath)
    );

    if (matchedArticle) {
      return (
        <ArticleDetailPage
          post={matchedArticle}
          onNavigate={handleNavigate}
          onOpenNewsletter={() => setNewsletterOpen(true)}
        />
      );
    }

    // 3. 404 Fallback
    return <NotFoundPage onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#24211E]">
      {/* 3-Zone Navigation Header */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenNewsletter={() => setNewsletterOpen(true)}
      />

      {/* Main Page View (Separate webpage per article at its own URL) */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* The Sunday Edit Newsletter Modal */}
      <NewsletterModal
        isOpen={newsletterOpen}
        onClose={() => setNewsletterOpen(false)}
      />
    </div>
  );
}
