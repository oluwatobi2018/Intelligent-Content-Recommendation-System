import { Request, Response, NextFunction } from "express";

/**
 * Custom error response class to extend native Error
 */
class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Express error-handling middleware
 */
const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  let { message, statusCode } = err;

  // Default status code to 500 (Internal Server Error)
  statusCode = statusCode || 500;

  // Handle MongoDB duplicate key error (code: 11000)
  if ((err as any).code === 11000) {
    message = "Duplicate field value entered";
    statusCode = 400;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    message = Object.values((err as any).errors)
      .map((val: any) => val.message)
      .join(", ");
    statusCode = 400;
  }

  // Log stack trace only in development mode
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export { ErrorResponse, errorHandler };

