import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GamePage from './pages/GamePage';

const App = () => {
  return (
    <Router>
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App
