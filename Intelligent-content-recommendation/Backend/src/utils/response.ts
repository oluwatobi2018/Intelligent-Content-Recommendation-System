interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string; // Optional error code for better debugging
}

/**
 * Generates a success response.
 * @param message - Descriptive success message.
 * @param data - Optional response data.
 * @returns Formatted API response object.
 */
export const successResponse = <T>(message: string, data?: T): ApiResponse<T> => {
  return { success: true, message, data };
};

/**
 * Generates an error response.
 * @param message - Descriptive error message.
 * @param errorCode - Optional error code for categorization.
 * @returns Formatted API error response.
 */
export const errorResponse = (message: string, errorCode?: string): ApiResponse => {
  return { success: false, message, errorCode };
};
