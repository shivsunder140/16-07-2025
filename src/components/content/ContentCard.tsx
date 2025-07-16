import React from 'react';
import { 
  Clock, 
  User, 
  MessageCircle, 
  Heart, 
  Share2, 
  Eye,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Tag,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Post, Priority } from '../../types/content';
import { useContentStore } from '../../stores/contentStore';

interface ContentCardProps {
  post: Post;
  isDragging?: boolean;
  showActions?: boolean;
  compact?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  post, 
  isDragging = false, 
  showActions = true,
  compact = false 
}) => {
  const { selectPost, selectedPosts, updatePost, deletePost, duplicatePost } = useContentStore();
  
  const isSelected = selectedPosts.includes(post.id);
  
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ideas':
        return 'bg-gray-500/20 text-gray-400';
      case 'drafts':
        return 'bg-amber-500/20 text-amber-400';
      case 'review':
        return 'bg-violet-500/20 text-violet-400';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400';
      case 'published':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'archive':
        return 'bg-slate-500/20 text-slate-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="w-3 h-3" />;
      case 'image':
        return <Eye className="w-3 h-3" />;
      case 'video':
        return <Eye className="w-3 h-3" />;
      case 'carousel':
        return <Copy className="w-3 h-3" />;
      case 'article':
        return <FileText className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-emerald-400" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-400" />;
      case 'stable':
        return <Minus className="w-3 h-3 text-gray-400" />;
      default:
        return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  const handleCardClick = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      selectPost(post.id);
    }
  };
  
  return (
    <div
      className={`
        kanban-item group cursor-pointer transition-all duration-300
        ${isDragging ? 'opacity-50 rotate-2 scale-105' : ''}
        ${isSelected ? 'ring-2 ring-cyan-500/50 bg-cyan-500/10' : ''}
        ${compact ? 'p-3' : 'p-4'}
      `}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(post.status)}`}>
            {post.status}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(post.priority)}`}>
            {post.priority}
          </span>
          {post.aiGenerated && (
            <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>AI</span>
            </span>
          )}
        </div>
        
        {showActions && (
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit
              }}
              className="p-1 hover:bg-gray-700/50 rounded transition-colors duration-200"
            >
              <Edit className="w-3 h-3 text-gray-400 hover:text-cyan-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicatePost(post.id);
              }}
              className="p-1 hover:bg-gray-700/50 rounded transition-colors duration-200"
            >
              <Copy className="w-3 h-3 text-gray-400 hover:text-blue-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePost(post.id);
              }}
              className="p-1 hover:bg-gray-700/50 rounded transition-colors duration-200"
            >
              <Trash2 className="w-3 h-3 text-gray-400 hover:text-red-400" />
            </button>
          </div>
        )}
      </div>
      
      {/* Title */}
      {post.title && !compact && (
        <h4 className="font-medium text-white mb-2 line-clamp-1 group-hover:text-cyan-100 transition-colors duration-300">
          {post.title}
        </h4>
      )}
      
      {/* Content Preview */}
      <p className={`text-sm text-gray-300 mb-3 group-hover:text-gray-200 transition-colors duration-300 ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
        {post.content}
      </p>
      
      {/* Tags */}
      {post.tags.length > 0 && !compact && (
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded flex items-center space-x-1 hover:bg-gray-600/50 hover:text-gray-300 transition-all duration-300"
            >
              <Tag className="w-2 h-2" />
              <span>#{tag}</span>
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{post.tags.length - 3}</span>
          )}
        </div>
      )}
      
      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {getTypeIcon(post.type)}
            <span>{post.type}</span>
          </div>
          {post.scheduledTime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(post.scheduledTime)}</span>
            </div>
          )}
        </div>
        
        {post.performance && (
          <div className="flex items-center space-x-1">
            {getTrendIcon(post.performance.trend)}
            <span>{post.performance.score}/10</span>
          </div>
        )}
      </div>
      
      {/* Engagement Stats */}
      {(post.status === 'published' || post.engagement.views > 0) && (
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
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
            <div className="flex items-center space-x-1">
              <Share2 className="w-3 h-3" />
              <span>{post.engagement.shares}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Comments Indicator */}
      {post.comments.length > 0 && (
        <div className="flex items-center space-x-2 text-xs text-amber-400 mb-3">
          <AlertCircle className="w-3 h-3" />
          <span>{post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}</span>
          {post.comments.some(c => !c.isResolved) && (
            <span className="text-red-400">• Unresolved</span>
          )}
        </div>
      )}
      
      {/* Author */}
      <div className="flex items-center space-x-2">
        <img
          src={post.authorAvatar}
          alt={post.authorName}
          className="w-6 h-6 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 truncate">{post.authorName}</p>
          <p className="text-xs text-gray-500">{formatDate(post.updatedAt)}</p>
        </div>
        
        {post.collaborators.length > 0 && (
          <div className="flex -space-x-1">
            {post.collaborators.slice(0, 2).map((collaborator, index) => (
              <img
                key={index}
                src={collaborator.avatar}
                alt={collaborator.name}
                className="w-4 h-4 rounded-full border border-gray-700 object-cover"
                title={collaborator.name}
              />
            ))}
            {post.collaborators.length > 2 && (
              <div className="w-4 h-4 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center">
                <span className="text-xs text-gray-300">+{post.collaborators.length - 2}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;