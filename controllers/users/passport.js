const localStrategie = require("passport-local").Strategy;
const passport = require("passport");
const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");

passport.use(
  new localStrategie({ usernameField: "email", passReqToCallback:true }, (req,email, password, done) => {
    Users.findOne({ email }).then(async (user) => {
      if (!user) return done(null, false, req.flash('message_error', 'Indentifiant incorrect'));
      const passVerif = await bcrypt.compare(password, user.password);
      if (!passVerif)
        return done(null, false, { message_error: "Le mot de passe n'existe pas" });
      else return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user.id);
  });
});

module.exports = passport;
