import { hashPassword, comparePasswords } from "../../src/services/authService";

describe("Auth Service", () => {
  let hashedPassword: string;

  it("should hash a password", async () => {
    hashedPassword = await hashPassword("test123");
    expect(hashedPassword).not.toBe("test123");
    expect(hashedPassword.length).toBeGreaterThan(20);
  });

  it("should validate correct password", async () => {
    const isValid = await comparePasswords("test123", hashedPassword);
    expect(isValid).toBe(true);
  });

  it("should reject incorrect password", async () => {
    const isValid = await comparePasswords("wrongpass", hashedPassword);
    expect(isValid).toBe(false);
  });
});
// Compare this snippet from Intelligent-content-recommendation/Backend/src/services/authService.ts: