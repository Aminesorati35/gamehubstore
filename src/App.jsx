import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const TikTokBrowserGate = () => {
  const slides = useMemo(
    () => ["/images/browser/3.jpg", "/images/browser/4.jpg"],
    []
  );

  const [isTikTokBrowser, setIsTikTokBrowser] = useState(false);
  const [checked, setChecked] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const ua = (navigator.userAgent || "").toLowerCase();

    const isTikTok =
      ua.includes("tiktok") ||
      ua.includes("bytedance") ||
      ua.includes("musical_ly") ||
      ua.includes("aweme");

    setIsTikTokBrowser(isTikTok);
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!isTikTokBrowser) return;

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isTikTokBrowser, slides.length]);

  if (!checked) return null;

  if (isTikTokBrowser) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md">
          <img
            src={slides[slideIndex]}
            alt="Browser Guide"
            className="w-full h-auto rounded-2xl shadow-2xl"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    );
  }

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
      <TikTokBrowserGate />
    </Router>
  );
};

export default App;