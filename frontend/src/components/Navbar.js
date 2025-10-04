import React, { useState } from 'react';
import apiService from '../services/api';

const Navbar = ({ onRefresh, onPageChange, currentPage }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await apiService.refreshContests();
      if (onRefresh) {
        onRefresh();
      }
      // Show success message (you could add a toast notification here)
      console.log('Contests refreshed successfully!');
    } catch (error) {
      console.error('Failed to refresh contests:', error);
      // Show error message (you could add a toast notification here)
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Site Name */}
          <div className="flex items-center">
            <button 
              onClick={() => onPageChange('home')}
              className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo.png" 
                alt="ContestHub Logo" 
                className="h-8 w-8 mr-3"
              />
              <h1 className="text-2xl font-bold text-blue-600">
                ContestHub
              </h1>
            </button>
          </div>

          {/* Navigation Links and Refresh Button */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => onPageChange('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'home' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onPageChange('about')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'about' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                About
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                {isRefreshing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
