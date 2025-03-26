interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
  }
  
  export const successResponse = (message: string, data?: any): ApiResponse => {
    return { success: true, message, data };
  };
  
  export const errorResponse = (message: string): ApiResponse => {
    return { success: false, message };
  };
  