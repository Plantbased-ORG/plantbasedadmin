'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import AddReviewForm from '@/components/AddReviewForm';
import AddProductForm from '@/components/AddProductForm';
import ProgramsList from './components/ProgramsList';

interface Program {
  id: number;
  name: string;
  short_description: string;
  main_image_url: string;
  intro_description: string;
  main_content_image_url: string;
  what_causes: string;
  what_causes_image_url: string;
  health_risks: string;
  health_risks_image_url: string;
  strategies: string;
  strategies_image_url: string;
  conclusion: string;
  conclusion_image_url: string;
  created_at: string;
}

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'programs' | 'reviews' | 'password'>('programs');
  const [programView, setProgramView] = useState<'list' | 'add'>('list');
  const [selectedProgram, setSelectedProgram] = useState<Program | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');

    if (!token) {
      router.push('/');
    } else {
      setUserEmail(email || '');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    router.push('/');
  };

  const handleEditProgram = (program: Program) => {
    setSelectedProgram(program);
    setProgramView('add');
  };

  const handleAddNewProgram = () => {
    setSelectedProgram(undefined);
    setProgramView('add');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userEmail={userEmail} onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-purple-100">Manage healing programs with pricing, reviews, and settings.</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('programs')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                activeTab === 'programs'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Programs + Pricing
              </span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Reviews
              </span>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                activeTab === 'password'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Password
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            {/* Toggle buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setProgramView('list')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  programView === 'list'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                View All Programs
              </button>
              <button
                onClick={handleAddNewProgram}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  programView === 'add'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Add New Program
              </button>
            </div>

            {/* Content based on view */}
            {programView === 'list' ? (
              <ProgramsList onEdit={handleEditProgram} />
            ) : (
              <AddProductForm editProgram={selectedProgram} />
            )}
          </div>
        )}
        {activeTab === 'reviews' && <AddReviewForm />}
        {activeTab === 'password' && <ChangePasswordForm />}
      </main>
    </div>
  );
}