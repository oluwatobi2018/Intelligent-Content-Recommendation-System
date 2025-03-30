export const getFromStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error);
    return null;
  }
};

export const saveToStorage = (key: string, value: unknown): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to storage (${key}):`, error);
    }
  }
};

export const removeFromStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage (${key}):`, error);
    }
  }
};
