import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/errorHandler";
import logger from "../config/logger"; // Import logger for better debugging

/**
 * Centralized Error Handling Middleware
 */
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Syntax Errors (e.g., malformed JSON request)
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    statusCode = 400;
    message = "Invalid JSON payload";
  }

  // Log the error (only in development)
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  } else {
    logger.error(`[${req.method}] ${req.url} - ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
