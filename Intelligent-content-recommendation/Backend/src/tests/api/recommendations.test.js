import request from "supertest";
import app from "../../src/app";

describe("Recommendation API", () => {
  it("should return recommendations for a valid user", async () => {
    const res = await request(app).post("/recommendations").send({
      user_id: "12345",
      content_history: ["article_1", "video_3"],
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("recommended_content");
    expect(Array.isArray(res.body.recommended_content)).toBe(true);
  });

  it("should return a 400 error for missing fields", async () => {
    const res = await request(app).post("/recommendations").send({
      user_id: "12345",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
