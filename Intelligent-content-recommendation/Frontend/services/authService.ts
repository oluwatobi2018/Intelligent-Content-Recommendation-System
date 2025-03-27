import { fetchData } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.example.com";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Saves authentication token to local storage.
 * @param {string} token - JWT token received from API.
 */
const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

/**
 * Retrieves authentication token from local storage.
 * @returns {string | null} - Returns the token or null if not found.
 */
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

/**
 * Removes authentication token from local storage.
 */
export const logout = (): void => {
  localStorage.removeItem("token");
};

/**
 * Logs in the user and stores the token.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<AuthResponse | null>} - Returns user data or null on failure.
 */
export const login = async (email: string, password: string): Promise<AuthResponse | null> => {
  try {
    const response = await fetchData<AuthResponse>(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response?.token) {
      saveToken(response.token);
      return response;
    }

    return null;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

/**
 * Registers a new user.
 * @param {string} name - User's full name.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<AuthResponse | null>} - Returns user data or null on failure.
 */
export const register = async (name: string, email: string, password: string): Promise<AuthResponse | null> => {
  try {
    return await fetchData<AuthResponse>(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  } catch (error) {
    console.error("Registration failed:", error);
    return null;
  }
};

/**
 * Fetches the authenticated user's profile.
 * @returns {Promise<AuthResponse["user"] | null>} - Returns user profile or null on failure.
 */
export const getUserProfile = async (): Promise<AuthResponse["user"] | null> => {
  try {
    const token = getToken();
    if (!token) return null;

    return await fetchData<AuthResponse["user"]>(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
