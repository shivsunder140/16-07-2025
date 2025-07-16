import { GeneratedContent, ContentVariation, EngagementPrediction } from '../types/ai';

export class ContentVariationGenerator {
  async generateVariations(
    baseContent: GeneratedContent,
    variationCount: number = 3
  ): Promise<ContentVariation[]> {
    const variations = await Promise.all([
      this.generateToneVariation(baseContent, 'professional'),
      this.generateToneVariation(baseContent, 'casual'),
      this.generateLengthVariation(baseContent, 'short'),
      this.generateLengthVariation(baseContent, 'long'),
      this.generateHookVariation(baseContent),
      this.generateFormatVariation(baseContent)
    ]);
    
    // Rank variations by predicted performance
    const rankedVariations = await this.rankVariations(variations);
    
    return rankedVariations.slice(0, variationCount);
  }
  
  private async generateToneVariation(
    baseContent: GeneratedContent,
    targetTone: string
  ): Promise<ContentVariation> {
    let rewrittenContent = baseContent.text;
    
    if (targetTone === 'professional') {
      rewrittenContent = this.makeProfessional(baseContent.text);
    } else if (targetTone === 'casual') {
      rewrittenContent = this.makeCasual(baseContent.text);
    }
    
    return {
      type: 'tone',
      variation: targetTone,
      content: rewrittenContent,
      expectedPerformance: await this.predictPerformance(rewrittenContent)
    };
  }
  
  private async generateLengthVariation(
    baseContent: GeneratedContent,
    targetLength: 'short' | 'long'
  ): Promise<ContentVariation> {
    let rewrittenContent = baseContent.text;
    
    if (targetLength === 'short') {
      rewrittenContent = this.shortenContent(baseContent.text);
    } else {
      rewrittenContent = this.expandContent(baseContent.text);
    }
    
    return {
      type: 'length',
      variation: targetLength,
      content: rewrittenContent,
      expectedPerformance: await this.predictPerformance(rewrittenContent)
    };
  }
  
  private async generateHookVariation(baseContent: GeneratedContent): Promise<ContentVariation> {
    const hooks = [
      "🚀 Here's something that will change your perspective:",
      "💡 I just realized something important:",
      "🔥 This might be controversial, but:",
      "📈 After 5 years in the industry, I've learned:",
      "⚡ Quick story that changed everything:",
      "🎯 The one thing nobody talks about:"
    ];
    
    const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
    const contentWithoutFirstLine = baseContent.text.split('\n').slice(1).join('\n');
    const rewrittenContent = `${randomHook}\n\n${contentWithoutFirstLine}`;
    
    return {
      type: 'hook',
      variation: 'alternative_hook',
      content: rewrittenContent,
      expectedPerformance: await this.predictPerformance(rewrittenContent)
    };
  }
  
  private async generateFormatVariation(baseContent: GeneratedContent): Promise<ContentVariation> {
    const rewrittenContent = this.convertToListFormat(baseContent.text);
    
    return {
      type: 'format',
      variation: 'list_format',
      content: rewrittenContent,
      expectedPerformance: await this.predictPerformance(rewrittenContent)
    };
  }
  
  private makeProfessional(text: string): string {
    return text
      .replace(/awesome/gi, 'excellent')
      .replace(/cool/gi, 'impressive')
      .replace(/hey/gi, 'Hello')
      .replace(/gonna/gi, 'going to')
      .replace(/wanna/gi, 'want to')
      .replace(/can't/gi, 'cannot')
      .replace(/won't/gi, 'will not')
      .replace(/🔥/g, '📊')
      .replace(/💪/g, '💼');
  }
  
  private makeCasual(text: string): string {
    return text
      .replace(/excellent/gi, 'awesome')
      .replace(/impressive/gi, 'cool')
      .replace(/Hello/gi, 'Hey')
      .replace(/going to/gi, 'gonna')
      .replace(/want to/gi, 'wanna')
      .replace(/cannot/gi, "can't")
      .replace(/will not/gi, "won't")
      .replace(/📊/g, '🔥')
      .replace(/💼/g, '💪');
  }
  
  private shortenContent(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Keep the most impactful sentences (first, last, and middle)
    if (sentences.length <= 3) return text;
    
    const keyPoints = [
      sentences[0], // Hook
      sentences[Math.floor(sentences.length / 2)], // Middle point
      sentences[sentences.length - 1] // CTA
    ];
    
    return keyPoints.join('. ') + '.';
  }
  
  private expandContent(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const expandedSentences = [];
    
    for (const sentence of sentences) {
      expandedSentences.push(sentence);
      
      // Add elaboration for key points
      if (sentence.includes('learned') || sentence.includes('realized')) {
        expandedSentences.push('\nThis insight completely transformed my approach');
      }
      
      if (sentence.includes('mistake') || sentence.includes('error')) {
        expandedSentences.push('\nMany professionals fall into this same trap');
      }
    }
    
    return expandedSentences.join('. ') + '.';
  }
  
  private convertToListFormat(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length < 3) return text;
    
    const hook = sentences[0];
    const points = sentences.slice(1, -1);
    const cta = sentences[sentences.length - 1];
    
    let listContent = `${hook}.\n\n`;
    
    points.forEach((point, index) => {
      listContent += `${index + 1}️⃣ ${point.trim()}.\n\n`;
    });
    
    listContent += `${cta}.`;
    
    return listContent;
  }
  
  private async predictPerformance(content: string): Promise<EngagementPrediction> {
    // Simple performance prediction based on content characteristics
    const hasQuestion = content.includes('?');
    const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(content);
    const hasNumbers = /\d/.test(content);
    const wordCount = content.split(/\s+/).length;
    
    let baseScore = 0.5;
    
    if (hasQuestion) baseScore += 0.2;
    if (hasEmojis) baseScore += 0.1;
    if (hasNumbers) baseScore += 0.1;
    if (wordCount >= 100 && wordCount <= 300) baseScore += 0.1;
    
    const multiplier = Math.min(1, baseScore);
    
    return {
      predictedLikes: Math.floor(Math.random() * 500 * multiplier) + 50,
      predictedComments: Math.floor(Math.random() * 50 * multiplier) + 5,
      predictedShares: Math.floor(Math.random() * 25 * multiplier) + 2,
      viralPotential: multiplier * 10,
      confidence: 0.7 + Math.random() * 0.2
    };
  }
  
  private async rankVariations(variations: ContentVariation[]): Promise<ContentVariation[]> {
    return variations.sort((a, b) => {
      const scoreA = a.expectedPerformance.viralPotential;
      const scoreB = b.expectedPerformance.viralPotential;
      return scoreB - scoreA;
    });
  }
}

export const contentVariationGenerator = new ContentVariationGenerator();