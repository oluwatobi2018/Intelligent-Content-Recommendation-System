import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const trackContentView = async (userId: string, contentId: string) => {
  return await fetchData(`${API_BASE_URL}/analytics/view`, {
    method: "POST",
    body: JSON.stringify({ userId, contentId }),
  });
};

export const getAnalytics = async () => {
  return await fetchData(`${API_BASE_URL}/analytics`);
};
