export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
  children?: NavigationItem[];
  badge?: string;
  isNew?: boolean;
  requiresAuth?: boolean;
  roles?: string[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  meta: PageMeta;
  requiresAuth?: boolean;
  roles?: string[];
  layout?: 'default' | 'auth' | 'admin' | 'minimal';
}

export type UserRole = 'user' | 'admin' | 'team_member' | 'team_admin' | 'enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  linkedinConnected: boolean;
  onboardingCompleted: boolean;
  teamId?: string;
}