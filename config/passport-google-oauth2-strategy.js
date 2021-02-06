const passport = require('passport');
const googleStatragy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');


//tell passsport to use a new statergy for google login 
passport.use(new googleStatragy({
    clientID: "144783225171-qj2ll1vvi82vkiq2uda5gsoa1qdg1l04.apps.googleusercontent.com",
    clientSecret: "mcyoFDQ6BW_j1F4xhjnYgRQS",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('err',err);
                return ;
            }
             console.log(profile);

             if(user){
                 return done(null,user);
             }else{
                 User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')

                 },function(err,user){
                    if(err){console.log('error in creating user google statergy-passport',err);return;}

                    return done(null,user);
                 })
             }

        });
    }

))

module.exports = passport;