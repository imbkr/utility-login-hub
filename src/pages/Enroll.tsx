
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

const Enroll = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <header className="w-full py-6 px-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <Link 
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Enrollment Form</h1>
          <p className="text-gray-600">Enrollment form will be implemented in the next phase.</p>
          <Link 
            to="/"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition-colors"
          >
            Return to Login
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Enroll;
