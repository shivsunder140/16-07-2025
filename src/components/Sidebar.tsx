import React from 'react';
import { NavLink } from 'react-router-dom';
import { Crown } from 'lucide-react';
import InfinityLogo from './InfinityLogo';
import { useAuth } from '../contexts/AuthContext';
import { mainNavigation } from '../config/navigation';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const hasAccess = (item: any) => {
    if (!item.requiresAuth) return true;
    if (!user) return false;
    if (!item.roles) return true;
    return item.roles.includes(user.role);
  };

  const renderNavItem = (item: any, depth = 0) => {
    if (!hasAccess(item)) return null;

    const paddingLeft = depth > 0 ? `${depth * 1.5 + 1}rem` : '1rem';

    if (item.children && item.children.length > 0) {
      return (
        <div key={item.id}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
              }`
            }
            style={{ paddingLeft }}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
            {item.isNew && (
              <span className="text-xs bg-gradient-to-r from-violet-500 to-purple-600 text-white px-2 py-1 rounded-full">
                New
              </span>
            )}
          </NavLink>
          <div className="ml-4 mt-1 space-y-1">
            {item.children.map((child: any) => renderNavItem(child, depth + 1))}
          </div>
        </div>
      );
    }

    return (
      <NavLink
        key={item.id}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
          }`
        }
        style={{ paddingLeft }}
      >
        <item.icon className="w-5 h-5" />
        <span className="font-medium">{item.label}</span>
        {item.badge && (
          <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">
            {item.badge}
          </span>
        )}
        {item.isNew && (
          <span className="text-xs bg-gradient-to-r from-violet-500 to-purple-600 text-white px-2 py-1 rounded-full">
            New
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <div className="w-64 glass-card m-4 mr-0 rounded-r-none border-r-0 shadow-2xl">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <InfinityLogo />
          </div>
          <h1 className="text-xl font-bold gradient-text">Taplio</h1>
        </div>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {mainNavigation.map((item) => renderNavItem(item))}
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">Pro Plan</span>
          </div>
          <p className="text-sm opacity-90">
            Upgrade for unlimited posts and AI features
          </p>
          <button className="mt-2 w-full bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-lg py-2 text-sm font-medium hover:scale-105">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;