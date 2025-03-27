export const calculateSimilarity = (userPreferences: string[], contentTags: string[]): number => {
  if (!userPreferences.length || !contentTags.length) return 0;
  
  const commonTags = userPreferences.filter(tag => contentTags.includes(tag));
  return commonTags.length / Math.max(userPreferences.length, contentTags.length);
};

export const sortByRelevance = <T extends { tags: string[] }>(contents: T[], userPreferences: string[]): T[] => {
  if (!Array.isArray(contents) || !Array.isArray(userPreferences)) return contents;

  return [...contents].sort(
    (a, b) => calculateSimilarity(userPreferences, b.tags) - calculateSimilarity(userPreferences, a.tags)
  );
};
