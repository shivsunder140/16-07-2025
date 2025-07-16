import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  Edit3, 
  Home, 
  Library, 
  Settings, 
  User, 
  Crown
} from 'lucide-react';
import InfinityLogo from './InfinityLogo';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/create', icon: Edit3, label: 'Create Content' },
    { path: '/scheduler', icon: Calendar, label: 'Post Scheduler' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/library', icon: Library, label: 'Content Library' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

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
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
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