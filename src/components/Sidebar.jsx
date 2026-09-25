import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppState } from "../context/AppState";

const LINKS = [
  { to: "/", label: "📊 Dashboard", end: true },
  { to: "/problems", label: "📄 DSA Sheet" },
  { to: "/topics", label: "🧩 Topics" },
  { to: "/companies", label: "🏢 Companies" },
  { to: "/roadmap", label: "🗺️ Interview Roadmap" },
  { to: "/practice", label: "🎯 Practice" },
  { to: "/mock-interview", label: "🕒 Mock Interview" },
  { to: "/revision", label: "🔁 Revision" },
  { to: "/progress", label: "📈 Progress" },
  { to: "/bookmarks", label: "🔖 Bookmarks" },
  { to: "/settings", label: "⚙️ Settings" },
];

export default function Sidebar({ open, onClose }) {
  const { state, setTheme } = useAppState();

  useEffect(() => {
    const effective = state.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", state.theme || effective);
  }, [state.theme]);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(current === "dark" ? "light" : "dark");
  };

  return (
    <nav className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <h1>DSA Interview Prep</h1>
        <p>Master DSA. Track your progress. Prepare for technical rounds.</p>
      </div>
      <div className="nav">
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} onClick={onClose} className={({ isActive }) => (isActive ? "active" : "")}>
            {l.label}
          </NavLink>
        ))}
      </div>
      <div className="sidebar-foot">
        <div className="streak-pill"><span>🔥 Streak</span><strong>{state.streak} days</strong></div>
        <button className="theme-btn" onClick={toggleTheme}>Toggle theme</button>
      </div>
    </nav>
  );
}
