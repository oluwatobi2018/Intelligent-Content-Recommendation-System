import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const getRecommendations = async (userId: string) => {
  return await fetchData(`${API_BASE_URL}/recommendations?userId=${userId}`);
};
