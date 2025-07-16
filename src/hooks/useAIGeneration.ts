import { useState, useCallback } from 'react';
import { 
  ContentIdeationRequest, 
  ContentIdea, 
  ContentGenerationRequest, 
  GeneratedContent,
  QualityValidationResult,
  ContentVariation,
  AIGenerationSettings
} from '../types/ai';
import { aiContentGenerator } from '../services/aiContentGenerator';
import { contentEnhancer } from '../services/contentEnhancer';
import { contentQualityValidator } from '../services/contentQualityValidator';
import { contentVariationGenerator } from '../services/contentVariationGenerator';

interface UseAIGenerationReturn {
  // State
  isGenerating: boolean;
  isEnhancing: boolean;
  isValidating: boolean;
  currentIdeas: ContentIdea[];
  currentContent: GeneratedContent | null;
  qualityResults: QualityValidationResult | null;
  variations: ContentVariation[];
  error: string | null;
  
  // Actions
  generateIdeas: (request: ContentIdeationRequest) => Promise<void>;
  generateContent: (request: ContentGenerationRequest) => Promise<void>;
  enhanceContent: (content: GeneratedContent, request: ContentGenerationRequest) => Promise<void>;
  validateContent: (content: GeneratedContent) => Promise<void>;
  generateVariations: (content: GeneratedContent, count?: number) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useAIGeneration = (): UseAIGenerationReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [currentIdeas, setCurrentIdeas] = useState<ContentIdea[]>([]);
  const [currentContent, setCurrentContent] = useState<GeneratedContent | null>(null);
  const [qualityResults, setQualityResults] = useState<QualityValidationResult | null>(null);
  const [variations, setVariations] = useState<ContentVariation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateIdeas = useCallback(async (request: ContentIdeationRequest) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const ideas = await aiContentGenerator.generateIdeas(request);
      setCurrentIdeas(ideas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate ideas');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const generateContent = useCallback(async (request: ContentGenerationRequest) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const content = await aiContentGenerator.generateContent(request);
      setCurrentContent(content);
      
      // Automatically validate the generated content
      const validation = await contentQualityValidator.validateContent(content);
      setQualityResults(validation);
      
      // Update content quality score
      content.qualityScore = validation.overallScore;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const enhanceContent = useCallback(async (
    content: GeneratedContent, 
    request: ContentGenerationRequest
  ) => {
    setIsEnhancing(true);
    setError(null);
    
    try {
      const enhanced = await contentEnhancer.enhanceContent(content, request);
      setCurrentContent(enhanced);
      
      // Re-validate enhanced content
      const validation = await contentQualityValidator.validateContent(enhanced);
      setQualityResults(validation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enhance content');
    } finally {
      setIsEnhancing(false);
    }
  }, []);

  const validateContent = useCallback(async (content: GeneratedContent) => {
    setIsValidating(true);
    setError(null);
    
    try {
      const validation = await contentQualityValidator.validateContent(content);
      setQualityResults(validation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate content');
    } finally {
      setIsValidating(false);
    }
  }, []);

  const generateVariations = useCallback(async (content: GeneratedContent, count = 3) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const contentVariations = await contentVariationGenerator.generateVariations(content, count);
      setVariations(contentVariations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate variations');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setCurrentIdeas([]);
    setCurrentContent(null);
    setQualityResults(null);
    setVariations([]);
    setError(null);
  }, []);

  return {
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
  };
};