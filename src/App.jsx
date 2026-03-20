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

  useEffect(() => {
    if (!checked || !isTikTokBrowser) return;

    const openLinkBasedOnDevice = (url) => {
      const userAgent = navigator.userAgent || "";

      if (/android/i.test(userAgent)) {
        const cleanUrl = url.replace(/^https?:\/\//, "");
        window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end;`;
      } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        window.location.href = url;
      } else {
        window.location.href = url;
      }
    };

    const timer = setTimeout(() => {
      const url = "https://yourwebsite.com";
      openLinkBasedOnDevice(url);
    }, 500);

    return () => clearTimeout(timer);
  }, [checked, isTikTokBrowser]);

  if (!checked) return null;

  if (isTikTokBrowser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <style>
          {`
            @keyframes fadeIn {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }

            @keyframes scaleUp {
              0% { transform: scale(1); }
              100% { transform: scale(1.2); }
            }

            .redirect-text {
              font-size: 30px;
              color: #333;
              opacity: 0;
              animation: fadeIn 2s ease-in-out forwards, scaleUp 2s ease-in-out infinite alternate;
            }

            @media (max-width: 640px) {
              .redirect-text {
                font-size: 24px;
              }
            }
          `}
        </style>

        <img
          src="https://www9.0zz0.com/2024/04/06/13/548511907.gif"
          alt="TikTok Logo"
          style={{
            width: "250px",
            maxWidth: "90%",
            marginBottom: "20px",
          }}
        />

        <p className="redirect-text">Being Redirected ...</p>
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