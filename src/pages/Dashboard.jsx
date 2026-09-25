import React from "react";
import { Link } from "react-router-dom";
import { PROBLEMS } from "../data/problems";
import { ROADMAP } from "../data/roadmap";
import { useAppState } from "../context/AppState";
import { countByDifficulty, solvedCount, weakTopics } from "../utils/progress";
import { todaysPractice } from "../utils/recommendations";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard() {
  const { state } = useAppState();
  const total = PROBLEMS.length;
  const solved = solvedCount(state);
  const attempted = PROBLEMS.filter((p) => state.status[p.id] === "attempted").length;
  const revision = PROBLEMS.filter((p) => state.status[p.id] === "revision").length;
  const easy = countByDifficulty(state, "Easy");
  const medium = countByDifficulty(state, "Medium");
  const hard = countByDifficulty(state, "Hard");
  const weak = weakTopics(state, 3);
  const goal = todaysPractice(state, 5);
  const goalDone = goal.filter((p) => state.status[p.id] === "solved").length;

  return (
    <div>
      <div className="grid-stats">
        <StatCard num={total} label="Problems available" />
        <StatCard num={solved} label="Problems solved" />
        <StatCard num={attempted} label="Attempted" />
        <StatCard num={revision} label="Revision required" />
        <StatCard num={`${state.streak} 🔥`} label="Current streak" />
        <StatCard num={`${goalDone} / ${goal.length}`} label="Today's goal" />
      </div>

      <div className="section card">
        <p className="panel-title">Difficulty Progress</p>
        <ProgressBar label="Easy" solved={easy.solved} total={easy.total} cls="fill-easy" />
        <ProgressBar label="Medium" solved={medium.solved} total={medium.total} cls="fill-medium" />
        <ProgressBar label="Hard" solved={hard.solved} total={hard.total} cls="fill-hard" />
      </div>

      <div className="two-col">
        <div className="card">
          <p className="panel-title">Today's Practice</p>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: -6 }}>{goalDone} / {goal.length} completed</p>
          {goal.map((p) => (
            <div key={p.id} className="weak-item">
              <span>{p.title} <span className={`diff-tag diff-${p.difficulty}`} style={{ marginLeft: 6 }}>{p.difficulty}</span></span>
              <Link className="btn" to={`/problems/${p.id}`}>Open</Link>
            </div>
          ))}
          <div style={{ marginTop: 12 }}><Link className="btn primary" to="/practice">Start Today's Practice</Link></div>
        </div>
        <div className="card">
          <p className="panel-title">Your Weak Areas</p>
          {weak.length ? weak.map((w) => (
            <div key={w.topic} className="weak-item">
              <span>{w.topic} — {w.pct}%</span>
              <Link className="btn" to={`/problems?topic=${encodeURIComponent(w.topic)}`}>Practice</Link>
            </div>
          )) : <p style={{ color: "var(--muted)", fontSize: 13 }}>Solve a few problems to see weak topics.</p>}
        </div>
      </div>

      <div className="section card" style={{ marginTop: 16 }}>
        <p className="panel-title">Technical Round Roadmap</p>
        {ROADMAP.slice(0, 6).map((r, i) => (
          <div className="road-step" key={r}>
            <div className={`road-dot ${i < 2 ? "done" : i === 2 ? "active" : ""}`}>{i < 2 ? "✓" : i + 1}</div>
            <div className="road-name">{r}</div>
            <div className="road-pct">{i < 2 ? "100%" : i === 2 ? "In progress" : "Not started"}</div>
          </div>
        ))}
        <div style={{ marginTop: 10 }}><Link className="btn" to="/roadmap">View full roadmap</Link></div>
      </div>
    </div>
  );
}
