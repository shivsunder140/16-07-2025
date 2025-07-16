import React, { useState } from 'react';
import { 
  Wand2, 
  Image, 
  Video, 
  BarChart3, 
  Hash, 
  AtSign, 
  Calendar, 
  Send,
  Lightbulb,
  Zap,
  Copy,
  RefreshCw
} from 'lucide-react';

const ContentCreator: React.FC = () => {
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    {
      id: 'personal-story',
      name: 'Personal Story',
      description: 'Share a personal experience or lesson learned',
      icon: '📚',
      example: 'My biggest failure taught me...'
    },
    {
      id: 'industry-insight',
      name: 'Industry Insight',
      description: 'Share expert knowledge about your industry',
      icon: '🧠',
      example: 'The future of [industry] is...'
    },
    {
      id: 'how-to-guide',
      name: 'How-to Guide',
      description: 'Provide step-by-step instructions',
      icon: '🔧',
      example: 'How to [achieve something] in 5 steps...'
    },
    {
      id: 'question-post',
      name: 'Question Post',
      description: 'Ask engaging questions to your audience',
      icon: '❓',
      example: 'What\'s your biggest challenge with...'
    },
    {
      id: 'list-post',
      name: 'List Post',
      description: 'Create numbered or bulleted lists',
      icon: '📝',
      example: '5 things I wish I knew about...'
    },
    {
      id: 'motivational',
      name: 'Motivational',
      description: 'Inspire and motivate your audience',
      icon: '🚀',
      example: 'Success isn\'t about...'
    }
  ];

  const aiSuggestions = [
    "The biggest mistake professionals make on LinkedIn is...",
    "Here's what 2 years of content creation taught me...",
    "5 LinkedIn features you're probably not using (but should be)...",
    "My unconventional approach to networking that actually works...",
    "The content strategy that grew my following by 500%..."
  ];

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedContent = `🚀 The biggest mistake I see professionals make on LinkedIn?

They focus on selling instead of serving.

Here's what changed everything for me:

✅ Started sharing valuable insights
✅ Engaged genuinely with others' content
✅ Built relationships before asking for anything
✅ Consistently showed up with helpful content

The result? 3x more meaningful connections and 5x more opportunities.

Your network is your net worth, but only if you nurture it properly.

What's your biggest LinkedIn challenge? Let me know in the comments 👇

#LinkedIn #Networking #PersonalBranding #ProfessionalGrowth`;
    
    setContent(generatedContent);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Content Creator</h1>
          <p className="text-gray-400">Create engaging LinkedIn posts with AI assistance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
            <Wand2 className="w-4 h-4" />
            <span>AI Generate</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card hover:bg-gray-800/60 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-4">
              <Wand2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Content Editor</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Post Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your LinkedIn post here or use AI to generate content..."
                  className="w-full h-64 p-4 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white placeholder-gray-400 resize-none transition-all duration-300"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    <Image className="w-4 h-4" />
                    <span>Add Image</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    <Video className="w-4 h-4" />
                    <span>Add Video</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    <Hash className="w-4 h-4" />
                    <span>Hashtags</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    <AtSign className="w-4 h-4" />
                    <span>Mention</span>
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  {content.length}/3000 characters
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleGenerateContent}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:from-violet-400 disabled:to-purple-400 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Generate with AI</span>
                    </>
                  )}
                </button>
                <button className="px-6 py-3 glass-card hover:bg-gray-800/60 text-gray-300 rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105">
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
                  <Send className="w-4 h-4" />
                  <span>Post Now</span>
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card hover:bg-gray-800/60 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-4">Content Performance Prediction</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-400">8.5/10</div>
                <div className="text-sm text-gray-400">Engagement Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">2.3K</div>
                <div className="text-sm text-gray-400">Predicted Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">4.2%</div>
                <div className="text-sm text-gray-400">Est. Engagement Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card hover:bg-gray-800/60 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-4">Content Templates</h3>
            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`w-full p-3 rounded-xl border transition-all duration-300 text-left hover:scale-105 ${
                    selectedTemplate === template.id
                      ? 'border-violet-500 bg-gradient-to-r from-violet-500/20 to-purple-500/20'
                      : 'border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-800/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{template.icon}</span>
                    <div>
                      <div className="font-medium text-white">{template.name}</div>
                      <div className="text-sm text-gray-400">{template.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card hover:bg-gray-800/60 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">AI Suggestions</h3>
            </div>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setContent(suggestion)}
                  className="w-full p-3 text-left border border-gray-700/50 rounded-xl hover:border-cyan-500/50 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-sm text-gray-300">{suggestion}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5" />
              <h3 className="font-semibold">Pro Tip</h3>
            </div>
            <p className="text-sm opacity-90">
              Posts with personal stories get 3x more engagement. Share your authentic experiences!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;