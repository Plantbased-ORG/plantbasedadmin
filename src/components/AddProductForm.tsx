'use client';

import { useState } from 'react';

interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
}

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    mainImage: null as File | null,
    introDescription: '',
    mainContentImage: null as File | null,
    whatCauses: '',
    whatCausesImage: null as File | null,
    healthRisks: '',
    healthRisksImage: null as File | null,
    strategies: '',
    strategiesImage: null as File | null,
    conclusion: '',
    conclusionImage: null as File | null,
    pricingPlans: [] as PricingPlan[]
  });

  const [currentPlan, setCurrentPlan] = useState<PricingPlan>({
    name: '',
    subtitle: '',
    price: '',
    features: []
  });
  const [currentFeature, setCurrentFeature] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        setTimeout(() => setError(''), 3000);
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should not exceed 5MB');
        setTimeout(() => setError(''), 3000);
        return;
      }

      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPlan(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addFeature = () => {
    if (currentFeature.trim()) {
      setCurrentPlan(prev => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()]
      }));
      setCurrentFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setCurrentPlan(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addPricingPlan = () => {
    if (currentPlan.name && currentPlan.subtitle && currentPlan.price && currentPlan.features.length > 0) {
      setFormData(prev => ({
        ...prev,
        pricingPlans: [...prev.pricingPlans, currentPlan]
      }));
      setCurrentPlan({ name: '', subtitle: '', price: '', features: [] });
    } else {
      setError('Please fill all pricing plan fields and add at least one feature');
      setTimeout(() => setError(''), 3000);
    }
  };

  const removePricingPlan = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pricingPlans: prev.pricingPlans.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.pricingPlans.length === 0) {
      setError('Please add at least one pricing plan');
      return;
    }

    // Check all required images
    const imageFields = ['mainImage', 'mainContentImage', 'whatCausesImage', 'healthRisksImage', 'strategiesImage', 'conclusionImage'];
    const missingImages = imageFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingImages.length > 0) {
      setError('Please upload all required images');
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add text fields
      submitData.append('name', formData.name);
      submitData.append('shortDescription', formData.shortDescription);
      submitData.append('introDescription', formData.introDescription);
      submitData.append('whatCauses', formData.whatCauses);
      submitData.append('healthRisks', formData.healthRisks);
      submitData.append('strategies', formData.strategies);
      submitData.append('conclusion', formData.conclusion);
      submitData.append('pricingPlans', JSON.stringify(formData.pricingPlans));

      // Add image files
      if (formData.mainImage) submitData.append('mainImage', formData.mainImage);
      if (formData.mainContentImage) submitData.append('mainContentImage', formData.mainContentImage);
      if (formData.whatCausesImage) submitData.append('whatCausesImage', formData.whatCausesImage);
      if (formData.healthRisksImage) submitData.append('healthRisksImage', formData.healthRisksImage);
      if (formData.strategiesImage) submitData.append('strategiesImage', formData.strategiesImage);
      if (formData.conclusionImage) submitData.append('conclusionImage', formData.conclusionImage);

      const response = await fetch('/api/programs', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) throw new Error('Failed to add program');

      setSuccess('Program with pricing plans added successfully!');
      setFormData({
        name: '',
        shortDescription: '',
        mainImage: null,
        introDescription: '',
        mainContentImage: null,
        whatCauses: '',
        whatCausesImage: null,
        healthRisks: '',
        healthRisksImage: null,
        strategies: '',
        strategiesImage: null,
        conclusion: '',
        conclusionImage: null,
        pricingPlans: []
      });
      
      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => {
        (input as HTMLInputElement).value = '';
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
        <p className="text-sm text-gray-500 mt-1">Add program details and its pricing plans</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Display Info */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Card Display</h4>
            
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
                  Card Image * (Max 5MB)
                </label>
                <input
                  id="mainImage"
                  name="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'mainImage')}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                />
                {formData.mainImage && (
                  <p className="text-xs text-green-600 mt-1">✓ {formData.mainImage.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition text-gray-900 resize-none"
                  placeholder="Brief description..."
                />
              </div>
            </div>
          </div>

          {/* Detail Page Content */}
          <details className="border border-gray-200 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
              Program Detail Content (Click to expand)
            </summary>
            <div className="p-4 space-y-4 border-t">
              {/* Introduction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Introduction *</label>
                <textarea name="introDescription" value={formData.introDescription} onChange={handleChange} required rows={3} className="w-full px-4 py-2.5 border rounded-lg text-gray-900 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intro Image * (Max 5MB)</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'mainContentImage')} required className="w-full px-4 py-2.5 border rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" />
                {formData.mainContentImage && <p className="text-xs text-green-600 mt-1">✓ {formData.mainContentImage.name}</p>}
              </div>

              {/* What Causes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What Causes {formData.name || '...'}? *</label>
                <textarea name="whatCauses" value={formData.whatCauses} onChange={handleChange} required rows={4} className="w-full px-4 py-2.5 border rounded-lg text-gray-900 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Causes Image * (Max 5MB)</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'whatCausesImage')} required className="w-full px-4 py-2.5 border rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200" />
                {formData.whatCausesImage && <p className="text-xs text-green-600 mt-1">✓ {formData.whatCausesImage.name}</p>}
              </div>

              {/* Health Risks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Health Risks *</label>
                <textarea name="healthRisks" value={formData.healthRisks} onChange={handleChange} required rows={4} className="w-full px-4 py-2.5 border rounded-lg text-gray-900 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risks Image * (Max 5MB)</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'healthRisksImage')} required className="w-full px-4 py-2.5 border rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-100 file:text-red-700 hover:file:bg-red-200" />
                {formData.healthRisksImage && <p className="text-xs text-green-600 mt-1">✓ {formData.healthRisksImage.name}</p>}
              </div>

              {/* Strategies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Strategies *</label>
                <textarea name="strategies" value={formData.strategies} onChange={handleChange} required rows={4} className="w-full px-4 py-2.5 border rounded-lg text-gray-900 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Strategies Image * (Max 5MB)</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'strategiesImage')} required className="w-full px-4 py-2.5 border rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200" />
                {formData.strategiesImage && <p className="text-xs text-green-600 mt-1">✓ {formData.strategiesImage.name}</p>}
              </div>

              {/* Conclusion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conclusion *</label>
                <textarea name="conclusion" value={formData.conclusion} onChange={handleChange} required rows={3} className="w-full px-4 py-2.5 border rounded-lg text-gray-900 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conclusion Image * (Max 5MB)</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'conclusionImage')} required className="w-full px-4 py-2.5 border rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" />
                {formData.conclusionImage && <p className="text-xs text-green-600 mt-1">✓ {formData.conclusionImage.name}</p>}
              </div>
            </div>
          </details>

          {/* Pricing Plans Section */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Pricing Plans for {formData.name || 'this program'}</h4>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h5 className="font-medium text-gray-900 mb-3">Add Pricing Plan</h5>
              
              <div className="space-y-3">
                <input
                  name="name"
                  type="text"
                  value={currentPlan.name}
                  onChange={handlePlanChange}
                  className="w-full px-4 py-2.5 border rounded-lg text-gray-900"
                  placeholder="Plan name (e.g., Basic)"
                />
                <input
                  name="subtitle"
                  type="text"
                  value={currentPlan.subtitle}
                  onChange={handlePlanChange}
                  className="w-full px-4 py-2.5 border rounded-lg text-gray-900"
                  placeholder="Subtitle (e.g., Your foundation for a healthier life!)"
                />
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                  <input
                    name="price"
                    type="text"
                    value={currentPlan.price}
                    onChange={handlePlanChange}
                    className="w-full pl-8 pr-4 py-2.5 border rounded-lg text-gray-900"
                    placeholder="500,000.00"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="flex-1 px-4 py-2 border rounded-lg text-gray-900"
                      placeholder="Add feature"
                    />
                    <button type="button" onClick={addFeature} className="px-4 py-2 bg-gray-700 text-white rounded-lg">
                      Add
                    </button>
                  </div>
                  
                  {currentPlan.features.length > 0 && (
                    <div className="space-y-1 mb-2">
                      {currentPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-2 rounded text-sm">
                          <span>• {feature}</span>
                          <button type="button" onClick={() => removeFeature(index)} className="text-red-600 text-xs">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="button" onClick={addPricingPlan} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                  Add This Pricing Plan
                </button>
              </div>
            </div>

            {/* Added Plans */}
            {formData.pricingPlans.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Added Plans ({formData.pricingPlans.length}):</p>
                {formData.pricingPlans.map((plan, index) => (
                  <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <div>
                      <span className="font-medium">{plan.name}</span> - ₦{plan.price}
                      <p className="text-xs text-gray-600">{plan.features.length} features</p>
                    </div>
                    <button type="button" onClick={() => removePricingPlan(index)} className="text-red-600 text-sm">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Adding Program...' : 'Add Complete Program'}
          </button>
        </form>
      </div>
    </div>
  );
}