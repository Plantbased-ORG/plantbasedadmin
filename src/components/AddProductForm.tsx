'use client';

import { useState } from 'react';

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    mainImage: '',
    introDescription: '',
    mainContentImage: '',
    whatCauses: '',
    whatCausesImage: '',
    healthRisks: '',
    healthRisksImage: '',
    strategies: '',
    strategiesImage: '',
    conclusion: '',
    conclusionImage: ''
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
        introDescription: '',
        mainContentImage: '',
        whatCauses: '',
        whatCausesImage: '',
        healthRisks: '',
        healthRisksImage: '',
        strategies: '',
        strategiesImage: '',
        conclusion: '',
        conclusionImage: ''
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
        <p className="text-sm text-gray-500 mt-1">All programs follow the same structure</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Display Info */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Card Display (Programs List)</h4>
            
            <div className="space-y-4">
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900"
                  placeholder="e.g., Obesity"
                />
              </div>

              <div>
                <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Card Image URL *
                </label>
                <input
                  id="mainImage"
                  name="mainImage"
                  type="url"
                  value={formData.mainImage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900 resize-none"
                  placeholder="Obesity has become a global health concern, affecting millions of people..."
                />
              </div>
            </div>
          </div>

          {/* Detail Page Content */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Detail Page Content</h4>
            
            {/* Intro Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h5 className="font-medium text-gray-900 mb-3">Introduction Section</h5>
              <div className="space-y-4">
                <div>
                  <label htmlFor="introDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Introduction Text *
                  </label>
                  <textarea
                    id="introDescription"
                    name="introDescription"
                    value={formData.introDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-gray-900 resize-none"
                    placeholder="Full introduction that appears at the top..."
                  />
                </div>
                <div>
                  <label htmlFor="mainContentImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Main Content Image URL *
                  </label>
                  <input
                    id="mainContentImage"
                    name="mainContentImage"
                    type="url"
                    value={formData.mainContentImage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-gray-900"
                    placeholder="https://example.com/main-image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* What Causes Section */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h5 className="font-medium text-gray-900 mb-3">What Causes {formData.name || '[Program Name]'}?</h5>
              <div className="space-y-4">
                <div>
                  <label htmlFor="whatCauses" className="block text-sm font-medium text-gray-700 mb-2">
                    Content * (Use bullet points or paragraphs)
                  </label>
                  <textarea
                    id="whatCauses"
                    name="whatCauses"
                    value={formData.whatCauses}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition text-gray-900 resize-none"
                    placeholder="Explain what causes this condition..."
                  />
                </div>
                <div>
                  <label htmlFor="whatCausesImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Section Image URL *
                  </label>
                  <input
                    id="whatCausesImage"
                    name="whatCausesImage"
                    type="url"
                    value={formData.whatCausesImage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition text-gray-900"
                    placeholder="https://example.com/causes-image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Health Risks Section */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h5 className="font-medium text-gray-900 mb-3">Health Risks Associated with {formData.name || '[Program Name]'}</h5>
              <div className="space-y-4">
                <div>
                  <label htmlFor="healthRisks" className="block text-sm font-medium text-gray-700 mb-2">
                    Content * (Use bullet points or paragraphs)
                  </label>
                  <textarea
                    id="healthRisks"
                    name="healthRisks"
                    value={formData.healthRisks}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 transition text-gray-900 resize-none"
                    placeholder="Explain the health risks..."
                  />
                </div>
                <div>
                  <label htmlFor="healthRisksImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Section Image URL *
                  </label>
                  <input
                    id="healthRisksImage"
                    name="healthRisksImage"
                    type="url"
                    value={formData.healthRisksImage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 transition text-gray-900"
                    placeholder="https://example.com/risks-image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Strategies Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h5 className="font-medium text-gray-900 mb-3">Strategies for Managing and Preventing {formData.name || '[Program Name]'}</h5>
              <div className="space-y-4">
                <div>
                  <label htmlFor="strategies" className="block text-sm font-medium text-gray-700 mb-2">
                    Content * (Use numbered lists or paragraphs)
                  </label>
                  <textarea
                    id="strategies"
                    name="strategies"
                    value={formData.strategies}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition text-gray-900 resize-none"
                    placeholder="Explain strategies for managing and preventing..."
                  />
                </div>
                <div>
                  <label htmlFor="strategiesImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Section Image URL *
                  </label>
                  <input
                    id="strategiesImage"
                    name="strategiesImage"
                    type="url"
                    value={formData.strategiesImage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 transition text-gray-900"
                    placeholder="https://example.com/strategies-image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Conclusion Section */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3">Conclusion</h5>
              <div className="space-y-4">
                <div>
                  <label htmlFor="conclusion" className="block text-sm font-medium text-gray-700 mb-2">
                    Conclusion Text *
                  </label>
                  <textarea
                    id="conclusion"
                    name="conclusion"
                    value={formData.conclusion}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900 resize-none"
                    placeholder="Write the conclusion..."
                  />
                </div>
                <div>
                  <label htmlFor="conclusionImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Conclusion Image URL *
                  </label>
                  <input
                    id="conclusionImage"
                    name="conclusionImage"
                    type="url"
                    value={formData.conclusionImage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900"
                    placeholder="https://example.com/conclusion-image.jpg"
                  />
                </div>
              </div>
            </div>
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

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Reviews section will automatically display at the bottom of each program detail page.
            </p>
          </div>

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