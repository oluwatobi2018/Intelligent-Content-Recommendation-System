export async function fetchData<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const token = localStorage.getItem("token"); // Get auth token if available

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Attach token if available
      },
      ...options,
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => null);
      const errorMessage = errorResponse?.message || response.statusText;
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}
