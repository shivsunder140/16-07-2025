import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Bookmark,
  Copy,
  ExternalLink,
  Grid,
  List
} from 'lucide-react';

const ContentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All Posts', count: 1247 },
    { id: 'personal-story', name: 'Personal Stories', count: 284 },
    { id: 'industry-insights', name: 'Industry Insights', count: 356 },
    { id: 'how-to', name: 'How-to Guides', count: 198 },
    { id: 'motivational', name: 'Motivational', count: 142 },
    { id: 'lists', name: 'Lists', count: 189 },
    { id: 'questions', name: 'Questions', count: 78 }
  ];

  const viralPosts = [
    {
      id: 1,
      content: "🚀 The biggest mistake I see professionals make on LinkedIn? They focus on selling instead of serving. Here's what changed everything for me...",
      author: 'Marketing Expert',
      industry: 'Marketing',
      engagement: { views: 89420, likes: 3247, comments: 187, shares: 423 },
      category: 'personal-story',
      tags: ['marketing', 'personal branding', 'networking'],
      savedDate: '2 days ago',
      isViral: true
    },
    {
      id: 2,
      content: "The future of remote work is here. 5 trends that will shape how we work in 2024: 1) AI-powered collaboration tools 2) Virtual reality meetings 3) Async-first communication...",
      author: 'Tech Leader',
      industry: 'Technology',
      engagement: { views: 67890, likes: 2156, comments: 234, shares: 345 },
      category: 'industry-insights',
      tags: ['remote work', 'technology', 'future of work'],
      savedDate: '1 week ago',
      isViral: true
    },
    {
      id: 3,
      content: "How to build a personal brand that actually converts: Step 1: Define your unique value proposition Step 2: Create consistent content Step 3: Engage authentically...",
      author: 'Brand Strategist',
      industry: 'Marketing',
      engagement: { views: 45230, likes: 1789, comments: 156, shares: 267 },
      category: 'how-to',
      tags: ['personal branding', 'marketing', 'strategy'],
      savedDate: '3 days ago',
      isViral: false
    },
    {
      id: 4,
      content: "Your network is your net worth, but only if you nurture it properly. Here are 7 ways to build meaningful professional relationships...",
      author: 'Networking Coach',
      industry: 'Business',
      engagement: { views: 38470, likes: 1523, comments: 89, shares: 198 },
      category: 'lists',
      tags: ['networking', 'relationships', 'career'],
      savedDate: '5 days ago',
      isViral: false
    },
    {
      id: 5,
      content: "What's the biggest challenge you're facing in your career right now? I'll personally respond to every comment with actionable advice.",
      author: 'Career Coach',
      industry: 'Career Development',
      engagement: { views: 52340, likes: 2134, comments: 567, shares: 234 },
      category: 'questions',
      tags: ['career', 'advice', 'engagement'],
      savedDate: '1 day ago',
      isViral: true
    },
    {
      id: 6,
      content: "Two years ago, I was unemployed. Today, I'm leading a team of 50+ people. Here's what I learned about resilience and growth...",
      author: 'Business Leader',
      industry: 'Leadership',
      engagement: { views: 78920, likes: 3456, comments: 298, shares: 567 },
      category: 'motivational',
      tags: ['leadership', 'growth', 'resilience'],
      savedDate: '1 week ago',
      isViral: true
    }
  ];

  const filteredPosts = viralPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Library</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover viral posts and content inspiration</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              viewMode === 'grid'
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              viewMode === 'list'
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64">
          <div className="glass-card-hover">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search Content
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white placeholder-gray-400 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 border border-violet-500/30'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs bg-gray-700/50 px-2 py-1 rounded">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredPosts.length} posts
            </p>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select className="text-sm border border-gray-700/50 rounded-lg px-3 py-2 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300">
                <option>Most Popular</option>
                <option>Recent</option>
                <option>Highest Engagement</option>
              </select>
            </div>
          </div>

          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            {filteredPosts.map((post) => (
              <div key={post.id} className="glass-card-interactive group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white group-hover:text-cyan-100 transition-colors duration-300">{post.author}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{post.industry}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.isViral && (
                      <span className="flex items-center space-x-1 text-xs bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 px-2 py-1 rounded">
                        <TrendingUp className="w-3 h-3" />
                        <span>Viral</span>
                      </span>
                    )}
                    <button className="p-1 text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-white mb-4 line-clamp-3 group-hover:text-gray-100 transition-colors duration-300">
                  {post.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded hover:bg-gray-600/50 hover:text-gray-300 transition-all duration-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(post.engagement.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(post.engagement.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-4 h-4" />
                      <span>{post.engagement.shares}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-violet-400 transition-all duration-300 hover:scale-110">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLibrary;