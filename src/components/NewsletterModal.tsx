import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setName('');
      }, 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#DCD3C7] shadow-2xl p-8 sm:p-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close newsletter modal"
          className="absolute top-5 right-5 p-1 text-[#665D54] hover:text-[#201D1A] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EADFD4] flex items-center justify-center text-[#7A5B45]">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-[#201D1A]">
              Welcome to The Sunday Edit
            </h3>
            <p className="text-sm text-[#665D54] max-w-sm mx-auto">
              You're officially on the insider list. Keep an eye on your inbox this Sunday morning for your first private dispatch.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold bg-[#2E2722] text-white hover:bg-[#4A3F37] transition-colors"
            >
              Continue Reading
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-[#966746] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Sunday Dispatch</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#201D1A]">
                Join The Smart Girl Edit
              </h3>
              <p className="text-sm text-[#6B6158] leading-relaxed">
                Elevate your Sunday mornings. 3 actionable beauty rituals, 1 financial independence strategy, and 1 timeless outfit formula delivered weekly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#665D54] mb-1 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Camille"
                  required
                  className="w-full px-4 py-2.5 text-sm bg-white border border-[#DDD3C7] text-[#201D1A] placeholder-[#9E9488] focus:outline-none focus:border-[#7A5B45]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#665D54] mb-1 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="camille@example.com"
                  required
                  className="w-full px-4 py-2.5 text-sm bg-white border border-[#DDD3C7] text-[#201D1A] placeholder-[#9E9488] focus:outline-none focus:border-[#7A5B45]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs uppercase tracking-widest font-semibold text-white bg-[#2E2722] hover:bg-[#4A3F37] transition-colors"
                >
                  Subscribe for Free
                </button>
              </div>

              <p className="text-[11px] text-[#8C8176] text-center">
                Strictly zero spam. Unsubscribe with one click anytime.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
