import { useState, useEffect, useRef } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip debounce effect on first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const handler = setTimeout(() => setDebouncedValue(value), Math.max(0, delay));

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
