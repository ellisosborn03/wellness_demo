const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/whoop',
  passport.authenticate('oauth2'));

router.get('/whoop/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
