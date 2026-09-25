import React from "react";

export default function ProgressBar({ label, solved, total, cls = "" }) {
  const percent = total ? Math.round((solved / total) * 100) : 0;
  return (
    <div className="bar-row">
      <div className="bar-label"><span>{label}</span><span>{solved} / {total}</span></div>
      <div className="bar-track"><div className={`bar-fill ${cls}`} style={{ width: `${percent}%` }} /></div>
    </div>
  );
}
