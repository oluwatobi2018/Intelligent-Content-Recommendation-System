import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { ErrorResponse } from "../utils/errorHandler";

interface AuthRequest extends Request {
  user?: any; // Attach decoded user data to request
}

/**
 * Middleware to authenticate users using JWT
 */
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorResponse("Access denied. No token provided.", 401));
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload to request
    next();
  } catch (error) {
    return next(new ErrorResponse("Invalid or expired token", 401));
  }
};

/**
 * Middleware for Role-Based Access Control (RBAC) (Optional)
 */
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorResponse("Access denied. Insufficient permissions.", 403));
    }
    next();
  };
};

