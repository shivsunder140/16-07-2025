import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft, Zap, Target, Users, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import InfinityLogo from '../../components/InfinityLogo';

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goals: [] as string[],
    industry: '',
    role: '',
    experience: '',
    linkedinConnected: false
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 5;

  const goals = [
    { id: 'brand-awareness', label: 'Build Brand Awareness', icon: Users },
    { id: 'lead-generation', label: 'Generate Leads', icon: Target },
    { id: 'thought-leadership', label: 'Establish Thought Leadership', icon: Zap },
    { id: 'network-growth', label: 'Grow Professional Network', icon: Users },
    { id: 'content-engagement', label: 'Increase Content Engagement', icon: BarChart3 }
  ];

  const industries = [
    'Technology', 'Marketing', 'Sales', 'Finance', 'Healthcare', 
    'Education', 'Consulting', 'Real Estate', 'Manufacturing', 'Other'
  ];

  const roles = [
    'CEO/Founder', 'Marketing Manager', 'Sales Manager', 'Business Development',
    'Consultant', 'Freelancer', 'Content Creator', 'HR Manager', 'Other'
  ];

  const experienceLevels = [
    'Just getting started', '1-2 years', '3-5 years', '5+ years', 'Expert level'
  ];

  const handleGoalToggle = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const connectLinkedIn = () => {
    // Mock LinkedIn connection
    setFormData(prev => ({ ...prev, linkedinConnected: true }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Taplio!</h2>
              <p className="text-gray-400">Let's set up your account to maximize your LinkedIn growth</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">What are your main goals?</h3>
              <p className="text-sm text-gray-400">Select all that apply</p>
              
              <div className="grid grid-cols-1 gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      formData.goals.includes(goal.id)
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                        : 'border-gray-700/50 hover:border-gray-600/50 text-gray-300'
                    }`}
                  >
                    <goal.icon className="w-5 h-5" />
                    <span className="font-medium">{goal.label}</span>
                    {formData.goals.includes(goal.id) && (
                      <CheckCircle className="w-5 h-5 ml-auto text-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
              <p className="text-gray-400">This helps us personalize your experience</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What industry are you in?
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white"
                >
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What's your role?
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white"
                >
                  <option value="">Select your role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn experience level?
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-800/50 text-white"
                >
                  <option value="">Select your experience level</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Connect your LinkedIn</h2>
              <p className="text-gray-400">Connect your LinkedIn profile to get personalized insights</p>
            </div>
            
            <div className="text-center">
              {formData.linkedinConnected ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">LinkedIn Connected!</h3>
                  <p className="text-gray-400">Your profile is now connected and ready for optimization</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <button
                    onClick={connectLinkedIn}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Connect LinkedIn Profile
                  </button>
                  <p className="text-xs text-gray-500">
                    We'll only access basic profile information to help optimize your content
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Choose your plan</h2>
              <p className="text-gray-400">Select the plan that best fits your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 border border-gray-700/50 rounded-xl hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-2">Starter</h3>
                <p className="text-3xl font-bold text-white mb-1">$29<span className="text-lg text-gray-400">/mo</span></p>
                <p className="text-gray-400 mb-4">Perfect for individuals</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>50 AI-generated posts/month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Content scheduling</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 border-2 border-cyan-500 rounded-xl bg-cyan-500/5 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
                <p className="text-3xl font-bold text-white mb-1">$79<span className="text-lg text-gray-400">/mo</span></p>
                <p className="text-gray-400 mb-4">For growing professionals</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Unlimited AI posts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Lead generation tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">You're all set!</h2>
              <p className="text-gray-400">Welcome to Taplio. Let's start growing your LinkedIn presence.</p>
            </div>
            
            <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl p-6 border border-violet-500/30">
              <h3 className="text-lg font-semibold text-white mb-2">What's next?</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-violet-400" />
                  <span>Create your first AI-generated post</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-violet-400" />
                  <span>Schedule content for the week</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-violet-400" />
                  <span>Explore the viral content library</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-violet-400" />
                  <span>Set up your content calendar</span>
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <InfinityLogo />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Taplio</h1>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-2 rounded-full transition-all duration-300 ${
                  i + 1 <= currentStep ? 'bg-cyan-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</p>
        </div>

        {/* Content */}
        <div className="glass-card shadow-2xl">
          {renderStep()}
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700/50">
            <div>
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                Skip for now
              </button>
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span>{currentStep === totalSteps ? 'Get Started' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;