import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { ErrorResponse } from "../utils/errorHandler";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return next(new ErrorResponse("Access denied. No token provided.", 401));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ErrorResponse("Invalid or expired token", 401));
  }
};
