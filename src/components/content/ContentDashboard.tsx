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
  Zap,
  Plus,
  BarChart3,
  Clock,
  Edit,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { useContentStore } from '../../stores/contentStore';
import StatCard from '../StatCard';
import Chart from '../Chart';
import ContentCard from './ContentCard';

const ContentDashboard: React.FC = () => {
  const { posts, stats, refreshStats, setView } = useContentStore();

  React.useEffect(() => {
    refreshStats();
  }, [posts, refreshStats]);

  const recentPosts = posts
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const scheduledPosts = posts
    .filter(post => post.status === 'scheduled' && post.scheduledTime)
    .sort((a, b) => new Date(a.scheduledTime!).getTime() - new Date(b.scheduledTime!).getTime())
    .slice(0, 3);

  const topPerformingPosts = posts
    .filter(post => post.status === 'published')
    .sort((a, b) => {
      const aEngagement = a.engagement.likes + a.engagement.comments + a.engagement.shares;
      const bEngagement = b.engagement.likes + b.engagement.comments + b.engagement.shares;
      return bEngagement - aEngagement;
    })
    .slice(0, 3);

  const chartData = [
    { date: '2024-01-01', value: 850 },
    { date: '2024-01-02', value: 920 },
    { date: '2024-01-03', value: 1100 },
    { date: '2024-01-04', value: 1050 },
    { date: '2024-01-05', value: 1200 },
    { date: '2024-01-06', value: 1350 },
    { date: '2024-01-07', value: 1400 }
  ];

  const dashboardStats = [
    {
      title: 'Posts Today',
      value: stats.postsToday.toString(),
      change: '12.3%',
      changeType: 'increase' as const,
      icon: Edit,
      color: 'purple' as const
    },
    {
      title: 'Scheduled Posts',
      value: stats.scheduledPosts.toString(),
      change: '8.7%',
      changeType: 'increase' as const,
      icon: Calendar,
      color: 'blue' as const
    },
    {
      title: 'Draft Count',
      value: stats.draftCount.toString(),
      change: '2.1%',
      changeType: 'increase' as const,
      icon: MessageCircle,
      color: 'orange' as const
    },
    {
      title: 'Content Health',
      value: `${stats.contentHealthScore}/10`,
      change: '15.2%',
      changeType: 'increase' as const,
      icon: Target,
      color: 'green' as const
    }
  ];

  const quickActions = [
    {
      title: 'AI Content Generator',
      description: 'Create engaging posts with AI',
      icon: Zap,
      color: 'from-violet-500/20 to-purple-500/20',
      borderColor: 'border-violet-500/30',
      action: () => setView('kanban')
    },
    {
      title: 'Schedule Content',
      description: 'Plan your content calendar',
      icon: Calendar,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      action: () => setView('calendar')
    },
    {
      title: 'Content Pipeline',
      description: 'Manage your content workflow',
      icon: Target,
      color: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-500/30',
      action: () => setView('kanban')
    },
    {
      title: 'Performance Analytics',
      description: 'Track your content performance',
      icon: BarChart3,
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30',
      action: () => console.log('Analytics')
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Content Command Center</h1>
          <p className="text-gray-400">Manage your content strategy and performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
            <Zap className="w-4 h-4" />
            <span>Create Content</span>
          </button>
          <button className="px-6 py-3 glass-card hover:bg-gray-800/60 text-gray-300 rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105">
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="stagger-animation">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-card-hover">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`p-4 bg-gradient-to-r ${action.color} rounded-xl hover:scale-105 transition-all duration-300 border ${action.borderColor} group hover:shadow-xl`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <action.icon className="w-4 h-4 text-white group-hover:animate-pulse" />
                </div>
              </div>
              <h4 className="font-medium text-white group-hover:text-gray-100 transition-colors duration-300 text-left">
                {action.title}
              </h4>
              <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-left">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          data={chartData} 
          title="Content Engagement Over Time" 
          color="#06b6d4" 
        />
        
        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Content Performance</h3>
          <div className="space-y-4">
            {topPerformingPosts.map((post) => {
              const totalEngagement = post.engagement.likes + post.engagement.comments + post.engagement.shares;
              return (
                <div key={post.id} className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white line-clamp-1">{post.title || post.content.substring(0, 50) + '...'}</h4>
                    <div className="flex items-center space-x-1">
                      {post.performance && getTrendIcon(post.performance.trend)}
                      <span className="text-sm text-gray-400">{post.performance?.score}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.engagement.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{post.engagement.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.engagement.comments}</span>
                      </div>
                    </div>
                    <span className="font-medium text-cyan-400">{totalEngagement} total</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity and Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <ContentCard key={post.id} post={post} compact showActions={false} />
            ))}
          </div>
        </div>

        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Posts</h3>
          <div className="space-y-3">
            {scheduledPosts.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No posts scheduled</p>
                <button 
                  onClick={() => setView('calendar')}
                  className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  Schedule your first post
                </button>
              </div>
            ) : (
              scheduledPosts.map((post) => (
                <div key={post.id} className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white line-clamp-1">
                      {post.title || post.content.substring(0, 50) + '...'}
                    </h4>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {post.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(post.scheduledTime!)}</span>
                    </div>
                    <span className="text-xs">{post.type}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Content Health Insights */}
      <div className="glass-card-hover">
        <h3 className="text-lg font-semibold text-white mb-4">Content Health Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg border border-emerald-500/30 hover:from-emerald-500/30 hover:to-green-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Engagement Growing</p>
                <p className="text-sm text-gray-300">+23% this week</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Consistent Posting</p>
                <p className="text-sm text-gray-300">5 posts this week</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-500/30 hover:from-violet-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Quality Content</p>
                <p className="text-sm text-gray-300">8.7/10 avg score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDashboard;