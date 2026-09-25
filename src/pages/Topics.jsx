import React from "react";
import { Link } from "react-router-dom";
import { TOPICS } from "../data/topics";
import { useAppState } from "../context/AppState";
import { topicProgress, pct } from "../utils/progress";

export default function Topics() {
  const { state } = useAppState();
  const progress = topicProgress(state);

  return (
    <div className="topic-grid">
      {TOPICS.map((t) => {
        const p = progress[t] || { total: 0, solved: 0 };
        return (
          <div className="card topic-card" key={t}>
            <h4>{t}</h4>
            <div className="meta">{p.total} tracked · {p.solved} solved</div>
            <div className="bar-track" style={{ marginBottom: 10 }}>
              <div className="bar-fill" style={{ width: `${pct(p.solved, p.total)}%`, background: "var(--accent)" }} />
            </div>
            <Link className="btn" style={{ width: "100%", display: "block", textAlign: "center" }} to={`/problems?topic=${encodeURIComponent(t)}`}>Practice</Link>
          </div>
        );
      })}
    </div>
  );
}
