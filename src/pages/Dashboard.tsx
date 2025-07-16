import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Impressions',
      value: '125.4K',
      change: '12.3%',
      changeType: 'increase' as const,
      icon: Eye,
      color: 'purple' as const
    },
    {
      title: 'Profile Views',
      value: '8.2K',
      change: '8.7%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'blue' as const
    },
    {
      title: 'Post Engagement',
      value: '4.8%',
      change: '2.1%',
      changeType: 'increase' as const,
      icon: Heart,
      color: 'green' as const
    },
    {
      title: 'Follower Growth',
      value: '+847',
      change: '15.2%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'orange' as const
    }
  ];

  const chartData = [
    { date: '2024-01-01', value: 850 },
    { date: '2024-01-02', value: 920 },
    { date: '2024-01-03', value: 1100 },
    { date: '2024-01-04', value: 1050 },
    { date: '2024-01-05', value: 1200 },
    { date: '2024-01-06', value: 1350 },
    { date: '2024-01-07', value: 1400 }
  ];

  const recentPosts = [
    {
      id: 1,
      content: "🚀 Just launched our new AI-powered content strategy! Here's what we learned in the first week...",
      timestamp: '2 hours ago',
      likes: 247,
      comments: 18,
      shares: 12,
      impressions: 5420
    },
    {
      id: 2,
      content: "The future of personal branding is here. 5 key trends every professional should know about...",
      timestamp: '1 day ago',
      likes: 892,
      comments: 43,
      shares: 67,
      impressions: 12840
    },
    {
      id: 3,
      content: "My biggest LinkedIn mistake (and how you can avoid it) 📈 Thread below 👇",
      timestamp: '2 days ago',
      likes: 1204,
      comments: 89,
      shares: 156,
      impressions: 18920
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-gray-400">Welcome back, Sarah! Here's your LinkedIn performance overview.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
            <Zap className="w-4 h-4" />
            <span>Create AI Post</span>
          </button>
          <button className="px-6 py-3 glass-card hover:bg-gray-800/60 text-gray-300 rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105">
            <Calendar className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="stagger-animation">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          data={chartData} 
          title="Engagement Over Time" 
          color="#06b6d4" 
        />
        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl hover:from-violet-500/40 hover:to-purple-500/40 transition-all duration-300 border border-violet-500/30 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/30 group">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-4 h-4 text-white group-hover:animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white group-hover:text-violet-100 transition-colors duration-300">AI Content Generator</p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Create engaging posts with AI</p>
                </div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl hover:from-blue-500/40 hover:to-cyan-500/40 transition-all duration-300 border border-blue-500/30 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 group">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-4 h-4 text-white group-hover:animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white group-hover:text-blue-100 transition-colors duration-300">Viral Post Ideas</p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Browse trending content</p>
                </div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl hover:from-emerald-500/40 hover:to-green-500/40 transition-all duration-300 border border-emerald-500/30 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 group">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-4 h-4 text-white group-hover:animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white group-hover:text-emerald-100 transition-colors duration-300">Schedule Posts</p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Plan your content calendar</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card-hover">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Posts Performance</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="glass-card-interactive">
              <p className="text-white mb-3">{post.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{post.timestamp}</span>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;