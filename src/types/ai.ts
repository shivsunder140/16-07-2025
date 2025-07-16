export interface ContentIdeationRequest {
  userId: string;
  userProfile: {
    industry: string;
    role: string;
    expertise: string[];
    personalBrand: string;
    targetAudience: string;
  };
  contentType: 'text' | 'image' | 'video' | 'carousel' | 'poll' | 'event';
  contentPillar: string;
  tone: 'professional' | 'casual' | 'inspirational' | 'educational' | 'conversational';
  ideaCount: number;
  topicKeywords?: string[];
  currentTrends?: string[];
  competitorAnalysis?: boolean;
  maxLength: number;
  includeHashtags: boolean;
  includeCTA: boolean;
  targetEngagement: 'high' | 'medium' | 'low';
}

export interface ContentIdea {
  id: string;
  title: string;
  hookType: 'question' | 'statistic' | 'story' | 'controversial' | 'how_to' | 'list';
  outline: string[];
  suggestedHashtags: string[];
  expectedEngagement: number;
  viralPotential: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeToCreate: number;
}

export interface ContentGenerationRequest {
  userId: string;
  userProfile: {
    industry: string;
    role: string;
    expertise: string[];
    personalBrand: string;
    targetAudience: string;
  };
  prompt: string;
  contentType: 'text' | 'image' | 'video' | 'carousel' | 'poll' | 'event';
  contentPillar: string;
  tone: 'professional' | 'casual' | 'inspirational' | 'educational' | 'conversational';
  maxLength: number;
  includeHashtags: boolean;
  includeCTA: boolean;
  ctaType?: 'engagement' | 'website' | 'dm' | 'follow';
  aiModel: string;
}

export interface GeneratedContent {
  id: string;
  text: string;
  hashtags: string[];
  callToAction?: string;
  contentType: string;
  tone: string;
  qualityScore: number;
  engagementPrediction: EngagementPrediction;
  generationMetadata: {
    model: string;
    prompt: string;
    timestamp: Date;
    processingTime: number;
  };
  userProfile: any;
}

export interface EngagementPrediction {
  predictedLikes: number;
  predictedComments: number;
  predictedShares: number;
  viralPotential: number;
  confidence: number;
}

export interface AIModelConfig {
  name: string;
  provider: 'openai' | 'anthropic' | 'custom';
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  presencePenalty: number;
  frequencyPenalty: number;
  stopSequences: string[];
  specializedFor: string[];
  strengths: string[];
  costPerToken: number;
  avgResponseTime: number;
}

export interface UserPerformanceData {
  topContentTypes: string[];
  optimalTimes: string[];
  topHashtags: string[];
  avgEngagementRate: number;
  bestPerformingPosts: any[];
}

export interface AIPrompt {
  system: string;
  user: string;
  constraints: string[];
}

export interface QualityValidationResult {
  overallScore: number;
  validations: {
    readability: ReadabilityScore;
    sentiment: SentimentScore;
    engagement: EngagementScore;
    compliance: ComplianceScore;
    brandAlignment: BrandAlignmentScore;
  };
  suggestions: string[];
  readyToPublish: boolean;
  requiresReview: boolean;
}

export interface ReadabilityScore {
  score: number;
  level: string;
  avgSentenceLength: number;
  complexWordRatio: number;
  recommendations: string[];
}

export interface SentimentScore {
  score: number;
  label: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

export interface EngagementScore {
  predictedLikes: number;
  predictedComments: number;
  predictedShares: number;
  viralPotential: number;
  confidence: number;
}

export interface ComplianceScore {
  score: number;
  violations: string[];
  warnings: string[];
}

export interface BrandAlignmentScore {
  score: number;
  alignmentFactors: string[];
  misalignments: string[];
}

export interface ContentVariation {
  type: 'tone' | 'length' | 'hook' | 'format';
  variation: string;
  content: string;
  expectedPerformance: EngagementPrediction;
}

export interface AIGenerationSettings {
  preferredModel: string;
  fallbackModel: string;
  maxTokens: number;
  temperature: number;
  defaultTone: string;
  includeEmojis: boolean;
  hashtagCount: number;
  alwaysIncludeCTA: boolean;
  minReadabilityScore: number;
  minEngagementPrediction: number;
  requireHumanReview: boolean;
  adaptToWritingStyle: boolean;
  usePerformanceData: boolean;
  considerAudienceData: boolean;
  dailyTokenLimit: number;
  costPerMonthLimit: number;
  prioritizeSpeed: boolean;
}

export interface WritingStyle {
  avgSentenceLength: number;
  vocabularyComplexity: number;
  emojiUsage: {
    frequency: number;
    preferredEmojis: string[];
  };
  hashtagStyle: {
    count: number;
    placement: 'inline' | 'end' | 'mixed';
  };
  ctaStyle: string;
  storytellingApproach: string;
}

export interface ContentMetrics {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  clickThroughRate: number;
  engagementRate: number;
}