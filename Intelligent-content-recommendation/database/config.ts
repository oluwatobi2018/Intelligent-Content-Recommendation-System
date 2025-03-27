import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnv = ["DB_USER", "DB_HOST", "DB_NAME", "DB_PASSWORD", "DB_PORT"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

// Database connection configuration
const pool = new Pool({
  user: process.env.DB_USER!,
  host: process.env.DB_HOST!,
  database: process.env.DB_NAME!,
  password: process.env.DB_PASSWORD!,
  port: Number(process.env.DB_PORT!) || 5432,
  max: 10, // Max connections in pool
  idleTimeoutMillis: 30000, // Close idle clients after 30s
  connectionTimeoutMillis: 5000, // Timeout for connection
});

// Handle successful connection
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database.");
});

// Handle database connection errors
pool.on("error", (err) => {
  console.error("❌ PostgreSQL Connection Error:", err);
  process.exit(1); // Exit process to avoid unknown DB state
});

// Graceful shutdown to close DB pool
const shutdown = async () => {
  console.log("🛑 Closing PostgreSQL connection...");
  try {
    await pool.end();
    console.log("✅ PostgreSQL connection closed.");
  } catch (error) {
    console.error("❌ Error closing PostgreSQL connection:", error);
  }
};

// Capture termination signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default pool;

