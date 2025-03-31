import http from "http";
import dotenv from "dotenv";
import express from "express";
import app from "./app";
import connectDB from "./config/database";
import { encryptionMiddleware, decryptionMiddleware } from "./middlewares/encryptionMiddleware";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Function to gracefully shut down the server
const shutdown = async (server: http.Server) => {
  console.log("🛑 Shutting down server...");

  try {
    // Close server
    server.close(() => console.log("✅ HTTP server closed."));

    // Close database connection
    await connectDB().disconnect();
    console.log("✅ Database connection closed.");
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
  } finally {
    process.exit(0);
  }
};

// Start the server only after a successful database connection
connectDB()
  .then(() => {
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    // Handle server errors
    server.on("error", (error) => {
      console.error("❌ Server error:", error);
      process.exit(1);
    });

    // Capture termination signals
    process.on("SIGINT", () => shutdown(server));
    process.on("SIGTERM", () => shutdown(server));
    process.on("uncaughtException", (err) => {
      console.error("🔥 Uncaught Exception:", err);
      process.exit(1);
    });
    process.on("unhandledRejection", (err) => {
      console.error("🔥 Unhandled Rejection:", err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

// Initialize Express and Apply Middleware
app.use(express.json());

// Apply encryption middleware
app.use(encryptionMiddleware);
app.use(decryptionMiddleware);

// Example route
app.post("/secure-data", (req, res) => {
  res.json({ message: "Data received securely", decryptedBody: req.body });
});
