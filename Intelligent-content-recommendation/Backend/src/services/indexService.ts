import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import morgan from "morgan";
import { initializeOAuth } from "./OAuthService";
import authRoutes from "../routes/auth";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev")); // Logger for debugging

// Session setup (needed for OAuth)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport for OAuth
initializeOAuth(app);

// Routes
app.use("/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Intelligent Content Recommendation API!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
