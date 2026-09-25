const KEY = "dsa_prep_state_v1";

const DEFAULT_STATE = {
  status: {},       // id -> "unsolved" | "attempted" | "solved" | "revision"
  bookmarks: {},     // id -> category string ("Important"|"Difficult"|"Revision"|"Interview")
  notes: {},          // id -> string
  attempts: {},        // id -> number
  lastPracticed: {},    // id -> ISO date string
  revealedHints: {},     // id -> number of hints revealed
  solutionRevealed: {},   // id -> boolean
  streak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  mockRounds: [],           // list of {date, duration, total, attempted, solved, topics}
  theme: null,
  todayGoal: { date: null, ids: [], completed: [] }
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (e) {
    console.error("Failed to load state, resetting.", e);
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
}

// Call once per app session to update streak based on today's date.
export function touchStreak(state) {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastActiveDate === today) return state;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let streak = state.lastActiveDate === yesterday ? state.streak + 1 : 1;
  const longestStreak = Math.max(state.longestStreak || 0, streak);
  const next = { ...state, streak, longestStreak, lastActiveDate: today };
  saveState(next);
  return next;
}
