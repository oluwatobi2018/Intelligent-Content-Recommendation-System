export async function fetchData<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers as Record<string, string>), // Merge custom headers
        },
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`API Error: ${response.status} - ${response.statusText} | ${errorMessage}`);
      }
  
      return response.json() as Promise<T>;
    } catch (error) {
      console.error("Fetch API Error:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown API error occurred");
    }
  }
  