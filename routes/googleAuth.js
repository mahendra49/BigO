var  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
     User           = require("../models/users");

//google auth
module.exports = new GoogleStrategy({
    clientID: '350846909990-vlosg7h9i7jt7k5k3v6jecu3469emcbh.apps.googleusercontent.com',
    clientSecret: 'xsjmeRO_uteeqon4DC7VNN1c',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
      User.findOne({email:profile.emails[0].value} , function(err,user){
          if(err){
            return done(err);
          }
          if (!user){
                User.create({username:profile.displayName , email:profile.emails[0].value},function(err,user){
                return done(err, user); 
                });
                
            } else {
                //found user. Return
                return done(err,user);
            }

       });
       
  }
);