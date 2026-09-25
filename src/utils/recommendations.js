import { PROBLEMS } from "../data/problems";
import { weakTopics, statusOf } from "./progress";

// Suggest a small, mixed practice set: a couple of easy warm-ups, a couple of
// medium problems from weak topics, and one revision-due problem if any exist.
export function todaysPractice(state, count = 5) {
  const weak = weakTopics(state, 3).map((w) => w.topic);
  const unsolved = PROBLEMS.filter((p) => statusOf(state, p.id) !== "solved");

  const pick = (pred, n) => unsolved.filter(pred).slice(0, n);

  const revision = PROBLEMS.filter((p) => statusOf(state, p.id) === "revision").slice(0, 1);
  const easyPicks = pick((p) => p.difficulty === "Easy", 2);
  const weakMedium = pick((p) => p.difficulty !== "Easy" && p.topic.some((t) => weak.includes(t)), 2);
  const fallback = pick((p) => p.difficulty === "Medium", 5);

  const combined = [...revision, ...easyPicks, ...weakMedium];
  const ids = new Set(combined.map((p) => p.id));
  for (const p of fallback) {
    if (combined.length >= count) break;
    if (!ids.has(p.id)) { combined.push(p); ids.add(p.id); }
  }
  return combined.slice(0, count);
}

// A short natural-language nudge based on the weakest topic right now.
export function smartPracticeMessage(state) {
  const weak = weakTopics(state, 1)[0];
  if (!weak) return "Solve a few problems to unlock a personalized recommendation.";
  return `You've solved only ${weak.pct}% of ${weak.topic} problems. Here are a few ${weak.topic} problems to focus on today.`;
}

export function recommendedForWeakTopic(state, limit = 3) {
  const weak = weakTopics(state, 1)[0];
  if (!weak) return [];
  return PROBLEMS.filter((p) => p.topic.includes(weak.topic) && statusOf(state, p.id) !== "solved").slice(0, limit);
}

// Problems that are bookmarked, marked for revision, or solved 14+ days ago.
export function revisionQueue(state) {
  const now = Date.now();
  return PROBLEMS.filter((p) => {
    const status = statusOf(state, p.id);
    if (status === "revision") return true;
    if (state.bookmarks[p.id]) return true;
    const last = state.lastPracticed[p.id];
    if (status === "solved" && last) {
      const days = (now - new Date(last).getTime()) / 86400000;
      if (days >= 14) return true;
    }
    return false;
  });
}
