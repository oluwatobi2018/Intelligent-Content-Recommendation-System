import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/jwt';

const router = express.Router();

/**
 * Initiate Google OAuth authentication
 */
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * Google OAuth callback route
 */
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    try {
      // Generate JWT Access Token
      const accessToken = generateAccessToken(user);

      // Send token in response (avoid URL token exposure)
      res.cookie('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });

      res.status(200).json({ message: 'Authentication successful', accessToken });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  })(req, res, next);
});

export default router;
