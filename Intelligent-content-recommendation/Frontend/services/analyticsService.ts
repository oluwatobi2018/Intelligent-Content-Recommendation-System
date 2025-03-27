import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.example.com";

interface ContentViewPayload {
  userId: string;
  contentId: string;
}

interface AnalyticsResponse {
  views: number;
  clicks: number;
  engagementRate: number;
}

/**
 * Tracks when a user views a specific content.
 * @param {ContentViewPayload} payload - Object containing user and content IDs.
 * @returns {Promise<boolean>} - Returns true if successful, false otherwise.
 */
export const trackContentView = async (payload: ContentViewPayload): Promise<boolean> => {
  try {
    const response = await fetchData(`${API_BASE_URL}/analytics/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response?.success ?? false;
  } catch (error) {
    console.error("Error tracking content view:", error);
    return false;
  }
};

/**
 * Fetches analytics data.
 * @returns {Promise<AnalyticsResponse | null>} - Analytics data or null on failure.
 */
export const getAnalytics = async (): Promise<AnalyticsResponse | null> => {
  try {
    return await fetchData(`${API_BASE_URL}/analytics`);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
};
