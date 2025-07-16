import React, { useState } from 'react';
import { 
  Wand2, 
  Lightbulb, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Target,
  TrendingUp,
  Clock,
  User,
  Settings
} from 'lucide-react';
import { useAIGeneration } from '../../hooks/useAIGeneration';
import { ContentIdeationRequest, ContentGenerationRequest } from '../../types/ai';
import { useAuth } from '../../contexts/AuthContext';

const AIContentGenerator: React.FC = () => {
  const { user } = useAuth();
  const {
    isGenerating,
    isEnhancing,
    isValidating,
    currentIdeas,
    currentContent,
    qualityResults,
    variations,
    error,
    generateIdeas,
    generateContent,
    enhanceContent,
    validateContent,
    generateVariations,
    clearError,
    reset
  } = useAIGeneration();

  const [activeTab, setActiveTab] = useState<'ideas' | 'generate' | 'enhance'>('ideas');
  const [ideationRequest, setIdeationRequest] = useState<Partial<ContentIdeationRequest>>({
    contentType: 'text',
    contentPillar: 'leadership',
    tone: 'professional',
    ideaCount: 5,
    maxLength: 2000,
    includeHashtags: true,
    includeCTA: true,
    targetEngagement: 'high'
  });

  const [generationRequest, setGenerationRequest] = useState<Partial<ContentGenerationRequest>>({
    contentType: 'text',
    contentPillar: 'leadership',
    tone: 'professional',
    maxLength: 2000,
    includeHashtags: true,
    includeCTA: true,
    aiModel: 'GPT-4 Turbo'
  });

  const [selectedIdea, setSelectedIdea] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handleGenerateIdeas = async () => {
    if (!user) return;
    
    const request: ContentIdeationRequest = {
      userId: user.id,
      userProfile: {
        industry: 'Technology',
        role: 'Marketing Manager',
        expertise: ['Digital Marketing', 'Content Strategy', 'Social Media'],
        personalBrand: 'Professional thought leader',
        targetAudience: 'Marketing professionals and entrepreneurs'
      },
      ...ideationRequest as ContentIdeationRequest
    };

    await generateIdeas(request);
  };

  const handleGenerateContent = async () => {
    if (!user) return;

    const prompt = selectedIdea || customPrompt;
    if (!prompt) return;

    const request: ContentGenerationRequest = {
      userId: user.id,
      userProfile: {
        industry: 'Technology',
        role: 'Marketing Manager',
        expertise: ['Digital Marketing', 'Content Strategy', 'Social Media'],
        personalBrand: 'Professional thought leader',
        targetAudience: 'Marketing professionals and entrepreneurs'
      },
      prompt,
      ...generationRequest as ContentGenerationRequest
    };

    await generateContent(request);
  };

  const handleEnhanceContent = async () => {
    if (!currentContent || !user) return;

    const request: ContentGenerationRequest = {
      userId: user.id,
      userProfile: {
        industry: 'Technology',
        role: 'Marketing Manager',
        expertise: ['Digital Marketing', 'Content Strategy', 'Social Media'],
        personalBrand: 'Professional thought leader',
        targetAudience: 'Marketing professionals and entrepreneurs'
      },
      prompt: currentContent.text,
      ...generationRequest as ContentGenerationRequest
    };

    await enhanceContent(currentContent, request);
  };

  const getQualityColor = (score: number) => {
    if (score >= 0.8) return 'text-emerald-400';
    if (score >= 0.6) return 'text-amber-400';
    return 'text-red-400';
  };

  const getQualityLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent';
    if (score >= 0.6) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Content Generator</h1>
          <p className="text-gray-400">Create engaging LinkedIn content with AI assistance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={reset}
            className="px-4 py-2 glass-card hover:bg-gray-800/60 text-gray-300 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Reset
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 hover:scale-105">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="glass-card bg-red-500/10 border-red-500/30">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center bg-gray-800/50 rounded-xl p-1">
        {[
          { id: 'ideas', label: 'Generate Ideas', icon: Lightbulb },
          { id: 'generate', label: 'Create Content', icon: Wand2 },
          { id: 'enhance', label: 'Enhance & Validate', icon: Zap }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'ideas' && (
            <div className="glass-card-hover">
              <h3 className="text-lg font-semibold text-white mb-4">Content Ideation</h3>
              
              {/* Ideation Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content Type
                  </label>
                  <select
                    value={ideationRequest.contentType}
                    onChange={(e) => setIdeationRequest(prev => ({ ...prev, contentType: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  >
                    <option value="text">Text Post</option>
                    <option value="carousel">Carousel</option>
                    <option value="video">Video</option>
                    <option value="poll">Poll</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content Pillar
                  </label>
                  <select
                    value={ideationRequest.contentPillar}
                    onChange={(e) => setIdeationRequest(prev => ({ ...prev, contentPillar: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  >
                    <option value="leadership">Leadership</option>
                    <option value="industry_insights">Industry Insights</option>
                    <option value="personal_growth">Personal Growth</option>
                    <option value="tips_advice">Tips & Advice</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tone
                  </label>
                  <select
                    value={ideationRequest.tone}
                    onChange={(e) => setIdeationRequest(prev => ({ ...prev, tone: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="inspirational">Inspirational</option>
                    <option value="educational">Educational</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Ideas
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={ideationRequest.ideaCount}
                    onChange={(e) => setIdeationRequest(prev => ({ ...prev, ideaCount: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateIdeas}
                disabled={isGenerating}
                className="w-full px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:from-violet-400 disabled:to-purple-400 text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating Ideas...</span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4" />
                    <span>Generate Content Ideas</span>
                  </>
                )}
              </button>

              {/* Generated Ideas */}
              {currentIdeas.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium text-white">Generated Ideas</h4>
                  {currentIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedIdea === idea.title
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-gray-700/50 hover:border-gray-600/50'
                      }`}
                      onClick={() => setSelectedIdea(idea.title)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-white">{idea.title}</h5>
                        <div className="flex items-center space-x-2 text-xs">
                          <span className={`px-2 py-1 rounded ${
                            idea.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                            idea.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {idea.difficulty}
                          </span>
                          <span className="text-gray-400 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{idea.timeToCreate}m</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Target className="w-3 h-3" />
                            <span>Viral: {idea.viralPotential.toFixed(1)}/10</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>Engagement: {idea.expectedEngagement}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-300">
                          <strong>Hook:</strong> {idea.hookType}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {idea.suggestedHashtags.slice(0, 5).map((tag, index) => (
                            <span key={index} className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'generate' && (
            <div className="glass-card-hover">
              <h3 className="text-lg font-semibold text-white mb-4">Generate Content</h3>
              
              {/* Content Input */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content Prompt
                  </label>
                  <textarea
                    value={selectedIdea || customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Enter your content idea or select from generated ideas..."
                    className="w-full h-32 p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      AI Model
                    </label>
                    <select
                      value={generationRequest.aiModel}
                      onChange={(e) => setGenerationRequest(prev => ({ ...prev, aiModel: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    >
                      <option value="GPT-4 Turbo">GPT-4 Turbo</option>
                      <option value="Claude 3 Opus">Claude 3 Opus</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Length
                    </label>
                    <input
                      type="number"
                      value={generationRequest.maxLength}
                      onChange={(e) => setGenerationRequest(prev => ({ ...prev, maxLength: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tone
                    </label>
                    <select
                      value={generationRequest.tone}
                      onChange={(e) => setGenerationRequest(prev => ({ ...prev, tone: e.target.value as any }))}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="inspirational">Inspirational</option>
                      <option value="educational">Educational</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerateContent}
                disabled={isGenerating || (!selectedIdea && !customPrompt)}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-cyan-400 disabled:to-blue-400 text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating Content...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Generate Content</span>
                  </>
                )}
              </button>

              {/* Generated Content */}
              {currentContent && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">Generated Content</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">
                        Quality: <span className={getQualityColor(currentContent.qualityScore)}>
                          {getQualityLabel(currentContent.qualityScore)}
                        </span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <pre className="whitespace-pre-wrap text-white text-sm font-normal">
                      {currentContent.text}
                    </pre>
                  </div>
                  
                  {currentContent.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {currentContent.hashtags.map((tag, index) => (
                        <span key={index} className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'enhance' && currentContent && (
            <div className="glass-card-hover">
              <h3 className="text-lg font-semibold text-white mb-4">Enhance & Validate</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleEnhanceContent}
                    disabled={isEnhancing}
                    className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:from-violet-400 disabled:to-purple-400 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                  >
                    {isEnhancing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Enhancing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Enhance Content</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => validateContent(currentContent)}
                    disabled={isValidating}
                    className="px-4 py-2 glass-card hover:bg-gray-800/60 text-gray-300 rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                  >
                    {isValidating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Validating...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Validate Quality</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => generateVariations(currentContent)}
                    disabled={isGenerating}
                    className="px-4 py-2 glass-card hover:bg-gray-800/60 text-gray-300 rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Generate Variations</span>
                  </button>
                </div>

                {/* Quality Results */}
                {qualityResults && (
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h5 className="font-medium text-white mb-3">Quality Analysis</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Overall Score</span>
                          <span className={`font-medium ${getQualityColor(qualityResults.overallScore)}`}>
                            {(qualityResults.overallScore * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Readability</span>
                          <span className="text-sm text-white">
                            {(qualityResults.validations.readability.score * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Engagement</span>
                          <span className="text-sm text-white">
                            {qualityResults.validations.engagement.viralPotential.toFixed(1)}/10
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Sentiment</span>
                          <span className={`text-sm ${
                            qualityResults.validations.sentiment.label === 'positive' ? 'text-green-400' :
                            qualityResults.validations.sentiment.label === 'negative' ? 'text-red-400' :
                            'text-gray-400'
                          }`}>
                            {qualityResults.validations.sentiment.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Compliance</span>
                          <span className="text-sm text-white">
                            {(qualityResults.validations.compliance.score * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Brand Alignment</span>
                          <span className="text-sm text-white">
                            {(qualityResults.validations.brandAlignment.score * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {qualityResults.suggestions.length > 0 && (
                      <div>
                        <h6 className="text-sm font-medium text-white mb-2">Suggestions</h6>
                        <ul className="space-y-1">
                          {qualityResults.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-gray-400 flex items-start space-x-2">
                              <span className="text-amber-400 mt-1">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Content Variations */}
                {variations.length > 0 && (
                  <div>
                    <h5 className="font-medium text-white mb-3">Content Variations</h5>
                    <div className="space-y-3">
                      {variations.map((variation, index) => (
                        <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-cyan-400">
                              {variation.type}: {variation.variation}
                            </span>
                            <span className="text-xs text-gray-400">
                              Viral: {variation.expectedPerformance.viralPotential.toFixed(1)}/10
                            </span>
                          </div>
                          <pre className="whitespace-pre-wrap text-white text-sm font-normal">
                            {variation.content}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Profile */}
          <div className="glass-card-hover">
            <h3 className="text-lg font-semibold text-white mb-4">
              <User className="w-5 h-5 inline mr-2" />
              Profile Context
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-400">Industry:</span>
                <span className="text-white ml-2">Technology</span>
              </div>
              <div>
                <span className="text-gray-400">Role:</span>
                <span className="text-white ml-2">Marketing Manager</span>
              </div>
              <div>
                <span className="text-gray-400">Expertise:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {['Digital Marketing', 'Content Strategy', 'Social Media'].map((skill, index) => (
                    <span key={index} className="text-xs bg-violet-500/20 text-violet-400 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Performance Prediction */}
          {currentContent && (
            <div className="glass-card-hover">
              <h3 className="text-lg font-semibold text-white mb-4">
                <TrendingUp className="w-5 h-5 inline mr-2" />
                Performance Prediction
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Predicted Likes</span>
                  <span className="text-white font-medium">
                    {currentContent.engagementPrediction.predictedLikes}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Predicted Comments</span>
                  <span className="text-white font-medium">
                    {currentContent.engagementPrediction.predictedComments}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Predicted Shares</span>
                  <span className="text-white font-medium">
                    {currentContent.engagementPrediction.predictedShares}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Viral Potential</span>
                  <span className="text-cyan-400 font-medium">
                    {currentContent.engagementPrediction.viralPotential.toFixed(1)}/10
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="glass-card-hover">
            <h3 className="text-lg font-semibold text-white mb-4">AI Tips</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Use specific prompts for better results</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Include your target audience in the prompt</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Test different tones for your brand</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Always validate content before publishing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIContentGenerator;