import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const getAllContent = async () => {
  return await fetchData(`${API_BASE_URL}/content`);
};

export const getContentById = async (id: string) => {
  return await fetchData(`${API_BASE_URL}/content/${id}`);
};

export const createContent = async (data: object) => {
  return await fetchData(`${API_BASE_URL}/content`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateContent = async (id: string, data: object) => {
  return await fetchData(`${API_BASE_URL}/content/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteContent = async (id: string) => {
  return await fetchData(`${API_BASE_URL}/content/${id}`, {
    method: "DELETE",
  });
};
