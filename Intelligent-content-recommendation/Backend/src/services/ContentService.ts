import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const getAllContent = () => fetchData(`${API_BASE_URL}/content`);

export const getContentById = (id: string) => fetchData(`${API_BASE_URL}/content/${id}`);

const makeRequest = (id: string, method: "POST" | "PUT" | "DELETE", data?: object) =>
  fetchData(`${API_BASE_URL}/content${id ? `/${id}` : ""}`, {
    method,
    ...(data && { body: JSON.stringify(data) }),
  });

export const createContent = (data: object) => makeRequest("", "POST", data);

export const updateContent = (id: string, data: object) => makeRequest(id, "PUT", data);

export const deleteContent = (id: string) => makeRequest(id, "DELETE");

