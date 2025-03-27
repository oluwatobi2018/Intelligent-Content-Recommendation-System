import { config } from "dotenv";

config(); // Load environment variables

// Validate required environment variables
const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1); // Exit process if required env variable is missing
  }
});

const ENV = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
  MONGO_URI: process.env.MONGO_URI as string, // Ensured to be defined
  JWT_SECRET: process.env.JWT_SECRET as string, // Ensured to be defined
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default ENV;
