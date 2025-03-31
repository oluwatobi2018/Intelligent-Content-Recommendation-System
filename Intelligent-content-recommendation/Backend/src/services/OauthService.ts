import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user in your database
        const user = { id: profile.id, name: profile.displayName, email: profile.emails?.[0].value };
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID!,
      clientSecret: GITHUB_CLIENT_SECRET!,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = { id: profile.id, name: profile.displayName, email: profile.emails?.[0].value };
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

/**
 * Generates a JWT token for authenticated users.
 * @param user - The user object.
 * @returns {string} JWT token
 */
export const generateAccessToken = (user: { id: string; name: string; email: string }): string => {
  return jwt.sign(user, JWT_SECRET!, { expiresIn: "1h" });
};

/**
 * Middleware to initialize Passport.js
 */
export const initializeOAuth = (app: any) => {
  app.use(passport.initialize());
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
