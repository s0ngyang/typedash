var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.get('/', function(req, res, next) {
  res.render('register');
})

router.post('/', async function(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    db.none('INSERT INTO users (username, email, password) \
                         VALUES ($1, $2, $3)', [req.body.name, req.body.email, hashedPassword])
      .then(() => res.redirect('/login'));
  } catch (error) {
    res.redirect('/register');
  }
})

module.exports = router;