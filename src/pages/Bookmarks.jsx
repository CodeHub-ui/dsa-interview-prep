import React from "react";
import { PROBLEMS } from "../data/problems";
import { useAppState } from "../context/AppState";
import ProblemTable from "../components/ProblemTable";
import EmptyState from "../components/EmptyState";

export default function Bookmarks() {
  const { state } = useAppState();
  const list = PROBLEMS.filter((p) => state.bookmarks[p.id]);

  if (!list.length) {
    return <EmptyState message="You haven't bookmarked any problems yet." actionLabel="Explore Problems" actionTo="/problems" />;
  }
  return <ProblemTable problems={list} />;
}
