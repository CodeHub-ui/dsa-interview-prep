import { PROBLEMS } from "../data/problems";

export function pct(a, b) {
  return b ? Math.round((a / b) * 100) : 0;
}

export function isSolved(state, id) {
  return state.status[id] === "solved";
}

export function statusOf(state, id) {
  return state.status[id] || "unsolved";
}

export function solvedCount(state, list = PROBLEMS) {
  return list.filter((p) => isSolved(state, p.id)).length;
}

export function countByDifficulty(state, difficulty) {
  const list = PROBLEMS.filter((p) => p.difficulty === difficulty);
  return { total: list.length, solved: solvedCount(state, list) };
}

export function topicProgress(state) {
  const map = {};
  PROBLEMS.forEach((p) => {
    p.topic.forEach((t) => {
      map[t] = map[t] || { total: 0, solved: 0 };
      map[t].total += 1;
      if (isSolved(state, p.id)) map[t].solved += 1;
    });
  });
  return map;
}

// Topics with the lowest completion percentage (and at least a few questions).
export function weakTopics(state, limit = 3) {
  const map = topicProgress(state);
  return Object.entries(map)
    .filter(([, v]) => v.total >= 3)
    .map(([topic, v]) => ({ topic, total: v.total, solved: v.solved, pct: pct(v.solved, v.total) }))
    .sort((a, b) => a.pct - b.pct)
    .slice(0, limit);
}

export function companyProgress(state, company) {
  const list = PROBLEMS.filter((p) => p.companies.includes(company));
  const verified = list.filter((p) => p.sourceType === "Reported in Interview" || p.sourceType === "Candidate Reported").length;
  return { total: list.length, solved: solvedCount(state, list), verified, tagged: list.length - verified };
}

export function readiness(state) {
  const total = PROBLEMS.length;
  const solved = solvedCount(state);
  const easy = countByDifficulty(state, "Easy");
  const medium = countByDifficulty(state, "Medium");
  const hard = countByDifficulty(state, "Hard");
  const topics = topicProgress(state);
  const topicsCompleted = Object.values(topics).filter((t) => t.total > 0 && t.solved === t.total).length;
  const revisionDue = PROBLEMS.filter((p) => statusOf(state, p.id) === "revision").length;
  const revisionCoverage = pct(solved - revisionDue < 0 ? 0 : solved - revisionDue, solved || 1);
  return {
    total, solved,
    dsaCoverage: pct(solved, total),
    easyPct: pct(easy.solved, easy.total),
    mediumPct: pct(medium.solved, medium.total),
    hardPct: pct(hard.solved, hard.total),
    topicsCompleted, topicsTotal: Object.keys(topics).length,
    mockRounds: state.mockRounds.length,
    revisionCoverage,
  };
}
