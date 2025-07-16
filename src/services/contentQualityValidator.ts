import { 
  GeneratedContent, 
  QualityValidationResult, 
  ReadabilityScore, 
  SentimentScore, 
  EngagementScore, 
  ComplianceScore, 
  BrandAlignmentScore 
} from '../types/ai';

export class ContentQualityValidator {
  async validateContent(content: GeneratedContent): Promise<QualityValidationResult> {
    const validations = await Promise.all([
      this.checkReadability(content.text),
      this.checkSentiment(content.text),
      this.checkEngagementPotential(content),
      this.checkLinkedInCompliance(content),
      this.checkBrandAlignment(content, content.userProfile)
    ]);
    
    const [readability, sentiment, engagement, compliance, brandAlignment] = validations;
    
    const overallScore = this.calculateOverallScore({
      readability,
      sentiment,
      engagement,
      compliance,
      brandAlignment
    });
    
    const suggestions = this.generateImprovementSuggestions({
      readability,
      sentiment,
      engagement,
      compliance,
      brandAlignment
    });
    
    return {
      overallScore,
      validations: {
        readability,
        sentiment,
        engagement,
        compliance,
        brandAlignment
      },
      suggestions,
      readyToPublish: overallScore >= 0.8,
      requiresReview: overallScore < 0.6
    };
  }
  
  private async checkReadability(text: string): Promise<ReadabilityScore> {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const syllables = this.countSyllables(text);
    
    // Calculate Flesch Reading Ease Score
    const avgSentenceLength = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;
    
    const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    
    // Calculate complex word ratio
    const complexWords = words.filter(word => this.countWordSyllables(word) > 2);
    const complexWordRatio = complexWords.length / words.length;
    
    const recommendations = this.getReadabilityRecommendations(fleschScore, avgSentenceLength, complexWordRatio);
    
    return {
      score: Math.max(0, Math.min(100, fleschScore)) / 100,
      level: this.getReadabilityLevel(fleschScore),
      avgSentenceLength,
      complexWordRatio,
      recommendations
    };
  }
  
  private countSyllables(text: string): number {
    return text.split(/\s+/).reduce((total, word) => total + this.countWordSyllables(word), 0);
  }
  
  private countWordSyllables(word: string): number {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    
    const vowels = 'aeiouy';
    let syllableCount = 0;
    let previousWasVowel = false;
    
    for (let i = 0; i < word.length; i++) {
      const isVowel = vowels.includes(word[i]);
      if (isVowel && !previousWasVowel) {
        syllableCount++;
      }
      previousWasVowel = isVowel;
    }
    
    // Adjust for silent 'e'
    if (word.endsWith('e')) syllableCount--;
    
    return Math.max(1, syllableCount);
  }
  
  private getReadabilityLevel(fleschScore: number): string {
    if (fleschScore >= 90) return 'Very Easy';
    if (fleschScore >= 80) return 'Easy';
    if (fleschScore >= 70) return 'Fairly Easy';
    if (fleschScore >= 60) return 'Standard';
    if (fleschScore >= 50) return 'Fairly Difficult';
    if (fleschScore >= 30) return 'Difficult';
    return 'Very Difficult';
  }
  
  private getReadabilityRecommendations(fleschScore: number, avgSentenceLength: number, complexWordRatio: number): string[] {
    const recommendations = [];
    
    if (fleschScore < 60) {
      recommendations.push('Consider simplifying language for better readability');
    }
    
    if (avgSentenceLength > 20) {
      recommendations.push('Break long sentences into shorter ones');
    }
    
    if (complexWordRatio > 0.15) {
      recommendations.push('Replace complex words with simpler alternatives where possible');
    }
    
    return recommendations;
  }
  
  private async checkSentiment(text: string): Promise<SentimentScore> {
    // Simple sentiment analysis - in real implementation, use proper NLP libraries
    const positiveWords = ['great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'awesome', 'incredible', 'outstanding'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disgusting', 'pathetic', 'useless', 'failure'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    let score = 0.5; // neutral baseline
    let label: 'positive' | 'negative' | 'neutral' = 'neutral';
    
    if (positiveCount > negativeCount) {
      score = 0.5 + (positiveCount / words.length) * 10;
      label = 'positive';
    } else if (negativeCount > positiveCount) {
      score = 0.5 - (negativeCount / words.length) * 10;
      label = 'negative';
    }
    
    score = Math.max(0, Math.min(1, score));
    
    return {
      score,
      label,
      confidence: Math.abs(positiveCount - negativeCount) / words.length + 0.5
    };
  }
  
  private async checkEngagementPotential(content: GeneratedContent): Promise<EngagementScore> {
    const text = content.text;
    let score = 0.5; // baseline
    
    // Check for engagement drivers
    const hasQuestion = text.includes('?');
    const hasCallToAction = text.toLowerCase().includes('comment') || text.includes('👇') || text.toLowerCase().includes('share');
    const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(text);
    const hasNumbers = /\d/.test(text);
    const hasPersonalStory = text.toLowerCase().includes('i ') || text.toLowerCase().includes('my ');
    
    // Adjust score based on engagement factors
    if (hasQuestion) score += 0.15;
    if (hasCallToAction) score += 0.1;
    if (hasEmojis) score += 0.05;
    if (hasNumbers) score += 0.05;
    if (hasPersonalStory) score += 0.1;
    
    // Check content length (optimal range)
    const wordCount = text.split(/\s+/).length;
    if (wordCount >= 100 && wordCount <= 300) score += 0.05;
    
    score = Math.min(1, score);
    
    return {
      predictedLikes: Math.floor(score * 1000),
      predictedComments: Math.floor(score * 100),
      predictedShares: Math.floor(score * 50),
      viralPotential: score * 10,
      confidence: 0.7 + Math.random() * 0.2
    };
  }
  
  private async checkLinkedInCompliance(content: GeneratedContent): Promise<ComplianceScore> {
    const text = content.text;
    const violations = [];
    const warnings = [];
    
    // Check for spam indicators
    if (text.includes('DM me') || text.includes('message me')) {
      warnings.push('Direct message requests may reduce organic reach');
    }
    
    // Check for excessive self-promotion
    const selfPromotionWords = ['buy', 'purchase', 'sale', 'discount', 'offer'];
    const selfPromotionCount = selfPromotionWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    
    if (selfPromotionCount > 2) {
      violations.push('Excessive self-promotion detected');
    }
    
    // Check character limit
    if (text.length > 3000) {
      violations.push('Content exceeds LinkedIn character limit');
    }
    
    // Check for appropriate hashtag count
    const hashtagCount = (text.match(/#\w+/g) || []).length;
    if (hashtagCount > 30) {
      violations.push('Too many hashtags (LinkedIn recommends 3-5)');
    }
    
    const score = Math.max(0, 1 - (violations.length * 0.3) - (warnings.length * 0.1));
    
    return {
      score,
      violations,
      warnings
    };
  }
  
  private async checkBrandAlignment(content: GeneratedContent, userProfile: any): Promise<BrandAlignmentScore> {
    const text = content.text.toLowerCase();
    const alignmentFactors = [];
    const misalignments = [];
    
    // Check industry alignment
    if (userProfile.industry && text.includes(userProfile.industry.toLowerCase())) {
      alignmentFactors.push('Industry relevance');
    }
    
    // Check expertise alignment
    const expertiseMatches = userProfile.expertise?.filter((skill: string) => 
      text.includes(skill.toLowerCase())
    ) || [];
    
    if (expertiseMatches.length > 0) {
      alignmentFactors.push('Expertise demonstration');
    }
    
    // Check tone alignment with personal brand
    const professionalTone = /\b(strategy|analysis|insights|professional|business)\b/i.test(text);
    const casualTone = /\b(hey|awesome|cool|amazing)\b/i.test(text);
    
    if (userProfile.personalBrand === 'professional' && !professionalTone) {
      misalignments.push('Tone may not match professional brand');
    }
    
    if (userProfile.personalBrand === 'casual' && !casualTone) {
      misalignments.push('Tone may be too formal for casual brand');
    }
    
    const score = Math.max(0.3, (alignmentFactors.length * 0.3) - (misalignments.length * 0.2));
    
    return {
      score,
      alignmentFactors,
      misalignments
    };
  }
  
  private calculateOverallScore(validations: any): number {
    const weights = {
      readability: 0.2,
      sentiment: 0.15,
      engagement: 0.3,
      compliance: 0.25,
      brandAlignment: 0.1
    };
    
    return (
      validations.readability.score * weights.readability +
      validations.sentiment.score * weights.sentiment +
      (validations.engagement.viralPotential / 10) * weights.engagement +
      validations.compliance.score * weights.compliance +
      validations.brandAlignment.score * weights.brandAlignment
    );
  }
  
  private generateImprovementSuggestions(validations: any): string[] {
    const suggestions = [];
    
    // Readability suggestions
    suggestions.push(...validations.readability.recommendations);
    
    // Sentiment suggestions
    if (validations.sentiment.score < 0.4) {
      suggestions.push('Consider adding more positive language to improve sentiment');
    }
    
    // Engagement suggestions
    if (validations.engagement.viralPotential < 5) {
      suggestions.push('Add a question or call-to-action to increase engagement');
    }
    
    // Compliance suggestions
    suggestions.push(...validations.compliance.violations);
    suggestions.push(...validations.compliance.warnings);
    
    // Brand alignment suggestions
    suggestions.push(...validations.brandAlignment.misalignments);
    
    return suggestions.filter((suggestion, index, self) => self.indexOf(suggestion) === index);
  }
}

export const contentQualityValidator = new ContentQualityValidator();