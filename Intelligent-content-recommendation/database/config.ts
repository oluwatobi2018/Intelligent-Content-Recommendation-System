import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Database connection configuration
const pool = new Pool({
  user: process.env.DB_USER || "your_username",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "content_recommendation",
  password: process.env.DB_PASSWORD || "your_password",
  port: Number(process.env.DB_PORT) || 5432,
});

pool.on("connect", () => {
  console.log("✅ Connected to the PostgreSQL database.");
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

export default pool;
