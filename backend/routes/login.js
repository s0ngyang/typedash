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
      //console.log('err 1');
      return res.status(500).json({ message: 'Authentication failed' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.login(user, (err) => {
      if (err) {
        //console.log('err 2');
        return res.status(500).json({ message: 'Authentication failed' });
      }
      const { name, email } = user;
      return res
        .status(200)
        .json({ message: 'Authentication successful', name, email });
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
