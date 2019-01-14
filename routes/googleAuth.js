var  GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy,
     User             = require("../models/users"),
     GoogleAuthConfig = require("../config");

//google auth
module.exports = new GoogleStrategy(GoogleAuthConfig,
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