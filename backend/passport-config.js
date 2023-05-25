const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./db');

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    db.oneOrNone("SELECT * FROM users WHERE email = $1", email).then(res => {
      if (res == null) {
        return done(null, false, { message: "No user with that email"});
      }
      
      bcrypt.compare(password, res.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, res);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      });
    });
  }

  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password'}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    db.one('SELECT * FROM users WHERE id = $1', id)
      .then(res => done(null, res))
      .catch(err => done(err));
  });
}

module.exports = initialize;