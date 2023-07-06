const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', checkNotAuthenticated, (req, res, next) => {
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
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
      return res
        .status(200)
        .json({ message: 'Authentication successful', user, token });
    });
  })(req, res, next);
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(403).json({ message: 'Already authenticated' });
  }
  next();
}

module.exports = router;
