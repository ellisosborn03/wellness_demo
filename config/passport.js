const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const request = require('request');

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://api.whoop.com/oauth/oauth2/authorize',
  tokenURL: 'https://api.whoop.com/oauth/oauth2/token',
  clientID: process.env.WHOOP_CLIENT_ID,
  clientSecret: process.env.WHOOP_CLIENT_SECRET,
  callbackURL: 'https://your-vercel-app.vercel.app/api/auth/whoop/callback'
},
function(accessToken, refreshToken, profile, cb) {
  request.get({
    url: 'https://api.whoop.com/developer/v1/user/profile',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }, function(err, response, body) {
    if (err) {
      return cb(err);
    }
    profile = JSON.parse(body);
    profile.token = accessToken; // Store the token in the profile object
    return cb(null, profile);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;
