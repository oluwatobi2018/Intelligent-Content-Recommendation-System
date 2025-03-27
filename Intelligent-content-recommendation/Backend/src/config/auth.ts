import jwt from "jsonwebtoken";
import env from "./env";

// Define an interface for the token payload
interface TokenPayload {
  userId: string;
}

// Ensure JWT_SECRET is available
if (!env.JWT_SECRET) {
  throw new Error("❌ Missing JWT_SECRET in environment variables.");
}

/**
 * Generates a JWT token for user authentication.
 *
 * @param userId - The unique identifier of the user.
 * @param expiresIn - Token expiration time (default: "7d").
 * @returns A signed JWT token.
 */
export const generateToken = (userId: string, expiresIn: string = "7d"): string => {
  try {
    return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn });
  } catch (error) {
    console.error("❌ Error generating token:", error);
    throw new Error("Failed to generate token.");
  }
};

/**
 * Verifies and decodes a JWT token.
 *
 * @param token - The JWT token to verify.
 * @returns The decoded token payload or `null` if invalid.
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch (error) {
    console.warn("⚠ Invalid or expired token.");
    return null;
  }
};
