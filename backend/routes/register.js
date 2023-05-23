var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.get('/',checkNotAuthenticated, function(req, res, next) {
  res.render('register');
})

router.post('/', checkNotAuthenticated, async function(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    db.none('INSERT INTO users (name, email, password) \
                         VALUES ($1, $2, $3)', [req.body.name, req.body.email, hashedPassword])
      .then(() => res.redirect('/login'))
      .catch(err => res.redirect('/register'));
  } catch (error) {
    res.redirect('/register');
  }
})

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next()
}

module.exports = router;