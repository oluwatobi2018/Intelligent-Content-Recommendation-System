import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responseHandler"; // Ensure you have a consistent response structure

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(
      errorResponse("Validation failed", "VALIDATION_ERROR", errors.array())
    );
  }

  next();
};

