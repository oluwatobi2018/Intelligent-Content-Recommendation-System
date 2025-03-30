import bcrypt from "bcrypt";

/**
 * Hashes a plain text password using bcrypt.
 * @param password - The plain text password to hash.
 * @param saltRounds - Number of salt rounds (default: 10).
 * @returns {Promise<string>} The hashed password.
 */
export const hashPassword = async (password: string, saltRounds = 10): Promise<string> => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed");
  }
};

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} True if the passwords match, false otherwise.
 */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

