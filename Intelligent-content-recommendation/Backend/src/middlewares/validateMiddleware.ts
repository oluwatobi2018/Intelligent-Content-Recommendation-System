import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

/**
 * Middleware to handle request validation errors.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
      value: err.value,
    }));

    logger.warn("Validation Error:", { errors: formattedErrors });

    return res.status(400).json({
      success: false,
      message: "Validation failed. Please check the input fields.",
      errors: formattedErrors,
    });
  }

  next();
};
