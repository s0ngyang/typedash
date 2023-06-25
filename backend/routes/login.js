const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', checkNotAuthenticated, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
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

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(403).json({ message: 'Already authenticated' });
  }
  next();
}

module.exports = router;
