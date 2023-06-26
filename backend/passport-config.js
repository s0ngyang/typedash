const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const prisma = require('./prismaclient');

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    async function main() {
      try {
        const res = await prisma.users.findUniqueOrThrow({
          where: {
            email: email,
          },
        });

        if (!res) {
          return done(null, false, { message: 'No user with that email' });
        }

        const isMatch = await bcrypt.compare(password, res.password);
        if (isMatch) {
          return done(null, res);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (e) {
        console.error(e);
        return done(e);
      } finally {
        await prisma.$disconnect();
      }
    }

    main().catch((e) => {
      console.error(e);
      process.exit(1);
    });
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      authenticateUser,
    ),
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    async function main() {
      try {
        const user = await prisma.users.findUniqueOrThrow({
          where: {
            id: id,
          },
        });
        return user;
      } catch (e) {
        console.error(e);
        throw e;
      } finally {
        await prisma.$disconnect();
      }
    }

    main()
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        console.error(err);
        return done(err);
      });
  });
}

module.exports = initialize;
