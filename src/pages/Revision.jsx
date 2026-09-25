import React from "react";
import { useAppState } from "../context/AppState";
import { revisionQueue } from "../utils/recommendations";
import ProblemTable from "../components/ProblemTable";
import EmptyState from "../components/EmptyState";

export default function Revision() {
  const { state } = useAppState();
  const due = revisionQueue(state);

  if (!due.length) {
    return <EmptyState message="You're all caught up. Nothing needs revision right now." />;
  }

  return (
    <div>
      <div className="card" style={{ marginBottom: 14 }}>
        <p className="panel-title" style={{ marginBottom: 0 }}>{due.length} question{due.length !== 1 ? "s are" : " is"} due for revision.</p>
      </div>
      <ProblemTable problems={due} />
    </div>
  );
}
