# 🏆 Contest Tracker

A web application that aggregates programming contests from Codeforces, LeetCode, and GeeksforGeeks. Built with React frontend and Node.js backend.

## ✨ Features

- **Multi-Platform Support**: Codeforces, LeetCode, and GeeksforGeeks contests
- **Real-time Updates**: Automatic hourly refresh of contest data
- **Smart Filtering**: Filter by platform, status, and time range
- **Responsive Design**: Modern UI with React and Tailwind CSS
- **Direct Links**: One-click access to contest registration/results

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm

### Installation

1. **Clone and install**
   ```bash
   git clone https://github.com/yourusername/contest-tracker.git
   cd contest-tracker
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Environment Setup**
   
   Backend `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/contest-tracker
   PORT=5000
   CLIST_USERNAME=your_clist_username
   CLIST_API_KEY=your_clist_api_key
   ```
   
   Frontend `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

3. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend && npm start
   ```

   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🛠️ API Endpoints

- `GET /api/contests` - Fetch contests (filter by platform/status)
- `POST /api/fetch/all` - Refresh all contest data
- `GET /api/fetch/codeforces` - Fetch Codeforces contests
- `GET /api/fetch/leetcode` - Fetch LeetCode contests
- `GET /api/fetch/gfg` - Fetch GeeksforGeeks contests

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push and submit PR
