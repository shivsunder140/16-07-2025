import React from 'react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ExternalLink,
  Edit,
  TrendingUp,
  Users,
  MessageCircle,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const profileStats = [
    {
      label: 'Total Posts',
      value: '247',
      icon: MessageCircle,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Followers',
      value: '12.5K',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Connections',
      value: '2.8K',
      icon: Target,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Growth Rate',
      value: '+23%',
      icon: TrendingUp,
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'post',
      description: 'Published a new post about AI in marketing',
      timestamp: '2 hours ago',
      engagement: '247 likes, 18 comments'
    },
    {
      id: 2,
      type: 'connection',
      description: 'Connected with 12 new professionals',
      timestamp: '1 day ago',
      engagement: '5 mutual connections'
    },
    {
      id: 3,
      type: 'engagement',
      description: 'Received 89 profile views',
      timestamp: '2 days ago',
      engagement: '15% increase from last week'
    }
  ];

  const contentCategories = [
    { name: 'Personal Stories', count: 45, percentage: 35 },
    { name: 'Industry Insights', count: 38, percentage: 29 },
    { name: 'How-to Guides', count: 32, percentage: 25 },
    { name: 'Motivational', count: 14, percentage: 11 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card-hover overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-purple-500 to-blue-600"></div>
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between -mt-16 mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full border-4 border-gray-950 object-cover shadow-xl"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                <p className="text-gray-300">Digital Marketing Strategist</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span>Tech Startup</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined Jan 2020</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={`https://linkedin.com/in/${user?.linkedinId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View LinkedIn</span>
              </a>
              <button className="px-4 py-2 glass-card hover:bg-gray-800/60 text-gray-300 rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {profileStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800/50 mb-2 hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">About</h3>
          <p className="text-gray-300 mb-4">
            Passionate digital marketing strategist with 8+ years of experience helping B2B SaaS companies scale their growth. 
            Specialized in content marketing, LinkedIn strategy, and personal branding.
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-white mb-1">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {['Digital Marketing', 'Content Strategy', 'LinkedIn Growth', 'Personal Branding', 'SaaS Marketing'].map((skill) => (
                  <span key={skill} className="text-xs bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 border border-violet-500/30 px-2 py-1 rounded hover:from-violet-500/30 hover:to-purple-500/30 transition-all duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Industries</h4>
              <div className="flex flex-wrap gap-2">
                {['SaaS', 'Technology', 'Marketing', 'Consulting'].map((industry) => (
                  <span key={industry} className="text-xs bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Content Categories</h3>
          <div className="space-y-4">
            {contentCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-white">{category.name}</div>
                  <div className="text-sm text-gray-400">({category.count})</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400 w-10">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card-hover">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500/30 to-purple-500/30 rounded-full flex items-center justify-center border border-violet-500/30">
                <User className="w-4 h-4 text-violet-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{activity.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-400">{activity.timestamp}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{activity.engagement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;