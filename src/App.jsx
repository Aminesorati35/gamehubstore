import React, { useEffect, useState } from "react";
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
  const [isTikTokBrowser, setIsTikTokBrowser] = useState(false);
  const [checked, setChecked] = useState(false);

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

  if (!checked) return null;

  // 👉 ONLY SHOW GIF IF TIKTOK
  if (isTikTokBrowser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <img
          src="/images/browser/5.gif"
          alt="Open in browser"
          style={{
            width: "300px",
            maxWidth: "90%",
          }}
        />
      </div>
    );
  }

  // 👉 NORMAL WEBSITE (NO REDIRECTS ANYWHERE)
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