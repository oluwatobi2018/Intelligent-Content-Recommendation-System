export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {  
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  export const truncateText = (text: string, maxLength = 100): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  