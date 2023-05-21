const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./db')

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    // const user = getUserByEmail(email);
    // if (user == null) {
    //   return done(null, false, { message: "No user with that email"});
    // }
    db.oneOrNone("SELECT * FROM users WHERE email = $1", email).then((res) => {
      if (res == null) {
        return done(null, false, { message: "No user with that email"});
      }
    })

    
  }

  passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = initialize;