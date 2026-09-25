import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PROBLEMS } from "../data/problems";
import { useAppState } from "../context/AppState";
import { statusOf } from "../utils/progress";

const LANGS = ["Java"]; // primary language; extend here if more solutions are added later.

export default function ProblemDetail() {
  const { id } = useParams();
  const problem = PROBLEMS.find((p) => p.id === Number(id));
  const { state, setStatus, toggleBookmark, setNote, revealNextHint, revealSolution } = useAppState();
  const [lang, setLang] = useState("Java");

  if (!problem) {
    return (
      <div className="card empty">
        <p>We couldn't find that problem.</p>
        <Link className="btn primary" to="/problems">Back to DSA Sheet</Link>
      </div>
    );
  }

  const status = statusOf(state, problem.id);
  const hintsRevealed = state.revealedHints[problem.id] || 0;
  const solutionShown = !!state.solutionRevealed[problem.id];
  const noteValue = state.notes[problem.id] || "";

  return (
    <div>
      <div className="detail-box">
        <h3 style={{ fontSize: 19 }}>{problem.title}</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <span className={`diff-tag diff-${problem.difficulty}`}>{problem.difficulty}</span>
          {problem.topic.map((t) => <span key={t} className="tag-pill">{t}</span>)}
          <span className="badge core">{problem.sourceType}</span>
          {problem.companies.map((c) => <span key={c} className="tag-pill">{c}</span>)}
        </div>

        <h3>Problem Statement</h3>
        <p>{problem.problemStatement}</p>

        <h3>Examples</h3>
        {problem.examples.map((ex, i) => (
          <div className="example-box" key={i}>
            <strong>Example {i + 1}</strong><br />
            Input: {ex.input}<br />
            Output: {ex.output}<br />
            {ex.explanation && <>Explanation: {ex.explanation}</>}
          </div>
        ))}

        <h3>Constraints</h3>
        <ul>{problem.constraints.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </div>

      <div className="detail-box">
        <h3>Hints</h3>
        <p style={{ color: "var(--muted)", fontSize: 12.5 }}>Reveal hints one at a time — try thinking it through first.</p>
        {problem.hints.slice(0, hintsRevealed).map((h, i) => (
          <div key={i} className="example-box"><strong>Hint {i + 1}</strong><br />{h}</div>
        ))}
        {hintsRevealed < problem.hints.length && (
          <button className="btn" onClick={() => revealNextHint(problem.id, problem.hints.length)}>
            Reveal Hint {hintsRevealed + 1}
          </button>
        )}
      </div>

      <div className="detail-box">
        <h3>Expected Pattern</h3>
        <p><span className="badge">{problem.pattern}</span></p>
        <h3 style={{ marginTop: 14 }}>Approach</h3>
        <p>{problem.approach}</p>
        <h3 style={{ marginTop: 14 }}>Complexity</h3>
        <p>Time: <strong>{problem.timeComplexity}</strong> &nbsp;·&nbsp; Space: <strong>{problem.spaceComplexity}</strong></p>
      </div>

      <div className="detail-box">
        <h3>Solution</h3>
        {!solutionShown ? (
          <button className="btn primary" onClick={() => revealSolution(problem.id)}>Show Solution</button>
        ) : (
          <>
            <div className="tab-row">
              {LANGS.map((l) => (
                <button key={l} className={`tab-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>{l}</button>
              ))}
            </div>
            <pre>{problem.javaSolution}</pre>
          </>
        )}
      </div>

      <div className="detail-box">
        <h3>Status &amp; Notes</h3>
        <div className="action-row">
          {["unsolved", "attempted", "solved", "revision"].map((s) => (
            <button key={s} className={`btn ${status === s ? "primary" : ""}`} onClick={() => setStatus(problem.id, s)}>
              {s === "unsolved" ? "Mark Unsolved" : s === "attempted" ? "Mark Attempted" : s === "solved" ? "Mark Solved" : "Needs Revision"}
            </button>
          ))}
          <button className={`btn ${state.bookmarks[problem.id] ? "primary" : ""}`} onClick={() => toggleBookmark(problem.id)}>
            {state.bookmarks[problem.id] ? "★ Bookmarked" : "☆ Bookmark"}
          </button>
          <a className="btn" href={problem.sourceUrl} target="_blank" rel="noopener noreferrer">Open Original Source</a>
        </div>
        <textarea
          placeholder="Add a personal note… e.g. Remember: use sliding window."
          defaultValue={noteValue}
          onBlur={(e) => setNote(problem.id, e.target.value)}
        />
      </div>
    </div>
  );
}
