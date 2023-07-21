var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', checkAuthenticated, function (req, res, next) {
  //res.render('index', { user: req.user.name });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Please log in');
}

module.exports = router;
