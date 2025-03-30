export const formatDate = (dateString: string, locale: string = "en-US"): string => {
  if (!dateString) return "Invalid date";
  
  try {
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Date Formatting Error:", error);
    return "Invalid date";
  }
};

export const truncateText = (text: string, maxLength: number = 100, useEllipsis: boolean = true): string => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + (useEllipsis ? "..." : "") : text;
};
