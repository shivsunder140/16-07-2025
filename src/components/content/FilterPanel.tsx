import React from 'react';
import { 
  X, 
  Calendar, 
  Tag, 
  User, 
  Filter,
  RotateCcw,
  Search
} from 'lucide-react';
import { useContentStore } from '../../stores/contentStore';
import { PostStatus, PostType, Priority } from '../../types/content';

const FilterPanel: React.FC = () => {
  const { 
    filters, 
    filterPosts, 
    toggleFilters, 
    posts,
    searchQuery,
    searchPosts 
  } = useContentStore();

  const statusOptions: { value: PostStatus; label: string; color: string }[] = [
    { value: 'ideas', label: 'Ideas', color: 'bg-gray-500/20 text-gray-400' },
    { value: 'drafts', label: 'Drafts', color: 'bg-amber-500/20 text-amber-400' },
    { value: 'review', label: 'Review', color: 'bg-violet-500/20 text-violet-400' },
    { value: 'scheduled', label: 'Scheduled', color: 'bg-blue-500/20 text-blue-400' },
    { value: 'published', label: 'Published', color: 'bg-emerald-500/20 text-emerald-400' },
    { value: 'archive', label: 'Archive', color: 'bg-slate-500/20 text-slate-400' }
  ];

  const typeOptions: { value: PostType; label: string }[] = [
    { value: 'text', label: 'Text Post' },
    { value: 'image', label: 'Image Post' },
    { value: 'video', label: 'Video Post' },
    { value: 'carousel', label: 'Carousel' },
    { value: 'poll', label: 'Poll' },
    { value: 'article', label: 'Article' }
  ];

  const priorityOptions: { value: Priority; label: string; color: string }[] = [
    { value: 'high', label: 'High Priority', color: 'bg-red-500/20 text-red-400' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-amber-500/20 text-amber-400' },
    { value: 'low', label: 'Low Priority', color: 'bg-green-500/20 text-green-400' }
  ];

  // Get unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  
  // Get unique authors from all posts
  const allAuthors = Array.from(new Set(posts.map(post => ({ id: post.authorId, name: post.authorName }))));

  const handleStatusChange = (status: PostStatus) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    filterPosts({ status: newStatuses });
  };

  const handleTypeChange = (type: PostType) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    
    filterPosts({ type: newTypes });
  };

  const handlePriorityChange = (priority: Priority) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    
    filterPosts({ priority: newPriorities });
  };

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    filterPosts({ tags: newTags });
  };

  const handleAuthorChange = (authorId: string) => {
    const newAuthors = filters.author.includes(authorId)
      ? filters.author.filter(a => a !== authorId)
      : [...filters.author, authorId];
    
    filterPosts({ author: newAuthors });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const date = value ? new Date(value) : null;
    filterPosts({
      dateRange: {
        ...filters.dateRange,
        [field]: date
      }
    });
  };

  const clearAllFilters = () => {
    filterPosts({
      status: [],
      type: [],
      priority: [],
      tags: [],
      dateRange: { start: null, end: null },
      author: [],
      hasComments: false,
      aiGenerated: false
    });
    searchPosts('');
  };

  const hasActiveFilters = 
    filters.status.length > 0 ||
    filters.type.length > 0 ||
    filters.priority.length > 0 ||
    filters.tags.length > 0 ||
    filters.author.length > 0 ||
    filters.dateRange.start ||
    filters.dateRange.end ||
    filters.hasComments ||
    filters.aiGenerated ||
    searchQuery.length > 0;

  return (
    <div className="h-full flex flex-col bg-gray-900/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-white">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="p-1 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              title="Clear all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={toggleFilters}
            className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search Content
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts, tags..."
              value={searchQuery}
              onChange={(e) => searchPosts(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Status
          </label>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.status.includes(option.value)}
                  onChange={() => handleStatusChange(option.value)}
                  className="w-4 h-4 text-cyan-600 border-gray-600 rounded focus:ring-cyan-500 bg-gray-800"
                />
                <span className={`text-sm px-2 py-1 rounded ${option.color} group-hover:opacity-80 transition-opacity duration-200`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Content Type
          </label>
          <div className="space-y-2">
            {typeOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.type.includes(option.value)}
                  onChange={() => handleTypeChange(option.value)}
                  className="w-4 h-4 text-cyan-600 border-gray-600 rounded focus:ring-cyan-500 bg-gray-800"
                />
                <span className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Priority
          </label>
          <div className="space-y-2">
            {priorityOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.priority.includes(option.value)}
                  onChange={() => handlePriorityChange(option.value)}
                  className="w-4 h-4 text-cyan-600 border-gray-600 rounded focus:ring-cyan-500 bg-gray-800"
                />
                <span className={`text-sm px-2 py-1 rounded ${option.color} group-hover:opacity-80 transition-opacity duration-200`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date Range
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">From</label>
              <input
                type="date"
                value={filters.dateRange.start ? filters.dateRange.start.toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">To</label>
              <input
                type="date"
                value={filters.dateRange.end ? filters.dateRange.end.toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              <Tag className="w-4 h-4 inline mr-2" />
              Tags
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {allTags.map((tag) => (
                <label key={tag} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="w-4 h-4 text-cyan-600 border-gray-600 rounded focus:ring-cyan-500 bg-gray-800"
                  />
                  <span className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    #{tag}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Authors Filter */}
        {allAuthors.length > 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              <User className="w-4 h-4 inline mr-2" />
              Authors
            </label>
            <div className="space-y-2">
              {allAuthors.map((author) => (
                <label key={author.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.author.includes(author.id)}
                    onChange={() => handleAuthorChange(author.id)}
                    className="w-4 h-4 text-cyan-600 border-gray-600 rounded focus:ring-cyan-500 bg-gray-800"
                  />
                  <span className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                    {author.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Special Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Special Filters
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasComments}
                onChange={(e) => filterPosts({ hasComments: e.target.checked })}
                className="w-4 h-4 text-cyan-600 border-gray-600 rounded focus:ring-cyan-500 bg-gray-800"
              />
              <span className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                Has Comments
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.aiGenerated}
                onChange={(e) => filterPosts({ aiGenerated: e.target.checked })}
                className="w-4 h-4 text-cyan-600 border-gray-600 rounded focus:ring-cyan-500 bg-gray-800"
              />
              <span className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                AI Generated
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Footer */}
      {hasActiveFilters && (
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={clearAllFilters}
            className="w-full px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-400 border border-red-500/30 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;