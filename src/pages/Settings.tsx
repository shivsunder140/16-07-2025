import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Zap,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Mail,
  CheckCircle
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'integrations', name: 'Integrations', icon: Zap }
  ];

  const ProfileSettings = () => (
    <div className="space-y-6">
      <div className="glass-card-hover">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full px-3 py-2 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-3 py-2 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              LinkedIn Profile
            </label>
            <input
              type="text"
              defaultValue={`linkedin.com/in/${user?.linkedinId}`}
              className="w-full px-3 py-2 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time Zone
            </label>
            <select className="w-full px-3 py-2 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white transition-all duration-300">
              <option>Pacific Time (PT)</option>
              <option>Mountain Time (MT)</option>
              <option>Central Time (CT)</option>
              <option>Eastern Time (ET)</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            rows={4}
            defaultValue="Digital marketing strategist passionate about helping professionals build their personal brands on LinkedIn."
            className="w-full px-3 py-2 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white transition-all duration-300"
          />
        </div>
      </div>

      <div className="glass-card-hover">
        <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-white">Dark Mode</p>
                <p className="text-sm text-gray-400">Toggle dark mode interface</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-lg ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-white">Language</p>
                <p className="text-sm text-gray-400">Select your preferred language</p>
              </div>
            </div>
            <select className="px-3 py-2 border border-gray-700/50 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="glass-card-hover">
      <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
      <div className="space-y-4">
        {[
          { name: 'Email Notifications', description: 'Receive email updates about your account', icon: Mail },
          { name: 'Push Notifications', description: 'Get notified on your mobile device', icon: Smartphone },
          { name: 'Post Performance', description: 'Alerts when your posts reach engagement milestones', icon: CheckCircle },
          { name: 'Weekly Reports', description: 'Receive weekly analytics summaries', icon: Bell }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 hover:scale-110">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 translate-x-6 shadow-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const BillingSettings = () => (
    <div className="space-y-6">
      <div className="glass-card-hover">
        <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-500/30">
          <div>
            <h4 className="font-semibold text-violet-100">Pro Plan</h4>
            <p className="text-sm text-violet-300">$29/month • Billed monthly</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
            Upgrade
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Next billing date</span>
            <span className="text-white">February 15, 2024</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Payment method</span>
            <span className="text-white">•••• •••• •••• 4242</span>
          </div>
        </div>
      </div>

      <div className="glass-card-hover">
        <h3 className="text-lg font-semibold text-white mb-4">Usage This Month</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Posts Created</span>
              <span className="text-sm text-white">23 / 50</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-1000" style={{ width: '46%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">AI Generations</span>
              <span className="text-sm text-white">89 / 100</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full transition-all duration-1000" style={{ width: '89%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'billing':
        return <BillingSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and configuration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="glass-card-hover">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 border border-violet-500/30'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;