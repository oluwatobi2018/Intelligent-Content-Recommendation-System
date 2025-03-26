export const getFromStorage = (key: string) => {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem(key) || "null");
  };
  
  export const saveToStorage = (key: string, value: unknown) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
  
  export const removeFromStorage = (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };
  