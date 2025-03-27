import mongoose, { ConnectOptions } from "mongoose";
import { config } from "dotenv";

config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in environment variables.");
  process.exit(1);
}

/**
 * Establish a connection to MongoDB.
 */
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Prevents hanging if MongoDB is unreachable
    } as ConnectOptions);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit the process on failure
  }
};

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 MongoDB connection closed.");
  process.exit(0);
});

export default connectDB;

