import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { routes } from '../../config/routes';
import { BreadcrumbItem } from '../../types/navigation';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/dashboard' }
    ];

    let currentPath = '';
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      const route = routes.find(r => r.path === currentPath);
      
      if (route) {
        breadcrumbs.push({
          label: route.meta.title.split(' - ')[0],
          path: index === pathnames.length - 1 ? undefined : currentPath
        });
      } else {
        // Handle dynamic routes or create readable labels
        const label = pathname
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        breadcrumbs.push({
          label,
          path: index === pathnames.length - 1 ? undefined : currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      <Home className="w-4 h-4" />
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {breadcrumb.path ? (
            <Link
              to={breadcrumb.path}
              className="hover:text-white transition-colors duration-200"
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{breadcrumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;