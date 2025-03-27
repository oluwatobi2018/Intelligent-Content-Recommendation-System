import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.example.com";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Retrieves authentication token from local storage.
 * @returns {string | null} - Returns the token or null if not found.
 */
const getToken = (): string | null => localStorage.getItem("token");

/**
 * Fetches personalized content recommendations for a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<ApiResponse<Recommendation[]>>} - Returns an array of recommended content.
 */
export const getRecommendations = async (userId: string): Promise<ApiResponse<Recommendation[]>> => {
  try {
    return await fetchData<ApiResponse<Recommendation[]>>(`${API_BASE_URL}/recommendations?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw new Error("Failed to fetch recommendations.");
  }
};
