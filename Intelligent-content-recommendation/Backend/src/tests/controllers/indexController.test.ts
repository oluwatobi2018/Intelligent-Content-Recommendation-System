import request from "supertest";
import app from "../../src/app"; // Ensure this is your Express instance

describe("IndexController API", () => {
  it("should return a welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Welcome to the Intelligent Content Recommendation System API!");
  });
});
