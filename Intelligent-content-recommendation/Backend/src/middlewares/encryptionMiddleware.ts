import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

const ALGORITHM = "aes-256-ctr";
const SECRET_KEY = process.env.ENCRYPTION_KEY || "default_secret_key_32_bytes"; // Ensure 32 bytes
const IV_LENGTH = 16; // AES IV must be 16 bytes

/**
 * Encrypts data using AES-256.
 * @param text - The plain text to encrypt.
 * @returns {string} Encrypted text in hex format.
 */
export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY, "utf-8"), iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf-8"), cipher.final()]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

/**
 * Decrypts AES-256 encrypted data.
 * @param encryptedText - The encrypted text in hex format.
 * @returns {string} Decrypted plain text.
 */
export const decrypt = (encryptedText: string): string => {
  const [iv, encrypted] = encryptedText.split(":");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY, "utf-8"), Buffer.from(iv, "hex"));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, "hex")), decipher.final()]);

  return decrypted.toString("utf-8");
};

/**
 * Middleware to encrypt request body.
 */
export const encryptionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    req.body = Object.fromEntries(Object.entries(req.body).map(([key, value]) => [key, encrypt(String(value))]));
  }
  next();
};

/**
 * Middleware to decrypt request body.
 */
export const decryptionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    req.body = Object.fromEntries(Object.entries(req.body).map(([key, value]) => [key, decrypt(String(value))]));
  }
  next();
};
