import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/errorHandler";

export const errorMiddleware = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  });
};
