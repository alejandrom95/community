var express = require('express');
var router = express.Router();

function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login")
  }
  next()
}
/* GET home page. */
router.get('/', loginRequired, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
