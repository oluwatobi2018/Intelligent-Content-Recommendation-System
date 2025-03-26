import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const getUserPreferences = async (userId: string) => {
  return await fetchData(`${API_BASE_URL}/users/${userId}/preferences`);
};

export const updateUserPreferences = async (userId: string, preferences: string[]) => {
  return await fetchData(`${API_BASE_URL}/users/${userId}/preferences`, {
    method: "PUT",
    body: JSON.stringify({ preferences }),
  });
};

