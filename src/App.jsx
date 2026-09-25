import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./components/ErrorBoundary";
import { AppStateProvider } from "./context/AppState";

import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Topics from "./pages/Topics";
import Companies from "./pages/Companies";
import Roadmap from "./pages/Roadmap";
import Practice from "./pages/Practice";
import MockInterview from "./pages/MockInterview";
import Revision from "./pages/Revision";
import ProgressPage from "./pages/Progress";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";

const TITLES = {
  "/": ["Good Evening 👋", "Prepare for your next technical round."],
  "/problems": ["DSA Sheet", "Read, practice, and track every problem inside the app."],
  "/topics": ["Topics", "Practice topic-wise and track coverage."],
  "/companies": ["Company Preparation", "Filter problems by company tags."],
  "/roadmap": ["Technical Round Roadmap", "Follow a structured path through interview topics."],
  "/practice": ["Practice", "Today's goal and smart recommendations."],
  "/mock-interview": ["Mock Technical Round", "Timed practice rounds. Not a hiring prediction."],
  "/revision": ["Revision Mode", "Catch up on problems that need another look."],
  "/progress": ["Progress", "Your preparation, measured."],
  "/bookmarks": ["Bookmarks", "Problems you saved for later."],
  "/settings": ["Settings", "Manage your local preparation data."],
};

function Shell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [title, subtitle] = TITLES[location.pathname] || ["DSA Interview Prep", ""];

  const onSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    navigate(`/problems${val ? `?q=${encodeURIComponent(val)}` : ""}`);
  };

  return (
    <div className="app">
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="main">
        <div className="topline">
          <div>
            <button className="btn menu-toggle" onClick={() => setDrawerOpen((o) => !o)} aria-label="Open menu">☰ Menu</button>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <div className="searchbox">
            <span>🔍</span>
            <input value={query} onChange={onSearch} placeholder="Search problems, topics, companies…" aria-label="Search" />
          </div>
        </div>

        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/revision" element={<Revision />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <Shell />
    </AppStateProvider>
  );
}
