import React, { useState } from 'react';
import { ArrowLeft, Plus, Image, Type, Palette, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CarouselCreator: React.FC = () => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([
    { id: 1, title: 'Slide 1', content: '', background: '#ffffff' }
  ]);
  const [activeSlide, setActiveSlide] = useState(0);

  const addSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      title: `Slide ${slides.length + 1}`,
      content: '',
      background: '#ffffff'
    };
    setSlides([...slides, newSlide]);
  };

  const updateSlide = (index: number, field: string, value: string) => {
    const updatedSlides = slides.map((slide, i) => 
      i === index ? { ...slide, [field]: value } : slide
    );
    setSlides(updatedSlides);
  };

  const removeSlide = (index: number) => {
    if (slides.length > 1) {
      const updatedSlides = slides.filter((_, i) => i !== index);
      setSlides(updatedSlides);
      if (activeSlide >= updatedSlides.length) {
        setActiveSlide(updatedSlides.length - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/content')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Content
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Carousel Creator</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Slide Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Slides</h3>
            <button
              onClick={addSlide}
              className="flex items-center px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  activeSlide === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveSlide(index)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{slide.title}</span>
                  {slides.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSlide(index);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="mt-2 h-16 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Slide {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex">
          {/* Canvas */}
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <div
                className="aspect-square rounded-lg shadow-lg p-8 flex flex-col justify-center"
                style={{ backgroundColor: slides[activeSlide]?.background || '#ffffff' }}
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    {slides[activeSlide]?.title || 'Slide Title'}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {slides[activeSlide]?.content || 'Add your content here...'}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                Slide {activeSlide + 1} of {slides.length}
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Slide Properties</h3>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Type className="w-4 h-4 inline mr-1" />
                  Title
                </label>
                <input
                  type="text"
                  value={slides[activeSlide]?.title || ''}
                  onChange={(e) => updateSlide(activeSlide, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter slide title"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={slides[activeSlide]?.content || ''}
                  onChange={(e) => updateSlide(activeSlide, 'content', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter slide content"
                />
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Background Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={slides[activeSlide]?.background || '#ffffff'}
                    onChange={(e) => updateSlide(activeSlide, 'background', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={slides[activeSlide]?.background || '#ffffff'}
                    onChange={(e) => updateSlide(activeSlide, 'background', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              {/* Add Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  Add Image
                </label>
                <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                  Click to upload image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCreator;