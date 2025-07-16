import { 
  ContentIdeationRequest, 
  ContentIdea, 
  ContentGenerationRequest, 
  GeneratedContent,
  AIModelConfig,
  UserPerformanceData,
  AIPrompt,
  EngagementPrediction
} from '../types/ai';

export class AIContentGenerator {
  private models: AIModelConfig[] = [
    {
      name: 'GPT-4 Turbo',
      provider: 'openai',
      model: 'gpt-4-turbo-preview',
      maxTokens: 4000,
      temperature: 0.7,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      stopSequences: [],
      specializedFor: ['text', 'carousel'],
      strengths: ['creative_writing', 'storytelling', 'technical_content'],
      costPerToken: 0.00003,
      avgResponseTime: 2500
    },
    {
      name: 'Claude 3 Opus',
      provider: 'anthropic',
      model: 'claude-3-opus-20240229',
      maxTokens: 4000,
      temperature: 0.6,
      topP: 0.9,
      presencePenalty: 0,
      frequencyPenalty: 0,
      stopSequences: [],
      specializedFor: ['text', 'educational'],
      strengths: ['analysis', 'professional_tone', 'accuracy'],
      costPerToken: 0.000015,
      avgResponseTime: 3000
    }
  ];

  async generateIdeas(request: ContentIdeationRequest): Promise<ContentIdea[]> {
    const ideas: ContentIdea[] = [];
    
    // Mock idea generation based on user profile and preferences
    const ideaTemplates = this.getIdeaTemplates(request.contentPillar, request.tone);
    
    for (let i = 0; i < request.ideaCount; i++) {
      const template = ideaTemplates[i % ideaTemplates.length];
      const idea: ContentIdea = {
        id: `idea_${Date.now()}_${i}`,
        title: this.personalizeIdeaTitle(template.title, request.userProfile),
        hookType: template.hookType,
        outline: this.generateOutline(template, request.userProfile),
        suggestedHashtags: this.generateHashtags(request.userProfile.industry, request.contentPillar),
        expectedEngagement: Math.floor(Math.random() * 1000) + 100,
        viralPotential: Math.random() * 10,
        difficulty: template.difficulty,
        timeToCreate: template.timeToCreate
      };
      ideas.push(idea);
    }
    
    return ideas.sort((a, b) => b.viralPotential - a.viralPotential);
  }

  async generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
    const startTime = Date.now();
    
    // Step 1: Analyze user's historical performance
    const performanceData = await this.analyzeUserPerformance(request.userId);
    
    // Step 2: Generate personalized prompt
    const prompt = await this.buildPersonalizedPrompt(request, performanceData);
    
    // Step 3: Generate content using selected AI model
    const rawContent = await this.callAIModel(prompt, request.aiModel);
    
    // Step 4: Extract hashtags and CTA
    const { text, hashtags, callToAction } = this.parseGeneratedContent(rawContent, request);
    
    // Step 5: Predict engagement
    const engagementPrediction = await this.predictEngagement(text, request.userProfile);
    
    const generatedContent: GeneratedContent = {
      id: `content_${Date.now()}`,
      text,
      hashtags,
      callToAction,
      contentType: request.contentType,
      tone: request.tone,
      qualityScore: 0, // Will be calculated by quality validator
      engagementPrediction,
      generationMetadata: {
        model: request.aiModel,
        prompt: prompt.system,
        timestamp: new Date(),
        processingTime: Date.now() - startTime
      },
      userProfile: request.userProfile
    };
    
    return generatedContent;
  }

  private getIdeaTemplates(contentPillar: string, tone: string) {
    const templates = {
      leadership: [
        {
          title: "The leadership lesson I learned from my biggest failure",
          hookType: 'story' as const,
          difficulty: 'medium' as const,
          timeToCreate: 15
        },
        {
          title: "5 signs you're ready to lead a team",
          hookType: 'list' as const,
          difficulty: 'easy' as const,
          timeToCreate: 10
        },
        {
          title: "What makes a great leader in 2024?",
          hookType: 'question' as const,
          difficulty: 'easy' as const,
          timeToCreate: 8
        }
      ],
      industry_insights: [
        {
          title: "The future of [industry] is changing faster than you think",
          hookType: 'controversial' as const,
          difficulty: 'hard' as const,
          timeToCreate: 20
        },
        {
          title: "3 trends that will reshape [industry] in the next 5 years",
          hookType: 'statistic' as const,
          difficulty: 'medium' as const,
          timeToCreate: 15
        }
      ],
      personal_growth: [
        {
          title: "How I overcame imposter syndrome in my career",
          hookType: 'story' as const,
          difficulty: 'medium' as const,
          timeToCreate: 12
        },
        {
          title: "The daily habits that transformed my productivity",
          hookType: 'how_to' as const,
          difficulty: 'easy' as const,
          timeToCreate: 10
        }
      ]
    };
    
    return templates[contentPillar as keyof typeof templates] || templates.leadership;
  }

  private personalizeIdeaTitle(title: string, userProfile: any): string {
    return title.replace('[industry]', userProfile.industry);
  }

  private generateOutline(template: any, userProfile: any): string[] {
    const outlines = {
      story: [
        "Hook: Set the scene",
        "Challenge: What went wrong",
        "Action: What you did about it",
        "Result: What you learned",
        "Call to action: Ask for engagement"
      ],
      list: [
        "Hook: Why this matters",
        "Point 1: First key insight",
        "Point 2: Second key insight", 
        "Point 3: Third key insight",
        "Conclusion: Tie it together"
      ],
      question: [
        "Hook: Pose the question",
        "Context: Why it matters",
        "Your perspective: Share your view",
        "Call to action: Ask for responses"
      ]
    };
    
    return outlines[template.hookType as keyof typeof outlines] || outlines.story;
  }

  private generateHashtags(industry: string, contentPillar: string): string[] {
    const industryHashtags = {
      'Technology': ['#tech', '#innovation', '#digitaltransformation', '#ai', '#startup'],
      'Marketing': ['#marketing', '#digitalmarketing', '#contentmarketing', '#socialmedia', '#branding'],
      'Finance': ['#finance', '#fintech', '#investing', '#banking', '#cryptocurrency'],
      'Healthcare': ['#healthcare', '#medtech', '#wellness', '#innovation', '#patientcare']
    };
    
    const pillarHashtags = {
      'leadership': ['#leadership', '#management', '#teamwork', '#motivation'],
      'industry_insights': ['#insights', '#trends', '#future', '#analysis'],
      'personal_growth': ['#growth', '#development', '#mindset', '#success']
    };
    
    const baseHashtags = ['#linkedin', '#professional', '#career'];
    const industry_tags = industryHashtags[industry as keyof typeof industryHashtags] || [];
    const pillar_tags = pillarHashtags[contentPillar as keyof typeof pillarHashtags] || [];
    
    return [...baseHashtags, ...industry_tags.slice(0, 3), ...pillar_tags.slice(0, 2)];
  }

  private async analyzeUserPerformance(userId: string): Promise<UserPerformanceData> {
    // Mock performance data - in real implementation, this would query the database
    return {
      topContentTypes: ['text', 'carousel'],
      optimalTimes: ['9:00 AM', '2:00 PM', '6:00 PM'],
      topHashtags: ['#leadership', '#innovation', '#growth'],
      avgEngagementRate: 4.2,
      bestPerformingPosts: []
    };
  }

  private async buildPersonalizedPrompt(
    request: ContentGenerationRequest,
    performanceData: UserPerformanceData
  ): Promise<AIPrompt> {
    const basePrompt = this.getBasePrompt(request.contentType);
    
    const userContext = `
      User Profile:
      - Industry: ${request.userProfile.industry}
      - Role: ${request.userProfile.role}
      - Expertise: ${request.userProfile.expertise.join(', ')}
      - Brand Voice: ${request.userProfile.personalBrand}
      - Target Audience: ${request.userProfile.targetAudience}
      
      Performance Insights:
      - Best performing content types: ${performanceData.topContentTypes.join(', ')}
      - Optimal posting times: ${performanceData.optimalTimes.join(', ')}
      - Top hashtags: ${performanceData.topHashtags.join(', ')}
      - Average engagement rate: ${performanceData.avgEngagementRate}%
      
      Content Requirements:
      - Tone: ${request.tone}
      - Content Pillar: ${request.contentPillar}
      - Max Length: ${request.maxLength} characters
      - Include Hashtags: ${request.includeHashtags}
      - Include CTA: ${request.includeCTA}
    `;
    
    return {
      system: basePrompt.system + userContext,
      user: request.prompt,
      constraints: basePrompt.constraints
    };
  }

  private getBasePrompt(contentType: string): AIPrompt {
    const prompts = {
      text: {
        system: `You are an expert LinkedIn content creator. Create engaging, professional LinkedIn posts that drive high engagement. Focus on storytelling, valuable insights, and clear calls to action.`,
        constraints: [
          'Keep posts under 3000 characters',
          'Use line breaks for readability',
          'Include relevant emojis sparingly',
          'End with a clear call to action'
        ]
      },
      carousel: {
        system: `You are an expert at creating LinkedIn carousel posts. Create educational, slide-by-slide content that tells a story or teaches a concept.`,
        constraints: [
          'Create 5-10 slides',
          'Each slide should have a clear title',
          'Keep text concise per slide',
          'Include a strong opening and closing slide'
        ]
      }
    };
    
    return prompts[contentType as keyof typeof prompts] || prompts.text;
  }

  private async callAIModel(prompt: AIPrompt, modelName: string): Promise<string> {
    // Mock AI model call - in real implementation, this would call actual AI APIs
    const mockResponses = [
      `🚀 The biggest mistake I see professionals make on LinkedIn?

They focus on selling instead of serving.

Here's what changed everything for me:

✅ Started sharing valuable insights
✅ Engaged genuinely with others' content  
✅ Built relationships before asking for anything
✅ Consistently showed up with helpful content

The result? 3x more meaningful connections and 5x more opportunities.

Your network is your net worth, but only if you nurture it properly.

What's your biggest LinkedIn challenge? Let me know in the comments 👇

#LinkedIn #Networking #PersonalBranding #ProfessionalGrowth`,

      `💡 Two years ago, I was unemployed.

Today, I'm leading a team of 50+ people.

Here's what I learned about resilience:

1️⃣ Failure is data, not defeat
Every rejection taught me something valuable about what I needed to improve.

2️⃣ Consistency beats perfection
Showing up every day, even when I didn't feel like it, made all the difference.

3️⃣ Your network is your safety net
The people who believed in me opened doors I didn't even know existed.

4️⃣ Invest in yourself relentlessly
Skills become obsolete, but the ability to learn never does.

5️⃣ Help others climb with you
Success shared is success multiplied.

The path wasn't linear, but every setback was a setup for a comeback.

What's one lesson that changed your career trajectory? Share below 👇

#CareerGrowth #Leadership #Resilience #Success`,

      `📊 The future of remote work is here.

5 trends that will shape how we work in 2024:

🔹 AI-powered collaboration tools
Smart assistants will handle routine tasks, freeing us for creative work.

🔹 Virtual reality meetings
Immersive experiences will make remote feel more personal than ever.

🔹 Async-first communication
Teams will optimize for deep work over constant availability.

🔹 Global talent pools
Geography will matter less than skills and cultural fit.

🔹 Outcome-based performance
Results will matter more than hours logged.

The companies that adapt fastest will win the talent war.

Which trend excites you most? Drop your thoughts below 👇

#RemoteWork #FutureOfWork #Technology #WorkplaceTrends`
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }

  private parseGeneratedContent(rawContent: string, request: ContentGenerationRequest) {
    // Extract hashtags
    const hashtagRegex = /#[\w]+/g;
    const hashtags = rawContent.match(hashtagRegex) || [];
    
    // Remove hashtags from main text if they're at the end
    let text = rawContent;
    const hashtagSection = hashtags.join(' ');
    if (text.endsWith(hashtagSection)) {
      text = text.replace(hashtagSection, '').trim();
    }
    
    // Extract call to action (usually the last line with a question or instruction)
    const lines = text.split('\n').filter(line => line.trim());
    const lastLine = lines[lines.length - 1];
    let callToAction = '';
    
    if (lastLine.includes('?') || lastLine.includes('👇') || lastLine.toLowerCase().includes('comment')) {
      callToAction = lastLine;
    }
    
    return {
      text: rawContent,
      hashtags: hashtags.map(tag => tag.replace('#', '')),
      callToAction
    };
  }

  private async predictEngagement(text: string, userProfile: any): Promise<EngagementPrediction> {
    // Mock engagement prediction - in real implementation, this would use ML models
    const baseEngagement = {
      likes: Math.floor(Math.random() * 500) + 50,
      comments: Math.floor(Math.random() * 50) + 5,
      shares: Math.floor(Math.random() * 25) + 2,
      views: Math.floor(Math.random() * 5000) + 500
    };
    
    // Adjust based on content characteristics
    const hasQuestion = text.includes('?');
    const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(text);
    const hasNumbers = /\d/.test(text);
    
    let multiplier = 1;
    if (hasQuestion) multiplier += 0.3;
    if (hasEmojis) multiplier += 0.2;
    if (hasNumbers) multiplier += 0.1;
    
    return {
      predictedLikes: Math.floor(baseEngagement.likes * multiplier),
      predictedComments: Math.floor(baseEngagement.comments * multiplier),
      predictedShares: Math.floor(baseEngagement.shares * multiplier),
      viralPotential: Math.random() * 10,
      confidence: 0.75 + Math.random() * 0.2
    };
  }
}

export const aiContentGenerator = new AIContentGenerator();