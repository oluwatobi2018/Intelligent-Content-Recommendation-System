import jwt from "jsonwebtoken";
import env from "../config/env";

/**
 * Generates a JSON Web Token (JWT) for user authentication.
 * @param userId - The unique identifier of the user.
 * @returns A signed JWT token.
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
    algorithm: "HS256", // Secure hashing algorithm
  });
};

/**
 * Verifies and decodes a JWT token.
 * @param token - The JWT token to verify.
 * @returns Decoded payload if valid, or null if invalid.
 */
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return null;
  }
};

/**
 * Refreshes a JWT token.
 * @param token - The existing JWT token.
 * @returns A new refreshed JWT token with an extended expiration time.
 */
export const refreshToken = (token: string): string | null => {
  try {
    const decoded: any = jwt.verify(token, env.JWT_SECRET, { ignoreExpiration: true });
    return generateToken(decoded.userId);
  } catch (error) {
    console.error("Token Refresh Error:", error.message);
    return null;
  }
};
