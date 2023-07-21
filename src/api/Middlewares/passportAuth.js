const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../Models/user/user.model");
const bcrypt = require("bcrypt");
const errorDey = require("../Helpers/errorDey");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// LOGIN MIDDLEWARE
passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        // fetch user
        const user = await User.findOne({ email: email });
        if (!user)
          throw errorDey(
            409,
            "User does not exist",
            "Passport local Validation error"
          );

        const validate = bcrypt.compareSync(password, user.password);
        if (!validate)
          throw errorDey(
            409,
            "Incorrect email or password",
            "Passport local validation error"
          );
            
        return done(null, user, { message: "logged in successfully" });
        //   return
      } catch (error) {
        return done(error);
      }
    }
  )
);

// AUTHORIZATION MIDDLEWARE
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        // pay attention to this
        // query the db for the user and check if the user is registered
        const regUser = await User.findById(token.id);
        
        if (!regUser) throw errorDey(401, "Unauthorized", "Passport JWT error");

       return done(null, token.id);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
