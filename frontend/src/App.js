import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar';
import ContestSection from './components/ContestSection';
import About from './components/About';
import apiService from './services/api';

function App() {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [filters, setFilters] = useState({
    platform: 'all',
    status: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  // Fetch contests from API
  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const fetchedContests = await apiService.fetchContests(filters);
        setContests(fetchedContests);
        setFilteredContests(fetchedContests);
      } catch (error) {
        console.error('Failed to fetch contests:', error);
        // Fallback to empty array if API fails
        setContests([]);
        setFilteredContests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [filters]);

  // Filter contests based on selected filters
  useEffect(() => {
    const fetchFilteredContests = async () => {
      try {
        setLoading(true);
        const fetchedContests = await apiService.fetchContests(filters);
        setFilteredContests(fetchedContests);
      } catch (error) {
        console.error('Failed to fetch filtered contests:', error);
        // Fallback to client-side filtering if API fails
        let filtered = contests;

        if (filters.platform !== 'all') {
          filtered = filtered.filter(contest => 
            contest.platform.toLowerCase() === filters.platform.toLowerCase()
          );
        }

        if (filters.status !== 'all') {
          filtered = filtered.filter(contest => contest.status === filters.status);
        }

        setFilteredContests(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredContests();
  }, [filters, contests]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const fetchedContests = await apiService.fetchContests(filters);
      setContests(fetchedContests);
      setFilteredContests(fetchedContests);
    } catch (error) {
      console.error('Failed to refresh contests:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingContests = filteredContests.filter(contest => contest.status === 'upcoming');
  const completedContests = filteredContests.filter(contest => contest.status === 'completed');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onRefresh={handleRefresh} onPageChange={handlePageChange} currentPage={currentPage} />
      
      {currentPage === 'home' ? (
        <div className="flex">
          <FilterSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
          <div className="flex-1 p-6">
            <ContestSection 
              upcomingContests={upcomingContests}
              completedContests={completedContests}
              loading={loading}
            />
          </div>
        </div>
      ) : (
        <About />
      )}
    </div>
  );
}

export default App;
