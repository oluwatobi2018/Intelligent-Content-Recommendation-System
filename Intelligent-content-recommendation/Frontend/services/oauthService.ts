<<<<<<< HEAD
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
=======
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export interface OAuthTokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export const getOAuthToken = async (code: string): Promise<OAuthTokenResponse> => {
    try {
        const response = await axios.post<OAuthTokenResponse>(`${BASE_URL}/oauth/token`, {
            code,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching OAuth token:', error);
        throw error;
    }
};

export const refreshOAuthToken = async (refreshToken: string): Promise<OAuthTokenResponse> => {
    try {
        const response = await axios.post<OAuthTokenResponse>(`${BASE_URL}/oauth/refresh`, {
            refreshToken,
        });
        return response.data;
    } catch (error) {
        console.error('Error refreshing OAuth token:', error);
        throw error;
    }
};
>>>>>>> 4f3be8f438087d4780f792d83e9e9ba70ca32614
