const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../model/pool");
const bcrypt = require("bcryptjs");

// VERIFY CALLBACK
async function verifyCallback(username, password, done) {
  try {
    const user = (
      await pool.query("SELECT * FROM users WHERE username = $1", [username])
    ).rows[0];
    if (!user) return done(null, false);

    const isVerified = await bcrypt.compare(password, user.password);
    if (isVerified) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(err);
  }
}

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = (
      await pool.query("SELECT * FROM users WHERE username = $1", [username])
    ).rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});
