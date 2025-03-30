import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.example.com";

interface Content {
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
 * Ensures safe access in browser-only environments.
 * @returns {string | null} - Returns the token or null if not found.
 */
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

/**
 * Fetch all content items from the API.
 * @returns {Promise<ApiResponse<Content[]>>} - Returns a list of content items.
 */
export const getAllContent = async (): Promise<ApiResponse<Content[]>> => {
  return await fetchData<ApiResponse<Content[]>>(`${API_BASE_URL}/content`);
};

/**
 * Fetch a single content item by ID.
 * @param {string} id - The content ID.
 * @returns {Promise<ApiResponse<Content>>} - Returns the content details.
 */
export const getContentById = async (id: string): Promise<ApiResponse<Content>> => {
  return await fetchData<ApiResponse<Content>>(`${API_BASE_URL}/content/${id}`);
};

/**
 * Create a new content item.
 * @param {Omit<Content, "id">} data - The content data excluding ID.
 * @returns {Promise<ApiResponse<Content>>} - Returns the created content item.
 */
export const createContent = async (data: Omit<Content, "id">): Promise<ApiResponse<Content>> => {
  return await fetchData<ApiResponse<Content>>(`${API_BASE_URL}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
};

/**
 * Update an existing content item.
 * @param {string} id - The content ID.
 * @param {Partial<Content>} data - The updated content fields.
 * @returns {Promise<ApiResponse<Content>>} - Returns the updated content item.
 */
export const updateContent = async (id: string, data: Partial<Content>): Promise<ApiResponse<Content>> => {
  return await fetchData<ApiResponse<Content>>(`${API_BASE_URL}/content/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
};

/**
 * Delete a content item by ID.
 * @param {string} id - The content ID.
 * @returns {Promise<ApiResponse<{ message: string }>>} - Returns a success message.
 */
export const deleteContent = async (id: string): Promise<ApiResponse<{ message: string }>> => {
  return await fetchData<ApiResponse<{ message: string }>>(`${API_BASE_URL}/content/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
