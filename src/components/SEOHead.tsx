import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  image?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authorName,
  image,
  noIndex = false,
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to safely update or insert meta tag
    const updateMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Robots Directive (Technical SEO crawl control)
    if (noIndex) {
      updateMeta('name', 'robots', 'noindex, follow');
    } else {
      updateMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 3. Standard Meta Tags
    updateMeta('name', 'description', description);
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:type', ogType);
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', description);

    // 4. Dynamic Canonical URL (Normalized)
    const normalizedPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const fullCanonicalUrl = `${window.location.origin}${normalizedPath}`;
    updateMeta('property', 'og:url', fullCanonicalUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. Article specific meta if present
    if (ogType === 'article') {
      if (publishedTime) updateMeta('property', 'article:published_time', publishedTime);
      if (modifiedTime) updateMeta('property', 'article:modified_time', modifiedTime);
      if (authorName) updateMeta('property', 'article:author', authorName);
    }

    if (image) {
      updateMeta('property', 'og:image', window.location.origin + image);
      updateMeta('name', 'twitter:image', window.location.origin + image);
    }

    // 5. JSON-LD Structured Data
    const existingScripts = document.querySelectorAll('script[data-dynamic-jsonld="true"]');
    existingScripts.forEach((s) => s.remove());

    if (jsonLd && jsonLd.length > 0) {
      jsonLd.forEach((schemaData) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-dynamic-jsonld', 'true');
        script.textContent = JSON.stringify(schemaData);
        document.head.appendChild(script);
      });
    }

    return () => {
      const dynamicScripts = document.querySelectorAll('script[data-dynamic-jsonld="true"]');
      dynamicScripts.forEach((s) => s.remove());
    };
  }, [title, description, canonicalPath, ogType, publishedTime, modifiedTime, authorName, image, noIndex, jsonLd]);

  return null;
};
