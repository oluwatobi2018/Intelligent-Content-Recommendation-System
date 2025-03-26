import { useFetch } from "@/hooks/useFetch";

export function useRecommendations() {
  return useFetch("/api/recommend");
}
