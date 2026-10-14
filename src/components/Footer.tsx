import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241F1C] text-[#D8CFB4] border-t border-[#3B342F] pt-20 pb-12 mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#3B342F]">
          {/* Brand & Manifesto */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="/blog-about-lifestyle"
              onClick={(e) => handleLink(e, '/blog-about-lifestyle')}
              className="text-2xl lg:text-3xl font-serif text-[#FAF7F2] font-semibold tracking-tight block hover:text-[#D8CFB4] transition-colors"
            >
              The Smart Girl Edit
            </a>
            <p className="text-sm text-[#A89E93] leading-relaxed max-w-md font-sans">
              The digital destination for ambitious young women navigating beauty rituals,
              capsule style, personal finance, digital trends, and intentional daily living with
              grace and clarity.
            </p>
            <div className="pt-2 text-xs uppercase tracking-widest text-[#7C7166]">
              Published in New York & Paris · For Gen Z & Young Adults
            </div>
          </div>

          {/* Core Articles Links */}
          {/* Curated Articles - Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2]">
              Curated Edits (I)
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#BDB2A5]">
              <li>
                <a
                  href="/blog-about-lifestyle"
                  onClick={(e) => handleLink(e, '/blog-about-lifestyle')}
                  className="hover:text-white transition-colors flex items-center gap-1 font-medium text-[#FAF7F2]"
                >
                  <span>Blog About Lifestyle (Home)</span>
                </a>
              </li>
              <li>
                <a
                  href="/blogs/skincare-routine-for-beginners"
                  onClick={(e) => handleLink(e, '/blogs/skincare-routine-for-beginners')}
                  className="hover:text-white transition-colors"
                >
                  Skincare Routine for Beginners
                </a>
              </li>
              <li>
                <a
                  href="/blogs/viral-beauty-products-worth-the-hype"
                  onClick={(e) => handleLink(e, '/blogs/viral-beauty-products-worth-the-hype')}
                  className="hover:text-white transition-colors"
                >
                  Viral Beauty Products: Worth the Hype?
                </a>
              </li>
              <li>
                <a
                  href="/blogs/capsule-wardrobe-essentials-for-women"
                  onClick={(e) => handleLink(e, '/blogs/capsule-wardrobe-essentials-for-women')}
                  className="hover:text-white transition-colors"
                >
                  Capsule Wardrobe Essentials
                </a>
              </li>
              <li>
                <a
                  href="/blogs/how-to-find-your-personal-style"
                  onClick={(e) => handleLink(e, '/blogs/how-to-find-your-personal-style')}
                  className="hover:text-white transition-colors"
                >
                  How to Find Your Personal Style
                </a>
              </li>
              <li>
                <a
                  href="/blogs/how-to-manage-money-in-your-20s"
                  onClick={(e) => handleLink(e, '/blogs/how-to-manage-money-in-your-20s')}
                  className="hover:text-white transition-colors"
                >
                  How to Manage Money in Your 20s
                </a>
              </li>
            </ul>
          </div>

          {/* Curated Articles - Column 2 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2]">
              Curated Edits (II)
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#BDB2A5]">
              <li>
                <a
                  href="/blogs/how-to-stop-impulse-buying"
                  onClick={(e) => handleLink(e, '/blogs/how-to-stop-impulse-buying')}
                  className="hover:text-white transition-colors"
                >
                  How to Stop Impulse Buying
                </a>
              </li>
              <li>
                <a
                  href="/blogs/ai-tools-every-college-girl-should-know"
                  onClick={(e) => handleLink(e, '/blogs/ai-tools-every-college-girl-should-know')}
                  className="hover:text-white transition-colors"
                >
                  AI Tools Every College Girl Should Know
                </a>
              </li>
              <li>
                <a
                  href="/blogs/how-social-media-influences-your-shopping-habits"
                  onClick={(e) => handleLink(e, '/blogs/how-social-media-influences-your-shopping-habits')}
                  className="hover:text-white transition-colors"
                >
                  Social Media & Shopping Habits
                </a>
              </li>
              <li>
                <a
                  href="/blogs/how-to-tell-if-an-online-product-is-worth-buying"
                  onClick={(e) => handleLink(e, '/blogs/how-to-tell-if-an-online-product-is-worth-buying')}
                  className="hover:text-white transition-colors"
                >
                  How to Tell If a Product Is Worth Buying
                </a>
              </li>
              <li>
                <a
                  href="/blogs/a-realistic-self-care-routine-for-busy-girls"
                  onClick={(e) => handleLink(e, '/blogs/a-realistic-self-care-routine-for-busy-girls')}
                  className="hover:text-white transition-colors"
                >
                  Realistic Self-Care Routine
                </a>
              </li>
              <li>
                <a
                  href="/blogs/best-budgeting-apps-for-beginners"
                  onClick={(e) => handleLink(e, '/blogs/best-budgeting-apps-for-beginners')}
                  className="hover:text-white transition-colors"
                >
                  Best Budgeting Apps for Beginners
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Newsletter Box */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2]">
              The Sunday Edit
            </h4>
            <p className="text-xs text-[#9E9488] leading-relaxed">
              Curated Sunday dispatch with 3 tips, 1 financial insight, and 1 style formula.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2 bg-[#332C27] text-[#D8CFB4] text-xs">
                <Check className="w-4 h-4 text-[#C4A482]" />
                <span>You're on the guest list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 text-xs bg-[#191513] text-[#FAF7F2] border border-[#3E3731] placeholder-[#6C635B] focus:outline-none focus:border-[#C4A482]"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs uppercase tracking-wider font-semibold text-[#1F1B18] bg-[#E8DFD3] hover:bg-white transition-colors"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6F64] gap-4">
          <p>© {new Date().getFullYear()} The Smart Girl Edit. All rights reserved.</p>
          <p className="font-serif italic text-[#998D80]">
            Curated with clarity, purpose, and timeless taste.
          </p>
        </div>
      </div>
    </footer>
  );
};
