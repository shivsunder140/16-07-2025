import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '../config/routes';

export const usePageMeta = () => {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find(route => route.path === location.pathname);
    
    if (currentRoute) {
      // Update document title
      document.title = currentRoute.meta.title;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', currentRoute.meta.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = currentRoute.meta.description;
        document.head.appendChild(meta);
      }
      
      // Update meta keywords
      if (currentRoute.meta.keywords) {
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', currentRoute.meta.keywords.join(', '));
        } else {
          const meta = document.createElement('meta');
          meta.name = 'keywords';
          meta.content = currentRoute.meta.keywords.join(', ');
          document.head.appendChild(meta);
        }
      }
      
      // Update Open Graph tags
      const updateOGTag = (property: string, content: string) => {
        let ogTag = document.querySelector(`meta[property="${property}"]`);
        if (ogTag) {
          ogTag.setAttribute('content', content);
        } else {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          ogTag.setAttribute('content', content);
          document.head.appendChild(ogTag);
        }
      };
      
      updateOGTag('og:title', currentRoute.meta.title);
      updateOGTag('og:description', currentRoute.meta.description);
      updateOGTag('og:url', window.location.href);
      
      if (currentRoute.meta.ogImage) {
        updateOGTag('og:image', currentRoute.meta.ogImage);
      }
      
      // Update canonical URL
      if (currentRoute.meta.canonical) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
          canonicalLink.setAttribute('href', currentRoute.meta.canonical);
        } else {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          canonicalLink.setAttribute('href', currentRoute.meta.canonical);
          document.head.appendChild(canonicalLink);
        }
      }
    }
  }, [location.pathname]);
};