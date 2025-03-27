export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
    return error.message;
  }

  if (typeof error === "string") {
    console.error("API Error:", error);
    return error;
  }

  console.error("API Error: An unknown error occurred", error);
  return "An unknown error occurred. Please try again later.";
};
