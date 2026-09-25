import React from "react";

export default function StatCard({ num, label }) {
  return (
    <div className="card stat">
      <div className="num">{num}</div>
      <div className="label">{label}</div>
    </div>
  );
}
