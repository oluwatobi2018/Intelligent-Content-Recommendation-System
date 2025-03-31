import request from "supertest";
import app from "../../src/app";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "test123" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should not register with existing email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "test123" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email already in use");
  });
});
