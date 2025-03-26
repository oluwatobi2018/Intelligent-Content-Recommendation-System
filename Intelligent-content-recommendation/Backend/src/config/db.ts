import mongoose from "mongoose";
import { config } from "dotenv";

config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/content_recommendation";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
