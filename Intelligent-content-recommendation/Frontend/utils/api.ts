export async function fetchData<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error;
    }
  }
  