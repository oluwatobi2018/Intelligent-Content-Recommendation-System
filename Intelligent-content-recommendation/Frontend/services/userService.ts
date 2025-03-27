import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.example.com";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface UserPreferences {
  preferences: string[];
}

/**
 * Retrieves authentication token from local storage.
 * @returns {string | null} - Returns the token or null if not found.
 */
const getToken = (): string | null => localStorage.getItem("token");

/**
 * Fetches user preferences.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<ApiResponse<UserPreferences>>} - Returns user preferences.
 */
export const getUserPreferences = async (userId: string): Promise<ApiResponse<UserPreferences>> => {
  try {
    return await fetchData<ApiResponse<UserPreferences>>(`${API_BASE_URL}/users/${userId}/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    throw new Error("Failed to fetch user preferences.");
  }
};

/**
 * Updates user preferences.
 * @param {string} userId - The ID of the user.
 * @param {string[]} preferences - The updated preferences.
 * @returns {Promise<ApiResponse<UserPreferences>>} - Returns updated preferences.
 */
export const updateUserPreferences = async (userId: string, preferences: string[]): Promise<ApiResponse<UserPreferences>> => {
  try {
    return await fetchData<ApiResponse<UserPreferences>>(`${API_BASE_URL}/users/${userId}/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ preferences }),
    });
  } catch (error) {
    console.error("Error updating user preferences:", error);
    throw new Error("Failed to update user preferences.");
  }
};
