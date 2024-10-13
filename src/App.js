import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import MatchPage from './pages/MatchPage';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link className="nav-item" to="/profile">Profile</Link>
          <Link className="nav-item" to="/matches">Matches</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/matches" element={<MatchPage />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 AI Networking Platform</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
