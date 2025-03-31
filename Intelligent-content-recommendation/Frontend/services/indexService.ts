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
