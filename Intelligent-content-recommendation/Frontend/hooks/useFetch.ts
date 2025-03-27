import { useState, useEffect } from "react";
import { useState, useEffect, useRef } from "react";

const cache = new Map<string, any>(); // In-memory cache

export function useFetch<T>(url: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    // If cached data exists, use it instead of fetching again
    if (cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      abortController.current = new AbortController();

      try {
        const response = await fetch(url, { signal: abortController.current.signal });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        cache.set(url, result); // Cache the response
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cancel any ongoing fetch request when component unmounts
      abortController.current?.abort();
    };
  }, [url, ...dependencies]); // Re-fetch if URL or dependencies change

  return { data, loading, error, refetch: () => cache.delete(url) };
}
