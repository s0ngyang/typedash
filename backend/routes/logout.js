const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
