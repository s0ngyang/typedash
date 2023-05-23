var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', checkAuthenticated, function(req, res, next) {
  res.render('index', { user: req.user.name });
});

router.get('/logout', (req ,res) => {
  req.logout(err => {
    if(err) {
      return next(err);
    }
    req.flash("success_msg", "You have logged out");
    res.redirect('/login');
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('login');
}

module.exports = router;