import React from 'react';

const ContestCard = ({ contest }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }).format(date);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'Codeforces': 'bg-red-100 text-red-800',
      'LeetCode': 'bg-yellow-100 text-yellow-800',
      'AtCoder': 'bg-green-100 text-green-800',
      'CodeChef': 'bg-orange-100 text-orange-800',
      'HackerRank': 'bg-green-100 text-green-800',
      'TopCoder': 'bg-blue-100 text-blue-800'
    };
    return colors[platform] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    return status === 'upcoming' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <div className="p-6">
        {/* Header with platform and status */}
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlatformColor(contest.platform)}`}>
            {contest.platform}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contest.status)}`}>
            {contest.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </span>
        </div>

        {/* Contest Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {contest.name}
        </h3>

        {/* Contest Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Start Time:</span>
            <span className="ml-1">{formatDate(contest.startTime)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Duration:</span>
            <span className="ml-1">{formatDuration(contest.duration)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {contest.status === 'upcoming' ? 'Register' : 'View Results'}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          {contest.status === 'upcoming' && (
            <div className="text-sm text-gray-500">
              <span className="font-medium">Starts in:</span>
              <span className="ml-1">
                {Math.ceil((contest.startTime - new Date()) / (1000 * 60 * 60 * 24))} days
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
