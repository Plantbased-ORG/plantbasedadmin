'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import AddReviewForm from '@/components/AddReviewForm';
import AddProductForm from '@/components/AddProductForm';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'programs' | 'reviews' | 'password'>('programs');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userEmail={userEmail} onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-purple-100">Manage healing programs, reviews, and account settings.</p>
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
                Programs
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
        {activeTab === 'programs' && <AddProductForm />}
        {activeTab === 'reviews' && <AddReviewForm />}
        {activeTab === 'password' && <ChangePasswordForm />}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Mock System Active</h4>
              <p className="text-sm text-blue-700">
                Data is stored in memory. Connect a real database for persistence.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}