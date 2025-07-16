import React from 'react';
import { Bell, Moon, Sun, Search, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="glass-card m-4 mb-0 rounded-b-none border-b-0 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search content, posts, analytics..."
              className="w-96 pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover:scale-110"
          >
            <Moon className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
          </button>

          <div className="relative">
            <button className="p-2 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover:scale-110">
              <Bell className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
            </button>
            <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          </div>

          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.subscriptionTier} plan</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;