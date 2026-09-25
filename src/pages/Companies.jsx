import React from "react";
import { Link } from "react-router-dom";
import { COMPANIES } from "../data/companies";
import { useAppState } from "../context/AppState";
import { companyProgress } from "../utils/progress";

export default function Companies() {
  const { state } = useAppState();

  return (
    <div>
      <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 14 }}>
        Company tags reflect publicly available interview reports and tagging where available.
        This does not confirm that any specific problem was asked in a specific interview — see the Content Attribution note in the README.
      </p>
      <div className="company-grid">
        {COMPANIES.map((c) => {
          const p = companyProgress(state, c);
          return (
            <div className="card company-card" key={c}>
              <h4>{c}</h4>
              <div className="meta">{p.total} tagged problems</div>
              <div className="meta">Reported: {p.verified} · Company Tagged: {p.tagged}</div>
              <Link className="btn" style={{ width: "100%", display: "block", textAlign: "center", marginTop: 8 }} to={`/problems?company=${encodeURIComponent(c)}`}>View Problems</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
