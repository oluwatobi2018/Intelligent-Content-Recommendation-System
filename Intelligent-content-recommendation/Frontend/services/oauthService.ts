import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.example.com";

/**
 * Redirects user to Google OAuth authentication page.
 */
export const loginWithGoogle = () => {
  window.location.href = `${API_BASE_URL}/auth/google`;
};

/**
 * Exchanges authorization code for an access token.
 * @param {string} code - The authorization code from Google.
 * @returns {Promise<string>} - The access token.
 */
export const exchangeCodeForToken = async (code: string): Promise<string> => {
  const response = await fetchData<{ accessToken: string }>(`${API_BASE_URL}/auth/google/callback?code=${code}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return response.accessToken;
};

/**
 * Retrieves the authenticated user profile from the backend.
 * @param {string} token - The OAuth access token.
 * @returns {Promise<any>} - The user profile.
 */
export const getUserProfile = async (token: string): Promise<any> => {
  return await fetchData(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
