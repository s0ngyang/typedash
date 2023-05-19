var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('register');
})

router.post('/register', function(req, res) {
  req.body.email
})

module.exports = router;