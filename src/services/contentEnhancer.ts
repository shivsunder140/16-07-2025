import { GeneratedContent, ContentGenerationRequest } from '../types/ai';

interface EmojiEnhancement {
  enhancedContent: string;
  emojiCount: number;
  positions: number[];
}

interface HashtagOptimization {
  recommendedHashtags: string[];
  trendingHashtags: string[];
  optimalCount: number;
  placement: 'end' | 'inline' | 'mixed';
}

interface EnhancedContent extends GeneratedContent {
  enhancements: {
    emojis: EmojiEnhancement;
    hashtags: HashtagOptimization;
    readability: any;
    personalTouch: any;
  };
}

export class ContentEnhancer {
  async enhanceContent(
    rawContent: GeneratedContent,
    request: ContentGenerationRequest
  ): Promise<EnhancedContent> {
    const enhancements = await Promise.all([
      this.addEmojis(rawContent.text, request.tone),
      this.optimizeHashtags(rawContent.text, request.userProfile.industry),
      this.improveReadability(rawContent.text),
      this.addPersonalTouch(rawContent.text, request.userProfile)
    ]);
    
    const [emojiEnhancement, hashtagOptimization, readabilityImprovement, personalTouch] = enhancements;
    
    // Combine all enhancements
    let enhancedText = emojiEnhancement.enhancedContent;
    
    // Apply readability improvements
    if (readabilityImprovement.suggestions.length > 0) {
      enhancedText = this.applyReadabilityImprovements(enhancedText, readabilityImprovement);
    }
    
    // Add optimized hashtags
    if (hashtagOptimization.placement === 'end') {
      enhancedText += '\n\n' + hashtagOptimization.recommendedHashtags.map(tag => `#${tag}`).join(' ');
    }
    
    return {
      ...rawContent,
      text: enhancedText,
      hashtags: hashtagOptimization.recommendedHashtags,
      enhancements: {
        emojis: emojiEnhancement,
        hashtags: hashtagOptimization,
        readability: readabilityImprovement,
        personalTouch
      }
    };
  }
  
  private async addEmojis(content: string, tone: string): Promise<EmojiEnhancement> {
    const emojiMap = {
      professional: ['💼', '📊', '🎯', '💡', '🚀', '📈', '✅', '🔍', '⚡', '🌟'],
      casual: ['😊', '👍', '🙌', '💪', '🔥', '✨', '🎉', '👏', '💯', '🤝'],
      inspirational: ['✨', '🌟', '💫', '🏆', '🎉', '🚀', '💪', '🌈', '⭐', '🔥'],
      educational: ['📚', '🧠', '💡', '📈', '🔍', '📝', '🎓', '💭', '🔬', '📊'],
      conversational: ['🤔', '💭', '🗣️', '👥', '🤝', '💬', '👂', '🎯', '✨', '💡']
    };
    
    const availableEmojis = emojiMap[tone as keyof typeof emojiMap] || emojiMap.professional;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let enhancedContent = content;
    const positions: number[] = [];
    let emojiCount = 0;
    
    // Add emojis to key points (every 2-3 sentences)
    sentences.forEach((sentence, index) => {
      if (index % 3 === 0 && emojiCount < 3) {
        const emoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
        const sentenceStart = enhancedContent.indexOf(sentence.trim());
        
        if (sentenceStart !== -1) {
          enhancedContent = enhancedContent.replace(
            sentence.trim(),
            `${emoji} ${sentence.trim()}`
          );
          positions.push(sentenceStart);
          emojiCount++;
        }
      }
    });
    
    return {
      enhancedContent,
      emojiCount,
      positions
    };
  }
  
  private async optimizeHashtags(content: string, industry: string): Promise<HashtagOptimization> {
    // Get trending hashtags for industry
    const trendingHashtags = await this.getTrendingHashtags(industry);
    
    // Extract existing hashtags from content
    const existingHashtags = this.extractHashtags(content);
    
    // AI-powered hashtag recommendations
    const recommendations = await this.getHashtagRecommendations(
      content,
      industry,
      trendingHashtags,
      existingHashtags
    );
    
    return {
      recommendedHashtags: recommendations,
      trendingHashtags,
      optimalCount: this.calculateOptimalHashtagCount(content.length),
      placement: 'end'
    };
  }
  
  private async getTrendingHashtags(industry: string): Promise<string[]> {
    const trendingByIndustry = {
      'Technology': ['tech', 'innovation', 'ai', 'digitaltransformation', 'startup', 'coding', 'software'],
      'Marketing': ['marketing', 'digitalmarketing', 'contentmarketing', 'socialmedia', 'branding', 'seo'],
      'Finance': ['finance', 'fintech', 'investing', 'banking', 'cryptocurrency', 'blockchain'],
      'Healthcare': ['healthcare', 'medtech', 'wellness', 'innovation', 'patientcare', 'medical'],
      'Education': ['education', 'learning', 'teaching', 'edtech', 'students', 'knowledge'],
      'Sales': ['sales', 'b2b', 'salesstrategy', 'prospecting', 'closing', 'crm']
    };
    
    return trendingByIndustry[industry as keyof typeof trendingByIndustry] || trendingByIndustry.Technology;
  }
  
  private extractHashtags(content: string): string[] {
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.map(tag => tag.replace('#', '')) : [];
  }
  
  private async getHashtagRecommendations(
    content: string,
    industry: string,
    trendingHashtags: string[],
    existingHashtags: string[]
  ): Promise<string[]> {
    const contentKeywords = this.extractKeywords(content);
    const industryHashtags = await this.getTrendingHashtags(industry);
    
    // Combine and score hashtags
    const allHashtags = [...new Set([...trendingHashtags, ...industryHashtags])];
    const scoredHashtags = allHashtags.map(tag => ({
      tag,
      score: this.calculateHashtagRelevance(tag, contentKeywords, content)
    }));
    
    // Sort by relevance and take top hashtags
    const topHashtags = scoredHashtags
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(item => item.tag);
    
    // Always include some general professional hashtags
    const baseHashtags = ['linkedin', 'professional', 'career'];
    
    return [...new Set([...baseHashtags, ...topHashtags])].slice(0, 10);
  }
  
  private extractKeywords(content: string): string[] {
    // Simple keyword extraction - in real implementation, use NLP libraries
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Remove common stop words
    const stopWords = ['this', 'that', 'with', 'have', 'will', 'from', 'they', 'been', 'were', 'said'];
    return words.filter(word => !stopWords.includes(word));
  }
  
  private calculateHashtagRelevance(hashtag: string, keywords: string[], content: string): number {
    let score = 0;
    
    // Check if hashtag appears in keywords
    if (keywords.includes(hashtag)) score += 3;
    
    // Check if hashtag is related to content theme
    if (content.toLowerCase().includes(hashtag)) score += 2;
    
    // Boost score for popular professional hashtags
    const popularTags = ['leadership', 'innovation', 'growth', 'success', 'motivation'];
    if (popularTags.includes(hashtag)) score += 1;
    
    return score;
  }
  
  private calculateOptimalHashtagCount(contentLength: number): number {
    // Optimal hashtag count based on content length
    if (contentLength < 500) return 5;
    if (contentLength < 1000) return 8;
    return 10;
  }
  
  private async improveReadability(content: string): Promise<any> {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length;
    
    const suggestions = [];
    
    if (avgSentenceLength > 20) {
      suggestions.push('Consider breaking long sentences into shorter ones for better readability');
    }
    
    // Check for paragraph breaks
    const paragraphs = content.split('\n\n');
    if (paragraphs.length === 1 && content.length > 500) {
      suggestions.push('Add paragraph breaks to improve visual flow');
    }
    
    return {
      avgSentenceLength,
      suggestions,
      readabilityScore: Math.max(0, 100 - (avgSentenceLength - 15) * 2)
    };
  }
  
  private async addPersonalTouch(content: string, userProfile: any): Promise<any> {
    // Add personal elements based on user profile
    const personalElements = [];
    
    // Industry-specific terminology
    if (userProfile.industry && !content.toLowerCase().includes(userProfile.industry.toLowerCase())) {
      personalElements.push(`Consider mentioning your ${userProfile.industry} experience`);
    }
    
    // Role-specific insights
    if (userProfile.role && !content.toLowerCase().includes(userProfile.role.toLowerCase())) {
      personalElements.push(`Share insights from your ${userProfile.role} perspective`);
    }
    
    return {
      suggestions: personalElements,
      personalityScore: personalElements.length > 0 ? 0.8 : 0.6
    };
  }
  
  private applyReadabilityImprovements(content: string, improvements: any): string {
    let improvedContent = content;
    
    // Add paragraph breaks if needed
    if (improvements.suggestions.includes('Add paragraph breaks to improve visual flow')) {
      const sentences = improvedContent.split('. ');
      const paragraphs = [];
      
      for (let i = 0; i < sentences.length; i += 3) {
        paragraphs.push(sentences.slice(i, i + 3).join('. '));
      }
      
      improvedContent = paragraphs.join('\n\n');
    }
    
    return improvedContent;
  }
}

export const contentEnhancer = new ContentEnhancer();