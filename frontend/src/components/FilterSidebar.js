import React from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'codeforces', label: 'Codeforces' },
    { value: 'leetcode', label: 'LeetCode' },
    { value: 'gfg', label: 'GeeksforGeeks' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Contests' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
        
        {/* Platform Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Platform</h3>
          <div className="space-y-2">
            {platforms.map((platform) => (
              <label key={platform.value} className="flex items-center">
                <input
                  type="radio"
                  name="platform"
                  value={platform.value}
                  checked={filters.platform === platform.value}
                  onChange={(e) => onFilterChange({ platform: e.target.value })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{platform.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <label key={status.value} className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={status.value}
                  checked={filters.status === status.value}
                  onChange={(e) => onFilterChange({ status: e.target.value })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{status.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Time Range</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Next 7 days</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Next 30 days</span>
            </label>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => onFilterChange({ platform: 'all', status: 'all' })}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
