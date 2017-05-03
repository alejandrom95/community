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
  .get("/profile/:owner_email", loginRequired, (req, res, next) => {
    const profile_email = req.params.owner_email;
    db("users")
      .where("email", profile_email)
      .then((users) => {
        db("rating")
        .where("ratee_email", profile_email)
        .then((ratings) => {
          var ratingsAvg = 0
          for(var i = 0; i < ratings.length; i++) {
            ratingsAvg += ratings[i].rating
          }
          ratingsAvg /= ratings.length
          ratingsAvg = ratingsAvg.toFixed(2)
          res.render("profile", {
            email: users[0].email,
            first_name: users[0].first_name,
            last_name: users[0].last_name,
            zipcode: users[0].zipcode,
            average_rating: ratingsAvg,
            ratings: ratings
          })
          // res.send(ratingsAvg + "...")
        })
      })
  })


module.exports = router