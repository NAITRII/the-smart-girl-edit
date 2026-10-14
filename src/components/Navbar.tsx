import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenNewsletter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenNewsletter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Beauty', path: '/blogs/skincare-routine-for-beginners' },
    { label: 'Style', path: '/blogs/capsule-wardrobe-essentials-for-women' },
    { label: 'Money', path: '/blogs/how-to-manage-money-in-your-20s' },
    { label: 'Digital', path: '/blogs/ai-tools-every-college-girl-should-know' },
    { label: 'Life', path: '/blogs/a-realistic-self-care-routine-for-busy-girls' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in editorial display font) */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-[#221E1B] hover:text-[#7A5B45] transition-colors whitespace-nowrap shrink-0"
        >
          The Smart Girl Edit
        </a>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wide uppercase font-medium text-[#685F56]">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`transition-colors py-1 whitespace-nowrap shrink-0 border-b ${
                  isActive
                    ? 'text-[#1F1B18] font-semibold border-[#8F6B52]'
                    : 'border-transparent hover:text-[#1F1B18] hover:border-[#D6CEBE]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Single button) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenNewsletter}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2E2722] hover:bg-[#4A3F37] rounded-none transition-colors whitespace-nowrap shrink-0"
          >
            <span>The Sunday Edit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 text-[#24211E] hover:text-[#7A5B45] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EAE3D9] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`text-base font-serif py-1 ${
                  currentPath === link.path ? 'text-[#8F6B52] font-semibold' : 'text-[#3E3832]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#EAE3D9]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNewsletter();
              }}
              className="w-full py-3 text-xs uppercase tracking-widest font-semibold text-white bg-[#2E2722] hover:bg-[#4A3F37] transition-colors"
            >
              Subscribe to The Sunday Edit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
