import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import logger from "../config/logger";

/**
 * Request Logger Middleware
 * Logs method, URL, status, and response time
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const requestId = uuidv4(); // Generate a unique request ID
  const start = Date.now();

  // Attach request ID to response headers for tracking
  res.setHeader("X-Request-ID", requestId);

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`;

    // Log to console in development, to file in production
    if (process.env.NODE_ENV === "development") {
      console.log(logMessage);
    } else {
      logger.info(logMessage);
    }
  });

  next();
};
