const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class ApiService {
  async fetchContests(filters = {}) {
    try {
      const { platform = 'all', status = 'all' } = filters;
      const queryParams = new URLSearchParams();
      
      if (platform !== 'all') {
        queryParams.append('platform', platform);
      }
      if (status !== 'all') {
        queryParams.append('status', status);
      }
      
      const url = `${API_BASE_URL}/api/contests${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contests = await response.json();
      
      // Transform the contests to match our frontend format
      return contests.map(contest => ({
        id: contest.id,
        name: contest.name,
        platform: contest.platform,
        startTime: new Date(contest.startTime),
        endTime: new Date(contest.endTime),
        duration: contest.duration,
        status: contest.status,
        url: contest.url
      }));
    } catch (error) {
      console.error('Error fetching contests:', error);
      throw error;
    }
  }

  async refreshContests() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/fetch/all`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Error refreshing contests:', error);
      throw error;
    }
  }

  async getContestStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/debug/db`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching contest stats:', error);
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;
