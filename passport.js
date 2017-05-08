const bcrypt = require("bcrypt-nodejs")
const db = require("./db")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

passport.use(new LocalStrategy(authenticate))
passport.use("local-register", new LocalStrategy({passReqToCallback: true}, register))

function authenticate(email, password, done){
  db("users")
    .where("email", email)
    .first()
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, {message: "invalid user and password combination"})
      }

      done(null, user)
    }, done)
}

function register(req, email, password, done) {
  db("users")
    .where("email", email)
    .first()
    .then((user) => {
      if (user) {
        return done(null, false, {message: "an account with that email has already been created"})
      }
      if (password !== req.body.password2) {
        return done(null, false, {message: "passwords don't match"})
      }

      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: email,
        password: bcrypt.hashSync(password),
        zipcode: req.body.zipcode,
        rating: 5.0,
        public_profile: false
      };

      db("users")
        .insert(newUser)
        .then((ids) => {
          done(null, newUser)
        })
    })
}


passport.serializeUser(function(user, done) {
  done(null, user.email)
})

passport.deserializeUser(function(email, done) {
  db("users")
    .where("email", email)
    .first()
    .then((user) => {
      done(null, user)
    }, done)
})