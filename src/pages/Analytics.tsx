import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Download,
  Calendar,
  Target
} from 'lucide-react';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';

const Analytics: React.FC = () => {
  const stats = [
    {
      title: 'Profile Views',
      value: '12.5K',
      change: '23.5%',
      changeType: 'increase' as const,
      icon: Eye,
      color: 'purple' as const
    },
    {
      title: 'Post Impressions',
      value: '89.2K',
      change: '12.8%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'blue' as const
    },
    {
      title: 'Engagement Rate',
      value: '6.7%',
      change: '3.2%',
      changeType: 'increase' as const,
      icon: Heart,
      color: 'green' as const
    },
    {
      title: 'New Followers',
      value: '+1.2K',
      change: '18.9%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'orange' as const
    }
  ];

  const chartData = [
    { date: '2024-01-01', value: 1200 },
    { date: '2024-01-02', value: 1350 },
    { date: '2024-01-03', value: 1100 },
    { date: '2024-01-04', value: 1400 },
    { date: '2024-01-05', value: 1600 },
    { date: '2024-01-06', value: 1800 },
    { date: '2024-01-07', value: 2100 }
  ];

  const topPosts = [
    {
      id: 1,
      content: "🚀 The biggest mistake I see professionals make on LinkedIn? They focus on selling instead of serving...",
      timestamp: '3 days ago',
      impressions: 18920,
      likes: 1204,
      comments: 89,
      shares: 156,
      clickThrough: 312,
      engagementRate: 7.8
    },
    {
      id: 2,
      content: "The future of personal branding is here. 5 key trends every professional should know about...",
      timestamp: '1 week ago',
      impressions: 12840,
      likes: 892,
      comments: 43,
      shares: 67,
      clickThrough: 189,
      engagementRate: 6.2
    },
    {
      id: 3,
      content: "My biggest LinkedIn mistake (and how you can avoid it) 📈 Thread below 👇",
      timestamp: '2 weeks ago',
      impressions: 8420,
      likes: 547,
      comments: 32,
      shares: 78,
      clickThrough: 145,
      engagementRate: 5.9
    }
  ];

  const audienceData = [
    { category: 'Marketing', percentage: 28 },
    { category: 'Sales', percentage: 22 },
    { category: 'Technology', percentage: 18 },
    { category: 'Consulting', percentage: 15 },
    { category: 'Finance', percentage: 12 },
    { category: 'Other', percentage: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your LinkedIn performance and growth</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Last 30 Days</span>
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
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
          title="Profile Views Over Time" 
          color="#8B5CF6" 
        />
        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Audience Breakdown</h3>
          <div className="space-y-4">
            {audienceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{item.category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-1000 hover:from-violet-400 hover:to-purple-500" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 w-10">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card-hover">
        <h3 className="text-lg font-semibold text-white mb-4">Top Performing Posts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left py-3 px-4 font-medium text-white">Post</th>
                <th className="text-left py-3 px-4 font-medium text-white">Date</th>
                <th className="text-left py-3 px-4 font-medium text-white">Impressions</th>
                <th className="text-left py-3 px-4 font-medium text-white">Engagement</th>
                <th className="text-left py-3 px-4 font-medium text-white">Rate</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post) => (
                <tr key={post.id} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors duration-300">
                  <td className="py-3 px-4">
                    <div className="max-w-md">
                      <p className="text-sm text-white truncate">
                        {post.content}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-400">{post.timestamp}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-white">{post.impressions.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
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
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {post.engagementRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Growth Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg border border-emerald-500/30 hover:from-emerald-500/30 hover:to-green-500/30 transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Profile views increased 23%</p>
                <p className="text-sm text-gray-300">Your content is reaching more people</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Follower growth rate: 15%</p>
                <p className="text-sm text-gray-300">Consistently attracting new followers</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-500/30 hover:from-violet-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Engagement rate above average</p>
                <p className="text-sm text-gray-300">Your audience is highly engaged</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 border border-gray-700/50 rounded-lg hover:border-cyan-500/30 hover:bg-gray-800/30 transition-all duration-300">
              <h4 className="font-medium text-white mb-2">Optimal Posting Time</h4>
              <p className="text-sm text-gray-300">
                Your audience is most active at 10 AM and 3 PM. Schedule posts during these times for maximum reach.
              </p>
            </div>
            <div className="p-4 border border-gray-700/50 rounded-lg hover:border-violet-500/30 hover:bg-gray-800/30 transition-all duration-300">
              <h4 className="font-medium text-white mb-2">Content Strategy</h4>
              <p className="text-sm text-gray-300">
                Personal stories and industry insights perform best. Consider sharing more behind-the-scenes content.
              </p>
            </div>
            <div className="p-4 border border-gray-700/50 rounded-lg hover:border-emerald-500/30 hover:bg-gray-800/30 transition-all duration-300">
              <h4 className="font-medium text-white mb-2">Engagement Boost</h4>
              <p className="text-sm text-gray-300">
                Posts with questions get 40% more comments. Try ending your posts with engaging questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;