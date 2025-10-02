'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import ChangePasswordForm from '@/components/ChangePasswordForm';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('');
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
          <p className="text-purple-100">Manage your admin account and change your password securely.</p>
        </div>

        <ChangePasswordForm />

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Mock Authentication Active</h4>
              <p className="text-sm text-blue-700">
                Currently using mock authentication. Default password is <strong>admin123</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}