import React from "react";
import { Link } from "react-router-dom";
import { ROADMAP } from "../data/roadmap";
import { TOPICS } from "../data/topics";
import { useAppState } from "../context/AppState";
import { topicProgress, pct } from "../utils/progress";

// Rough mapping of roadmap stages to the topics they draw questions from.
const STAGE_TOPICS = {
  "Programming Fundamentals": [],
  "Arrays & Strings": ["Arrays", "Strings"],
  "Hashing": ["Hashing"],
  "Searching & Sorting": ["Binary Search"],
  "Linked List": ["Linked List"],
  "Stack & Queue": ["Stack", "Queue"],
  "Recursion & Backtracking": ["Recursion", "Backtracking"],
  "Trees & BST": ["Trees", "BST"],
  "Heap": ["Heap"],
  "Graphs": ["Graph"],
  "Greedy": ["Greedy"],
  "Dynamic Programming": ["Dynamic Programming"],
  "Advanced Patterns": ["Trie", "Bit Manipulation", "Intervals"],
  "Mock Technical Round": [],
};

export default function Roadmap() {
  const { state } = useAppState();
  const progress = topicProgress(state);

  return (
    <div className="card">
      {ROADMAP.map((stage) => {
        const topics = STAGE_TOPICS[stage] || [];
        const total = topics.reduce((sum, t) => sum + (progress[t]?.total || 0), 0);
        const solved = topics.reduce((sum, t) => sum + (progress[t]?.solved || 0), 0);
        const percent = pct(solved, total);
        return (
          <div key={stage} style={{ padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <strong>{stage}</strong>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{solved} / {total || "—"} · {percent}%</span>
            </div>
            <div className="bar-track" style={{ marginBottom: 8 }}>
              <div className="bar-fill" style={{ width: `${percent}%`, background: "var(--accent)" }} />
            </div>
            {topics.length > 0 && (
              <Link className="btn" to={`/problems?topic=${encodeURIComponent(topics[0])}`}>Start / Continue</Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
