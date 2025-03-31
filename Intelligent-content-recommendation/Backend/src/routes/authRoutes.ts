import express from "express";
import passport from "passport";
import { generateAccessToken } from "../services/OAuthService";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const accessToken = generateAccessToken(req.user as any);
    res.redirect(`/dashboard?token=${accessToken}`);
  }
);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    const accessToken = generateAccessToken(req.user as any);
    res.redirect(`/dashboard?token=${accessToken}`);
  }
);

export default router;
