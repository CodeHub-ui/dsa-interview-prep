import React from "react";
import { useAppState } from "../context/AppState";
import { readiness, topicProgress, pct } from "../utils/progress";
import ProgressBar from "../components/ProgressBar";

export default function ProgressPage() {
  const { state } = useAppState();
  const r = readiness(state);
  const topics = topicProgress(state);

  return (
    <div>
      <div className="two-col">
        <div className="card">
          <p className="panel-title">Technical Interview Readiness</p>
          <p style={{ color: "var(--muted)", fontSize: 12.5, marginTop: -8 }}>Measurable indicators, not a "job-ready" score.</p>
          <ProgressBar label="DSA Coverage" solved={r.solved} total={r.total} cls="fill-easy" />
          <div className="weak-item"><span>Easy Coverage</span><strong>{r.easyPct}%</strong></div>
          <div className="weak-item"><span>Medium Coverage</span><strong>{r.mediumPct}%</strong></div>
          <div className="weak-item"><span>Hard Coverage</span><strong>{r.hardPct}%</strong></div>
          <div className="weak-item"><span>Topics Completed</span><strong>{r.topicsCompleted} / {r.topicsTotal}</strong></div>
          <div className="weak-item"><span>Mock Rounds Taken</span><strong>{r.mockRounds}</strong></div>
          <div className="weak-item"><span>Revision Coverage</span><strong>{r.revisionCoverage}%</strong></div>
        </div>
        <div className="card">
          <p className="panel-title">Streak &amp; Activity</p>
          <div className="weak-item"><span>Current streak</span><strong>{state.streak} days</strong></div>
          <div className="weak-item"><span>Longest streak</span><strong>{state.longestStreak} days</strong></div>
          <div className="weak-item"><span>Bookmarked</span><strong>{Object.keys(state.bookmarks).length}</strong></div>
          <div className="weak-item"><span>Notes added</span><strong>{Object.values(state.notes).filter(Boolean).length}</strong></div>
        </div>
      </div>

      <div className="card section" style={{ marginTop: 16 }}>
        <p className="panel-title">Topic Progress</p>
        {Object.entries(topics).sort((a, b) => b[1].total - a[1].total).map(([t, v]) => (
          <ProgressBar key={t} label={t} solved={v.solved} total={v.total} cls="fill-easy" />
        ))}
      </div>
    </div>
  );
}
