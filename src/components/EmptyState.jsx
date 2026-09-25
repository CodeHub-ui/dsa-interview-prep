import React from "react";
import { Link } from "react-router-dom";

export default function EmptyState({ message, actionLabel, actionTo }) {
  return (
    <div className="card empty">
      <p>{message}</p>
      {actionLabel && actionTo && <Link className="btn primary" to={actionTo}>{actionLabel}</Link>}
    </div>
  );
}
