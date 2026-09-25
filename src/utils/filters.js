export const DEFAULT_FILTERS = {
  q: "", difficulty: "All", topic: "All", platform: "All",
  status: "All", company: "All", sourceType: "All",
};

export function applyFilters(problems, filters, state) {
  const q = filters.q.trim().toLowerCase();
  return problems.filter((p) => {
    if (q) {
      const haystack = [p.title, ...p.topic, p.pattern, ...p.companies, p.difficulty].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.difficulty !== "All" && p.difficulty !== filters.difficulty) return false;
    if (filters.topic !== "All" && !p.topic.includes(filters.topic)) return false;
    if (filters.platform !== "All" && p.sourcePlatform !== filters.platform) return false;
    if (filters.company !== "All" && !p.companies.includes(filters.company)) return false;
    if (filters.sourceType !== "All" && p.sourceType !== filters.sourceType) return false;
    if (filters.status !== "All") {
      const st = state.status[p.id] || "unsolved";
      if (filters.status.toLowerCase() !== st) return false;
    }
    return true;
  });
}
