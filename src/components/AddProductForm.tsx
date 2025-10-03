'use client';

import { useState } from 'react';

interface ProductSection {
  title: string;
  content: string;
  image?: string;
}

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    mainImage: '',
    fullDescription: '',
    sections: [] as ProductSection[]
  });
  const [currentSection, setCurrentSection] = useState<ProductSection>({
    title: '',
    content: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentSection(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addSection = () => {
    if (currentSection.title && currentSection.content) {
      setFormData(prev => ({
        ...prev,
        sections: [...prev.sections, currentSection]
      }));
      setCurrentSection({ title: '', content: '', image: '' });
    }
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add program');

      setSuccess('Program added successfully!');
      setFormData({
        name: '',
        shortDescription: '',
        mainImage: '',
        fullDescription: '',
        sections: []
      });
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Healing Program
        </h3>
        <p className="text-sm text-gray-500 mt-1">Add disease/condition programs with detailed content</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Basic Information</h4>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Program Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900"
                placeholder="e.g., Obesity, HIV/AIDS, Cancer"
              />
            </div>

            <div>
              <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 mb-2">
                Main Image URL *
              </label>
              <input
                id="mainImage"
                name="mainImage"
                type="url"
                value={formData.mainImage}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Short Description * (Shows on card)
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900 resize-none"
                placeholder="Brief description for the card..."
              />
            </div>

            <div>
              <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Full Description * (Intro on detail page)
              </label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900 resize-none"
                placeholder="Full description that appears at the top of the detail page..."
              />
            </div>
          </div>

          {/* Content Sections */}
          <div className="border-t pt-6 space-y-4">
            <h4 className="font-medium text-gray-900">Content Sections</h4>
            <p className="text-sm text-gray-500">Add sections like &quot;What Causes Obesity?&quot;, &quot;Health Risks&quot;, etc.</p>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <input
                name="title"
                type="text"
                value={currentSection.title}
                onChange={handleSectionChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900"
                placeholder="Section title (e.g., What Causes Obesity?)"
              />
              <textarea
                name="content"
                value={currentSection.content}
                onChange={handleSectionChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900 resize-none"
                placeholder="Section content..."
              />
              <input
                name="image"
                type="url"
                value={currentSection.image}
                onChange={handleSectionChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900"
                placeholder="Section image URL (optional)"
              />
              <button
                type="button"
                onClick={addSection}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg transition"
              >
                Add Section
              </button>
            </div>

            {/* Display Added Sections */}
            {formData.sections.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Added Sections:</p>
                {formData.sections.map((section, index) => (
                  <div key={index} className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-900">{section.title}</span>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding Program...
              </>
            ) : (
              'Add Program'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}