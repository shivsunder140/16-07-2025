import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  BarChart3, 
  Send,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface KanbanPost {
  id: number;
  content: string;
  scheduledTime: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  type: string;
  engagement: { likes: number; comments: number; shares: number };
}

const PostScheduler: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'kanban'>('calendar');
  const [draggedPost, setDraggedPost] = useState<KanbanPost | null>(null);

  const scheduledPosts: KanbanPost[] = [
    {
      id: 1,
      content: "🚀 Exciting news! Just launched our new AI-powered feature that's going to change how you create content...",
      scheduledTime: new Date(2024, 0, 15, 9, 0),
      status: 'scheduled',
      type: 'text',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 2,
      content: "The future of personal branding is here. 5 key trends every professional should know about...",
      scheduledTime: new Date(2024, 0, 15, 14, 30),
      status: 'scheduled',
      type: 'carousel',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 3,
      content: "My biggest LinkedIn mistake (and how you can avoid it) 📈 Thread below 👇",
      scheduledTime: new Date(2024, 0, 16, 10, 0),
      status: 'scheduled',
      type: 'text',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 4,
      content: "Here's what 2 years of content creation taught me about building an authentic personal brand...",
      scheduledTime: new Date(2024, 0, 14, 11, 0),
      status: 'published',
      type: 'text',
      engagement: { likes: 247, comments: 18, shares: 12 }
    }
  ];

  const kanbanColumns = [
    { id: 'draft', title: 'Draft', color: 'from-gray-500/20 to-gray-600/20', borderColor: 'border-gray-500/30' },
    { id: 'scheduled', title: 'Scheduled', color: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-500/30' },
    { id: 'published', title: 'Published', color: 'from-emerald-500/20 to-green-500/20', borderColor: 'border-emerald-500/30' },
    { id: 'failed', title: 'Failed', color: 'from-rose-500/20 to-red-500/20', borderColor: 'border-rose-500/30' }
  ];

  const getPostsByStatus = (status: string) => {
    return scheduledPosts.filter(post => post.status === status);
  };

  const handleDragStart = (post: KanbanPost) => {
    setDraggedPost(post);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedPost) {
      // Update post status logic would go here
      console.log(`Moving post ${draggedPost.id} to ${newStatus}`);
      setDraggedPost(null);
    }
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const getPostsForDate = (date: Date | null) => {
    if (!date) return [];
    return scheduledPosts.filter(post => 
      post.scheduledTime.toDateString() === date.toDateString()
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const KanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kanbanColumns.map((column) => (
        <div
          key={column.id}
          className={`kanban-column bg-gradient-to-br ${column.color} ${column.borderColor}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">{column.title}</h3>
            <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full">
              {getPostsByStatus(column.id).length}
            </span>
          </div>
          <div className="space-y-3">
            {getPostsByStatus(column.id).map((post) => (
              <div
                key={post.id}
                className="kanban-item group"
                draggable
                onDragStart={() => handleDragStart(post)}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                    <button className="p-1 hover:bg-gray-700/50 rounded">
                      <Edit className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700/50 rounded">
                      <Trash2 className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-white mb-2 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(post.scheduledTime)}</span>
                  </div>
                  {post.status === 'published' && (
                    <div className="flex items-center space-x-2">
                      <span>❤️ {post.engagement.likes}</span>
                      <span>💬 {post.engagement.comments}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post Scheduler</h1>
          <p className="text-gray-600 dark:text-gray-400">Plan and schedule your LinkedIn content</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                viewMode === 'calendar'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                viewMode === 'kanban'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Kanban
            </button>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <KanbanView />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glass-card-hover">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-200 interactive-hover"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-200 interactive-hover"
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((date, index) => {
                const postsForDate = getPostsForDate(date);
                const isToday = date && date.toDateString() === new Date().toDateString();
                const isSelected = date && date.toDateString() === selectedDate.toDateString();
                
                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border border-gray-700/50 rounded-lg cursor-pointer transition-all duration-300 ${
                      date ? 'hover:bg-gray-800/50 hover:border-cyan-500/30' : ''
                    } ${isSelected ? 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-violet-500/50' : ''}`}
                    onClick={() => date && setSelectedDate(date)}
                  >
                    {date && (
                      <>
                        <div className={`text-sm font-medium ${isToday ? 'text-cyan-400' : 'text-white'}`}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1 mt-1">
                          {postsForDate.slice(0, 2).map((post) => (
                            <div
                              key={post.id}
                              className={`text-xs px-2 py-1 rounded ${getStatusColor(post.status)}`}
                            >
                              {formatTime(post.scheduledTime)}
                            </div>
                          ))}
                          {postsForDate.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              +{postsForDate.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card-hover">
            <h3 className="text-lg font-semibold text-white mb-4">
              Posts for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </h3>
            <div className="space-y-3">
              {getPostsForDate(selectedDate).length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No posts scheduled for this date
                </p>
              ) : (
                getPostsForDate(selectedDate).map((post) => (
                  <div key={post.id} className="glass-card-interactive">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-700/50 rounded interactive-hover">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-700/50 rounded interactive-hover">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-white mb-2 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(post.scheduledTime)}</span>
                      </div>
                      {post.status === 'published' && (
                        <div className="flex items-center space-x-2">
                          <span>❤️ {post.engagement.likes}</span>
                          <span>💬 {post.engagement.comments}</span>
                          <span>🔄 {post.engagement.shares}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-card-hover">
            <h3 className="text-lg font-semibold text-white mb-4">Optimal Posting Times</h3>
            <div className="space-y-3">
              {timeSlots.map((time, index) => {
                const engagement = Math.floor(Math.random() * 100);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{time}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-700/50 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${engagement}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">{engagement}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5" />
              <h3 className="font-semibold">Scheduling Tip</h3>
            </div>
            <p className="text-sm opacity-90">
              Post during 9-11 AM and 2-4 PM for maximum engagement on LinkedIn.
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default PostScheduler;