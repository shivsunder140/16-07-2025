import { RouteConfig } from '../types/navigation';
import { lazy } from 'react';

// Lazy load components for better performance
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/auth/Signup'));
const Onboarding = lazy(() => import('../pages/auth/Onboarding'));

// Content Studio
const ContentHub = lazy(() => import('../pages/content/ContentHub'));
const ContentCreator = lazy(() => import('../pages/ContentCreator'));
const ContentLibrary = lazy(() => import('../pages/ContentLibrary'));
const CarouselCreator = lazy(() => import('../pages/content/CarouselCreator'));
const ContentCalendar = lazy(() => import('../pages/content/ContentCalendar'));
const PostScheduler = lazy(() => import('../pages/PostScheduler'));

// Lead Generation
const LeadDashboard = lazy(() => import('../pages/leads/LeadDashboard'));
const LeadFinder = lazy(() => import('../pages/leads/LeadFinder'));
const OutreachCampaigns = lazy(() => import('../pages/leads/OutreachCampaigns'));
const CRMIntegration = lazy(() => import('../pages/leads/CRMIntegration'));
const RelationshipBuilding = lazy(() => import('../pages/leads/RelationshipBuilding'));

// Analytics
const Analytics = lazy(() => import('../pages/Analytics'));
const ContentAnalytics = lazy(() => import('../pages/analytics/ContentAnalytics'));
const LeadAnalytics = lazy(() => import('../pages/analytics/LeadAnalytics'));
const ProfileAnalytics = lazy(() => import('../pages/analytics/ProfileAnalytics'));
const CustomReports = lazy(() => import('../pages/analytics/CustomReports'));

// Profile Optimization
const ProfileAnalyzer = lazy(() => import('../pages/profile/ProfileAnalyzer'));
const HeadlineGenerator = lazy(() => import('../pages/profile/HeadlineGenerator'));
const SummaryBuilder = lazy(() => import('../pages/profile/SummaryBuilder'));
const ExperienceOptimizer = lazy(() => import('../pages/profile/ExperienceOptimizer'));

// Team & Collaboration
const TeamDashboard = lazy(() => import('../pages/team/TeamDashboard'));
const ContentApproval = lazy(() => import('../pages/team/ContentApproval'));
const BrandGuidelines = lazy(() => import('../pages/team/BrandGuidelines'));

// Integrations
const IntegrationHub = lazy(() => import('../pages/integrations/IntegrationHub'));
const CRMIntegrations = lazy(() => import('../pages/integrations/CRMIntegrations'));
const AnalyticsIntegrations = lazy(() => import('../pages/integrations/AnalyticsIntegrations'));
const ZapierIntegration = lazy(() => import('../pages/integrations/ZapierIntegration'));

// Settings
const Settings = lazy(() => import('../pages/Settings'));
const AccountSettings = lazy(() => import('../pages/settings/AccountSettings'));
const BillingSettings = lazy(() => import('../pages/settings/BillingSettings'));
const LinkedInConnection = lazy(() => import('../pages/settings/LinkedInConnection'));
const TeamManagement = lazy(() => import('../pages/settings/TeamManagement'));
const APISettings = lazy(() => import('../pages/settings/APISettings'));

// Support & Resources
const HelpCenter = lazy(() => import('../pages/support/HelpCenter'));
const ContactSupport = lazy(() => import('../pages/support/ContactSupport'));
const KnowledgeBase = lazy(() => import('../pages/support/KnowledgeBase'));
const Academy = lazy(() => import('../pages/support/Academy'));
const Community = lazy(() => import('../pages/support/Community'));

// Free Tools
const FreeAudit = lazy(() => import('../pages/free-tools/FreeAudit'));
const PostChecker = lazy(() => import('../pages/free-tools/PostChecker'));
const FreeHeadlineGenerator = lazy(() => import('../pages/free-tools/FreeHeadlineGenerator'));
const HashtagTool = lazy(() => import('../pages/free-tools/HashtagTool'));
const TimingTool = lazy(() => import('../pages/free-tools/TimingTool'));
const ProfileOptimizer = lazy(() => import('../pages/free-tools/ProfileOptimizer'));

// Marketing Pages
const Homepage = lazy(() => import('../pages/marketing/Homepage'));
const ProductDemo = lazy(() => import('../pages/marketing/ProductDemo'));
const Pricing = lazy(() => import('../pages/marketing/Pricing'));

// Legal
const PrivacyPolicy = lazy(() => import('../pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../pages/legal/TermsOfService'));
const CookiePolicy = lazy(() => import('../pages/legal/CookiePolicy'));

// Admin
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const UserManagement = lazy(() => import('../pages/admin/UserManagement'));
const ContentModeration = lazy(() => import('../pages/admin/ContentModeration'));

export const routes: RouteConfig[] = [
  // Marketing & Public Pages
  {
    path: '/',
    component: Homepage,
    exact: true,
    meta: {
      title: 'LinkedIn Growth Platform - Grow Your Professional Network',
      description: 'The ultimate LinkedIn growth platform for professionals and businesses. Create engaging content, generate leads, and build your personal brand.',
      keywords: ['linkedin growth', 'social media marketing', 'lead generation', 'personal branding']
    },
    layout: 'minimal'
  },
  {
    path: '/demo',
    component: ProductDemo,
    meta: {
      title: 'Product Demo - See How It Works',
      description: 'Watch our interactive product demo to see how our LinkedIn growth platform can transform your professional presence.'
    },
    layout: 'minimal'
  },
  {
    path: '/pricing',
    component: Pricing,
    meta: {
      title: 'Pricing Plans - Choose Your Growth Plan',
      description: 'Flexible pricing plans for individuals, teams, and enterprises. Start your LinkedIn growth journey today.'
    },
    layout: 'minimal'
  },

  // Authentication
  {
    path: '/login',
    component: Login,
    meta: {
      title: 'Login - Access Your Account',
      description: 'Sign in to your LinkedIn growth platform account and continue building your professional presence.'
    },
    layout: 'auth'
  },
  {
    path: '/signup',
    component: Signup,
    meta: {
      title: 'Sign Up - Start Your Growth Journey',
      description: 'Create your account and start growing your LinkedIn presence with our powerful tools and AI assistance.'
    },
    layout: 'auth'
  },
  {
    path: '/onboarding',
    component: Onboarding,
    requiresAuth: true,
    meta: {
      title: 'Welcome - Set Up Your Account',
      description: 'Complete your account setup and connect your LinkedIn profile to get started.'
    },
    layout: 'minimal'
  },

  // Main Dashboard
  {
    path: '/dashboard',
    component: Dashboard,
    requiresAuth: true,
    meta: {
      title: 'Dashboard - LinkedIn Growth Overview',
      description: 'Your LinkedIn growth command center. Track performance, manage content, and monitor lead generation.'
    }
  },

  // Content Studio
  {
    path: '/content',
    component: ContentHub,
    requiresAuth: true,
    meta: {
      title: 'Content Hub - Manage Your LinkedIn Content',
      description: 'Create, schedule, and manage all your LinkedIn content from one central hub.'
    }
  },
  {
    path: '/content/create',
    component: ContentCreator,
    requiresAuth: true,
    meta: {
      title: 'AI Content Creator - Generate Engaging Posts',
      description: 'Create engaging LinkedIn posts with AI assistance. Generate ideas, write content, and optimize for maximum engagement.'
    }
  },
  {
    path: '/content/library',
    component: ContentLibrary,
    requiresAuth: true,
    meta: {
      title: 'Viral Content Library - Discover High-Performing Posts',
      description: 'Browse thousands of viral LinkedIn posts and adapt them to your voice and industry.'
    }
  },
  {
    path: '/content/carousel',
    component: CarouselCreator,
    requiresAuth: true,
    meta: {
      title: 'Carousel Creator - Design LinkedIn Carousels',
      description: 'Create stunning LinkedIn carousel posts with our drag-and-drop builder and AI-powered content generation.'
    }
  },
  {
    path: '/content/calendar',
    component: ContentCalendar,
    requiresAuth: true,
    meta: {
      title: 'Content Calendar - Plan Your LinkedIn Strategy',
      description: 'Visualize and manage your LinkedIn content strategy with our intuitive calendar interface.'
    }
  },
  {
    path: '/content/schedule',
    component: PostScheduler,
    requiresAuth: true,
    meta: {
      title: 'Post Scheduler - Optimize Your Posting Times',
      description: 'Schedule your LinkedIn posts for optimal engagement with AI-powered timing recommendations.'
    }
  },

  // Lead Generation
  {
    path: '/leads',
    component: LeadDashboard,
    requiresAuth: true,
    meta: {
      title: 'Lead Dashboard - Track Your LinkedIn Leads',
      description: 'Monitor and manage your LinkedIn lead generation pipeline with comprehensive analytics and insights.'
    }
  },
  {
    path: '/leads/finder',
    component: LeadFinder,
    requiresAuth: true,
    meta: {
      title: 'Lead Finder - Discover Potential Customers',
      description: 'Find and identify potential leads on LinkedIn with advanced search and filtering capabilities.'
    }
  },
  {
    path: '/leads/outreach',
    component: OutreachCampaigns,
    requiresAuth: true,
    meta: {
      title: 'Outreach Campaigns - Automate Your LinkedIn Outreach',
      description: 'Create and manage personalized LinkedIn outreach campaigns to convert prospects into customers.'
    }
  },
  {
    path: '/leads/crm',
    component: CRMIntegration,
    requiresAuth: true,
    meta: {
      title: 'CRM Integration - Sync Your LinkedIn Leads',
      description: 'Seamlessly integrate your LinkedIn leads with popular CRM platforms like Salesforce and HubSpot.'
    }
  },
  {
    path: '/leads/relationships',
    component: RelationshipBuilding,
    requiresAuth: true,
    meta: {
      title: 'Relationship Building - Nurture Your Network',
      description: 'Build and maintain meaningful professional relationships with automated follow-up sequences.'
    }
  },

  // Analytics
  {
    path: '/analytics',
    component: Analytics,
    requiresAuth: true,
    meta: {
      title: 'Analytics Dashboard - LinkedIn Performance Insights',
      description: 'Comprehensive analytics and insights for your LinkedIn performance, content, and lead generation.'
    }
  },
  {
    path: '/analytics/content',
    component: ContentAnalytics,
    requiresAuth: true,
    meta: {
      title: 'Content Analytics - Track Post Performance',
      description: 'Detailed analytics for your LinkedIn content performance, engagement rates, and audience insights.'
    }
  },
  {
    path: '/analytics/leads',
    component: LeadAnalytics,
    requiresAuth: true,
    meta: {
      title: 'Lead Analytics - Measure Lead Generation ROI',
      description: 'Track your LinkedIn lead generation performance, conversion rates, and campaign effectiveness.'
    }
  },
  {
    path: '/analytics/profile',
    component: ProfileAnalytics,
    requiresAuth: true,
    meta: {
      title: 'Profile Analytics - Monitor Profile Performance',
      description: 'Analyze your LinkedIn profile performance, views, and connection growth over time.'
    }
  },
  {
    path: '/analytics/reports',
    component: CustomReports,
    requiresAuth: true,
    meta: {
      title: 'Custom Reports - Create Detailed Analytics Reports',
      description: 'Build custom analytics reports for your LinkedIn performance and export them for stakeholders.'
    }
  },

  // Profile Optimization
  {
    path: '/profile/analyzer',
    component: ProfileAnalyzer,
    requiresAuth: true,
    meta: {
      title: 'Profile Analyzer - Optimize Your LinkedIn Profile',
      description: 'Get detailed recommendations to optimize your LinkedIn profile for better visibility and engagement.'
    }
  },
  {
    path: '/profile/headline',
    component: HeadlineGenerator,
    requiresAuth: true,
    meta: {
      title: 'Headline Generator - Create Compelling LinkedIn Headlines',
      description: 'Generate attention-grabbing LinkedIn headlines that showcase your expertise and attract your target audience.'
    }
  },
  {
    path: '/profile/summary',
    component: SummaryBuilder,
    requiresAuth: true,
    meta: {
      title: 'Summary Builder - Craft Your LinkedIn Summary',
      description: 'Create a compelling LinkedIn summary that tells your professional story and drives action.'
    }
  },
  {
    path: '/profile/experience',
    component: ExperienceOptimizer,
    requiresAuth: true,
    meta: {
      title: 'Experience Optimizer - Enhance Your Work History',
      description: 'Optimize your LinkedIn work experience section to highlight achievements and attract opportunities.'
    }
  },

  // Team & Collaboration
  {
    path: '/team',
    component: TeamDashboard,
    requiresAuth: true,
    roles: ['team_admin', 'enterprise'],
    meta: {
      title: 'Team Dashboard - Manage Your LinkedIn Team',
      description: 'Collaborate with your team on LinkedIn content creation, approval workflows, and performance tracking.'
    }
  },
  {
    path: '/team/approval',
    component: ContentApproval,
    requiresAuth: true,
    roles: ['team_admin', 'enterprise'],
    meta: {
      title: 'Content Approval - Review Team Content',
      description: 'Review and approve team content before publishing to maintain brand consistency and quality.'
    }
  },
  {
    path: '/team/brand',
    component: BrandGuidelines,
    requiresAuth: true,
    roles: ['team_admin', 'enterprise'],
    meta: {
      title: 'Brand Guidelines - Maintain Brand Consistency',
      description: 'Set and manage brand guidelines for your team\'s LinkedIn content and messaging.'
    }
  },

  // Integrations
  {
    path: '/integrations',
    component: IntegrationHub,
    requiresAuth: true,
    meta: {
      title: 'Integration Hub - Connect Your Tools',
      description: 'Connect your favorite tools and platforms to streamline your LinkedIn growth workflow.'
    }
  },
  {
    path: '/integrations/crm',
    component: CRMIntegrations,
    requiresAuth: true,
    meta: {
      title: 'CRM Integrations - Sync with Your CRM',
      description: 'Integrate with popular CRM platforms to sync your LinkedIn leads and contacts automatically.'
    }
  },
  {
    path: '/integrations/analytics',
    component: AnalyticsIntegrations,
    requiresAuth: true,
    meta: {
      title: 'Analytics Integrations - Connect Analytics Tools',
      description: 'Connect Google Analytics, Looker Studio, and other analytics tools for comprehensive reporting.'
    }
  },
  {
    path: '/integrations/zapier',
    component: ZapierIntegration,
    requiresAuth: true,
    meta: {
      title: 'Zapier Integration - Automate Your Workflow',
      description: 'Connect with 5000+ apps through Zapier to automate your LinkedIn growth workflow.'
    }
  },

  // Settings
  {
    path: '/settings',
    component: Settings,
    requiresAuth: true,
    meta: {
      title: 'Settings - Manage Your Account',
      description: 'Manage your account settings, preferences, and integrations.'
    }
  },
  {
    path: '/settings/account',
    component: AccountSettings,
    requiresAuth: true,
    meta: {
      title: 'Account Settings - Update Your Profile',
      description: 'Update your account information, preferences, and notification settings.'
    }
  },
  {
    path: '/settings/billing',
    component: BillingSettings,
    requiresAuth: true,
    meta: {
      title: 'Billing Settings - Manage Your Subscription',
      description: 'View and manage your subscription, payment methods, and billing history.'
    }
  },
  {
    path: '/settings/linkedin',
    component: LinkedInConnection,
    requiresAuth: true,
    meta: {
      title: 'LinkedIn Connection - Manage LinkedIn Integration',
      description: 'Manage your LinkedIn connection, permissions, and data synchronization settings.'
    }
  },
  {
    path: '/settings/team',
    component: TeamManagement,
    requiresAuth: true,
    roles: ['team_admin', 'enterprise'],
    meta: {
      title: 'Team Management - Manage Team Members',
      description: 'Add, remove, and manage team members, roles, and permissions.'
    }
  },
  {
    path: '/settings/api',
    component: APISettings,
    requiresAuth: true,
    meta: {
      title: 'API Settings - Manage API Access',
      description: 'Manage your API keys, webhooks, and developer settings.'
    }
  },

  // Support & Resources
  {
    path: '/help',
    component: HelpCenter,
    meta: {
      title: 'Help Center - Get Support and Answers',
      description: 'Find answers to common questions, tutorials, and guides to help you succeed with LinkedIn growth.'
    }
  },
  {
    path: '/support',
    component: ContactSupport,
    meta: {
      title: 'Contact Support - Get Help When You Need It',
      description: 'Contact our support team for help with your account, features, or any questions you may have.'
    }
  },
  {
    path: '/knowledge',
    component: KnowledgeBase,
    meta: {
      title: 'Knowledge Base - Learn and Grow',
      description: 'Access our comprehensive knowledge base with guides, best practices, and expert insights.'
    }
  },
  {
    path: '/academy',
    component: Academy,
    meta: {
      title: 'LinkedIn Growth Academy - Master LinkedIn Marketing',
      description: 'Learn LinkedIn marketing strategies, best practices, and advanced techniques from industry experts.'
    }
  },
  {
    path: '/community',
    component: Community,
    meta: {
      title: 'Community - Connect with Other Professionals',
      description: 'Join our community of LinkedIn growth professionals to share insights, tips, and success stories.'
    }
  },

  // Free Tools
  {
    path: '/free-tools/audit',
    component: FreeAudit,
    meta: {
      title: 'Free LinkedIn Profile Audit - Optimize Your Profile',
      description: 'Get a free comprehensive audit of your LinkedIn profile with actionable recommendations for improvement.'
    },
    layout: 'minimal'
  },
  {
    path: '/free-tools/post-checker',
    component: PostChecker,
    meta: {
      title: 'Free Post Performance Checker - Analyze Your Posts',
      description: 'Check how your LinkedIn posts are performing and get insights to improve engagement.'
    },
    layout: 'minimal'
  },
  {
    path: '/free-tools/headline',
    component: FreeHeadlineGenerator,
    meta: {
      title: 'Free LinkedIn Headline Generator - Create Compelling Headlines',
      description: 'Generate attention-grabbing LinkedIn headlines that showcase your expertise and attract opportunities.'
    },
    layout: 'minimal'
  },
  {
    path: '/free-tools/hashtags',
    component: HashtagTool,
    meta: {
      title: 'Free Hashtag Research Tool - Find Trending Hashtags',
      description: 'Discover trending and relevant hashtags for your LinkedIn posts to increase visibility and engagement.'
    },
    layout: 'minimal'
  },
  {
    path: '/free-tools/timing',
    component: TimingTool,
    meta: {
      title: 'Best Time to Post on LinkedIn - Optimize Your Timing',
      description: 'Find the best times to post on LinkedIn for maximum engagement based on your audience and industry.'
    },
    layout: 'minimal'
  },
  {
    path: '/free-tools/profile',
    component: ProfileOptimizer,
    meta: {
      title: 'Free LinkedIn Profile Optimizer - Improve Your Profile',
      description: 'Get personalized recommendations to optimize your LinkedIn profile for better visibility and opportunities.'
    },
    layout: 'minimal'
  },

  // Legal Pages
  {
    path: '/privacy',
    component: PrivacyPolicy,
    meta: {
      title: 'Privacy Policy - How We Protect Your Data',
      description: 'Learn how we collect, use, and protect your personal information and LinkedIn data.'
    },
    layout: 'minimal'
  },
  {
    path: '/terms',
    component: TermsOfService,
    meta: {
      title: 'Terms of Service - Platform Usage Terms',
      description: 'Read our terms of service and understand your rights and responsibilities when using our platform.'
    },
    layout: 'minimal'
  },
  {
    path: '/cookies',
    component: CookiePolicy,
    meta: {
      title: 'Cookie Policy - How We Use Cookies',
      description: 'Learn about how we use cookies and similar technologies to improve your experience.'
    },
    layout: 'minimal'
  },

  // Admin Panel
  {
    path: '/admin',
    component: AdminDashboard,
    requiresAuth: true,
    roles: ['admin'],
    meta: {
      title: 'Admin Dashboard - Platform Management',
      description: 'Administrative dashboard for platform management and monitoring.'
    },
    layout: 'admin'
  },
  {
    path: '/admin/users',
    component: UserManagement,
    requiresAuth: true,
    roles: ['admin'],
    meta: {
      title: 'User Management - Manage Platform Users',
      description: 'Manage platform users, subscriptions, and account settings.'
    },
    layout: 'admin'
  },
  {
    path: '/admin/content',
    component: ContentModeration,
    requiresAuth: true,
    roles: ['admin'],
    meta: {
      title: 'Content Moderation - Review Platform Content',
      description: 'Review and moderate user-generated content for compliance and quality.'
    },
    layout: 'admin'
  }
];