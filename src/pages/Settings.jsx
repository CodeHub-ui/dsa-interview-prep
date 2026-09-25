import React from "react";
import { useAppState } from "../context/AppState";

export default function Settings() {
  const { state, update } = useAppState();

  const resetProgress = () => {
    if (window.confirm("This clears all solved status, bookmarks and notes on this device. Continue?")) {
      update({ status: {}, bookmarks: {}, notes: {}, attempts: {}, lastPracticed: {}, revealedHints: {}, solutionRevealed: {}, mockRounds: [] });
    }
  };

  return (
    <div className="card">
      <p className="panel-title">Settings</p>
      <div className="weak-item"><span>Current streak</span><strong>{state.streak} days</strong></div>
      <div className="weak-item"><span>Longest streak</span><strong>{state.longestStreak} days</strong></div>
      <p style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 14 }}>
        All progress is stored locally in this browser (localStorage). Clearing your browser data or switching devices will reset it.
      </p>
      <button className="btn" style={{ marginTop: 10, borderColor: "var(--hard)", color: "var(--hard)" }} onClick={resetProgress}>
        Reset all progress
      </button>
    </div>
  );
}
