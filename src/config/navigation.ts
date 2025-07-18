import { NavigationItem } from '../types/navigation';
import {
  BarChart3,
  Calendar,
  Edit3,
  Home,
  Library,
  Layers,
  Settings,
  User,
  Users,
  Target,
  Zap,
  TrendingUp,
  MessageCircle,
  Share2,
  Search,
  UserPlus,
  Mail,
  Link,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Shield,
  CreditCard,
  Bell,
  Globe,
  Code,
  Briefcase,
  Award,
  FileText,
  Eye,
  Hash,
  Clock,
  UserCheck,
  Lightbulb,
  Puzzle,
  Database,
  BarChart,
  Workflow,
  CheckSquare,
  Palette,
  Crown,
  Headphones,
  GraduationCap,
  Users2
} from 'lucide-react';

export const mainNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: Home,
    requiresAuth: true
  },
  {
    id: 'content',
    label: 'Content Studio',
    path: '/content',
    icon: Edit3,
    requiresAuth: true,
    children: [
      {
        id: 'content-hub',
        label: 'Content Hub',
        path: '/content',
        icon: Layers
      },
      {
        id: 'ai-creator',
        label: 'AI Post Generator',
        path: '/content/create',
        icon: Zap,
        isNew: true
      },
      {
        id: 'viral-library',
        label: 'Viral Post Library',
        path: '/content/library',
        icon: Library
      },
      {
        id: 'carousel-creator',
        label: 'Carousel Creator',
        path: '/content/carousel',
        icon: Layers
      },
      {
        id: 'content-calendar',
        label: 'Content Calendar',
        path: '/content/calendar',
        icon: Calendar
      },
      {
        id: 'post-scheduler',
        label: 'Post Scheduler',
        path: '/content/schedule',
        icon: Clock
      }
    ]
  },
  {
    id: 'leads',
    label: 'Lead Generation',
    path: '/leads',
    icon: Target,
    requiresAuth: true,
    children: [
      {
        id: 'lead-dashboard',
        label: 'Lead Dashboard',
        path: '/leads',
        icon: BarChart3
      },
      {
        id: 'lead-finder',
        label: 'Lead Finder',
        path: '/leads/finder',
        icon: Search
      },
      {
        id: 'outreach-campaigns',
        label: 'Outreach Campaigns',
        path: '/leads/outreach',
        icon: Mail
      },
      {
        id: 'crm-integration',
        label: 'CRM Integration',
        path: '/leads/crm',
        icon: Database
      },
      {
        id: 'relationship-building',
        label: 'Relationship Building',
        path: '/leads/relationships',
        icon: UserPlus
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    requiresAuth: true,
    children: [
      {
        id: 'analytics-dashboard',
        label: 'Analytics Dashboard',
        path: '/analytics',
        icon: BarChart3
      },
      {
        id: 'content-analytics',
        label: 'Content Analytics',
        path: '/analytics/content',
        icon: FileText
      },
      {
        id: 'lead-analytics',
        label: 'Lead Analytics',
        path: '/analytics/leads',
        icon: Target
      },
      {
        id: 'profile-analytics',
        label: 'Profile Analytics',
        path: '/analytics/profile',
        icon: User
      },
      {
        id: 'custom-reports',
        label: 'Custom Reports',
        path: '/analytics/reports',
        icon: FileText
      }
    ]
  },
  {
    id: 'profile',
    label: 'Profile Optimizer',
    path: '/profile/analyzer',
    icon: UserCheck,
    requiresAuth: true,
    children: [
      {
        id: 'profile-analyzer',
        label: 'Profile Analyzer',
        path: '/profile/analyzer',
        icon: Eye
      },
      {
        id: 'headline-generator',
        label: 'Headline Generator',
        path: '/profile/headline',
        icon: Lightbulb
      },
      {
        id: 'summary-builder',
        label: 'Summary Builder',
        path: '/profile/summary',
        icon: FileText
      },
      {
        id: 'experience-optimizer',
        label: 'Experience Optimizer',
        path: '/profile/experience',
        icon: Briefcase
      }
    ]
  },
  {
    id: 'team',
    label: 'Team',
    path: '/team',
    icon: Users,
    requiresAuth: true,
    roles: ['team_admin', 'enterprise'],
    children: [
      {
        id: 'team-dashboard',
        label: 'Team Dashboard',
        path: '/team',
        icon: Users
      },
      {
        id: 'content-approval',
        label: 'Content Approval',
        path: '/team/approval',
        icon: CheckSquare
      },
      {
        id: 'brand-guidelines',
        label: 'Brand Guidelines',
        path: '/team/brand',
        icon: Palette
      }
    ]
  },
  {
    id: 'integrations',
    label: 'Integrations',
    path: '/integrations',
    icon: Puzzle,
    requiresAuth: true,
    children: [
      {
        id: 'integration-hub',
        label: 'Integration Hub',
        path: '/integrations',
        icon: Puzzle
      },
      {
        id: 'crm-integrations',
        label: 'CRM Integrations',
        path: '/integrations/crm',
        icon: Database
      },
      {
        id: 'analytics-integrations',
        label: 'Analytics Integrations',
        path: '/integrations/analytics',
        icon: BarChart
      },
      {
        id: 'zapier-integration',
        label: 'Zapier Integration',
        path: '/integrations/zapier',
        icon: Workflow
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    requiresAuth: true
  }
];

export const supportNavigation: NavigationItem[] = [
  {
    id: 'help',
    label: 'Help Center',
    path: '/help',
    icon: HelpCircle
  },
  {
    id: 'support',
    label: 'Contact Support',
    path: '/support',
    icon: Headphones
  },
  {
    id: 'knowledge',
    label: 'Knowledge Base',
    path: '/knowledge',
    icon: BookOpen
  },
  {
    id: 'academy',
    label: 'Academy',
    path: '/academy',
    icon: GraduationCap
  },
  {
    id: 'community',
    label: 'Community',
    path: '/community',
    icon: Users2
  }
];

export const freeToolsNavigation: NavigationItem[] = [
  {
    id: 'free-audit',
    label: 'Free LinkedIn Audit',
    path: '/free-tools/audit',
    icon: Eye
  },
  {
    id: 'post-checker',
    label: 'Post Performance Checker',
    path: '/free-tools/post-checker',
    icon: BarChart3
  },
  {
    id: 'headline-generator',
    label: 'Headline Generator',
    path: '/free-tools/headline',
    icon: Lightbulb
  },
  {
    id: 'hashtag-tool',
    label: 'Hashtag Research Tool',
    path: '/free-tools/hashtags',
    icon: Hash
  },
  {
    id: 'timing-tool',
    label: 'Best Time to Post',
    path: '/free-tools/timing',
    icon: Clock
  },
  {
    id: 'profile-optimizer',
    label: 'Profile Optimizer',
    path: '/free-tools/profile',
    icon: UserCheck
  }
];

export const settingsNavigation: NavigationItem[] = [
  {
    id: 'account',
    label: 'Account Settings',
    path: '/settings/account',
    icon: User
  },
  {
    id: 'billing',
    label: 'Billing & Subscription',
    path: '/settings/billing',
    icon: CreditCard
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Connection',
    path: '/settings/linkedin',
    icon: Link
  },
  {
    id: 'team-management',
    label: 'Team Management',
    path: '/settings/team',
    icon: Users,
    roles: ['team_admin', 'enterprise']
  },
  {
    id: 'api',
    label: 'API & Developer',
    path: '/settings/api',
    icon: Code
  }
];

export const adminNavigation: NavigationItem[] = [
  {
    id: 'admin-dashboard',
    label: 'Admin Dashboard',
    path: '/admin',
    icon: Shield,
    roles: ['admin']
  },
  {
    id: 'user-management',
    label: 'User Management',
    path: '/admin/users',
    icon: Users,
    roles: ['admin']
  },
  {
    id: 'content-moderation',
    label: 'Content Moderation',
    path: '/admin/content',
    icon: Shield,
    roles: ['admin']
  }
];

export const marketingNavigation: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: Home
  },
  {
    id: 'demo',
    label: 'Product Demo',
    path: '/demo',
    icon: Eye
  },
  {
    id: 'pricing',
    label: 'Pricing',
    path: '/pricing',
    icon: CreditCard
  }
];