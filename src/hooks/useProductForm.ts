'use client';

import { useState } from 'react';

const API_URL = 'https://plantbased-backend.onrender.com/api/v1';

interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
}

interface FormData {
  name: string;
  shortDescription: string;
  mainImage: File | null;
  introDescription: string;
  mainContentImage: File | null;
  whatCauses: string;
  whatCausesImage: File | null;
  healthRisks: string;
  healthRisksImage: File | null;
  strategies: string;
  strategiesImage: File | null;
  conclusion: string;
  conclusionImage: File | null;
  pricingPlans: PricingPlan[];
}

export default function useProductForm() {
  const [formData, setFormData] = useState<FormData>({
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

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (file: File | null, fieldName: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const addPricingPlan = (plan: PricingPlan) => {
    setFormData(prev => ({
      ...prev,
      pricingPlans: [...prev.pricingPlans, plan]
    }));
  };

  const editPricingPlan = (index: number) => {
    // TODO: Implement edit functionality
    alert('Edit functionality coming soon!');
  };

  const deletePricingPlan = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pricingPlans: prev.pricingPlans.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
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

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      (input as HTMLInputElement).value = '';
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.pricingPlans.length === 0) {
      setError('Please add at least one pricing plan');
      return;
    }

    const imageFields = ['mainImage', 'mainContentImage', 'whatCausesImage', 'healthRisksImage', 'strategiesImage', 'conclusionImage'];
    const missingImages = imageFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingImages.length > 0) {
      setError('Please upload all required images');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login first');
        setIsLoading(false);
        return;
      }

      const submitData = new FormData();
      
      submitData.append('name', formData.name);
      submitData.append('shortDescription', formData.shortDescription);
      submitData.append('introDescription', formData.introDescription);
      submitData.append('whatCauses', formData.whatCauses);
      submitData.append('healthRisks', formData.healthRisks);
      submitData.append('strategies', formData.strategies);
      submitData.append('conclusion', formData.conclusion);
      submitData.append('pricingPlans', JSON.stringify(formData.pricingPlans));

      if (formData.mainImage) submitData.append('mainImage', formData.mainImage);
      if (formData.mainContentImage) submitData.append('mainContentImage', formData.mainContentImage);
      if (formData.whatCausesImage) submitData.append('whatCausesImage', formData.whatCausesImage);
      if (formData.healthRisksImage) submitData.append('healthRisksImage', formData.healthRisksImage);
      if (formData.strategiesImage) submitData.append('strategiesImage', formData.strategiesImage);
      if (formData.conclusionImage) submitData.append('conclusionImage', formData.conclusionImage);

      const response = await fetch(`${API_URL}/programs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to add program');
      }

      setSuccess('Program with pricing plans added successfully!');
      resetForm();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    success,
    error,
    handleChange,
    handleFileChange,
    addPricingPlan,
    editPricingPlan,
    deletePricingPlan,
    handleSubmit
  };
}