export interface Post {
  id: string;
  title: string;
  content: string;
  status: PostStatus;
  type: PostType;
  scheduledTime?: Date;
  publishedTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  tags: string[];
  priority: Priority;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  aiGenerated: boolean;
  templateBased: boolean;
  collaborators: Collaborator[];
  comments: Comment[];
  performance?: {
    score: number;
    prediction: number;
    trend: 'up' | 'down' | 'stable';
  };
}

export type PostStatus = 'ideas' | 'drafts' | 'review' | 'scheduled' | 'published' | 'archive';
export type PostType = 'text' | 'image' | 'video' | 'carousel' | 'poll' | 'article';
export type Priority = 'low' | 'medium' | 'high';
export type ViewType = 'dashboard' | 'kanban' | 'calendar';
export type CalendarView = 'month' | 'week' | 'day' | 'list' | 'timeline';

export interface KanbanColumn {
  id: PostStatus;
  title: string;
  color: string;
  borderColor: string;
  description: string;
  limit?: number;
}

export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: 'author' | 'editor' | 'reviewer' | 'viewer';
  permissions: string[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: Date;
  parentId?: string;
  isResolved: boolean;
  mentions: string[];
}

export interface ContentFilters {
  status: PostStatus[];
  type: PostType[];
  priority: Priority[];
  tags: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  author: string[];
  hasComments: boolean;
  aiGenerated: boolean;
}

export interface DashboardStats {
  postsToday: number;
  scheduledPosts: number;
  draftCount: number;
  totalEngagement: number;
  followerGrowth: number;
  contentHealthScore: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Post;
  allDay?: boolean;
  recurring?: boolean;
}