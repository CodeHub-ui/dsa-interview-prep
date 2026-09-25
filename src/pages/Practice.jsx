import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppState";
import { todaysPractice, smartPracticeMessage, recommendedForWeakTopic } from "../utils/recommendations";
import { statusOf } from "../utils/progress";

export default function Practice() {
  const { state } = useAppState();
  const goal = todaysPractice(state, 5);
  const goalDone = goal.filter((p) => statusOf(state, p.id) === "solved").length;
  const smartMsg = smartPracticeMessage(state);
  const smartPicks = recommendedForWeakTopic(state, 3);

  return (
    <div>
      <div className="card section">
        <p className="panel-title">Today's Practice — {goalDone} / {goal.length} completed</p>
        {goal.map((p) => (
          <div key={p.id} className="weak-item">
            <span>{p.title} <span className={`diff-tag diff-${p.difficulty}`} style={{ marginLeft: 6 }}>{p.difficulty}</span></span>
            <Link className="btn" to={`/problems/${p.id}`}>Open</Link>
          </div>
        ))}
      </div>

      <div className="card section">
        <p className="panel-title">Practice For Me</p>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>{smartMsg}</p>
        {smartPicks.map((p) => (
          <div key={p.id} className="weak-item">
            <span>{p.title}</span>
            <Link className="btn" to={`/problems/${p.id}`}>Open</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
