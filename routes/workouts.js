const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/workouts', (req, res) => {
  const accessToken = req.user.token; // Assume the token is stored in the user object

  request.get({
    url: 'https://api.whoop.com/developer/v1/activity',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }, function(err, response, body) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(JSON.parse(body));
  });
});

module.exports = router;
