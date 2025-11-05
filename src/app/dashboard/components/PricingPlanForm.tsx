'use client';

import { useState } from 'react';

interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
}

interface PricingPlanFormProps {
  programName: string;
  onAddPlan: (plan: PricingPlan) => void;
}

export default function PricingPlanForm({ programName, onAddPlan }: PricingPlanFormProps) {
  const [currentPlan, setCurrentPlan] = useState<PricingPlan>({
    name: '',
    subtitle: '',
    price: '',
    features: []
  });
  const [currentFeature, setCurrentFeature] = useState('');

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

  const handleAddPlan = () => {
    if (currentPlan.name && currentPlan.subtitle && currentPlan.price && currentPlan.features.length > 0) {
      onAddPlan(currentPlan);
      setCurrentPlan({ name: '', subtitle: '', price: '', features: [] });
    } else {
      alert('Please fill all pricing plan fields and add at least one feature');
    }
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
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

        <button type="button" onClick={handleAddPlan} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
          Add This Pricing Plan
        </button>
      </div>
    </div>
  );
}