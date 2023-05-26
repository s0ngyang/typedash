var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.get('/',checkNotAuthenticated, function(req, res, next) {
  res.render('register');
})

router.post('/', checkNotAuthenticated, async function(req, res) {
  // try {
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10)
  //   db.none('INSERT INTO users (name, email, password) \
  //                        VALUES ($1, $2, $3)', [req.body.name, req.body.email, hashedPassword])
  //     .then(() => res.redirect('/login'))
  //     .catch(err => res.redirect('/register'));
  // } catch (error) {
  //   res.redirect('/register');
  // }
  let { name, email, password, password2 } = req.body;

  let errors = [];

  console.log({
    name,
    email,
    password,
    password2
  });

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Validation passed
    db.query(
      `INSERT INTO users (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING id, password`,
      [name, email, hashedPassword])
      .then(() => res.redirect("/login"))
      .catch(err => {
        return res.render("register", {
          message: "Email already registered"
        })
      })
  }
});


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next()
}

module.exports = router;