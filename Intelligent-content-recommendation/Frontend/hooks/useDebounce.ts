import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value.
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds (default: 500ms).
 * @returns Debounced value.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), Math.max(0, delay));

    return () => clearTimeout(handler); // Cleanup timeout on re-render
  }, [value, delay]);

  return debouncedValue;
}

