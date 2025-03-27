import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Lazy initialization to prevent unnecessary re-renders
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error accessing localStorage for key "${key}":`, error);
      return initialValue;
    }
  });

  // Function to update localStorage
  const setValue = useCallback(
    (value: T | ((prevValue: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        setStoredValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Error setting localStorage for key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Function to remove the item from localStorage
  const removeItem = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage for key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sync state across browser tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return { storedValue, setValue, removeItem };
}
