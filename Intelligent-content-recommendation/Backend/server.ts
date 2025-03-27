import http from "http";
import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/database";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Graceful shutdown handler
const shutdown = async (server: http.Server) => {
  console.log("🛑 Shutting down server...");

  try {
    // Close server
    server.close(() => {
      console.log("✅ HTTP server closed.");
    });

    // Close database connection
    await connectDB().disconnect();
    console.log("✅ Database connection closed.");
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
  } finally {
    process.exit(0);
  }
};

// Start server only after successful DB connection
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
