<<<<<<< HEAD
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
=======
import axios from 'axios';

// indexService.ts
// This file will contain service functions for the frontend of the Intelligent Content Recommendation System.


const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend API base URL

/**
 * Fetch recommended content for a user.
 * @param userId - The ID of the user.
 * @returns A promise resolving to the recommended content.
 */
export const fetchRecommendedContent = async (userId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recommendations`, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommended content:', error);
        throw error;
    }
};

/**
 * Fetch all available content.
 * @returns A promise resolving to the list of all content.
 */
export const fetchAllContent = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/content`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all content:', error);
        throw error;
    }
};
>>>>>>> 4f3be8f438087d4780f792d83e9e9ba70ca32614
