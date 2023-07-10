const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRATION = '10s';
const REFRESH_TOKEN_EXPIRATION = '20s';

router.post('/', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication failed' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Authentication failed' });
      }
      const accessToken = jwt.sign({ user }, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      });
      const refreshToken = jwt.sign({ user }, REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      });

      // Set refresh token as an HTTP-only cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true, // Set this to true if using HTTPS
      });

      return res.status(200).json({
        message: 'Authentication successful',
        user,
        token: accessToken,
      });
    });
  })(req, res, next);
});

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.status(403).json({ message: 'Already authenticated' });
//   }
//   next();
// }

module.exports = router;
