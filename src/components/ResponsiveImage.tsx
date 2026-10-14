import React, { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
  priority?: boolean;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '4:3',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4:3'
      ? 'aspect-[4/3]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : '';

  const dimensions =
    aspectRatio === '16:9'
      ? { width: 800, height: 450 }
      : aspectRatio === '4:3'
      ? { width: 800, height: 600 }
      : aspectRatio === '1:1'
      ? { width: 600, height: 600 }
      : { width: 800, height: 600 };

  return (
    <div className={`relative overflow-hidden bg-[#F2EDE4] ${aspectClass} ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ) : (
        /* Zero-Broken-Image Fallback: Curated editorial fallback container */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F5EFE6] to-[#EAE0D3] text-[#6E645A]">
          <span className="text-xs uppercase tracking-widest font-medium mb-1 text-[#8C7E72]">
            The Smart Girl Edit
          </span>
          <p className="text-sm font-serif italic text-[#3E3832] max-w-[200px] line-clamp-2">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
};
