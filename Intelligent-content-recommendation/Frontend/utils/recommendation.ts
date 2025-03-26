export const calculateSimilarity = (userPreferences: string[], contentTags: string[]) => {
    const commonTags = userPreferences.filter(tag => contentTags.includes(tag));
    return commonTags.length / userPreferences.length;
  };
  
  export const sortByRelevance = (contents: any[], userPreferences: string[]) => {
    return contents.sort((a, b) => 
      calculateSimilarity(userPreferences, b.tags) - calculateSimilarity(userPreferences, a.tags)
    );
  };
  