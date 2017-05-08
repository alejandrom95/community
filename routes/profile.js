var express = require('express');
const passport = require("passport")
const router = require("express").Router()
const db = require("../db")

/* GET profile info. */
// router.get('/profile', function(req, res, next) {
//   res.render('profile');
// });

// module.exports = router;


function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login")
  }
  next()
}

router
  .get("/profile", loginRequired, (req, res, next) => {
    db("users")
      .where("email", req.user.email)
      .then((users) => {
        res.render("profile", {
          users: users
        })
      })
  })


module.exports = router