const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    return res.status(200).json({ message: 'User is already logged in', user });
  } else {
    // res.redirect('/login');
    return res.status(401).send('Please log in again');
  }
});

module.exports = router;
