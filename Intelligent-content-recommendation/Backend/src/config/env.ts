import { config } from "dotenv";

config(); // Load environment variables

export default {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/content_recommendation",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  NODE_ENV: process.env.NODE_ENV || "development",
};
