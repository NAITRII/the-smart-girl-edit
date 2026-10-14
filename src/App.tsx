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
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [newsletterOpen, setNewsletterOpen] = useState(false);

  // Sync with browser popstate (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
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
    const cleanPath = (currentPath.split('?')[0] || '/').replace(/\/$/, '') || '/';

    // 1. Homepage: `/`
    if (cleanPath === '/') {
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
