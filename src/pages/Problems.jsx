import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PROBLEMS } from "../data/problems";
import { TOPICS } from "../data/topics";
import { COMPANIES } from "../data/companies";
import { applyFilters, DEFAULT_FILTERS } from "../utils/filters";
import { useAppState } from "../context/AppState";
import ProblemTable from "../components/ProblemTable";

const PLATFORMS = ["LeetCode", "GeeksforGeeks", "Codeforces", "HackerRank"];
const SOURCE_TYPES = ["Core Interview Problem", "Reported in Interview", "Interview Pattern", "Candidate Reported"];

export default function Problems() {
  const [params] = useSearchParams();
  const { state } = useAppState();
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    topic: params.get("topic") || "All",
    company: params.get("company") || "All",
    q: params.get("q") || "",
  });

  React.useEffect(() => {
    const q = params.get("q");
    if (q !== null) setFilters((f) => ({ ...f, q }));
  }, [params]);
  const [statusChip, setStatusChip] = useState("All");

  const list = useMemo(
    () => applyFilters(PROBLEMS, { ...filters, status: statusChip }, state),
    [filters, statusChip, state]
  );

  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <div>
      <div className="chip-row">
        {["All", "Solved", "Unsolved", "Attempted", "Revision"].map((s) => (
          <span key={s} className={`chip ${statusChip === s ? "active" : ""}`} onClick={() => setStatusChip(s)}>{s}</span>
        ))}
      </div>
      <div className="filters">
        <select value={filters.difficulty} onChange={(e) => set({ difficulty: e.target.value })}>
          <option value="All">All difficulties</option>
          <option>Easy</option><option>Medium</option><option>Hard</option>
        </select>
        <select value={filters.topic} onChange={(e) => set({ topic: e.target.value })}>
          <option value="All">All topics</option>
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={filters.platform} onChange={(e) => set({ platform: e.target.value })}>
          <option value="All">All platforms</option>
          {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={filters.company} onChange={(e) => set({ company: e.target.value })}>
          <option value="All">All companies</option>
          {COMPANIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={filters.sourceType} onChange={(e) => set({ sourceType: e.target.value })}>
          <option value="All">All source types</option>
          {SOURCE_TYPES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <ProblemTable problems={list} />
    </div>
  );
}
