const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require('crypto');

const User = require("../models/user");

module.exports = () => {

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email:email } });
          if (exUser) {            
            const pwd = crypto.createHash('sha256').update(password).digest('base64')
            if (exUser.password == pwd) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다" });
          }
        } catch (error) {
          console.log(error);
          done(error);
        }

      }
      ),
  );
};