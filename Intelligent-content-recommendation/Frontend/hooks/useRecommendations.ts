import { useFetch } from "@/hooks/useFetch";

export function useRecommendations(userId?: string, params?: Record<string, string>) {
  // Construct query params if provided
  const queryString = params
    ? "?" + new URLSearchParams(params).toString()
    : "";

  const endpoint = userId
    ? `/api/recommend/${userId}${queryString}`
    : `/api/recommend${queryString}`;

  return useFetch(endpoint);
}
