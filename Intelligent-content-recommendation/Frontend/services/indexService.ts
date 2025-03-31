import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.example.com";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Fetches general app settings or metadata.
 * @returns {Promise<ApiResponse<any>>} - Returns app-wide settings.
 */
export const getAppSettings = async (): Promise<ApiResponse<any>> => {
  return await fetchData<ApiResponse<any>>(`${API_BASE_URL}/settings`);
};

/**
 * Checks server health status.
 * @returns {Promise<ApiResponse<{ status: string }>>} - Returns server health status.
 */
export const checkServerHealth = async (): Promise<ApiResponse<{ status: string }>> => {
  return await fetchData<ApiResponse<{ status: string }>>(`${API_BASE_URL}/health`);
};

/**
 * Fetches user details from the backend.
 * @param {string} token - The JWT or OAuth access token.
 * @returns {Promise<ApiResponse<any>>} - Returns authenticated user data.
 */
export const getUserDetails = async (token: string): Promise<ApiResponse<any>> => {
  return await fetchData<ApiResponse<any>>(`${API_BASE_URL}/user/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
