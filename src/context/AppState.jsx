import React, { createContext, useContext, useEffect, useState } from "react";
import { loadState, saveState, touchStreak } from "../utils/storage";

const Ctx = createContext(null);

export function AppStateProvider({ children }) {
  const [state, setState] = useState(() => touchStreak(loadState()));

  useEffect(() => {
    saveState(state);
  }, [state]);

  const update = (patch) => setState((prev) => ({ ...prev, ...(typeof patch === "function" ? patch(prev) : patch) }));

  const setStatus = (id, status) => update((prev) => ({
    status: { ...prev.status, [id]: status },
    lastPracticed: status === "solved" ? { ...prev.lastPracticed, [id]: new Date().toISOString() } : prev.lastPracticed,
  }));

  const toggleBookmark = (id, category = "Important") => update((prev) => {
    const next = { ...prev.bookmarks };
    if (next[id]) delete next[id]; else next[id] = category;
    return { bookmarks: next };
  });

  const setNote = (id, text) => update((prev) => ({ notes: { ...prev.notes, [id]: text } }));

  const revealNextHint = (id, maxHints) => update((prev) => {
    const current = prev.revealedHints[id] || 0;
    return { revealedHints: { ...prev.revealedHints, [id]: Math.min(current + 1, maxHints) } };
  });

  const revealSolution = (id) => update((prev) => ({ solutionRevealed: { ...prev.solutionRevealed, [id]: true } }));

  const addMockRound = (round) => update((prev) => ({ mockRounds: [...prev.mockRounds, round] }));

  const setTodayGoal = (goal) => update({ todayGoal: goal });

  const setTheme = (theme) => update({ theme });

  return (
    <Ctx.Provider value={{ state, update, setStatus, toggleBookmark, setNote, revealNextHint, revealSolution, addMockRound, setTodayGoal, setTheme }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
