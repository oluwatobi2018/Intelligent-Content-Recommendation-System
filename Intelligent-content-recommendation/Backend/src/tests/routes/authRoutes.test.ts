import request from "supertest";
import app from "../app";

describe("Auth Routes", () => {
    it("should return 200 for login", async () => {
        const res = await request(app).post("/auth/login").send({
            username: "testuser",
            password: "password123",
        });
        expect(res.statusCode).toBe(200);
    });
});