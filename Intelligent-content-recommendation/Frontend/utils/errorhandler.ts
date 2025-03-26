export const handleApiError = (error: unknown) => {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
      return error.message;
    }
    return "An unknown error occurred.";
  };
  