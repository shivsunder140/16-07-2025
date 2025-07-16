import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Post, 
  PostStatus, 
  ViewType, 
  CalendarView, 
  ContentFilters, 
  KanbanColumn,
  DashboardStats 
} from '../types/content';

interface ContentStore {
  // Content data
  posts: Post[];
  filteredPosts: Post[];
  selectedPosts: string[];
  
  // View states
  currentView: ViewType;
  kanbanColumns: KanbanColumn[];
  calendarView: CalendarView;
  currentDate: Date;
  
  // Filters and search
  filters: ContentFilters;
  searchQuery: string;
  sortBy: 'createdAt' | 'scheduledTime' | 'priority' | 'engagement';
  sortOrder: 'asc' | 'desc';
  
  // UI states
  isLoading: boolean;
  draggedItem: string | null;
  showFilters: boolean;
  sidebarCollapsed: boolean;
  
  // Dashboard stats
  stats: DashboardStats;
  
  // Actions
  setView: (view: ViewType) => void;
  setCalendarView: (view: CalendarView) => void;
  setCurrentDate: (date: Date) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  movePost: (postId: string, newStatus: PostStatus) => void;
  filterPosts: (filters: Partial<ContentFilters>) => void;
  searchPosts: (query: string) => void;
  bulkUpdate: (postIds: string[], updates: Partial<Post>) => void;
  selectPost: (postId: string) => void;
  selectMultiplePosts: (postIds: string[]) => void;
  clearSelection: () => void;
  setDraggedItem: (itemId: string | null) => void;
  toggleFilters: () => void;
  toggleSidebar: () => void;
  refreshStats: () => void;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deletePost: (postId: string) => void;
  duplicatePost: (postId: string) => void;
}

const defaultFilters: ContentFilters = {
  status: [],
  type: [],
  priority: [],
  tags: [],
  dateRange: { start: null, end: null },
  author: [],
  hasComments: false,
  aiGenerated: false,
};

const defaultColumns: KanbanColumn[] = [
  {
    id: 'ideas',
    title: 'Ideas',
    color: 'from-gray-500/20 to-gray-600/20',
    borderColor: 'border-gray-500/30',
    description: 'Brainstormed concepts and inspiration'
  },
  {
    id: 'drafts',
    title: 'Drafts',
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    description: 'Content being written or edited'
  },
  {
    id: 'review',
    title: 'Review',
    color: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'border-violet-500/30',
    description: 'Posts awaiting approval or final edits'
  },
  {
    id: 'scheduled',
    title: 'Scheduled',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    description: 'Posts queued for publishing'
  },
  {
    id: 'published',
    title: 'Published',
    color: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'border-emerald-500/30',
    description: 'Live posts with performance tracking'
  },
  {
    id: 'archive',
    title: 'Archive',
    color: 'from-slate-500/20 to-gray-500/20',
    borderColor: 'border-slate-500/30',
    description: 'Completed or cancelled posts'
  }
];

// Mock data generator
const generateMockPosts = (): Post[] => {
  const mockPosts: Post[] = [
    {
      id: '1',
      title: 'AI Revolution in Marketing',
      content: '🚀 The biggest mistake I see professionals make on LinkedIn? They focus on selling instead of serving. Here\'s what changed everything for me...',
      status: 'published',
      type: 'text',
      scheduledTime: new Date(2024, 0, 14, 9, 0),
      publishedTime: new Date(2024, 0, 14, 9, 0),
      createdAt: new Date(2024, 0, 13),
      updatedAt: new Date(2024, 0, 14),
      authorId: '1',
      authorName: 'Sarah Johnson',
      authorAvatar: 'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      tags: ['marketing', 'ai', 'strategy'],
      priority: 'high',
      engagement: { likes: 247, comments: 18, shares: 12, views: 5420 },
      aiGenerated: true,
      templateBased: false,
      collaborators: [],
      comments: [],
      performance: { score: 8.5, prediction: 9.2, trend: 'up' }
    },
    {
      id: '2',
      title: 'Future of Remote Work',
      content: 'The future of remote work is here. 5 key trends every professional should know about...',
      status: 'scheduled',
      type: 'carousel',
      scheduledTime: new Date(2024, 0, 16, 14, 30),
      createdAt: new Date(2024, 0, 15),
      updatedAt: new Date(2024, 0, 15),
      authorId: '1',
      authorName: 'Sarah Johnson',
      authorAvatar: 'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      tags: ['remote work', 'future', 'trends'],
      priority: 'medium',
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      aiGenerated: false,
      templateBased: true,
      collaborators: [],
      comments: [],
      performance: { score: 7.8, prediction: 8.1, trend: 'stable' }
    },
    {
      id: '3',
      title: 'Personal Branding Guide',
      content: 'How to build a personal brand that actually converts: Step 1: Define your unique value proposition...',
      status: 'review',
      type: 'article',
      createdAt: new Date(2024, 0, 15),
      updatedAt: new Date(2024, 0, 15),
      authorId: '1',
      authorName: 'Sarah Johnson',
      authorAvatar: 'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      tags: ['personal branding', 'marketing', 'strategy'],
      priority: 'high',
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      aiGenerated: false,
      templateBased: false,
      collaborators: [],
      comments: [
        {
          id: '1',
          content: 'Great insights! Consider adding more examples.',
          authorId: '2',
          authorName: 'John Doe',
          authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          createdAt: new Date(2024, 0, 15, 10, 30),
          isResolved: false,
          mentions: []
        }
      ]
    },
    {
      id: '4',
      title: 'Content Strategy Ideas',
      content: 'Brainstorming session: What content resonates most with our audience?',
      status: 'ideas',
      type: 'text',
      createdAt: new Date(2024, 0, 15),
      updatedAt: new Date(2024, 0, 15),
      authorId: '1',
      authorName: 'Sarah Johnson',
      authorAvatar: 'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      tags: ['brainstorming', 'strategy'],
      priority: 'low',
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      aiGenerated: false,
      templateBased: false,
      collaborators: [],
      comments: []
    },
    {
      id: '5',
      title: 'LinkedIn Growth Hacks',
      content: 'My unconventional approach to networking that actually works...',
      status: 'drafts',
      type: 'text',
      createdAt: new Date(2024, 0, 15),
      updatedAt: new Date(2024, 0, 15),
      authorId: '1',
      authorName: 'Sarah Johnson',
      authorAvatar: 'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      tags: ['linkedin', 'networking', 'growth'],
      priority: 'medium',
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      aiGenerated: true,
      templateBased: false,
      collaborators: [],
      comments: []
    }
  ];
  
  return mockPosts;
};

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      // Initial state
      posts: generateMockPosts(),
      filteredPosts: generateMockPosts(),
      selectedPosts: [],
      currentView: 'dashboard',
      kanbanColumns: defaultColumns,
      calendarView: 'month',
      currentDate: new Date(),
      filters: defaultFilters,
      searchQuery: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      isLoading: false,
      draggedItem: null,
      showFilters: false,
      sidebarCollapsed: false,
      stats: {
        postsToday: 3,
        scheduledPosts: 5,
        draftCount: 8,
        totalEngagement: 1247,
        followerGrowth: 12.5,
        contentHealthScore: 8.7
      },

      // Actions
      setView: (view) => set({ currentView: view }),
      
      setCalendarView: (view) => set({ calendarView: view }),
      
      setCurrentDate: (date) => set({ currentDate: date }),
      
      updatePost: (id, updates) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === id 
            ? { ...post, ...updates, updatedAt: new Date() }
            : post
        )
      })),
      
      movePost: (postId, newStatus) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? { ...post, status: newStatus, updatedAt: new Date() }
            : post
        )
      })),
      
      filterPosts: (newFilters) => set((state) => {
        const updatedFilters = { ...state.filters, ...newFilters };
        const filtered = state.posts.filter(post => {
          // Status filter
          if (updatedFilters.status.length > 0 && !updatedFilters.status.includes(post.status)) {
            return false;
          }
          
          // Type filter
          if (updatedFilters.type.length > 0 && !updatedFilters.type.includes(post.type)) {
            return false;
          }
          
          // Priority filter
          if (updatedFilters.priority.length > 0 && !updatedFilters.priority.includes(post.priority)) {
            return false;
          }
          
          // Tags filter
          if (updatedFilters.tags.length > 0 && !updatedFilters.tags.some(tag => post.tags.includes(tag))) {
            return false;
          }
          
          // Date range filter
          if (updatedFilters.dateRange.start && post.createdAt < updatedFilters.dateRange.start) {
            return false;
          }
          if (updatedFilters.dateRange.end && post.createdAt > updatedFilters.dateRange.end) {
            return false;
          }
          
          // Comments filter
          if (updatedFilters.hasComments && post.comments.length === 0) {
            return false;
          }
          
          // AI generated filter
          if (updatedFilters.aiGenerated && !post.aiGenerated) {
            return false;
          }
          
          return true;
        });
        
        return {
          filters: updatedFilters,
          filteredPosts: filtered
        };
      }),
      
      searchPosts: (query) => set((state) => {
        const filtered = state.posts.filter(post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        
        return {
          searchQuery: query,
          filteredPosts: query ? filtered : state.posts
        };
      }),
      
      bulkUpdate: (postIds, updates) => set((state) => ({
        posts: state.posts.map(post =>
          postIds.includes(post.id)
            ? { ...post, ...updates, updatedAt: new Date() }
            : post
        )
      })),
      
      selectPost: (postId) => set((state) => ({
        selectedPosts: state.selectedPosts.includes(postId)
          ? state.selectedPosts.filter(id => id !== postId)
          : [...state.selectedPosts, postId]
      })),
      
      selectMultiplePosts: (postIds) => set({ selectedPosts: postIds }),
      
      clearSelection: () => set({ selectedPosts: [] }),
      
      setDraggedItem: (itemId) => set({ draggedItem: itemId }),
      
      toggleFilters: () => set((state) => ({ showFilters: !state.showFilters })),
      
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      refreshStats: () => set((state) => {
        const posts = state.posts;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const postsToday = posts.filter(post => {
          const postDate = new Date(post.createdAt);
          postDate.setHours(0, 0, 0, 0);
          return postDate.getTime() === today.getTime();
        }).length;
        
        const scheduledPosts = posts.filter(post => post.status === 'scheduled').length;
        const draftCount = posts.filter(post => post.status === 'drafts').length;
        const totalEngagement = posts.reduce((sum, post) => 
          sum + post.engagement.likes + post.engagement.comments + post.engagement.shares, 0
        );
        
        return {
          stats: {
            postsToday,
            scheduledPosts,
            draftCount,
            totalEngagement,
            followerGrowth: 12.5, // Mock data
            contentHealthScore: 8.7 // Mock data
          }
        };
      }),
      
      addPost: (postData) => set((state) => {
        const newPost: Post = {
          ...postData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
          collaborators: [],
          comments: []
        };
        
        return {
          posts: [newPost, ...state.posts],
          filteredPosts: [newPost, ...state.filteredPosts]
        };
      }),
      
      deletePost: (postId) => set((state) => ({
        posts: state.posts.filter(post => post.id !== postId),
        filteredPosts: state.filteredPosts.filter(post => post.id !== postId),
        selectedPosts: state.selectedPosts.filter(id => id !== postId)
      })),
      
      duplicatePost: (postId) => set((state) => {
        const originalPost = state.posts.find(post => post.id === postId);
        if (!originalPost) return state;
        
        const duplicatedPost: Post = {
          ...originalPost,
          id: Date.now().toString(),
          title: `${originalPost.title} (Copy)`,
          status: 'drafts',
          createdAt: new Date(),
          updatedAt: new Date(),
          scheduledTime: undefined,
          publishedTime: undefined,
          engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
          comments: []
        };
        
        return {
          posts: [duplicatedPost, ...state.posts],
          filteredPosts: [duplicatedPost, ...state.filteredPosts]
        };
      })
    }),
    {
      name: 'content-store',
      partialize: (state) => ({
        currentView: state.currentView,
        calendarView: state.calendarView,
        filters: state.filters,
        sidebarCollapsed: state.sidebarCollapsed
      })
    }
  )
);