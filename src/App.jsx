import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import GamePage from './pages/GamePage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GamePage />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
