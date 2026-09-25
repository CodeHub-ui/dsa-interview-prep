import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppState";
import { statusOf } from "../utils/progress";
import EmptyState from "./EmptyState";

export default function ProblemTable({ problems }) {
  const { state, setStatus, toggleBookmark } = useAppState();

  if (!problems.length) {
    return <EmptyState message="No problems match these filters." actionLabel="Reset filters" actionTo="/problems" />;
  }

  return (
    <div className="tbl-wrap">
      <table>
        <thead>
          <tr><th></th><th>Problem</th><th>Topic</th><th>Difficulty</th><th>Company</th><th>Source</th><th>Action</th></tr>
        </thead>
        <tbody>
          {problems.map((p) => {
            const status = statusOf(state, p.id);
            return (
              <tr key={p.id}>
                <td><span className={`status-dot ${status}`}></span></td>
                <td><Link to={`/problems/${p.id}`}>{p.title}</Link></td>
                <td>{p.topic.join(" / ")}</td>
                <td><span className={`diff-tag diff-${p.difficulty}`}>{p.difficulty}</span></td>
                <td>{p.companies.slice(0, 2).map((c) => <span key={c} className="tag-pill">{c}</span>)}</td>
                <td><span className="badge">{p.sourceType}</span></td>
                <td>
                  <Link className="icon-btn" to={`/problems/${p.id}`} title="View">👁</Link>
                  <button className={`icon-btn ${status === "solved" ? "on" : ""}`} title="Mark solved" onClick={() => setStatus(p.id, status === "solved" ? "unsolved" : "solved")}>✓</button>
                  <button className={`icon-btn ${state.bookmarks[p.id] ? "on" : ""}`} title="Bookmark" onClick={() => toggleBookmark(p.id)}>★</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
