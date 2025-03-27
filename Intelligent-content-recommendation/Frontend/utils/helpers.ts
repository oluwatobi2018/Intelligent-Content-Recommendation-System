export const formatDate = (date: string | Date, locale = "en-US"): string => {
    return new Date(date).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  export const capitalizeText = (text: string): string => {
    if (!text) return "";
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  