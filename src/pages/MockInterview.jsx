import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PROBLEMS } from "../data/problems";
import { useAppState } from "../context/AppState";

const ROUND_OPTIONS = [
  { minutes: 30, count: 3 },
  { minutes: 45, count: 4 },
  { minutes: 60, count: 5 },
];

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function MockInterview() {
  const { state, addMockRound } = useAppState();
  const [round, setRound] = useState(null);

  const start = (opt) => {
    const easyCount = Math.max(1, Math.round(opt.count * 0.4));
    const mediumCount = opt.count - easyCount;
    const questions = [
      ...pickRandom(PROBLEMS.filter((p) => p.difficulty === "Easy"), easyCount),
      ...pickRandom(PROBLEMS.filter((p) => p.difficulty === "Medium"), mediumCount),
    ];
    setRound({ ...opt, questions, startedAt: Date.now(), finished: false });
  };

  const finish = () => {
    const attempted = round.questions.length;
    const solved = round.questions.filter((q) => state.status[q.id] === "solved").length;
    const timeTaken = Math.round((Date.now() - round.startedAt) / 60000);
    const topics = [...new Set(round.questions.flatMap((q) => q.topic))];
    addMockRound({ date: new Date().toISOString(), duration: round.minutes, attempted, solved, timeTaken, topics });
    setRound({ ...round, finished: true, resultAttempted: attempted, resultSolved: solved, resultTime: timeTaken, resultTopics: topics });
  };

  if (!round) {
    return (
      <div className="card">
        <p className="panel-title">Mock Technical Round</p>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>
          Pick a duration. Questions are drawn from your tracked problem set. This is practice, not a prediction of real interview outcomes.
        </p>
        <div className="action-row">
          {ROUND_OPTIONS.map((o) => (
            <button key={o.minutes} className="btn primary" onClick={() => start(o)}>{o.minutes} min · {o.count} problems</button>
          ))}
        </div>
      </div>
    );
  }

  if (round.finished) {
    return (
      <div className="card">
        <p className="panel-title">Round Complete</p>
        <div className="weak-item"><span>Problems attempted</span><strong>{round.resultAttempted}</strong></div>
        <div className="weak-item"><span>Problems solved</span><strong>{round.resultSolved}</strong></div>
        <div className="weak-item"><span>Time taken</span><strong>{round.resultTime} min</strong></div>
        <div className="weak-item"><span>Topics tested</span><strong>{round.resultTopics.join(", ")}</strong></div>
        <button className="btn" style={{ marginTop: 10 }} onClick={() => setRound(null)}>Start Another Round</button>
      </div>
    );
  }

  return (
    <div className="card">
      <p className="panel-title">{round.minutes}-Minute Round — {round.questions.length} Problems</p>
      {round.questions.map((q) => (
        <div key={q.id} className="weak-item">
          <span>{q.title} <span className={`diff-tag diff-${q.difficulty}`} style={{ marginLeft: 6 }}>{q.difficulty}</span></span>
          <Link className="btn" to={`/problems/${q.id}`}>Open</Link>
        </div>
      ))}
      <button className="btn primary" style={{ marginTop: 12 }} onClick={finish}>Finish Round</button>
    </div>
  );
}
