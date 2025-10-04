import React from 'react';
import ContestCard from './ContestCard';

const ContestSection = ({ upcomingContests, completedContests, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upcoming Contests Section */}
      <div>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Contests</h2>
          <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {upcomingContests.length}
          </span>
        </div>
        
        {upcomingContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming contests</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters to see more contests.
            </p>
          </div>
        )}
      </div>

      {/* Completed Contests Section */}
      <div>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Completed Contests</h2>
          <span className="ml-3 bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {completedContests.length}
          </span>
        </div>
        
        {completedContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No completed contests</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters to see more contests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestSection;
